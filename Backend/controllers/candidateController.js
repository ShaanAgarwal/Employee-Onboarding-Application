const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/userSchema');

const checkForFirstLogin = async (req, res) => {
    const email = req.params.email;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        };
        return res.json({ requiresPasswordChange: user.requiresPasswordChange });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    };
};

const changePasswordOnFirstLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        };
        if (user.requiresPasswordChange) {
            const hashedPassword = await bcrypt.hash(password, 10);
            await User.findByIdAndUpdate(user._id, {
                password: hashedPassword,
                requiresPasswordChange: false
            });
            return res.json({ message: 'Password changed successfully' });
        } else {
            return res.status(400).json({ message: 'Password has already been changed' });
        };
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    };
};

module.exports = { checkForFirstLogin, changePasswordOnFirstLogin };