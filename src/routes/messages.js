const express = require('express');
const router = express.Router();
const ctrl = require('controller/messageController');
router.get('/:roomId', ctrl.getMessages);
router.post('/', ctrl.postMessage);
module.exports = router;
