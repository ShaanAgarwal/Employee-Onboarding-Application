const mongoose = require("mongoose");

const rejectedCandidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  photo: { type: String },
  rejectionReason: { type: String },
  rejectionRound: { type: Number },
});

const rejectedCandidate = mongoose.model(
  "RejectedCandidate",
  rejectedCandidateSchema
);

module.exports = rejectedCandidate;
