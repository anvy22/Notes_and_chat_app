import React, { useEffect } from 'react';
import { Search, Plus, MessageCircle } from 'lucide-react';
import { useChatStore } from '../../store/useChatStore';
import { useThemeStore } from '../../store/useThemeStore';
import { useAppStore } from '../../store/useAppStore';
import { formatDistance } from 'date-fns';
import CreateChatModal from './CreateChatModal';

const ChatList = ({ type }) => {
  const { chats, setActiveChat, activeChat, addMockData, setShowCreateModal } = useChatStore();
  const { isDark } = useThemeStore();
  const { isMobile, closeSidebar } = useAppStore();

  useEffect(() => {
    if (chats.length === 0) {
      addMockData();
    }
  }, [chats.length, addMockData]);

  const filteredChats = chats.filter(chat => chat.type === type);

  const handleChatSelect = (chat) => {
    setActiveChat(chat);
    if (isMobile) {
      closeSidebar();
    }
  };

  const handleCreateChat = () => {
    setShowCreateModal(true, type);
  };

  return (
    <>
      <div className={`w-full lg:w-80 ${isDark ? 'bg-gray-900' : 'bg-white'} border-r ${isDark ? 'border-gray-800' : 'border-gray-200'} flex flex-col`} style={{ height: '100vh' }}>
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {type === 'direct' ? 'Direct Messages' : 'Group Chats'}
            </h2>
            <button 
              onClick={handleCreateChat}
              className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-600 text-white hover:shadow-lg transition-all duration-200"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            <input
              type="text"
              placeholder="Search conversations..."
              className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                isDark 
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
                  : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'
              } focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200`}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredChats.length === 0 ? (
            <div className="p-4 text-center">
              <MessageCircle className={`w-12 h-12 mx-auto mb-2 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                No {type === 'direct' ? 'direct messages' : 'group chats'} yet
              </p>
              <button 
                onClick={handleCreateChat}
                className="mt-2 text-purple-600 hover:text-purple-700 text-sm font-medium"
              >
                Create your first {type === 'direct' ? 'chat' : 'group'}
              </button>
            </div>
          ) : (
            filteredChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => handleChatSelect(chat)}
                className={`p-4 border-b cursor-pointer transition-all duration-200 ${
                  activeChat?.id === chat.id
                    ? 'bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-200'
                    : `${isDark ? 'border-gray-700 hover:bg-gray-800/60' : 'border-gray-100 hover:bg-gray-50'}`
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      chat.type === 'group' 
                        ? 'bg-gradient-to-br from-green-400 to-emerald-600' 
                        : 'bg-gradient-to-br from-purple-400 to-pink-600'
                    }`}>
                      {chat.type === 'group' ? (
                        <MessageCircle className="w-6 h-6 text-white" />
                      ) : (
                        <span className="text-white font-semibold">
                          {chat.name.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    {chat.type === 'direct' && chat.participants[0]?.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className={`font-semibold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {chat.name}
                      </h3>
                      {chat.lastActivity && (
                        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {formatDistance(chat.lastActivity, new Date(), { addSuffix: true })}
                        </span>
                      )}
                    </div>
                    
                    {chat.lastMessage && (
                      <p className={`text-sm truncate mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {chat.lastMessage.content}
                      </p>
                    )}
                    
                    {chat.unreadCount > 0 && (
                      <div className="flex justify-end mt-2">
                        <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
                          {chat.unreadCount}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      
      <CreateChatModal />
    </>
  );
};

export default ChatList;