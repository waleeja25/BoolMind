const connectDB = require('./db');

const { connectRedis, redisClient } = require('./redis');

module.exports = { connectDB, connectRedis, redisClient };
