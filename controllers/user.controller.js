const userService = require("../services/user.service");

class UserController {
	async register(req, res) {
		const { email, password, username, firstName, lastName } = req.body;
		// console.log(req.body);
		try {
			const result = await userService.register(email, username, password, firstName, lastName);
			res.status(result.status);
			return res.json({ data: result.data, message: result.message });
		} catch (err) {
			console.log("register controller error caught", err);
			return res.status(400).json({ message: err });
		}
	}

	async login(req, res) {
		const { login, password } = req.body;
		console.log(req.body);
		try {
			const result = await userService.login(login.trim().toLowerCase(), password);
			res.status(result.status);
			res.json({ data: result.data, message: result.message });
		} catch (err) {
			console.log("login controller error caught", err);
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
