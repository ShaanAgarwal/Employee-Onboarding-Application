const User = require('../models/userSchema');

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

const getCandidates = async (req, res) => {
    try {
        const candidates = await User.find({ role: 'candidate' })
            .populate('assignedHR', 'name')
            .select('name assignedHR rounds');
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
        res.json({ message: 'Interview rounds updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    };
};

module.exports = { getAdminDetails, getCandidates, getHRs, assignHr, updateRounds }