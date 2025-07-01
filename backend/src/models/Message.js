import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  chatId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat', required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  messageType: { type: String, enum: ['text', 'file', 'note', 'system'], default: 'text' },
  replyTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
  reactions: [{
    emoji: String,
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  }],
  attachments: [{
    fileName: String,
    fileUrl: String,
    fileType: String,
    fileSize: Number
  }],
  isEdited: { type: Boolean, default: false },
  editHistory: [{
    content: String,
    editedAt: Date
  }],
  isDeleted: { type: Boolean, default: false },
  deletedAt: Date
}, { timestamps: true });

export default mongoose.model('Message', MessageSchema);
