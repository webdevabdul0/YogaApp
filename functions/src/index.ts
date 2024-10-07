/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

interface ResponseMessage {
  message: string;
}

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const mailgun = require('mailgun-js');

// Initialize Firebase Admin
admin.initializeApp();

// Get Mailgun credentials from Firebase environment variables
const mg = mailgun({
  apiKey: functions.config().mailgun.api_key,
  domain: functions.config().mailgun.domain,
});

// Firebase function to send OTP email
exports.sendOtp = functions.https.onRequest(
  async (
    req: {body: {email: any; otpCode: any}},
    res: {
      status: (arg0: number) => {
        (): any;
        new (): any;
        send: {(arg0: string): any; new (): any};
      };
    },
  ) => {
    const {email, otpCode} = req.body;

    if (!email || !otpCode) {
      return res.status(400).send('Email and OTP are required');
    }

    const emailData = {
      from: 'YourApp <noreply@yourdomain.com>',
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otpCode}`,
      html: `<p>Your OTP code is <strong>${otpCode}</strong></p>`,
    };

    try {
      await mg.messages().send(emailData);
      return res.status(200).send('Email and OTP are required');
    } catch (error) {
      console.error('Error sending OTP:', error);
      return res.status(500).send('Failed to send OTP');
    }
  },
);
