const express = require('express');
const router = express.Router();
const ctrl = require('controller/chatController');
router.get('/', ctrl.getRooms);
router.post('/', ctrl.createRoom);
module.exports = router;
