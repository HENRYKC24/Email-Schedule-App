const dotenv = require('dotenv');

dotenv.config();
const sendRandomMessages = require('./utils/sendRandomMessages');

const connection = require('./utils/DBConnection');

const app = require('./app');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION: Server shutting down...'); // eslint-disable-line no-console
  console.log(err.name, '\n', err.message); // eslint-disable-line no-console
  process.exit(1);
});

// RUN SERVER
const port = process.env.PORT || 4000;
let server = {};

connection.connectToDatabase().then(() => {
  console.log('Database connection successful'); // eslint-disable-line no-console
  sendRandomMessages();
  setInterval(() => {
    sendRandomMessages();
  }, 1000 * 60);
});

server = app.listen(port, () => {
  console.log(`App running on port ${port}`); // eslint-disable-line no-console
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION: Server shutting down...'); // eslint-disable-line no-console
  console.log(err.name, '\n', err.message); // eslint-disable-line no-console
  server.close(() => {
    process.exit(1);
  });
});

module.exports = server;
