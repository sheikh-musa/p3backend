const User = require("../models/user.model");

module.exports = {
	updateBoard: async (login, userBoard) => {
		const result = {
			status: null,
			message: null,
			data: null,
		};
		try {
			let user = await User.findOne({ where: { email: login } });
			result.status = 200;
			result.message = "Board update successful";
			user.board = userBoard;
			await user.save();
			result.data = user.board;
			return result;
		} catch (err) {
			console.log("user login error caught", err);
			result.status = 400;
			result.message = "Error - unable to update board";
			return result;
		}
	},
	// addCard: async (userEmail, id, card) => {
	// 	const result = {
	// 		status: null,
	// 		message: null,
	// 		data: null,
	// 	};
	// 	try {
	// 		let user = await User.findOne({ where: { email: userEmail } });
	// 		let board = user.board;
	// 		let newBoard = user.board;
	// 		let index = board.lanes.findIndex((o) => o.id === id);
	// 		newBoard.lanes[index].cards.push(card);
	// 		user.board = newBoard;
	// 		await user.update({ board: newBoard });
	// 		result.data = board;
	// 		result.status = 200;
	// 		result.message = "card add successful";
	// 		return result;
	// 	} catch (err) {
	// 		console.log("user login error caught", err);
	// 		result.message = "user login error caught";
	// 		result.status = 400;
	// 		return result;
	// 	}
	// },
};
