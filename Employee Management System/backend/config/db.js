const mongoose = require('mongoose');

async function connectDB() {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/employee-management-system';
  await mongoose.connect(uri);
  console.log('Connected to MongoDB');
}

module.exports = connectDB;
