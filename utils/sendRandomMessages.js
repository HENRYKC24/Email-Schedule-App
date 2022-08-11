const sendEmail = require('./email');
const messages = require('./messages');

const User = require('../models/userModel');

const sendRandomMessages = async () => {
  const users = await User.find({
    messagesLeft: { $ne: 0 },
    messagePaused: { $ne: true },
  });

  users.forEach(async (user) => {
    const alreadySent = user.sentMessageIds;
    const yetToSend = messages.filter((el) => !alreadySent.includes(el.id));
    if (yetToSend.length !== 0) {
      const toSend = yetToSend[Math.floor(Math.random() * yetToSend.length)];

      await User.findByIdAndUpdate(
        user.id,
        { sentMessageIds: user.sentMessageIds.concat([toSend.id]) },
        {
          runValidators: true,
        }
      );

      sendEmail(
        'Cope Notes <henrykc24@gmail.com>',
        'Mental Health Tips',
        toSend.message,
        user.email
      );
    } else {
      await User.findByIdAndUpdate(
        user.id,
        { messagesLeft: 0, sentMessageIds: [] },
        {
          runValidators: true,
        }
      );
    }
  });
};

module.exports = sendRandomMessages;
