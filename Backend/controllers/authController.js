const multer = require("multer");
const express = require("express");
const fs = require("fs");
const router = express.Router();
const authController = require("../controllers/authController");
const { google } = require("googleapis");
const path = require("path");
const stream = require("stream");
const upload = multer();
const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const KEYFILEPATH = path.join(__dirname, "cred.json");
const SCOPES = ["https://www.googleapis.com/auth/drive"];
const jwt = require("jsonwebtoken");
const { uploadFile } = require("../utils/uploadFile");
require("dotenv").config();

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
});

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const { files } = req;
    let imageFile = await uploadFile(files[0]);
    imageFile = "https://drive.google.com/thumbnail?id=" + imageFile.id;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      photo: imageFile,
    });
    await newUser.save();
    res.status(200).send("User registered with image");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id }, "sjdkfhajskdfhaksjdfh", {
      expiresIn: "1h",
    });
    return res
      .status(200)
      .json({ token, userId: user._id, email: user.email, role: user.role });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

module.exports = { register, login };
