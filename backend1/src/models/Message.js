const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: String,
      required: true
    },
    receiver: {
      type: String, // only for private messages
      default: null
    },
    roomId: {
      type: String, // now supports string like "room123"
      default: null // only for group messages
    },
    content: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['private', 'group'],
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Message', messageSchema);
