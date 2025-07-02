import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }, // Rich text or HTML
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  collaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  tags: [String],
  category: String,
  isPublic: { type: Boolean, default: false },
  sourceChat: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat' },
  aiGenerated: { type: Boolean, default: false },
  metadata: {
    wordCount: Number,
    readTime: Number,
    lastModifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  }
}, { timestamps: true });

export default mongoose.model('Note', NoteSchema);
