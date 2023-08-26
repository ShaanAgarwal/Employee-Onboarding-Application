// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/userSchema');

router.post('/assign-hr/:userId', async (req, res) => {
  const { userId } = req.params;
  const { hrId } = req.body;

  try {
    const user = await User.findByIdAndUpdate(userId, { assignedHR: hrId });
    res.json({ message: 'HR assigned successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// routes/adminRoutes.js
router.post('/update-rounds/:userId', async (req, res) => {
    const { userId } = req.params;
    const { rounds } = req.body;
  
    try {
      const user = await User.findByIdAndUpdate(userId, { rounds });
      res.json({ message: 'Interview rounds updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  });
  

module.exports = router;
