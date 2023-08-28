const User = require("../models/userSchema");
const nodemailer = require("nodemailer");

const getHRDetails = async (req, res) => {
    try {
        const email = req.query.email;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        };
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "An error occurred while fetching user details." });
    };
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
        console.log(candidate);
        res.json(candidate);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    };
};

const updateRoundDetails = async (req, res) => {
    try {
        const roundId = req.params.roundId;
        const updatedName = req.body.name;
        const round = await User.findOneAndUpdate(
            { "interviewRounds._id": roundId },
            { $set: { "interviewRounds.$.name": updatedName } },
            { new: true }
        );
        if (!round) {
            return res.status(404).json({ message: "Round not found" });
        };
        res.json(round);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    };
};

const acceptCandidate = async (req, res) => {
    try {
        const roundId = req.params.roundId;
        await User.updateOne(
            { "interviewRounds._id": roundId },
            {
                $set: { "interviewRounds.$.status": "approved" },
                $inc: { currentRound: 1 }
            }
        );
        res.json({ message: "Round accepted" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    };
};


const rejectCandidate = async (req, res) => {
    try {
        const roundId = req.params.roundId;
        const candidate = await User.findOne({ "interviewRounds._id": roundId });
        if (!candidate) {
            return res.status(404).json({ message: "Candidate not found" });
        }
        const round = candidate.interviewRounds.find(round => round._id.toString() === roundId);
        if (!round) {
            return res.status(404).json({ message: "Round not found" });
        }
        const candidateEmail = candidate.email;
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: "shaanagarwal1942003@gmail.com",
                pass: "ddkwxstrydyfitey",
            },
        });
        const mailOptions = {
            from: "shaanagarwal1942003@gmail.com",
            to: candidateEmail,
            subject: "Interview Round Rejected",
            text: "Unfortunately, your interview round has been rejected.",
        };
        await transporter.sendMail(mailOptions);
        console.log("rejected");
        res.json({ message: "Round rejected" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { getHRDetails, getCandidates, getCandidateDetails, updateRoundDetails, acceptCandidate, rejectCandidate };