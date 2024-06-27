const User = require('../models/userSchema');
const Onboarding = require('../models/onboardingSchema');
const { uploadFile } = require('../utils/uploadFile');

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

const uploadDocuments = async (req, res) => {
    try {
        const email = req.query.email;
        const { files } = req;
        let aadharCard = await uploadFile(files[0]);
        aadharCard = aadharCard.webContentLink;
        let panCard = await uploadFile(files[1]);
        panCard = panCard.webContentLink;
        let residentialProof = await uploadFile(files[2]);
        residentialProof = residentialProof.webContentLink;
        let passport = await uploadFile(files[3]);
        passport = passport.webContentLink;
        let sscMarksheet = await uploadFile(files[4]);
        sscMarksheet = sscMarksheet.webContentLink;
        let hscMarksheet = await uploadFile(files[5]);
        hscMarksheet = hscMarksheet.webContentLink;
        let graduationMarksheet = await uploadFile(files[6]);
        graduationMarksheet = graduationMarksheet.webContentLink;

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