const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  pincode: {
    type: Number,
    required: true
  },
  start_date: {
    type: Date,
    required: true
  },
  job_role: {
    type: String,
    required: true
  },
  photoPath: {
    type: String,
    required: true
  },
  resumePath: {
    type: String,
    required: true,
  },
});

const Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = Candidate;