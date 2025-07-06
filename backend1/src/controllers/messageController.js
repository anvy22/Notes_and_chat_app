const messageService = require('../services/messageService');

exports.sendMessage = async (req, res) => {
  try {
    const { roomId, sender, content } = req.body;
    const newMessage = await messageService.createMessage({ roomId, sender, content });
    res.status(201).json({ message: 'Message sent successfully', data: newMessage });
  } catch (err) {
    res.status(500).json({ message: 'Failed to send message', error: err.message });
  }
};

exports.getMessagesByRoom = async (req, res) => {
  try {
    const roomId = req.params.roomId;
    const messages = await messageService.getMessagesByRoom(roomId);
    res.status(200).json({ message: 'Messages fetched', messages });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching messages', error: err.message });
  }
};
