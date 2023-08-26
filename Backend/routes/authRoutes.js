const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.login);
router.get('/admin/getCandidates', authController.getCandidates);
router.get('/admin/getHRs', authController.getHRs);

module.exports = router;
