import mongoose from 'mongoose';

const NotificationSettingsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  chatNotifications: { type: Boolean, default: true },
  noteNotifications: { type: Boolean, default: true },
  emailNotifications: { type: Boolean, default: true },
  mutedChats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chat' }]
}, { timestamps: true });

export default mongoose.model('NotificationSettings', NotificationSettingsSchema);
