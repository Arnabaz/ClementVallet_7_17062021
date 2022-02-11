// --- IMPORTS ---
const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");

// --- AUTH ROUTES ---
router.post("/signup", userCtrl.signUp);
router.post("/login", userCtrl.logIn);

// --- EXPORT ---
module.exports = router;