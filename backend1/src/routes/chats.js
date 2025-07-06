// routes/chats.js
const express = require('express');
const router = express.Router();
const ChatRoom = require('../models/Chat');
require('dotenv').config(); // To read ADMIN_KEY from .env

router.post('/', async (req, res) => {
  try {
    const { name, adminKey } = req.body;

    // 1. Check adminKey
    if (adminKey !== process.env.ADMIN_KEY) {
      return res.status(403).json({ message: "Only admin can create groups." });
    }

    // 2. Validate room name
    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "Room name is required" });
    }

    // 3. Check for duplicates
    const existing = await ChatRoom.findOne({ name: name.trim() });
    if (existing) {
      return res.status(409).json({ message: "Group already exists", roomId: existing._id, room: existing });
    }

    // 4. Create room
    const room = new ChatRoom({ name: name.trim() });
    await room.save();

    res.status(201).json({
      message: "✅ Group created",
      roomId: room._id,
      room
    });

  } catch (error) {
    res.status(500).json({ message: "❌ Server error", error: error.message });
  }
});

// routes/chats.js
router.get('/name/:groupName', async (req, res) => {
  try {
    const room = await ChatRoom.findOne({ name: req.params.groupName });
    if (!room) return res.status(404).json({ message: "Group not found" });
    res.json({ roomId: room._id, room });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


// ✅ GET all groups
router.get('/', async (req, res) => {
  try {
    const rooms = await ChatRoom.find().sort({ createdAt: -1 });
    res.status(200).json({
      message: "All groups fetched",
      rooms
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
module.exports = router;
