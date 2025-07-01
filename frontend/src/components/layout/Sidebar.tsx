import React from 'react';
import { NavLink } from 'react-router-dom';
import { MessageCircle, FileText, Settings, Users } from 'lucide-react';
import { useThemeStore } from '../../store/useThemeStore';

const Sidebar: React.FC = () => {
  const { isDark } = useThemeStore();

  const navItems = [
    { to: '/chats', icon: MessageCircle, label: 'Chats', count: 7 },
    { to: '/groups', icon: Users, label: 'Groups', count: 3 },
    { to: '/notes', icon: FileText, label: 'Notes' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className={`w-20 lg:w-64 ${isDark ? 'bg-gray-900' : 'bg-white'} border-r ${isDark ? 'border-gray-800' : 'border-gray-200'} flex flex-col transition-all duration-300`}>
      <div className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <h1 className={`font-bold text-xl ${isDark ? 'text-white' : 'text-gray-900'} hidden lg:block`}>
            ChatNotes
          </h1>
        </div>
      </div>

      <nav className="flex-1 px-4 py-2">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
                    isActive
                      ? `bg-gradient-to-r from-purple-500 to-blue-600 text-white shadow-lg`
                      : `${isDark ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`
                  }`
                }
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium hidden lg:block">{item.label}</span>
                {item.count && (
                  <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1 hidden lg:block">
                    {item.count}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;