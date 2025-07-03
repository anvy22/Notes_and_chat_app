import React from 'react';
import ChatList from '../components/chat/ChatList';
import ChatWindow from '../components/chat/ChatWindow';

const GroupsPage = () => {
  return (
    <div className="flex flex-col lg:flex-row h-screen overflow-hidden">
      {/* Sidebar Chat List */}
      <div className="w-full lg:w-80 flex-shrink-0">
        <ChatList type="group" />
      </div>

      {/* Main Chat Window */}
      <div className="flex-1 overflow-y-auto">
        <ChatWindow />
      </div>
    </div>
  );
};

export default GroupsPage;
