const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/admin-details', adminController.getAdminDetails);
router.get('/getCandidates', adminController.getCandidates);
router.get('/getHRs', adminController.getHRs);
router.post('/assign-hr/:userId', adminController.assignHr);
router.post('/update-rounds/:userId', adminController.updateRounds);

module.exports = router;