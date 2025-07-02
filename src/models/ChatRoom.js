const mongoose = require('mongoose');
module.exports = mongoose.model('ChatRoom', new mongoose.Schema({
  name: { type: String, required: true, unique: true }
}));
