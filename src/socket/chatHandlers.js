// src/socket/chatHandlers.js
module.exports = (io, socket) => {
  socket.on('chatMessage', msg => {
    io.emit('newMessage', msg);
  });
  socket.on('disconnect', () => {
    console.log('🔌 Socket disconnected:', socket.id);
  });
};
