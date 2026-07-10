const authMiddleware = require('./middleware/authMiddleware');
const { validateSignup, validateLogin } = require('./middleware/validate');
const { signToken, verifyToken } = require('./utils/jwt');
const redis = require('./utils/redis');
const DEPARTMENTS = require('./constants/departments');
const ApiError = require('./ApiError');

module.exports = {
  authMiddleware,
  validateSignup,
  validateLogin,
  signToken,
  verifyToken,
  redis,
  DEPARTMENTS,
  ApiError,
};
