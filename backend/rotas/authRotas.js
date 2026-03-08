const express = require("express");

const router = express.Router();

const authControle = require("../controles/authControle.js");

router.post("/register", authControle.register);

router.post("/login", authControle.login);

module.exports = router;