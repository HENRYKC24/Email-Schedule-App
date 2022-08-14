const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const DB = process.env.MONGODB_REMOTE_SERVER.replace(
  '<PASSWORD>',
  process.env.MONGODB_PASSWORD
);

const connectToDatabase = () =>
  new Promise((resolve, reject) => {
    mongoose
      .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      })
      .then((res, err) => {
        if (err) return reject(err);
        resolve();
      });
  });

const disconnectFromDatabase = () => {
  mongoose.disconnect();
};

module.exports = { connectToDatabase, disconnectFromDatabase };
