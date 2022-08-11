const nodemailer = require('nodemailer');
const { google } = require('googleapis');

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

const sendEmail = (from, subject, message, to) => {
  const { type, user, clientId, clientSecret, refreshToken } = options;

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
    if (error) {
      console.log('Error: ', error);
    } else {
      console.log('Success: ', result);
    }
    transport.close();
  });
};

module.exports = sendEmail;
