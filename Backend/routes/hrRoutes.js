const express = require('express');
const router = express.Router();
const hrController = require('../controllers/hrController');
const authMiddleware = require('../middleware/authMiddleware.js');

router.get('/hr-details', authMiddleware, hrController.getHRDetails);
router.get('/:hrEmail/candidates', authMiddleware, hrController.getCandidates);
router.get('/candidate/:candidateId', authMiddleware, hrController.getCandidateDetails);
router.put('/round/:roundId', authMiddleware, hrController.updateRoundDetails);
router.put('/round/:roundId/accept', hrController.acceptCandidate);
router.put('/round/:roundId/reject', hrController.rejectCandidate);
router.post('/send-offer-letter', hrController.sendOfferLetter);

module.exports = router;