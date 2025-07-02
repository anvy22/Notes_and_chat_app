import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  firstName: String,
  lastName: String,
  avatar: String,
  isOnline: { type: Boolean, default: false },
  lastSeen: Date,
  preferences: {
    theme: { type: String, default: 'light' },
    notifications: { type: Boolean, default: true },
    language: { type: String, default: 'en' }
  }
}, { timestamps: true });

export default mongoose.model('User', UserSchema);
