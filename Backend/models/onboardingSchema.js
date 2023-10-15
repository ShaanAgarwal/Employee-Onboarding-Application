const mongoose = require("mongoose");

const onboardingSchema = new mongoose.Schema({
    candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    hr: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    personalDetailsForm: {
        firstName: { type: String },
        lastName: { type: String },
        email: { type: String },
        phone: { type: Number },
        homeAddress: { type: String },
        city: { type: String },
        state: { type: String },
        zipcode: { type: Number },
        jobRole: { type: String },
        dob: { type: Date },
        gender: { type: String, enum: ["Male", "Female"] },
        bloodGroup: { type: String },
        maritalStatus: { type: String, enum: ["Married", "Unmarried"] },
        aadharCardNumber: { type: Number },
        postalAddress: { type: String },
        filled: { type: Boolean, default: false }
    },
    uploadDocuments: {
        aadharCard: { type: String },
        panCard: { type: String },
        residentialProof: { type: String },
        passport: { type: String },
        sscMarksheet: { type: String },
        hscMarksheet: { type: String },
        graduationMarksheet: { type: String },
        filled: { type: Boolean, default: false }
    }
});

const Onboarding = mongoose.model('Onboarding', onboardingSchema);
module.exports = Onboarding;