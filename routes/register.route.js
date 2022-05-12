const express = require("express");
const router = express.Router();
const UserDataController = require("../controllers/user.controller");
const userdatacontroller = new UserDataController();

router.post("/", userdatacontroller.register);

module.exports = router;
