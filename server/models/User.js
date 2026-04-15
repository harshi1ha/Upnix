const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // ✅ VERIFICATION FIELDS
  isEmailVerified: { type: Boolean, default: false },
  verificationToken: { type: String }, // Stores the secret code

  // Role & Student Status
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  isStudent: { type: Boolean, default: false }, // True ONLY if .edu email is verified

  // 🎓 ALUMNI / PROFESSIONAL VERIFICATION
  isAlumni: { type: Boolean, default: false }, // User claims to be alumni
  alumniStatus: { type: String, enum: ['none', 'pending', 'approved', 'rejected'], default: 'none' },
  linkedinUrl: { type: String }, // Proof
  jobTitle: { type: String }, // e.g. "Software Engineer at Google"

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);