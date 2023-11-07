const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.post('/:candidateId', chatController.saveChatMessage);

module.exports = router;
