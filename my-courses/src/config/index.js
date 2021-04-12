require('dotenv').config();

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  mongoURI: process.env.MONGO_URI,
  defaultPaginationLimit: 5,
  maxPaginationLimit: 25,
};
