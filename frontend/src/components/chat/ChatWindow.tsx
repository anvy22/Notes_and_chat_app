import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Smile, MoreVertical, FileText } from 'lucide-react';
import { useChatStore } from '../../store/useChatStore';
import { useNotesStore } from '../../store/useNotesStore';
import { useThemeStore } from '../../store/useThemeStore';
import { useUser } from '@clerk/clerk-react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

const ChatWindow: React.FC = () => {
  const { activeChat, messages, addMessage } = useChatStore();
  const { createNoteFromChat } = useNotesStore();
  const { isDark } = useThemeStore();
  const { user } = useUser();
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isCreatingNote, setIsCreatingNote] = useState(false);

  const chatMessages = activeChat ? messages[activeChat.id] || [] : [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeChat || !user) return;

    const message = {
      id: crypto.randomUUID(),
      content: newMessage,
      senderId: user.id,
      senderName: user.fullName || user.emailAddresses[0]?.emailAddress || 'You',
      timestamp: new Date(),
      chatId: activeChat.id,
      type: 'text' as const,
    };

    addMessage(message);
    setNewMessage('');
  };

  const handleCreateNoteFromChat = async () => {
    if (!activeChat || chatMessages.length === 0) return;

    setIsCreatingNote(true);
    try {
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const chatContent = chatMessages
        .map(msg => `${msg.senderName}: ${msg.content}`)
        .join('\n\n');
      
      const summary = `Chat Summary - ${format(new Date(), 'MMM dd, yyyy')}

Key Discussion Points:
• ${chatMessages.length} messages exchanged
• Main topic: General conversation
• Participants: ${Array.from(new Set(chatMessages.map(m => m.senderName))).join(', ')}

Full Conversation:
${chatContent}`;

      createNoteFromChat(activeChat.id, activeChat.name, summary);
      toast.success('Note created from chat!');
    } catch (error) {
      toast.error('Failed to create note');
    } finally {
      setIsCreatingNote(false);
    }
  };

  if (!activeChat) {
    return (
      <div className={`flex-1 flex items-center justify-center ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Send className="w-12 h-12 text-white" />
          </div>
          <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Select a conversation
          </h3>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Choose a chat from the sidebar to start messaging
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex-1 flex flex-col ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
      {/* Chat Header */}
      <div className={`p-4 border-b ${isDark ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'} flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            activeChat.type === 'group' 
              ? 'bg-gradient-to-br from-green-400 to-emerald-600' 
              : 'bg-gradient-to-br from-purple-400 to-pink-600'
          }`}>
            <span className="text-white font-semibold">
              {activeChat.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {activeChat.name}
            </h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {activeChat.type === 'group' 
                ? `${activeChat.participants.length} members`
                : activeChat.participants[0]?.isOnline ? 'Online' : 'Offline'
              }
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={handleCreateNoteFromChat}
            disabled={isCreatingNote || chatMessages.length === 0}
            className={`p-2 rounded-lg transition-all duration-200 ${
              isCreatingNote
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-500 to-blue-600 hover:shadow-lg'
            } text-white`}
            title="Create note from chat"
          >
            <FileText className="w-5 h-5" />
          </button>
          <button className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}>
            <MoreVertical className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatMessages.map((message) => {
          const isOwn = message.senderId === user?.id;
          return (
            <div key={message.id} className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                isOwn
                  ? 'bg-gradient-to-r from-purple-500 to-blue-600 text-white'
                  : isDark ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'
              }`}>
                {!isOwn && activeChat.type === 'group' && (
                  <p className={`text-xs font-semibold mb-1 ${isOwn ? 'text-purple-100' : 'text-purple-600'}`}>
                    {message.senderName}
                  </p>
                )}
                <p className="text-sm">{message.content}</p>
                <p className={`text-xs mt-1 ${
                  isOwn ? 'text-purple-100' : isDark ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {format(message.timestamp, 'HH:mm')}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className={`p-4 border-t ${isDark ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'}`}>
        <div className="flex items-center gap-2">
          <button className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}>
            <Paperclip className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
          </button>
          
          <div className="flex-1 relative">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type a message..."
              className={`w-full px-4 py-2 rounded-lg border ${
                isDark 
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
                  : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'
              } focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200`}
            />
          </div>
          
          <button className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}>
            <Smile className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
          </button>
          
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className={`p-2 rounded-lg transition-all duration-200 ${
              newMessage.trim()
                ? 'bg-gradient-to-r from-purple-500 to-blue-600 text-white hover:shadow-lg'
                : isDark ? 'bg-gray-700 text-gray-500' : 'bg-gray-200 text-gray-400'
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;