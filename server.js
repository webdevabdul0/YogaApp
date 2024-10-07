require('dotenv').config(); // Load environment variables
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Route to send OTP email
app.post('/send-otp', async (req, res) => {
  const {email, otpCode} = req.body;

  if (!email || !otpCode) {
    return res.status(400).json({message: 'Email and OTP are required'});
  }

  const mailOptions = {
    from: '"YourApp" <noreply@yourdomain.com>', // Sender address
    to: email, // Recipient email
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otpCode}`,
    html: `<p>Your OTP code is <strong>${otpCode}</strong></p>`,
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    return res.status(200).json({message: 'OTP sent successfully'});
  } catch (error) {
    console.error('Error sending OTP:', error);
    return res.status(500).json({message: 'Failed to send OTP'});
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
