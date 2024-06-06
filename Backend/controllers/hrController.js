const User = require("../models/userSchema");
const { sendEmail } = require("../utils/emailUtils");
const Onboarding = require("../models/onboardingSchema");
const RejectedCandidate = require("../models/rejectedCandidateSchema");
const PDFDocument = require('pdfkit');
const nodemailer = require('nodemailer');

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
    };

    await sendEmail(
      round.email,
      "Interview Round Update",
      `Dear ${round.name},\n\nYour details for round ${round.currentRound} have been updated.\n\nBest regards,\nThe Hiring Team`
    );

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
      `Dear ${candidate.name},\n\nCongratulations. You have passed round ${candidate.currentRound}.\n\nBest regards,\nThe Hiring Team`
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
      photo: candidate.photo,
      rejectionReason: `Candidate rejected at round ${candidate.currentRound}`,
      rejectionRound: candidate.currentRound,
    });
    await rejectedCandidate.save();

    const candidateEmail = candidate.email;
    await sendEmail(
      candidateEmail,
      "Interview Round Rejected",
      `Dear ${candidate.name},\n\nWe regret to inform you that you have not passed round ${candidate.currentRound}.\n\nBest regards,\nThe Hiring Team`
    );
    await User.findOneAndRemove({ "interviewRounds._id": roundId });

    res.json({ message: "Round rejected and candidate data deleted" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const sendOfferLetter = async (req, res) => {
  const { name, email, position, location, salary, induction } = req.body;
  const pdfDoc = new PDFDocument();
  pdfDoc.font('Helvetica-Bold')
    .fontSize(24)
    .text('Offer Letter', { align: 'center' })
    .font('Helvetica')
    .fontSize(14)
    .moveDown()
    .text(`Date: ${new Date().toDateString()}`)
    .moveDown()
    .text(`Dear ${name},`)
    .moveDown()
    .text(`We are pleased to offer you a position at our company.`)
    .moveDown()
    .text(`Position: ${position}`)
    .text(`Location: ${location}`)
    .moveDown()
    .text(`Salary: ${salary}`)
    .moveDown()
    .text(`Induction Meeting Details: ${induction}`)
    .moveDown(2)
    .text(`Best regards,`)
    .text(`Empowerin, India`)
    .text(`Azad Nagar, Andheri West`)
    .text(`Mumbai, Maharashtra, India - 400054`)
    .moveDown()
    .text(`9137389019`);

  // Get the PDF buffer
  const pdfBuffer = await new Promise((resolve) => {
    const chunks = [];
    pdfDoc.on('data', (chunk) => chunks.push(chunk));
    pdfDoc.on('end', () => resolve(Buffer.concat(chunks)));
    pdfDoc.end();
  });

  // Send email with PDF attachment
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'agarwalshaan27@gmail.com',
      pass: 'ghkn yagl faxk frfv'
    }
  });

  const mailOptions = {
    from: 'agarwalshaan27@gmail.com',
    to: email,
    subject: 'Offer Letter',
    html: `<p>Dear ${name},</p><p>We are pleased to offer you a position at our company...</p>`,
    attachments: [
      {
        filename: 'offer_letter.pdf',
        content: pdfBuffer
      }
    ]
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('Email sent successfully');
    }
  });
};

module.exports = {
  getHRDetails,
  getCandidates,
  getCandidateDetails,
  updateRoundDetails,
  acceptCandidate,
  rejectCandidate,
  sendOfferLetter
};
