const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController');
const multer = require("multer");
const upload = multer();
const authMiddleware = require("../middleware/authMiddleware.js");

router.post('/submit', upload.any(), formController.submitForm);
router.get('/getCandidates', authMiddleware, formController.getCandidates);
router.post('/accept/:candidateId', formController.acceptCandidate);
router.post('/reject/:candidateId', formController.rejectCandidate);

module.exports = router;