const express = require('express');
const { signup, login } = require('../controllers');
const { validateSignup, validateLogin } = require('../lib');

const router = express.Router();

router.post('/signup', validateSignup, signup);
router.post('/login', validateLogin, login);

module.exports = router;
