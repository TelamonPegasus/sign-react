const authorisationController = require("../controllers/authorisationController");
const express = require("express");
const router = express.Router();

router.post("/", authorisationController.handleLogin);

module.exports = router;
