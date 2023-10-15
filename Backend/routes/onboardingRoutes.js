const express = require('express');
const router = express.Router();
const onboardingController = require("../controllers/onboardingController");
const multer = require("multer");
const upload = multer();
const authMiddleware = require('../middleware/authMiddleware.js');

router.get('/check-details', authMiddleware, onboardingController.getOnboardingDetails);
router.put('/personal-details-fill', authMiddleware, onboardingController.updatePersonalDetails);
router.put('/upload-documents', authMiddleware, upload.any('files'), onboardingController.uploadDocuments);
router.get('/get-personal-details/:candidateId', authMiddleware, onboardingController.getPersonalDetails);

module.exports = router;