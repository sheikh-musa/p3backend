const express = require("express");
const router = express.Router();
const BoardController = require("../controllers/board.controller");
const boardcontroller = new BoardController();

router.put("/", boardcontroller.updateBoard);

module.exports = router;
