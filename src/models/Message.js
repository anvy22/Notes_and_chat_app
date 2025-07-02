const mongoose = require('mongoose');
module.exports = mongoose.model('Message', new mongoose.Schema({
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'ChatRoom', required: true },
  sender: String,
  text: String,
  createdAt: { type: Date, default: Date.now }
}));
