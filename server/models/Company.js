const mongoose = require('mongoose');

// 1. Schema for specific Interview Rounds
const RoundSchema = new mongoose.Schema({
  roundName: { type: String, required: true }, // e.g., "Coding Round 1"
  duration: String,
  topics: [String],                            // e.g., ["DP", "Graphs"]
  difficulty: String,
  description: String
});

// Inside server/models/Company.js

const RoleSchema = new mongoose.Schema({
  roleName: { type: String, required: true },

  // Existing Technical Rounds
  rounds: [RoundSchema],

  // Existing Panic Mode
  lastMinuteChecklist: [String],

  // Existing ATS
  resumeKeywords: [String],

  // 🆕 NEW: HR & Behavioral Section
  hrQuestions: [{
    question: String,       // e.g., "Tell me about a conflict."
    context: String,        // e.g., "Amazon Leadership Principle: Have Backbone"
    starTip: String         // e.g., "Focus on how YOU resolved it, not the team."
  }]
});

// 3. The Main Upnix Company Schema
const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true },      // e.g., "Microsoft"
  industry: String,
  type: String,                                // e.g., "Product-Based" vs "Service-Based"
  roles: [RoleSchema],                         // Array of roles
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Company', CompanySchema);