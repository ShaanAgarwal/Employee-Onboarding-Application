const mongoose = require("mongoose");

const interviewRoundSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: {
    type: String,
    enum: ['approved', 'pending', 'rejected'],
    default: 'pending'
  }
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['candidate', 'hr', 'admin'],
    required: true
  },
  assignedHR: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  rounds: { type: Number, default: 1 },
  interviewRounds: [interviewRoundSchema], // Array of interview rounds
  currentRound: { type: Number, default: 1 }
});

const User = mongoose.model('User', userSchema);

module.exports = User;