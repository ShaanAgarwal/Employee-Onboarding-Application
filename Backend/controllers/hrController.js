const User = require("../models/userSchema");

const getHRDetails = async (req, res) => {
    try {
        const email = req.query.email; // Access the email query parameter
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "An error occurred while fetching user details." });
    }
};

const getCandidates = async (req, res) => {
    try {
        const hrEmail = req.params.hrEmail;
        const hr = await User.findOne({ email: hrEmail });
        if (!hr) {
            return res.status(404).json({ message: "HR not found" });
        };
        const candidates = await User.find({ assignedHR: hr._id });
        res.json(candidates);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    };
};

const getCandidateDetails = async (req, res) => {
    try {
        const candidateId = req.params.candidateId;
        const candidate = await User.findById(candidateId);
        if (!candidate) {
            return res.status(404).json({ message: "Candidate not found" });
        };
        res.json(candidate);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    };
};

module.exports = { getHRDetails, getCandidates, getCandidateDetails };