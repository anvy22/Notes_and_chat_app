const ChatRoom = require('models/ChatRoom');
exports.getOrCreateRoom = async (name) => {
  let room = await ChatRoom.findOne({ name });
  if (!room) room = await new ChatRoom({ name }).save();
  return room;
};
