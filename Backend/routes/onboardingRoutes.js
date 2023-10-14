const express = require('express');
const router = express.Router();
const onboardingController = require("../controllers/onboardingController");

router.get('/check-details', onboardingController.getOnboardingDetails);
router.put('/personal-details-fill', onboardingController.updatePersonalDetails);

module.exports = router;