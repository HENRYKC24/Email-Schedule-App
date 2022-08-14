const User = require('../models/userModel');
const DBConnection = require('./DBConnection');

module.exports = async () => {
  const users = await User.find();
  const user = await User.findByIdAndDelete(users[users.length - 1].id);
  console.log('user>>>', user);
  DBConnection.disconnectFromDatabase();
};
