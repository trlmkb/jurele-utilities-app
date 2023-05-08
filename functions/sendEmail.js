/* global require exports */

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();

const { SENDER_EMAIL, SENDER_PASSWORD } = functions.config().email;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: SENDER_EMAIL,
    pass: SENDER_PASSWORD,
  },
});

const sendEmail = (receiver, subject, text) => {
  const mailOptions = {
    from: SENDER_EMAIL,
    to: receiver,
    subject,
    text,
  };

  return transporter.sendMail(mailOptions);
};

exports.sendEmail = functions.https.onCall((data) => {
  const { receiver, subject, text } = data;

  return sendEmail(receiver, subject, text)
    .then(() => {
      console.log('Email sent');
      return { success: true };
    })
    .catch((error) => {
      console.error('Error sending email:', error);
      return { success: false };
    });
});
