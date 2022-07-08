const express = require("express");
const app = express();
const auth = require("./auth");
const cors = require("cors");

app.use(
	cors({
		origin: "*",
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
		allowedHeaders: "Origin,Content-Type,X-Auth-Token",
	})
);
app.use(express.json());

const board = require("./board.route");
const login = require("./login.route");
const register = require("./register.route");
const update = require("./update.route");
const addCard = require("./board.route");
const removeCard = require("./board.route");

// app.use("/board", auth, board);
app.use("/board", board);
app.use("/login", login);
app.use("/register", register);
app.use("/update", update);
app.use("/board/add", addCard);
app.use("/board/remove", removeCard);

module.exports = app;
