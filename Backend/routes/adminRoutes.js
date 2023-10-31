const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require("../middleware/authMiddleware.js");

router.get('/admin-details', adminController.getAdminDetails);
router.get('/getCandidates', authMiddleware, adminController.getCandidates);
router.get('/getHRs', authMiddleware, adminController.getHRs);
router.post('/assign-hr/:userId', authMiddleware, adminController.assignHr);
router.post('/update-rounds/:userId', authMiddleware, adminController.updateRounds);
router.get('/getAllHRs', authMiddleware, adminController.getAllHRs);
router.get('/get-ongoing-candidates', authMiddleware, adminController.getOngoingCandidates);
router.get("/get-rejected-candidates", adminController.getRejectedCandidates);

module.exports = router;