const User = require('../models/userSchema');
const nodemailer = require('nodemailer');

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
        const assignedHrUser = await User.findById(hrId);
        if (!assignedHrUser) {
            return res.status(404).json({ message: 'Assigned HR not found' });
        }
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'shaanagarwal1942003@gmail.com',
                pass: 'ddkwxstrydyfitey',
            },
        });
        const mailOptions = {
            from: 'shaanagarwal1942003@gmail.com',
            to: user.email,
            subject: 'HR Assignment',
            text: `Dear ${user.name}, Your HR has been assigned. Your HR's name is ${assignedHrUser.name}.`,
        };
        await transporter.sendMail(mailOptions);
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
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'shaanagarwal1942003@gmail.com',
                pass: 'ddkwxstrydyfitey',
            },
        });
        const mailOptions = {
            from: 'shaanagarwal1942003@gmail.com',
            to: user.email,
            subject: 'Interview Rounds Update',
            text: `Dear ${user.name}, The number of interview rounds in the selection process has been decided. It is ${rounds}.`,
        };
        await transporter.sendMail(mailOptions);
        res.json({ message: 'Interview rounds updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    };
};


module.exports = { getAdminDetails, getCandidates, getHRs, assignHr, updateRounds }