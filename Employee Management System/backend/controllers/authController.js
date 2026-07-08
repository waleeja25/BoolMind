const { signup: signupService, login: loginService } = require('../services');

function sendError(err, res, fallbackMessage) {
  if (err.statusCode) {
    return res.status(err.statusCode).json({ message: err.message, ...(err.extra || {}) });
  }
  res.status(500).json({ message: fallbackMessage, error: err.message });
}

async function signup(req, res) {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Username, email and password are required' });
  }

  try {
    const result = await signupService({ username, email, password });
    res.status(201).json(result);
  } catch (err) {
    sendError(err, res, 'Signup failed');
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const result = await loginService({ email, password });
    res.status(200).json(result);
  } catch (err) {
    sendError(err, res, 'Login failed');
  }
}

module.exports = { signup, login };
