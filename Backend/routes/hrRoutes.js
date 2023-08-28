const express = require('express');
const router = express.Router();
const hrController = require('../controllers/hrController');

router.get('/hr-details', hrController.getHRDetails);
router.get('/:hrEmail/candidates', hrController.getCandidates);
router.get('/candidate/:candidateId', hrController.getCandidateDetails);
router.put('/round/:roundId', hrController.updateRoundDetails);
router.put('/round/:roundId/accept', hrController.acceptCandidate);
router.put('/round/:roundId/reject', hrController.rejectCandidate);

module.exports = router;