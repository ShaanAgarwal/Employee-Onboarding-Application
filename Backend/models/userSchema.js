const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['candidate', 'hr', 'admin'],
    required: true
  },
  assignedHR: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to another user (HR)
  rounds: { type: Number, default: 1 }, // Number of interview rounds
  // Other user properties as needed
});

const User = mongoose.model('User', userSchema);

module.exports = User;
