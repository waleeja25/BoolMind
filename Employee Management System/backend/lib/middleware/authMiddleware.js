const { verifyToken } = require('../utils/jwt');
const redis = require('../utils/redis')

async function authMiddleware(req, res, next) {

  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  
  try {
    const decoded = verifyToken(token);

    const session = await redis.get(`session:${token}`);

    if (!session) {
      return res.status(401).json({
        message: "Session expired. Please login again.",
      });
    }

    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token', error: err.message, });
  }
}

module.exports = authMiddleware;
