const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.post('/:candidateId', chatController.saveChatMessage);
router.get('/:candidateId', chatController.getChatMessages);

module.exports = router;
