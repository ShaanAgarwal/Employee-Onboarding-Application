const express = require('express');
const router = express.Router();
const hrController = require('../controllers/hrController');

router.get('/hr-details', hrController.getHRDetails);

module.exports = router;