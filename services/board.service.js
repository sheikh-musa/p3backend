const User = require("../models/user.model");

module.exports = {
	updateBoard: async (userEmail, userBoard) => {
		const result = {
			status: null,
			message: null,
			data: null,
		};
		try {
			let user = await User.findOne({ where: { email: userEmail } });
			result.status = 200;
			result.message = "Board update successful";
			user.board = userBoard;
			await user.save();
			result.data = user.board;
			return result;
		} catch (err) {
			console.log("user login error caught", err);
		}
	},
	addBoard: async (userEmail, userBoard) => {
		const result = {
			status: null,
			message: null,
			data: null,
		};
		try {
			let user = await User.findOne({ where: { email: userEmail } });
			result.status = 200;
			result.message = "Board update successful";
			user.board = userBoard;
			await user.save();
			result.data = user.board;
			return result;
		} catch (err) {
			console.log("user login error caught", err);
		}
	},
};
