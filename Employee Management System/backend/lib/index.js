const authMiddleware = require('./middleware/authMiddleware');
const { validateSignup, validateLogin } = require('./middleware/validate');
const { signToken, verifyToken } = require('./utils/jwt');
const DEPARTMENTS = require('./constants/departments');
const ApiError = require('./ApiError');

module.exports = {
  authMiddleware,
  validateSignup,
  validateLogin,
  signToken,
  verifyToken,
  DEPARTMENTS,
  ApiError,
};
