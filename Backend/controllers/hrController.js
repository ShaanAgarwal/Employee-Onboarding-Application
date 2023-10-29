const User = require("../models/userSchema");
const { sendEmail } = require("../utils/emailUtils");
const Onboarding = require("../models/onboardingSchema");
const RejectedCandidate = require("../models/rejectedCandidateSchema");

const getHRDetails = async (req, res) => {
  try {
    const email = req.query.email;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while fetching user details." });
  }
};

const getCandidates = async (req, res) => {
  try {
    const hrEmail = req.params.hrEmail;
    const hr = await User.findOne({ email: hrEmail });
    if (!hr) {
      return res.status(404).json({ message: "HR not found" });
    }
    const candidates = await User.find({ assignedHR: hr._id });
    res.json(candidates);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getCandidateDetails = async (req, res) => {
  try {
    const candidateId = req.params.candidateId;
    const candidate = await User.findById(candidateId);
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }
    res.json(candidate);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateRoundDetails = async (req, res) => {
  try {
    const roundId = req.params.roundId;
    const updatedName = req.body.name;
    const updatedDetails = req.body.details;

    const round = await User.findOneAndUpdate(
      { "interviewRounds._id": roundId },
      {
        $set: {
          "interviewRounds.$.name": updatedName,
          "interviewRounds.$.details": updatedDetails,
          "interviewRounds.$.updated": true,
        },
      },
      { new: true }
    );

    if (!round) {
      return res.status(404).json({ message: "Round not found" });
    }

    res.json(round);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const acceptCandidate = async (req, res) => {
  try {
    const roundId = req.params.roundId;
    const candidate = await User.findOne({ "interviewRounds._id": roundId });
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }
    const round = candidate.interviewRounds.find(
      (round) => round._id.toString() === roundId
    );
    if (!round) {
      return res.status(404).json({ message: "Round not found" });
    }
    await User.updateOne(
      { "interviewRounds._id": roundId },
      {
        $set: { "interviewRounds.$.status": "Approved" },
        $inc: { currentRound: 1 },
      }
    );
    const candidateEmail = candidate.email;
    await sendEmail(
      candidateEmail,
      "Interview Round Passed",
      `Congratualations, you have passed this round.`
    );
    if (candidate.currentRound == candidate.rounds) {
      candidate.interviewClear = true;
      await candidate.save();
      const onboarding = new Onboarding({
        candidate: candidate._id,
        hr: candidate.assignedHR,
      });
      await onboarding.save();
    }
    res.json({ message: "Round accepted" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const rejectCandidate = async (req, res) => {
  try {
    const roundId = req.params.roundId;
    const candidate = await User.findOne({ "interviewRounds._id": roundId });

    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    const round = candidate.interviewRounds.find(
      (round) => round._id.toString() === roundId
    );

    if (!round) {
      return res.status(404).json({ message: "Round not found" });
    }
    //code for saving the rejected candidates
    const rejectedCandidate = new RejectedCandidate({
      name: candidate.name,
      email: candidate.email,
      rejectionReason: `Candidate rejected at round ${candidate.currentRound}`,
      rejectionRound: candidate.currentRound,
    });
    await rejectedCandidate.save();

    const candidateEmail = candidate.email;
    await sendEmail(
      candidateEmail,
      "Interview Round Rejected",
      `Unfortunately, your interview round has been rejected.`
    );
    await User.findOneAndRemove({ "interviewRounds._id": roundId });

    res.json({ message: "Round rejected and candidate data deleted" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getHRDetails,
  getCandidates,
  getCandidateDetails,
  updateRoundDetails,
  acceptCandidate,
  rejectCandidate,
};
