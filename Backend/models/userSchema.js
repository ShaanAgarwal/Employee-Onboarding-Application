const mongoose = require("mongoose");

const interviewRoundSchema = new mongoose.Schema({
  name: { type: String, required: true, default: 'Not Defined' },
  details: { type: String, required: true, default: 'Please specify details' },
  updated: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['Approved', 'Ongoing'],
    default: 'Pending'
  },
  attempted: { type: Boolean, default: false }
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: Number },
  gender: { type: String, enum: ["Male", "Female"] },
  photo: { type: String },
  requiresPasswordChange: { type: Boolean, default: true },
  interviewClear: { type: Boolean, default: false },
  role: {
    type: String,
    enum: ['candidate', 'hr', 'admin'],
    required: true
  },
  assignedHR: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  rounds: { type: Number, default: 1 },
  interviewRounds: [interviewRoundSchema],
  currentRound: { type: Number, default: 1 }
});

const User = mongoose.model('User', userSchema);

module.exports = User;