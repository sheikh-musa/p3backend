const boardService = require("../services/board.service");

class BoardController {
	async updateBoard(req, res) {
		try {
			const board = req.body.board;
			const email = req.user.email;
			console.log(req.user, board);
			const result = await boardService.updateBoard(email, board);
			res.status(result.status);
			res.json({ data: result.data, message: result.message });
		} catch (err) {
			console.log("board controller error caught", err);
			return res.status(400).json({ message: err });
		}
	}

	async addCard(req, res) {
		try {
			const id = req.body.id;
			const card = req.body.card;
			// const email = req.user.email;
			const email = req.body.email;
			// console.log(id, card);
			const result = await boardService.addCard(email, id, card);
			res.status(result.status);
			res.json({ data: result.data, message: result.message });
		} catch (err) {
			console.log("board controller error caught", err);
			return res.status(400).json({ message: err });
		}
	}

	// async removeCard(req, res) {
	// 	try {
	// 		const board = req.body.board;
	// 		const email = req.user.email;
	// 		console.log(req.user, board);
	// 		const result = await boardService.removeBoard(email, board);
	// 		res.status(result.status);
	// 		res.json({ data: result.data, message: result.message });
	// 	} catch (err) {
	// 		console.log("board controller error caught", err);
	// 		return res.status(400).json({ message: err });
	// 	}
	// }
}

module.exports = BoardController;
