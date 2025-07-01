import React from 'react';
import ChatList from '../components/chat/ChatList';
import ChatWindow from '../components/chat/ChatWindow';

const ChatsPage = () => {
  return (
    <div className="flex h-full">
      <ChatList type="direct" />
      <ChatWindow />
    </div>
  );
};

export default ChatsPage;