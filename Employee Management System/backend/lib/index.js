const authMiddleware = require('./middleware/authMiddleware');
const { signToken, verifyToken } = require('./utils/jwt');
const DEPARTMENTS = require('./utils/constants/departments');
const ApiError = require('./ApiError');

module.exports = { authMiddleware, signToken, verifyToken, DEPARTMENTS, ApiError };
