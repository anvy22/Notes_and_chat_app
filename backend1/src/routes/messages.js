const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// POST: Send message (private or group)
router.post('/', async (req, res) => {
  const { sender, receiver, roomId, content, type } = req.body;

  try {
    const newMessage = new Message({
      sender,
      receiver: type === 'private' ? receiver : null,
      roomId: type === 'group' ? roomId : null,
      content,
      type
    });

    const saved = await newMessage.save();
    res.status(201).json({
      message: 'Message sent successfully',
      data: saved
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to send message',
      error: error.message
    });
  }
});

// GET: Fetch private messages between two users
router.get('/private/:user1/:user2', async (req, res) => {
  const { user1, user2 } = req.params;

  try {
    const messages = await Message.find({
      type: 'private',
      $or: [
        { sender: user1, receiver: user2 },
        { sender: user2, receiver: user1 }
      ]
    }).sort({ createdAt: 1 });

    res.json({
      message: 'Private messages fetched',
      messages
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch private messages',
      error: error.message
    });
  }
});

// GET: Fetch all messages from a group
router.get('/group/:roomId', async (req, res) => {
  try {
    const messages = await Message.find({
      type: 'group',
      roomId: req.params.roomId
    }).sort({ createdAt: 1 });

    res.json({
      message: 'Group messages fetched',
      messages
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch group messages',
      error: error.message
    });
  }
});

module.exports = router;
