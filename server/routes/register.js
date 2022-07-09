const express = require("express");
const registerController = require("../controllers/registerController");
const router = express.Router();

router.post("/", registerController.handleRegisterNewSubscriber);

module.exports = router;
