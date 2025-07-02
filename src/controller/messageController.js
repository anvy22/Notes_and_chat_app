const Message = require('models/Message');
exports.getMessages = async (req, res) => {
  const { roomId } = req.params;
  const msgs = await Message.find({ room: roomId }).sort('createdAt');
  res.json(msgs);
};
exports.postMessage = async (req, res) => {
  const msg = new Message(req.body);
  await msg.save();
  res.status(201).json(msg);
};
