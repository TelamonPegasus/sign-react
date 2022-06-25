const registerController = require("../controllers/registerController");
const express = require("express");
const router = express.Router();

router.post("/", registerController.handleRegisterNewUser);

module.exports = router;
