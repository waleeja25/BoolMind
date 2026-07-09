const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { signToken, ApiError } = require('../lib');

async function signup({ username, email, password }) {
  
  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  
  if (existingUser) {
    throw new ApiError(409, 'Email or username already in use');
  }

  const user = await User.create({ username, email, password });

  const token = signToken(user._id);
  
  return { token, user: { id: user._id, username: user.username, email: user.email } };
}

async function login({ email, password }) {
  
  const user = await User.findOne({ email });
  
  if (!user) {
    throw new ApiError(401, 'Invalid credentials');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  
  if (!isMatch) {
    throw new ApiError(401, 'Invalid credentials');
  }

  const token = signToken(user._id);
  
  return { token, user: { id: user._id, username: user.username, email: user.email } };
}

module.exports = { signup, login };
