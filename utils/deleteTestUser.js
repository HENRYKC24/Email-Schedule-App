const User = require('../models/userModel');
const DBConnection = require('./DBConnection');

module.exports = async () => {
  const users = await User.find();
  await User.findByIdAndDelete(users[users.length - 1].id);
  DBConnection.disconnectFromDatabase();
};
