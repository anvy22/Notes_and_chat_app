import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: 100,
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    category: {
      type: String,
      enum: ['personal', 'work', 'ideas', 'chat-generated'],
      default: 'personal',
    },
    tags: {
      type: [String],
      default: [],
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Note must belong to a user'],
    },
    fromChat: {
      chatId: { type: String },
      chatName: { type: String },
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt fields automatically
  }
);

export default mongoose.model('Note', NoteSchema);
