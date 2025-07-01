import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { MessageCircle, FileText, Settings, Users, X, Menu } from 'lucide-react';
import { useThemeStore } from '../../store/useThemeStore';
import { useAppStore } from '../../store/useAppStore';

const Sidebar = () => {
  const { isDark } = useThemeStore();
  const { isSidebarOpen, isMobile, toggleSidebar, closeSidebar, setIsMobile } = useAppStore();

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) {
        useAppStore.getState().openSidebar();
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [setIsMobile]);

  const navItems = [
    { to: '/chats', icon: MessageCircle, label: 'Chats', count: 7 },
    { to: '/groups', icon: Users, label: 'Groups', count: 3 },
    { to: '/notes', icon: FileText, label: 'Notes' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className={`fixed top-4 left-4 z-50 p-2 rounded-lg ${
            isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
          } shadow-lg lg:hidden`}
        >
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      )}

      {/* Overlay for mobile */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`${
          isMobile ? 'fixed' : 'relative'
        } left-0 top-0 h-screen z-40 transition-transform duration-300 ease-in-out ${
          isSidebarOpen || !isMobile ? 'translate-x-0' : '-translate-x-full'
        } ${
          isMobile ? 'w-64' : 'w-20 lg:w-64'
        } ${isDark ? 'bg-gray-900' : 'bg-white'} border-r ${
          isDark ? 'border-gray-800' : 'border-gray-200'
        } flex flex-col`}
      >
        {/* Header Section */}
        <div className="p-4 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <h1
              className={`font-bold text-xl ${isDark ? 'text-white' : 'text-gray-900'} ${
                isMobile || !isMobile ? 'block' : 'hidden lg:block'
              }`}
            >
              ChatNotes
            </h1>
          </div>
        </div>

        {/* Navigation Section */}
        <nav className=" h-screen flex  overflow-y-auto">
          <ul className="flex-1 space-y-2 px-4 py-2">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  onClick={() => isMobile && closeSidebar()}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
                      isActive
                        ? `bg-gradient-to-r from-purple-500 to-blue-600 text-white shadow-lg`
                        : `${isDark ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`
                    }`
                  }
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  <span
                    className={`font-medium ${
                      isMobile || !isMobile ? 'block' : 'hidden lg:block'
                    }`}
                  >
                    {item.label}
                  </span>
                  {item.count && (
                    <span
                      className={`ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1 ${
                        isMobile || !isMobile ? 'block' : 'hidden lg:block'
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;