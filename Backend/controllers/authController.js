const User = require('../models/userSchema'); // Assuming you have a User schema

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (user) {
      res.json({ role: user.role });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

const getCandidates = async (req, res) => {
  try {
    const candidates = await User.find({ role: 'candidate' })
      .populate('assignedHR', 'username') // Populate the assignedHR field with username
      .select('username assignedHR rounds'); // Select the fields you want to retrieve

    res.json(candidates);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

const getHRs = async (req, res) => {
  try {
    const hrs = await User.find({ role: 'hr' }).select('username'); // Fetch HR users with username

    res.json(hrs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

module.exports = {
  login, getCandidates, getHRs
};
