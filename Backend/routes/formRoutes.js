const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController');
const multer = require("multer");
const upload = multer();

router.post('/submit', upload.any(), formController.submitForm);
router.get('/getCandidates', formController.getCandidates);
router.post('/accept/:candidateId', formController.acceptCandidate);
router.post('/reject/:candidateId', formController.rejectCandidate);

module.exports = router;