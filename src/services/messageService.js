const Message = require('models/Message');
exports.saveMessage = async ({ roomId, sender, text }) => {
  return await new Message({ room: roomId, sender, text }).save();
};
