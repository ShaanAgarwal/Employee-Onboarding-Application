const path = require('path');
const fs = require('fs');
const Candidate = require('../models/candidateSchema');
const User = require('../models/userSchema');
const bcrypt = require('bcrypt');
const { sendEmail } = require("../utils/emailUtils");
const stream = require("stream");
const multer = require("multer");
const upload = multer();
const { google } = require("googleapis");

const KEYFILEPATH = path.join(__dirname, "cred.json");
const SCOPES = ["https://www.googleapis.com/auth/drive"];

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
});

const submitForm = async (req, res) => {
  try {
    const { name, email, address, city, pincode, start_date, job_role } = req.body;
    const { files } = req;
    await uploadFile(files[0], files[1], name, email, address, city, pincode, start_date, job_role);
    res.status(200).send("Form Submitted");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const uploadFile = async (resumeFile, imageFile, name, email, address, city, pincode, start_date, job_role) => {
  const resumeBufferStream = new stream.PassThrough();
  resumeBufferStream.end(resumeFile.buffer);
  const imageBufferStream = new stream.PassThrough();
  imageBufferStream.end(imageFile.buffer);
  try {
    const { data: resumeData } = await google.drive({ version: "v3", auth }).files.create({
      media: {
        mimeType: resumeFile.mimetype,
        body: resumeBufferStream,
      },
      requestBody: {
        name: resumeFile.originalname,
        parents: ["1kNSlFMpNDah1DflH4R-cxDTGbty5cLQr"],
      },
      fields: "id,name,webContentLink",
    });
    const { data: imageData } = await google.drive({ version: "v3", auth }).files.create({
      media: {
        mimeType: imageFile.mimetype,
        body: imageBufferStream,
      },
      requestBody: {
        name: imageFile.originalname,
        parents: ["1kNSlFMpNDah1DflH4R-cxDTGbty5cLQr"],
      },
      fields: "id,name,webContentLink",
    });

    const candidate = new Candidate({
      name,
      email,
      address,
      city,
      pincode,
      start_date,
      job_role,
      resumePath: resumeData.webContentLink,
      photoPath: `https://drive.google.com/uc?id=${imageData.id}`,
    });
    await candidate.save();
    await sendEmail(
      email,
      'Application Submission',
      `Dear ${name}, Your application has been submitted successfully. We will get back to you shortly.`
    );
    console.log(`Uploaded resume: ${resumeData.name} - ${resumeData.id}`);
    console.log(`Resume URL: ${resumeData.webContentLink}`);
    console.log(`Uploaded image: ${imageData.name} - ${imageData.id}`);
    console.log(`Image URL: ${imageData.webContentLink}`);
  } catch (error) {
    console.error(`Error uploading files: ${error.message}`);
    throw error;
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
      photo: candidate.photoPath,
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

module.exports = { uploadFile, submitForm, getCandidates, acceptCandidate, rejectCandidate };