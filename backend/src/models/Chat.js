import mongoose from 'mongoose';

const ChatSchema = new mongoose.Schema({
  name: String,
  type: { type: String, enum: ['personal', 'group'], required: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  admins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  lastMessage: {
    content: String,
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    timestamp: Date
  },
  isActive: { type: Boolean, default: true },
  settings: {
    allowFileSharing: { type: Boolean, default: true },
    allowNoteGeneration: { type: Boolean, default: true },
    retentionDays: { type: Number, default: 30 }
  }
}, { timestamps: true });

export default mongoose.model('Chat', ChatSchema);
