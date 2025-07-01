import { create } from 'zustand';
import { Chat, Message, User } from '../types';

interface ChatStore {
  chats: Chat[];
  activeChat: Chat | null;
  messages: Record<string, Message[]>;
  users: User[];
  setActiveChat: (chat: Chat | null) => void;
  addMessage: (message: Message) => void;
  createChat: (chat: Chat) => void;
  addMockData: () => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  chats: [],
  activeChat: null,
  messages: {},
  users: [],
  
  setActiveChat: (chat) => set({ activeChat: chat }),
  
  addMessage: (message) => {
    const { messages, chats } = get();
    const chatMessages = messages[message.chatId] || [];
    
    set({
      messages: {
        ...messages,
        [message.chatId]: [...chatMessages, message],
      },
      chats: chats.map(chat => 
        chat.id === message.chatId 
          ? { ...chat, lastMessage: message, lastActivity: message.timestamp }
          : chat
      ),
    });
  },
  
  createChat: (chat) => {
    const { chats } = get();
    set({ chats: [...chats, chat] });
  },
  
  addMockData: () => {
    const mockUsers: User[] = [
      { id: '1', name: 'Alice Johnson', email: 'alice@example.com', isOnline: true },
      { id: '2', name: 'Bob Smith', email: 'bob@example.com', isOnline: false },
      { id: '3', name: 'Carol Davis', email: 'carol@example.com', isOnline: true },
      { id: '4', name: 'David Wilson', email: 'david@example.com', isOnline: true },
    ];
    
    const mockChats: Chat[] = [
      {
        id: '1',
        name: 'Alice Johnson',
        type: 'direct',
        participants: [mockUsers[0]],
        lastActivity: new Date(Date.now() - 1000 * 60 * 30),
        unreadCount: 2,
      },
      {
        id: '2',
        name: 'Project Team',
        type: 'group',
        participants: [mockUsers[1], mockUsers[2], mockUsers[3]],
        lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 2),
        unreadCount: 5,
      },
      {
        id: '3',
        name: 'Bob Smith',
        type: 'direct',
        participants: [mockUsers[1]],
        lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 24),
        unreadCount: 0,
      },
    ];
    
    const mockMessages: Record<string, Message[]> = {
      '1': [
        {
          id: '1',
          content: 'Hey! How are you doing?',
          senderId: '1',
          senderName: 'Alice Johnson',
          timestamp: new Date(Date.now() - 1000 * 60 * 45),
          chatId: '1',
          type: 'text',
        },
        {
          id: '2',
          content: 'I\'m working on the new project proposal. Could you review it when you have time?',
          senderId: '1',
          senderName: 'Alice Johnson',
          timestamp: new Date(Date.now() - 1000 * 60 * 30),
          chatId: '1',
          type: 'text',
        },
      ],
      '2': [
        {
          id: '3',
          content: 'Good morning everyone! Ready for the sprint planning?',
          senderId: '2',
          senderName: 'Bob Smith',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
          chatId: '2',
          type: 'text',
        },
        {
          id: '4',
          content: 'Yes! I\'ve prepared the user stories for this iteration.',
          senderId: '3',
          senderName: 'Carol Davis',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
          chatId: '2',
          type: 'text',
        },
      ],
    };
    
    set({ users: mockUsers, chats: mockChats, messages: mockMessages });
  },
}));