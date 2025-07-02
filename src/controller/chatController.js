const ChatRoom = require('models/ChatRoom');
exports.getRooms = async (req, res) => {
  const rooms = await ChatRoom.find();
  res.json(rooms);
};
exports.createRoom = async (req, res) => {
  const { name } = req.body;
  const room = new ChatRoom({ name });
  await room.save();
  res.status(201).json(room);
};
