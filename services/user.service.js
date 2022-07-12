const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const hash = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
	register: async (email, username, password, firstName, lastName) => {
		const result = {
			status: null,
			message: null,
			data: null,
		};

		try {
			let user = await User.findOne({ where: { email: email } });
			let existing_username = await User.findOne({ where: { username: username } });

			if (user) {
				result.message = `Email '${email}' already registered. Please login`;
				result.status = 409;
				return result;
			}

			if (existing_username) {
				result.message = `Username '${username}' already exists.`;
				result.status = 409;
				return result;
			}

			const hash = await bcrypt.hash(password, 10);
			console.log(hash);
			user = await User.create({
				email: email,
				username: username,
				password: hash,
				firstName: firstName,
				lastName: lastName,
			});

			result.status = 200;
			result.message = "New account register successful";
			result.data = user;

			return result;
		} catch (err) {
			console.log("user create error caught", err);
			result.status = 400;
			result.message = err.message;
			return result;
		}
	},

	login: async (login, password) => {
		const result = {
			status: null,
			message: null,
			data: null,
		};
		try {
			console.log(login);
			let user =
				(await User.findOne({ where: { email: login } })) ||
				(await User.findOne({ where: { username: login } }));
			if (user && (await bcrypt.compare(password, user.password))) {
				const token = jwt.sign({ user_id: user._id, login }, process.env.TOKEN_KEY, {
					expiresIn: "2h",
				});
				user.token = token;

				result.status = 200;
				result.message = "Login successful";
				result.data = user;
				return result;
			}
			result.status = 400;
			result.message = "Invalid credentials";
			return result;
		} catch (err) {
			console.log("user login error caught", err);
		}
	},

	update: async (email, username, password, id) => {
		const result = {
			status: null,
			message: null,
			data: null,
		};

		try {
			let user = await User.findOne({ where: { id: id } });
			if (email && user.email != email) {
				let existing_email = await User.findOne({ where: { email: email } });
				if (existing_email) {
					result.message = `Email '${email}' already registered.`;
					result.status = 409;
					return result;
				} else {
					user.email = email;
				}
			}
			if (username && user.username != username) {
				let existing_username = await User.findOne({ where: { username: username } });
				if (existing_username) {
					console.log(existing_username, id);
					result.message = `Username '${username}' already exists.`;
					result.status = 409;
					return result;
				} else {
					user.username = username;
				}
			}
			if (password) {
				const hash = await bcrypt.hash(password, 10);
				// user = await User.update({ password: hash }, { where: { id: id } });
				user.password = hash;
			}
			user.save();
			result.status = 200;
			result.message = "Update successful";
			result.data = user;
			return result;
		} catch (err) {
			console.log("user update error caught", err);
			result.status = 400;
			result.message = "Error updating. Please try again later";
			return result;
		}
	},
};
