const express = require('express');
const router = express.Router();
const onboardingController = require("../controllers/onboardingController");
const multer = require("multer");
const upload = multer();

router.get('/check-details', onboardingController.getOnboardingDetails);
router.put('/personal-details-fill', onboardingController.updatePersonalDetails);
router.put('/upload-documents', upload.any('files'), onboardingController.uploadDocuments);
router.get('/get-personal-details/:candidateId', onboardingController.getPersonalDetails);

module.exports = router;