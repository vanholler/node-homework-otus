require('colors');
const { port } = require('./config');
const app = require('./app');
const connectDB = require('./db');

async function start() {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server running on port ${port}`.blue.underline.bold);
    });
  } catch (error) {
    console.log(`Error: ${error.message}`.red);
    process.exit(1);
  }
}

start();
