const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// --- IMPORTS ---
const Company = require('./models/Company');
const Contribution = require('./models/Contribution');
const User = require('./models/User');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin'); // 🆕 Admin Routes

const app = express();
const JWT_SECRET = 'your_jwt_secret_key'; // Make sure this matches auth.js

// --- MIDDLEWARE ---
app.use(express.json());
app.use(cors());

// --- CUSTOM AUTH MIDDLEWARE ---
const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

// --- DATABASE CONNECTION ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// --- ROUTES ---

// 1. AUTH ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes); // 🆕 Mount Admin Routes

// 2. GET ALL Companies (Dashboard)
app.get('/api/companies', async (req, res) => {
  try {
    const companies = await Company.find({}, 'name industry type');
    res.json(companies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. GET ONE Company (Details Page)
app.get('/api/companies/:id', async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) return res.status(404).json({ message: "Company not found" });
    res.json(company);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. GET CONTRIBUTIONS (Needed to display posts!)
app.get('/api/contributions/:companyId', async (req, res) => {
  try {
    const contributions = await Contribution.find({ companyId: req.params.companyId });
    res.json(contributions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. CONTRIBUTION ROUTE (With "Robot Judge" + "Verified Badge" + "Safety Switch")

// 🛡️ EXPANDED BLACKLIST
const BAD_WORDS = [
  'shit', 'damn', 'fuck', 'bitch', 'ass', 'asshole', 'bastard', 'dick',
  'cunt', 'pussy', 'cock', 'slut', 'whore', 'crap', 'piss', 'douche',
  'prick', 'bollocks', 'wanker', 'twat', 'bullshit',
  'sex', 'nude', 'naked', 'porn', 'xxx', 'boobs', 'tits', 'penis',
  'vagina', 'horny', 'jerk', 'suck', 'blowjob', 'cum', 'orgasm',
  'kill', 'murder', 'death', 'die', 'suicide', 'shoot', 'stab',
  'terrorist', 'bomb', 'gun', 'blood', 'dead',
  'stupid', 'dumb', 'idiot', 'ugly', 'fat', 'loser', 'scum',
  'retard', 'creep', 'trash', 'lame', 'hate', 'racist', 'nazi',
  'fake', 'scam', 'spam', 'buy', 'crypto', 'bitcoin', 'free',
  'winner', 'lottery', 'viagra'
];

app.post('/api/contribute', auth, async (req, res) => {
  try {
    const { companyId, question, context, starTip, userRole } = req.body;

    // A. Fetch Company & User
    const company = await Company.findById(companyId);
    const user = await User.findById(req.user.id);

    if (!company || !user) return res.status(404).json({ msg: "Company or User not found" });

    // B. 🕵️‍♂️ VERIFICATION LOGIC
    const emailDomain = user.email.split('@')[1].split('.')[0].toLowerCase();
    const companyClean = company.name.toLowerCase().replace(/\s/g, '');

    const isGeneric = ['gmail', 'yahoo', 'outlook', 'hotmail', 'live', 'icloud'].includes(emailDomain);

    // Check 1: Does domain match?
    const domainMatches = !isGeneric && (companyClean.includes(emailDomain) || emailDomain.includes(companyClean));

    // Check 2: 🔒 SAFETY SWITCH (Verified Email Only)
    const isVerifiedEmployee = domainMatches && user.isEmailVerified;

    // C. 🤖 ROBOT JUDGE LOGIC
    let autoApprove = false;

    const fullText = (question + " " + context + " " + starTip).toLowerCase();
    const isDetailed = starTip.length > 50;
    const hasContext = context.length > 10;

    // Smart Regex Check
    const hasBadWords = BAD_WORDS.some(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'i');
      return regex.test(fullText);
    });

    if (isDetailed && hasContext && !hasBadWords) {
      autoApprove = true;
    }

    // D. SAVE CONTRIBUTION
    const newContribution = new Contribution({
      companyId,
      userId: user.id,
      question,
      context,
      starTip,
      isApproved: autoApprove,
      userRole: userRole || 'Interview Candidate',
      isVerifiedEmployee: isVerifiedEmployee,
      isAlumni: user.isAlumni || false // 🎓 SAVE ALUMNI STATUS
    });

    await newContribution.save();

    // E. SEND RESPONSE
    if (isVerifiedEmployee) {
      res.json({ message: "Post verified! You have a Verified Employee badge. 🎖️" });
    } else if (hasBadWords) {
      res.json({ message: "Received! Sent for moderation (Language Flagged)." });
    } else {
      res.json({ message: "Contribution received! Thank you." });
    }

  } catch (err) {
    console.error("Submission Error:", err);
    res.status(500).json({ error: "Submission failed" });
  }
});

// 6. UPVOTE ROUTE (The New Feature 🚀)
app.put('/api/contributions/upvote/:id', auth, async (req, res) => {
  try {
    const contribution = await Contribution.findById(req.params.id);

    // Check if post exists
    if (!contribution) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // Increment Upvotes
    contribution.upvotes = (contribution.upvotes || 0) + 1;

    await contribution.save();

    // Send back the new number so frontend updates instantly
    res.json(contribution.upvotes);

  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});
// 7. ADMIN ROUTES (The "Jail" 🚓)

// Get ALL Pending Posts (isApproved: false)
app.get('/api/admin/pending', auth, async (req, res) => {
  try {
    // Fetch posts that are NOT approved yet
    // .populate() replaces the IDs with actual names (so you know who posted what)
    const pendingPosts = await Contribution.find({ isApproved: false })
      .populate('companyId', 'name')
      .populate('userId', 'email');

    res.json(pendingPosts);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Approve a Post (Release from Jail)
app.put('/api/admin/approve/:id', auth, async (req, res) => {
  try {
    await Contribution.findByIdAndUpdate(req.params.id, { isApproved: true });
    res.json({ msg: "Post Approved! It is now live." });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Delete a Post (Ban hammer)
app.delete('/api/admin/reject/:id', auth, async (req, res) => {
  try {
    await Contribution.findByIdAndDelete(req.params.id);
    res.json({ msg: "Post Deleted." });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// --- START SERVER ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});