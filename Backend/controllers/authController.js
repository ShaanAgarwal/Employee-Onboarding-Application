const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema'); // Assuming you have a User schema

// Controller function to handle user login
const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, 'sjdkfhajskdfhaksjdfh', { expiresIn: '1h' });
    return res.json({ token, userId: user._id, username: user.username, role: user.role });
  } catch (error) {
    return res.status(500).json({ message: 'An error occurred', error: error.message });
  }
}

module.exports = {
  login
};
