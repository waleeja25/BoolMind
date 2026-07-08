const connectDB = require('./db');
const { getPort } = require('./env');

module.exports = { connectDB, getPort };
