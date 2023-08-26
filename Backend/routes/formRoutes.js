const express = require('express');
const multer = require('multer');
const router = express.Router();
const formController = require('../controllers/formController');

// Configure multer for file uploads
const storage = multer.memoryStorage(); // Store file as buffer in memory
const upload = multer({ storage });

// Handle file upload and form submission
router.post('/submit', upload.single('resume'), formController.uploadFile, formController.submitForm);

module.exports = router;
