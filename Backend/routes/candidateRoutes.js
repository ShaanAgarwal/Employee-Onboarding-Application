const express = require('express');
const router = express.Router();
const candidateController = require('../controllers/candidateController');
const authMiddleware = require("../middleware/authMiddleware.js");

router.get('/check-password-change/:email', authMiddleware, candidateController.checkForFirstLogin);
router.post('/first-login-change-password', authMiddleware, candidateController.changePasswordOnFirstLogin);
router.get('/candidate-details', authMiddleware, candidateController.getCandidateDetails);
router.put('/mark-round-attempted/:roundId', candidateController.markRoundAttempted);

module.exports = router;