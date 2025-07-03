import React from 'react';
import ChatList from '../components/chat/ChatList';
import ChatWindow from '../components/chat/ChatWindow';

const ChatsPage = () => {
  return (
    <div className="flex flex-col lg:flex-row h-screen overflow-hidden">
      {/* Sidebar Chat List */}
      <div className="w-full lg:w-80 flex-shrink-0">
        <ChatList type="direct" />
      </div>

      {/* Main Chat Window */}
      <div className="flex-1 overflow-y-auto">
        <ChatWindow />
      </div>
    </div>
  );
};

export default ChatsPage;
