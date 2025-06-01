const nodemailer = require('nodemailer');
const logger = require('../middleware/logger');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

exports.sendResetEmail = async (email, resetLink) => {
  const mailOptions = {
    from: `"Zephyr Support" <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: 'Password Reset Request',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #23371c;">Password Reset Request</h2>
        <p>You requested a password reset for your Zephyr account.</p>
        <p>Click the button below to reset your password:</p>
        <a href="${resetLink}" 
           style="display: inline-block; padding: 10px 20px; background-color: #4D812C; color: white; text-decoration: none; border-radius: 5px; margin: 15px 0;">
          Reset Password
        </a>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
        <hr style="border: none; border-top: 1px solid #EBEBE1; margin: 20px 0;">
        <p style="font-size: 12px; color: #777;">
          For security reasons, please do not share this email with anyone.
        </p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    logger.info(`Reset email sent to ${email}`);
  } catch (error) {
    logger.error('Email sending error:', error);
    throw new Error('Failed to send reset email');
  }
};