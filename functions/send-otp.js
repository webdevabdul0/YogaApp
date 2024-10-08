const nodemailer = require('nodemailer');

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

// Export the handler for Netlify
exports.handler = async event => {
  const {email, otpCode} = JSON.parse(event.body);

  if (!email || !otpCode) {
    return {
      statusCode: 400,
      body: JSON.stringify({message: 'Email and OTP are required'}),
    };
  }

  const mailOptions = {
    from: '"MyYogaApp" <noreply@yourdomain.com>', // Sender address
    to: email, // Recipient email
    subject: 'My Yoga App OTP Code',
    text: `Your OTP code is ${otpCode}`,
    html: `<p>Your OTP code is <strong>${otpCode}</strong></p>`,
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      body: JSON.stringify({message: 'OTP sent successfully'}),
    };
  } catch (error) {
    console.error('Error sending OTP:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({message: 'Failed to send OTP'}),
    };
  }
};
