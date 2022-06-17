const userService = require("../services/user.service");

class UserController {
	async login(req, res) {
		const { email, password, username } = req.body;
		if (email && !username) {
			if (!(email && password && email.trim().length > 0 && password.trim().length > 0)) {
				return res.status(400).json({ message: "Email / password required" });
			}
			try {
				const result = await userService.login(email.trim().toLowerCase(), password);

				res.status(result.status);
				res.json({ data: result.data, message: result.message });
			} catch (err) {
				console.log("login controller error caught", err);
				return res.status(400).json({ message: err });
			}
		} else {
			if (!(username && password && username.trim().length > 0 && password.trim().length > 0)) {
				return res.status(400).json({ message: "Username / password required" });
			}
			try {
				const result = await userService.login(username.trim().toLowerCase(), password);
				res.status(result.status);
				res.json({ data: result.data, message: result.message });
			} catch (err) {
				console.log("login controller error caught", err);
				return res.status(400).json({ message: err });
			}
		}
	}

	async register(req, res) {
		const { email, password, username, firstName, lastName } = req.body;

		if (
			!(
				email &&
				password &&
				username &&
				firstName &&
				lastName &&
				email.trim().length > 0 &&
				password.trim().length > 0 &&
				username.trim().length > 0 &&
				firstName.length > 0 &&
				lastName.length > 0
			)
		) {
			return res.status(400).json({ message: "Missing field" });
		}
		try {
			const result = await userService.register(
				email.trim().toLowerCase(),
				username.trim().toLowerCase(),
				password,
				firstName,
				lastName
			);
			res.status(result.status);
			return res.json({ data: result.data, message: result.message });
		} catch (err) {
			console.log("register controller error caught", err);
			return res.status(400).json({ message: err });
		}
	}

	async update(req, res) {
		const { email, password, username, id } = req.body;
		try {
			const result = await userService.update(
				email.trim().toLowerCase(),
				username.trim().toLowerCase(),
				password,
				id
			);
			res.status(result.status);
			return res.json({ data: result.data, message: result.message });
		} catch (err) {
			console.log("register controller error caught", err);
			return res.status(400).json({ message: err });
		}
	}
}

module.exports = UserController;
