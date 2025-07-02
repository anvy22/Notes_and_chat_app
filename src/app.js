const path = require('path');
const AMP = require('app-module-path');

// Add necessary folders to module resolution
AMP.addPath(path.join(__dirname, 'socket'));
AMP.addPath(path.join(__dirname, 'controller'));
AMP.addPath(path.join(__dirname, 'routes'));
AMP.addPath(path.join(__dirname, 'services'));
AMP.addPath(path.join(__dirname, 'models'));

// Load .env from src folder using absolute path
require('dotenv').config({
  path: require('path').resolve(__dirname, '.env'),
  debug: true
});


const express = require('express');
const cors = require('cors');
const http = require('http');
const mongoose = require('mongoose');
const { Server } = require('socket.io');

// Imported without needing relative paths
const chatHandlers = require('chatHandlers');
const chatRoomsRouter = require('chatRooms');
const messagesRouter = require('messages');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// API endpoints
app.use('/api/rooms', chatRoomsRouter);
app.use('/api/messages', messagesRouter);

// WebSocket handling
io.on('connection', socket => {
  console.log('🟢 Socket connected:', socket.id);
  chatHandlers(io, socket);
});

// Validate environment variables
console.log('Using MONGO_URI:', process.env.MONGO_URI);
console.log('Using PORT:', process.env.PORT);

if (!process.env.MONGO_URI) {
  console.error('❌ MONGO_URI is undefined! Check your src/.env file.');
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { autoIndex: true })
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err);
    process.exit(1);
  });

// Start server
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
