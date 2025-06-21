// config/db.js
const mongoose = require('mongoose');

// Replace this with your own MongoDB connection string!
// For local MongoDB, it's usually: 'mongodb://localhost:27017/your_db_name'
// For Atlas, you'll get a string from their dashboard.
const MONGO_URI = 'mongodb://127.0.0.1:27017/analyticsDB';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB Connected Successfully!');
  } catch (error) {
    console.error('MongoDB Connection Failed:', error.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;