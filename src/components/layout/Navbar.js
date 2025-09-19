import React, { useState } from 'react';
import { Menu, Bell, User, LogOut } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const Navbar = ({ onMenuClick, showNotifications, onToggleNotifications }) => {
  const { state, actions } = useApp();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const unreadNotifications = state.notifications.filter(n => !n.read).length;

  const handleLogout = () => {
    actions.logout();
    setShowProfileDropdown(false);
  };

  return (
    <header className="bg-gradient-to-r from-custom-50 to-custom-100 shadow-lg border-b border-custom-200 h-16 flex items-center justify-between px-6">
      {/* Left side - Mobile menu button */}
      <div className="flex items-center">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg text-custom-600 hover:bg-custom-100 transition-colors"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={onToggleNotifications}
            className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 relative"
          >
            <Bell size={20} />
            {unreadNotifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {unreadNotifications}
              </span>
            )}
          </button>
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-100"
          >
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face" 
                alt="Profile" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <User size={16} className="text-gray-600 hidden" />
            </div>
          </button>

          {/* Dropdown menu */}
          {showProfileDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
              <div className="px-4 py-2 border-b border-gray-200">
                <p className="text-sm font-medium text-gray-900">{state.user.name}</p>
                <p className="text-xs text-gray-500">{state.user.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
