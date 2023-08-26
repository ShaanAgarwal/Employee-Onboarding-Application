const express = require('express');
const multer = require('multer');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const formController = require('../controllers/formController');

// Configure multer for file uploads
const storage = multer.memoryStorage(); // Store file as buffer in memory
const upload = multer({ storage });

// Handle file upload and form submission
router.post('/submit', upload.single('resume'), formController.uploadFile, formController.submitForm);

router.get('/getCandidates', formController.getCandidates);

// Handle candidate acceptance
router.post('/accept/:candidateId', formController.acceptCandidate);

// Handle candidate rejection
router.post('/reject/:candidateId', formController.rejectCandidate);

// Download candidate resume
router.get('/download/:candidateId/:resumePath', formController.downloadResume);


module.exports = router;
