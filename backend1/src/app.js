const AMP = require('app-module-path');
const path = require('path');
const express = require('express');
const cors = require('cors');
const http = require('http');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
const morgan = require('morgan');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });


// Setup module paths
const baseDir = path.join(__dirname);
AMP.addPath(baseDir);
AMP.addPath(path.join(baseDir, 'controllers'));
AMP.addPath(path.join(baseDir, 'routes'));
AMP.addPath(path.join(baseDir, 'services'));
AMP.addPath(path.join(baseDir, 'models'));
AMP.addPath(path.join(baseDir, 'socket'));

// Env variables
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mychat';
const PORT = process.env.PORT || 3000;

// Create Express app and HTTP server
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send("🎯 Backend chat server running...");
});


// Routes (assumes existing chats.js & messages.js route files)
const chatHandlers = require('socket/chatHandlers');
const chatRoomsRouter = require('routes/chats');
const messagesRouter = require('routes/messages');

app.use('/api/rooms', chatRoomsRouter);
app.use('/api/messages', messagesRouter);

// WebSocket connection
io.on('connection', (socket) => {
  console.log('🟢 New socket:', socket.id);
  chatHandlers(io, socket);
});

// MongoDB connection
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('✅ MongoDB connected');
    server.listen(PORT, () => {
      console.log(`🚀 Server listening at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err);
  });
