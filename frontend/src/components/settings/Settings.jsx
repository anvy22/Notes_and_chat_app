import React from 'react';
import { Moon, Sun, LogOut, User, Bell, Shield, Palette } from 'lucide-react';
import { useThemeStore } from '../../store/useThemeStore';
import { useClerk, useUser } from '@clerk/clerk-react';

const Settings = () => {
  const { isDark, toggleTheme } = useThemeStore();
  const { signOut } = useClerk();
  const { user } = useUser();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className={`flex flex-col ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`} style={{ height: '100vh' }}>
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-2xl pl-9">
          <h1 className={`text-3xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Settings
          </h1>

          {/* Profile Section */}
          <div className={`${isDark ? 'bg-gray-900' : 'bg-white'} rounded-xl p-6 mb-6 shadow-sm`}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {user?.fullName || 'User'}
                </h2>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {user?.emailAddresses?.[0]?.emailAddress}
                </p>
              </div>
            </div>
            <button className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all duration-200">
              Edit Profile
            </button>
          </div>

          {/* Appearance Section */}
          <div className={`${isDark ? 'bg-gray-900' : 'bg-white'} rounded-xl p-6 mb-6 shadow-sm`}>
            <div className="flex items-center gap-3 mb-4">
              <Palette className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Appearance
              </h3>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Dark Mode</p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Toggle between light and dark theme
                </p>
              </div>

              <button
                onClick={toggleTheme}
                className={`relative w-12 h-6 rounded-full transition-all duration-200 ${isDark ? 'bg-purple-600' : 'bg-gray-300'}`}
                aria-label="Toggle dark mode"
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full flex items-center justify-center transition-all duration-200 ${
                    isDark ? 'left-7' : 'left-1'
                  }`}
                >
                  {isDark ? (
                    <Moon className="w-3 h-3 text-purple-600" />
                  ) : (
                    <Sun className="w-3 h-3 text-yellow-500" />
                  )}
                </div>
              </button>
            </div>
          </div>

          {/* Notifications Section */}
          <div className={`${isDark ? 'bg-gray-900' : 'bg-white'} rounded-xl p-6 mb-6 shadow-sm`}>
            <div className="flex items-center gap-3 mb-4">
              <Bell className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Notifications
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Message Notifications
                  </p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Get notified when you receive new messages
                  </p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 accent-purple-600" />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Note Reminders
                  </p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Get reminded about important notes
                  </p>
                </div>
                <input type="checkbox" className="w-5 h-5 accent-purple-600" />
              </div>
            </div>
          </div>

          {/* Privacy Section */}
          <div className={`${isDark ? 'bg-gray-900' : 'bg-white'} rounded-xl p-6 mb-6 shadow-sm`}>
            <div className="flex items-center gap-3 mb-4">
              <Shield className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Privacy & Security
              </h3>
            </div>

            <div className="space-y-3">
              {['Change Password', 'Two-Factor Authentication', 'Data Export'].map((item) => (
                <button
                  key={item}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-50'
                  }`}
                >
                  <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{item}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Sign Out */}
          <div className={`${isDark ? 'bg-gray-900' : 'bg-white'} rounded-xl p-6 shadow-sm`}>
            <button
              onClick={handleSignOut}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
