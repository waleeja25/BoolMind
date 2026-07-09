const authService = require('../services/authService');

async function signup(req, res) {
  
  const { username, email, password } = req.body;

  try {
    const result = await authService.signup({ username, email, password });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ 
      message: "Failed to SignUp",
      err: err.message
    });
  }
}

async function login(req, res) {
 
  const { email, password } = req.body;

  try {
    const result = await authService.login({ email, password });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ 
      message: "Failed to Login" ,
      err: err.message});
  }
}

module.exports = { signup, login };
