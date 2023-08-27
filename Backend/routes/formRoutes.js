const express = require('express');
const multer = require('multer');
const router = express.Router();
const formController = require('../controllers/formController');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/submit', upload.single('resume'), formController.uploadFile, formController.submitForm);
router.get('/getCandidates', formController.getCandidates);
router.post('/accept/:candidateId', formController.acceptCandidate);
router.post('/reject/:candidateId', formController.rejectCandidate);
router.get('/download/:candidateId/:resumePath', formController.downloadResume);

module.exports = router;