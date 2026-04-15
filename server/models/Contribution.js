const mongoose = require('mongoose');

const ContributionSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },

  // We track WHO posted it (to check for verified status)
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

  question: { type: String, required: true },
  context: { type: String },
  starTip: { type: String },

  // 1. USER ROLE: What they claim to be (e.g. "Interview Candidate")
  userRole: {
    type: String,
    enum: ['Current Employee', 'Former Employee', 'Interview Candidate'],
    default: 'Interview Candidate'
  },

  // 2. VERIFIED STATUS: The "Gold Standard" proof (Green Badge)
  isVerifiedEmployee: { type: Boolean, default: false },
  isAlumni: { type: Boolean, default: false }, // 🎓 NEW FIELD

  // 3. ROBOT JUDGE: Is the content safe/approved?
  isApproved: { type: Boolean, default: false },

  // ✅ 4. UPVOTES: The new "Helpful" counter
  upvotes: { type: Number, default: 0 },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Contribution', ContributionSchema);