const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const User = require('../models/userModel');

const { OAuth2 } = google.auth;

const OAuth2Client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET
);

OAuth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
});

const options = {
  OAuth2Client,
  type: 'OAuth2',
  user: 'henrykc24@gmail.com',
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  refreshToken: process.env.REFRESH_TOKEN,
};

const sendEmail = (from, subject, message, to, id, toSend) => {
  const { type, user, clientId, clientSecret, refreshToken } = options;

  const updateUser = async () => {
    const databaseUser = await User.findById(id);
    await User.findByIdAndUpdate(
      id,
      { sentMessageIds: databaseUser.sentMessageIds.concat([toSend.id]) },
      {
        runValidators: true,
      }
    );
  };

  const accessToken = options.OAuth2Client.getAccessToken();
  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type,
      user,
      clientId,
      clientSecret,
      refreshToken,
      accessToken,
    },
  });

  const getHTMLMessage = () => `
    <h4>Hi There!</h4>
    <p>${message}</p>
  `;

  const mailOptions = {
    from,
    to,
    subject,
    html: getHTMLMessage(),
  };

  transport.sendMail(mailOptions, (error, result) => {
    if (!error) {
      console.log('Success'); // eslint-disable-line no-console
      if (toSend) {
        updateUser();
      }
    } else {
      console.log('Error: ', error); // eslint-disable-line no-console
    }
    transport.close();
  });
};

module.exports = sendEmail;
