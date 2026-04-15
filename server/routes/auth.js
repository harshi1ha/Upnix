const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto'); // Built-in Node module
const nodemailer = require('nodemailer');
const User = require('../models/User');

const JWT_SECRET = 'your_jwt_secret_key';

// 1. CONFIGURE EMAIL TRANSPORTER
// (For real use, use your Gmail App Password here)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com', // ⚠️ Replace with your real email
    pass: 'your-app-password'     // ⚠️ Replace with your App Password (Not your login password)
  }
});

// REGISTER ROUTE (Now sends email!)
router.post('/register', async (req, res) => {
  try {
    const { email, password, isAlumni, linkedinUrl, jobTitle } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    // 1. Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 2. Generate Verification Token
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // 3. Detect Student Email (Optional: Mark as potential student)
    const isStudentEmail = /(\.edu|\.ac\.[a-z]{2}|\.edu\.[a-z]{2})$/i.test(email);

    // 4. Create User (Unverified at first)
    user = new User({
      email,
      password: hashedPassword,
      verificationToken,
      isStudent: isStudentEmail,
      isEmailVerified: false, // 🔒 Locked until they click the link

      // Alumni info
      isAlumni: isAlumni || false,
      alumniStatus: isAlumni ? 'pending' : 'none', // Auto-set to pending if they claim to be alumni
      linkedinUrl,
      jobTitle
    });

    await user.save();

    // 5. SEND VERIFICATION EMAIL 📧
    const verifyUrl = `http://localhost:5173/verify-email?token=${verificationToken}`;

    const mailOptions = {
      from: '"Upnix Team" <no-reply@upnix.com>',
      to: email,
      subject: 'Verify your Upnix Account',
      html: `
        <h3>Welcome to Upnix!</h3>
        <p>Please click the link below to verify your account:</p>
        <a href="${verifyUrl}" style="padding: 10px 20px; background: #3D315B; color: white; text-decoration: none; border-radius: 5px;">Verify Email</a>
        <p>If you did not create this account, please ignore this email.</p>
      `
    };

    // Send it!
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error sending email:', error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    res.json({ msg: 'Registration successful! Please check your email to verify.' });

  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// VERIFY EMAIL ROUTE (User clicks the link -> We verify them)
router.post('/verify-email', async (req, res) => {
  try {
    const { token } = req.body;

    // Find user with this token
    const user = await User.findOne({ verificationToken: token });

    if (!user) return res.status(400).json({ msg: 'Invalid or expired token' });

    // Mark as verified
    user.isEmailVerified = true;
    user.verificationToken = undefined; // Clear the token (security)
    await user.save();

    res.json({ msg: 'Email Verified Successfully! You can now login.' });

  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;