const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const hash = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
	login: async (email, password) => {
		const result = {
			status: null,
			message: null,
			data: null,
		};
		try {
			let user = await User.findOne({ where: { email: email } });

			if (user && (await bcrypt.compare(password, user.password))) {
				// Create token
				const token = jwt.sign({ user_id: user._id, email }, process.env.TOKEN_KEY, {
					expiresIn: "2h",
				});
				// save user token
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

	register: async (email, username, password) => {
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
			});

			const token = jwt.sign(
				{
					user_id: user._id,
					email,
				},
				process.env.TOKEN_KEY,
				{ expiresIn: "2h" }
			);
			user.token = token;

			result.status = 200;
			result.message = "New account register successful";
			result.data = user;

			return result;
		} catch (err) {
			console.log("user create error caught", err);
			result.status = 400;
			result.message = "Invalid email address";
			return result;
		}
	},
};
