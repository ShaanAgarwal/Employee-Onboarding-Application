const path = require('path');
const fs = require('fs');
const Candidate = require('../models/candidateSchema');
const User = require('../models/userSchema');
const bcrypt = require('bcrypt');
const { sendEmail } = require("../utils/emailUtils");

const uploadFile = (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    };
    const { name } = req.body;
    const candidateName = name.replace(/\s+/g, '_');
    const candidatePath = path.join(__dirname, '../uploads', 'resume', candidateName);
    fs.mkdirSync(candidatePath, { recursive: true });
    const filePath = path.join(candidatePath, req.file.originalname);
    fs.writeFileSync(filePath, req.file.buffer);
    req.filePath = filePath;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while uploading the file' });
  };
};

const submitForm = async (req, res) => {
  try {
    const { name, email } = req.body;
    const resumeFilePath = req.filePath;
    const candidate = new Candidate({
      name,
      email,
      resumePath: resumeFilePath,
    });
    await candidate.save();
    await sendEmail(
      email,
      'Application Submission',
      `Dear ${name}, Your application has been submitted successfully. We will get back to you shortly.`
    );
    res.json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

const getCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.json(candidates);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  };
};

const downloadResume = async (req, res) => {
  try {
    const candidateId = req.params.candidateId;
    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
      return res.status(404).json({ error: 'Candidate not found' });
    };
    const resumePath = candidate.resumePath;
    res.download(resumePath, candidate.name + '_resume.pdf');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while downloading the resume' });
  };
};

const acceptCandidate = async (req, res) => {
  try {
    const candidateId = req.params.candidateId;
    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
      return res.status(404).json({ error: 'Candidate not found' });
    };
    const randomPassword = generateRandomPassword();
    const hashedPassword = await bcrypt.hash(randomPassword, 10);
    const newUser = new User({
      name: candidate.name,
      email: candidate.email,
      password: hashedPassword,
      role: 'candidate'
    });
    await newUser.save();
    await sendEmail(
      candidate.email,
      'Congratulations! Your Application is Accepted',
      `Dear ${candidate.name},\n\nWe are pleased to inform you that your application has been accepted. Congratulations!\n\nYour login credentials are:\nEmail: ${candidate.email}\nPassword: ${randomPassword}\n\nBest regards,\nThe Hiring Team`
    );
    await Candidate.findOneAndDelete(candidateId);
    res.json({ message: 'Candidate accepted' });
    console.log("Accepted");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  };
};

function generateRandomPassword() {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  };
  return password;
};

const rejectCandidate = async (req, res) => {
  try {
    const candidateId = req.params.candidateId;
    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
      return res.status(404).json({ error: 'Candidate not found' });
    };
    candidate.status = 'rejected';
    await candidate.save();
    await sendEmail(
      candidate.email,
      'Application Status Update',
      `Dear ${candidate.name},\n\nWe regret to inform you that your application has been rejected.\n\nBest regards,\nThe Hiring Team`
    );
    await Candidate.findOneAndDelete(candidateId);
    res.json({ message: 'Candidate rejected' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  };
};

module.exports = { uploadFile, submitForm, getCandidates, downloadResume, acceptCandidate, rejectCandidate };