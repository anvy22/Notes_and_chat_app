const Message = require('../models/Message');

exports.createMessage = async ({ roomId, sender, content }) => {
  const newMessage = new Message({ roomId, sender, content });
  return await newMessage.save();
};

exports.getMessagesByRoom = async (roomId) => {
  return await Message.find({ roomId }).sort({ createdAt: 1 });
};
