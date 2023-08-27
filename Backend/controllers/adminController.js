const User = require('../models/userSchema');

const getCandidates = async (req, res) => {
    try {
        const candidates = await User.find({ role: 'candidate' })
            .populate('assignedHR', 'username')
            .select('username assignedHR rounds');
        res.json(candidates);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
};

const getHRs = async (req, res) => {
    try {
        const hrs = await User.find({ role: 'hr' }).select('username');
        res.json(hrs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
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
    }
};

const updateRounds = async (req, res) => {
    const { userId } = req.params;
    const { rounds } = req.body;
    try {
        const user = await User.findByIdAndUpdate(userId, { rounds });
        res.json({ message: 'Interview rounds updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
};

module.exports = { getCandidates, getHRs, assignHr, updateRounds }