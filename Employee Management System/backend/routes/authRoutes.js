const express = require('express');
const { signup, login, logout } = require('../controllers');
const { validateSignup, validateLogin, authMiddleware } = require('../lib');

const router = express.Router();

router.post('/signup', validateSignup, signup);
router.post('/login', validateLogin, login);
router.post("/logout", authMiddleware, logout);

module.exports = router;
