const express = require("express");
const router = express.Router();
const User = require('../models/userSchema');
const Onboarding = require('../models/onboardingSchema');
const path = require('path');
const fs = require('fs');
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

const getOnboardingDetails = async (req, res) => {
    try {
        const email = req.query.email;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found.", success: false });
        };
        const userId = user._id;
        const onboardingDetails = await Onboarding.findOne({ candidate: userId });
        res.status(200).json({ onboardingDetails, success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    };
};

const updatePersonalDetails = async (req, res) => {
    try {
        const email = req.query.email;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found.', success: false });
        };
        const userId = user._id;
        const { firstName, lastName, phone, homeAddress, city, state, zipcode, jobRole, dob, gender, bloodGroup, maritalStatus, aadharCardNumber, postalAddress } = req.body;
        const updatedDetails = { firstName, lastName, email,  phone, homeAddress, city, state, zipcode, jobRole, dob, gender, bloodGroup, maritalStatus, aadharCardNumber, postalAddress, filled: true };
        const updatedOnboarding = await Onboarding.findOneAndUpdate(
            { candidate: userId },
            { $set: { personalDetailsForm: updatedDetails } },
            { new: true }
        );
        res.status(200).json({ message: 'Personal details updated successfully', onboarding: updatedOnboarding, success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', success: false });
    };
};

const uploadFile = async (file) => {
    try {
        console.log(`Uploading file: ${file.originalname}`);

        const bufferStream = new stream.PassThrough();
        bufferStream.end(file.buffer);

        const { data } = await google.drive({ version: "v3", auth }).files.create({
            media: {
                mimeType: file.mimetype,
                body: bufferStream,
            },
            requestBody: {
                name: file.originalname,
                parents: ["1xWxhB5jRGKtQyCRkgV4SbcQpp1u8LArH"],
            },
            fields: "id,name,webContentLink",
        });

        console.log(`Uploaded file: ${file.originalname} - Link: ${data.webContentLink}`);
        return data.webContentLink;
    } catch (error) {
        console.error(`Error uploading file ${file.originalname}: ${error.message}`);
        throw error;
    }
};

const uploadDocuments = async (req, res) => {
    try {
        const email = req.query.email;
        const { files } = req;
        const aadharCard = await uploadFile(files[0]);
        const panCard = await uploadFile(files[1]);
        const residentialProof = await uploadFile(files[2]);
        const passport = await uploadFile(files[3]);
        const sscMarksheet = await uploadFile(files[4]);
        const hscMarksheet = await uploadFile(files[5]);
        const graduationMarksheet = await uploadFile(files[6]);

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found.", success: false });
        }

        const userId = user._id;
        const updatedOnboarding = await Onboarding.findOneAndUpdate(
            { candidate: userId },
            {
                $set: {
                    "uploadDocuments.aadharCard": aadharCard,
                    "uploadDocuments.panCard": panCard,
                    "uploadDocuments.residentialProof": residentialProof,
                    "uploadDocuments.passport": passport,
                    "uploadDocuments.sscMarksheet": sscMarksheet,
                    "uploadDocuments.hscMarksheet": hscMarksheet,
                    "uploadDocuments.graduationMarksheet": graduationMarksheet,
                    "uploadDocuments.filled": true
                }
            },
            { new: true }
        );
        await updatedOnboarding.save();
        res.status(200).json({ message: "Documents uploaded successfully", success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

const getPersonalDetails = async (req, res) => {
    try {
        const { candidateId } = req.params;
        const personalDetails = await Onboarding.find({ candidate: candidateId });
        res.status(200).json({ personalDetails, message: "Fetched the personal details of the candidate", success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    };
};

module.exports = { getOnboardingDetails, updatePersonalDetails, uploadDocuments, getPersonalDetails };