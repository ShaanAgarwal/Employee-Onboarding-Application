const mongoose = require("mongoose");

const onboardingSchema = new mongoose.Schema({
    personalDetailsForm: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: Number, required: true },
        homeAddress: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipcode: { type: Number, required: true },
        jobRole: { type: String, required: true },
        dob: { type: Date, required: true },
        gender: { type: String, enum: ["Male", "Female"], required: true },
        bloodGroup: { type: String, required: true },
        maritalStatus: { type: String, enum: ["Married", "Unmarried"], required: true },
        aadharCardNumber: { type: Number, required: true },
        postalAddress: { type: String, required: true },
        filled: { type: Boolean, required: true, default: false }
    },
    uploadDocuments: {
        aadharCard: { type: String, required: true },
        panCard: { type: String, required: true },
        residentialProof: { type: String, required: true },
        passport: { type: String, required: true },
        sscMarksheet: { type: String, required: true },
        hscMarksheet: { type: String, required: true },
        graduationMarksheet: { type: String, required: true },
        filled: { type: Boolean, required: true, default: false }
    }
});

const Onboarding = mongoose.model('Onboarding', onboardingSchema);
module.exports = Onboarding;