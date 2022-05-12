const userService = require("../services/user.service");

class UserController {
	async login(req, res) {
		const { email, password } = req.body;
		if (!(email && password && email.trim().length > 0 && password.trim().length > 0)) {
			return res.status(400).json({ message: "Email and password required" });
		}
		try {
			const result = await userService.login(email.trim().toLowerCase(), password);

			res.status(result.status);
			res.json({ data: result.data, message: result.message });
		} catch (err) {
			console.log("login controller error caught", err);
			return res.status(400).json({ message: err });
		}
	}

	async register(req, res) {
		const { email, password, username } = req.body;

		if (
			!(
				email &&
				password &&
				username &&
				email.trim().length > 0 &&
				password.trim().length > 0 &&
				username.trim().length > 0
			)
		) {
			return res.status(400).json({ message: "Email, username and password required" });
		}
		try {
			const result = await userService.register(
				email.trim().toLowerCase(),
				username.trim().toLowerCase(),
				password
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
