const mongoose = require('mongoose');
const { mongoURI } = require('./config');

const connectDB = async () => {
  try {
    console.log(`MongoDB Connecting...`.cyan.bold);
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
  } catch (error) {
    console.error(`Mongo DB Error: ${error.message}`.red.underline.bold);
    throw error;
  }
};

module.exports = connectDB;
