const Message = require('../models/Message'); // ✅ Message model

const userMap = new Map(); // userId -> socketId

module.exports = (io, socket) => {

  // ✅ When user initializes connection
  socket.on("initUser", (userId) => {
    userMap.set(userId, socket.id);
    socket.join(`user:${userId}`);
    console.log(`✅ ${userId} is online and joined room user:${userId}`);
  });

  // ✅ Handle private message
  socket.on("privateMessage", async ({ senderId, receiverId, content }) => {
    console.log(`[Private] ${senderId} ➡ ${receiverId}: ${content}`);

    try {
      // ✅ Save to MongoDB
      await Message.create({
        sender: senderId,
        receiver: receiverId,
        content,
        type: 'private',
      });

      // ✅ Send to receiver and echo to sender
      io.to(`user:${receiverId}`).emit("privateMessage", { senderId, content });
      socket.emit("privateMessage", { senderId, content });

    } catch (err) {
      console.error("❌ Failed to save private message:", err.message);
    }
  });

  // ✅ Join a group
  socket.on("joinGroup", (roomId) => {
    socket.join(`group:${roomId}`);
    console.log(`📥 ${socket.id} joined group:${roomId}`);
  });

  // ✅ Handle group message
  socket.on("groupMessage", async ({ senderId, roomId, content }) => {
    console.log(`[Group ${roomId}] ${senderId}: ${content}`);

    try {
      // ✅ Save to MongoDB
      await Message.create({
        sender: senderId,
        roomId,
        content,
        type: 'group',
      });

      // ✅ Broadcast to group members
      io.to(`group:${roomId}`).emit("groupMessage", { senderId, content });

    } catch (err) {
      console.error("❌ Failed to save group message:", err.message);
    }
  });

  // ✅ Handle disconnect
  socket.on("disconnect", () => {
    for (let [uid, sid] of userMap.entries()) {
      if (sid === socket.id) {
        userMap.delete(uid);
        console.log(`❌ ${uid} disconnected`);
        break;
      }
    }
  });
};
