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

module.exports = { getHRDetails };
