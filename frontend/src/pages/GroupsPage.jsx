import React from 'react';
import ChatList from '../components/chat/ChatList';
import ChatWindow from '../components/chat/ChatWindow';

const GroupsPage = () => {
  return (
    <div className="flex h-full">
      <ChatList type="group" />
      <ChatWindow />
    </div>
  );
};

export default GroupsPage;