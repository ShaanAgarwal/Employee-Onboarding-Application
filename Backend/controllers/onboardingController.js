const User = require("../models/userSchema");
const Onboarding = require("../models/onboardingSchema");
const { uploadFile } = require("../utils/uploadFile");

const getOnboardingDetails = async (req, res) => {
  try {
    const email = req.query.email;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found.", success: false });
    }
    const userId = user._id;
    const onboardingDetails = await Onboarding.findOne({ candidate: userId });
    res.status(200).json({ onboardingDetails, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

const updatePersonalDetails = async (req, res) => {
  try {
    const email = req.query.email;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found.", success: false });
    }
    const userId = user._id;
    const {
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
    } = req.body;
    const updatedDetails = {
      firstName,
      lastName,
      email,
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
      filled: true,
    };
    const updatedOnboarding = await Onboarding.findOneAndUpdate(
      { candidate: userId },
      { $set: { personalDetailsForm: updatedDetails } },
      { new: true }
    );
    res
      .status(200)
      .json({
        message: "Personal details updated successfully",
        onboarding: updatedOnboarding,
        success: true,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

const uploadDocuments = async (req, res) => {
  try {
    const email = req.query.email;
    const { files } = req;

    const uploadPromises = files.map((file) => uploadFile(file));
    const uploadResults = await Promise.all(uploadPromises);

    const fileLinks = uploadResults.map((result) => result.webContentLink);

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found.", success: false });
    }

    const userId = user._id;
    const updatedOnboarding = await Onboarding.findOneAndUpdate(
      { candidate: userId },
      {
        $set: {
          "uploadDocuments.aadharCard": fileLinks[0],
          "uploadDocuments.panCard": fileLinks[1],
          "uploadDocuments.residentialProof": fileLinks[2],
          "uploadDocuments.passport": fileLinks[3],
          "uploadDocuments.sscMarksheet": fileLinks[4],
          "uploadDocuments.hscMarksheet": fileLinks[5],
          "uploadDocuments.graduationMarksheet": fileLinks[6],
          "uploadDocuments.filled": true,
        },
      },
      { new: true }
    );

    await updatedOnboarding.save();
    res
      .status(200)
      .json({ message: "Documents uploaded successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

const getPersonalDetails = async (req, res) => {
  try {
    const { candidateId } = req.params;
    const personalDetails = await Onboarding.find({ candidate: candidateId });
    res
      .status(200)
      .json({
        personalDetails,
        message: "Fetched the personal details of the candidate",
        success: true,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

module.exports = {
  getOnboardingDetails,
  updatePersonalDetails,
  uploadDocuments,
  getPersonalDetails,
};
