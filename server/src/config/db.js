const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      autoIndex: true,
    });
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[Database] Connection Error: ${error.message}`);
    // If local demo mode, log warning without exiting
    if (process.env.NODE_ENV === 'development') {
      console.warn('[Database] Running in fallback mode. Connect MongoDB Atlas URI for persistent database operations.');
    } else {
      process.exit(1);
    }
  }
};

module.exports = connectDB;
