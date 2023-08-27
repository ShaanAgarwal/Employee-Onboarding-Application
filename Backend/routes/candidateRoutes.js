const express = require('express');
const router = express.Router();
const candidateController = require('../controllers/candidateController');

router.get('/check-password-change/:email', candidateController.checkForFirstLogin);
router.post('/first-login-change-password', candidateController.changePasswordOnFirstLogin);
router.get('/candidate-details', candidateController.getCandidateDetails);

module.exports = router;