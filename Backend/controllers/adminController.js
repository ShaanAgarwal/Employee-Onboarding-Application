const User = require('../models/userSchema');
const { sendEmail } = require('../utils/emailUtils');
const rejectedCandidates = require("../models/rejectedCandidateSchema.js");

const getAdminDetails = async (req, res) => {
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

const getRejectedCandidates = async (req,res) => {
    try {
        const rejected = await rejectedCandidates.find();
        res.status(200).json({rejected, success: true});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "An error has occurred.", success: false, error});
    };
};

const getCandidates = async (req, res) => {
    try {
        const candidates = await User.find({ role: 'candidate' })
            .populate('assignedHR', 'name')
            .select('name assignedHR rounds photo');
        res.json(candidates);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    };
};

const getHRs = async (req, res) => {
    try {
        const hrs = await User.find({ role: 'hr' }).select('name');
        res.json(hrs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    };
};

const assignHr = async (req, res) => {
    const { userId } = req.params;
    const { hrId } = req.body;
    try {
        const user = await User.findByIdAndUpdate(userId, { assignedHR: hrId });
        const assignedHrUser = await User.findById(hrId);
        if (!assignedHrUser) {
            return res.status(404).json({ message: 'Assigned HR not found' });
        }
        await sendEmail(
            user.email,
            'HR Assignment',
            `Dear ${user.name}, Your HR has been assigned. Your HR's name is ${assignedHrUser.name}.`
        );
        res.json({ message: 'HR assigned successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    };
};

const updateRounds = async (req, res) => {
    const { userId } = req.params;
    const { rounds } = req.body;
    try {
        const user = await User.findById(userId);
        user.rounds = rounds;
        user.interviewRounds = Array.from({ length: rounds }, () => ({ name: 'Not Defined' }));
        await user.save();
        await sendEmail(
            user.email,
            'Interview Rounds Update',
            `Dear ${user.name}, The number of interview rounds in the selection process has been decided. It is ${rounds}.`
        );
        res.json({ message: 'Interview rounds updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    };
};

const getAllHRs = async (req, res) => {
    try {
        const hrs = await User.find({ role: 'hr' })
        res.json(hrs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    };
};

const getOngoingCandidates = async (req, res) => {
    try {
        const candidates = await User.find(
            {
                role: 'candidate',
                interviewClear: false
            },
            {
                name: 1,
                email: 1,
                photo: 1,
                _id: 0
            }
        );
        res.status(200).json({ candidates, message: "Successful in retrieving ongoing candidates.", success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error, message: "Internal Server Error", success: false });
    }
};


module.exports = { getAdminDetails, getCandidates, getHRs, assignHr, updateRounds, getAllHRs, getOngoingCandidates, getRejectedCandidates }