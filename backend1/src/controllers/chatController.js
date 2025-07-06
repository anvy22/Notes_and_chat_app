const Chat = require('Chat');

exports.getAllChatRooms = async (req, res) => {
  try {
    const chatRooms = await Chat.find();
    res.status(200).json({ message: 'All chat rooms fetched successfully', chatRooms });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching chat rooms', error });
  }
};

exports.createChatRoom = async (req, res) => {
  try {
    const { name } = req.body;
    const chatRoom = new Chat({ name });
    const savedRoom = await chatRoom.save();
    res.status(201).json({ message: 'Chat room created successfully', chatRoom: savedRoom });
  } catch (error) {
    res.status(500).json({ message: 'Error creating chat room', error });
  }
};
