import React, { useState } from 'react';
import { X, Users, MessageCircle } from 'lucide-react';
import { useChatStore } from '../../store/useChatStore';
import { useThemeStore } from '../../store/useThemeStore';
import { useUser } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

const CreateChatModal = () => {
  const { showCreateModal, createModalType, setShowCreateModal, createChat, users } = useChatStore();
  const { isDark } = useThemeStore();
  const { user } = useUser();
  const [chatName, setChatName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);

  if (!showCreateModal) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (createModalType === 'direct' && selectedUsers.length !== 1) {
      toast.error('Please select exactly one user for direct chat');
      return;
    }
    
    if (createModalType === 'group' && (!chatName.trim() || selectedUsers.length < 2)) {
      toast.error('Please enter a group name and select at least 2 users');
      return;
    }

    const newChat = {
      name: createModalType === 'direct' ? selectedUsers[0].name : chatName,
      type: createModalType,
      participants: selectedUsers,
    };

    createChat(newChat);
    setChatName('');
    setSelectedUsers([]);
    toast.success(`${createModalType === 'direct' ? 'Chat' : 'Group'} created successfully!`);
  };

  const toggleUserSelection = (selectedUser) => {
    setSelectedUsers(prev => {
      const isSelected = prev.find(u => u.id === selectedUser.id);
      if (isSelected) {
        return prev.filter(u => u.id !== selectedUser.id);
      } else {
        return createModalType === 'direct' ? [selectedUser] : [...prev, selectedUser];
      }
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`${isDark ? 'bg-gray-900' : 'bg-white'} rounded-xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            {createModalType === 'group' ? (
              <Users className="w-6 h-6 text-purple-600" />
            ) : (
              <MessageCircle className="w-6 h-6 text-purple-600" />
            )}
            <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Create {createModalType === 'direct' ? 'Direct Chat' : 'Group Chat'}
            </h2>
          </div>
          <button
            onClick={() => setShowCreateModal(false)}
            className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} transition-colors`}
          >
            <X className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {createModalType === 'group' && (
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Group Name
              </label>
              <input
                type="text"
                value={chatName}
                onChange={(e) => setChatName(e.target.value)}
                placeholder="Enter group name..."
                className={`w-full px-3 py-2 rounded-lg border ${
                  isDark 
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
                    : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'
                } focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200`}
                required
              />
            </div>
          )}

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Select {createModalType === 'direct' ? 'User' : 'Users'} 
              {createModalType === 'direct' && ' (1 user)'}
              {createModalType === 'group' && ' (minimum 2 users)'}
            </label>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {users.filter(u => u.id !== user?.id).map((chatUser) => (
                <div
                  key={chatUser.id}
                  onClick={() => toggleUserSelection(chatUser)}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedUsers.find(u => u.id === chatUser.id)
                      ? 'bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200 border'
                      : isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {chatUser.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    {chatUser.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {chatUser.name}
                    </h3>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {chatUser.isOnline ? 'Online' : 'Offline'}
                    </p>
                  </div>
                  {selectedUsers.find(u => u.id === chatUser.id) && (
                    <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => setShowCreateModal(false)}
              className={`flex-1 px-4 py-2 rounded-lg border ${
                isDark 
                  ? 'border-gray-700 text-gray-300 hover:bg-gray-800' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              } transition-colors`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all duration-200"
            >
              Create {createModalType === 'direct' ? 'Chat' : 'Group'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateChatModal;