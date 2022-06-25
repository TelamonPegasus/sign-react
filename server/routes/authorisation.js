const express = require("express");
const authorisationController = require("../controllers/authorisationController");
const router = express.Router();

router.post("/", authorisationController.handleLogin);

module.exports = router;
