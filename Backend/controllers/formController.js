const Candidate = require("../models/candidateSchema");
const RejectedCandidate = require("../models/rejectedCandidateSchema");
const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const { sendEmail } = require("../utils/emailUtils");
const { uploadFile } = require("../utils/uploadFile");

const submitForm = async (req, res) => {
  try {
    const { name, email, address, city, pincode, start_date, job_role } =
      req.body;
    const { files } = req;
    let resumeFile = await uploadFile(files[0]);
    resumeFile = resumeFile.webContentLink;
    let imageFile = await uploadFile(files[1]);
    imageFile = "https://drive.google.com/thumbnail?id=" + imageFile.id;
    const candidate = new Candidate({
      name,
      email,
      address,
      city,
      pincode,
      start_date,
      job_role,
      resumePath: resumeFile,
      photoPath: imageFile,
    });
    await candidate.save();
    await sendEmail(
      email,
      "Application Submission",
      `Dear ${name},\n\nYour application has been submitted to Empowerin, India. We will get back to you shortly.\n\nBest regards,\nThe Hiring Team`
    );
    res.status(200).send("Form Submitted");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.json(candidates);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

const acceptCandidate = async (req, res) => {
  try {
    const candidateId = req.params.candidateId;
    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
      return res.status(404).json({ error: "Candidate not found" });
    }
    const randomPassword = generateRandomPassword();
    const hashedPassword = await bcrypt.hash(randomPassword, 10);
    const newUser = new User({
      name: candidate.name,
      email: candidate.email,
      password: hashedPassword,
      photo: candidate.photoPath,
      role: "candidate",
    });
    await newUser.save();
    await sendEmail(
      candidate.email,
      "Congratulations! Your Application is Accepted",
      `Dear ${candidate.name},\n\nWe are pleased to inform you that your application has been accepted. Congratulations!\n\nYour login credentials are:\nEmail: ${candidate.email}\nPassword: ${randomPassword}\n\nBest regards,\nThe Hiring Team`
    );
    await Candidate.findByIdAndDelete(candidateId);
    res.json({ message: "Candidate accepted" });
    console.log("Accepted");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

function generateRandomPassword() {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

const rejectCandidate = async (req, res) => {
  try {
    const candidateId = req.params.candidateId;
    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
      return res.status(404).json({ error: "Candidate not found" });
    }
    const rejectedCandidate = new RejectedCandidate({
      name: candidate.name,
      email: candidate.email,
      photo: candidate.photoPath,
      rejectionReason: "Candidate rejected in Resume screening",
      rejectionRound: 0,
    });
    await rejectedCandidate.save();

    await sendEmail(
      candidate.email,
      "Application Status Update",
      `Dear ${candidate.name},\n\nWe regret to inform you that your application has been rejected.\n\nBest regards,\nThe Hiring Team`
    );
    await Candidate.findByIdAndDelete(candidateId);
    res.json({ message: "Candidate rejected" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

module.exports = {
  submitForm,
  getCandidates,
  acceptCandidate,
  rejectCandidate,
};
