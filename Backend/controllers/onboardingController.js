const express = require("express");
const router = express.Router();
const User = require('../models/userSchema');
const Onboarding = require('../models/onboardingSchema');

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
        const updatedDetails = {
            firstName,
            lastName,
            phone,
            homeAddress,
            city,
            state,
            zipcode,
            jobRole,
            dob,
            gender,
            bloodGroup,
            maritalStatus,
            aadharCardNumber,
            postalAddress,
            filled: true
        };

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

module.exports = { getOnboardingDetails, updatePersonalDetails };