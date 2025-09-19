import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  BarChart3, 
  Settings, 
  Users,
  Shield
} from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/reports', label: 'Complaints', icon: FileText },
    { path: '/staff', label: 'Staff Management', icon: Users },
    { path: '/analytics', label: 'Analytics', icon: BarChart3 },
    { path: '/settings', label: 'Settings', icon: Settings }
  ];

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 z-50 h-full w-72 bg-gradient-to-b from-custom-50 to-custom-100 shadow-xl transform transition-transform duration-300 ease-in-out flex flex-col border-r border-custom-200
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto lg:w-64 lg:h-screen lg:flex-shrink-0
      `}>
        {/* Logo */}
        <div className="flex items-center justify-center h-16 px-4 border-b border-custom-200 flex-shrink-0">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-custom-500 to-custom-600 rounded-lg flex items-center justify-center shadow-md">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-custom-800">CivicAdmin</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-6 py-8 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={onClose}
                    className={`
                      flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300
                      ${isActive(item.path)
                        ? 'bg-gradient-to-r from-custom-500 to-custom-600 text-white shadow-lg transform scale-105'
                        : 'text-custom-700 hover:bg-custom-100 hover:text-custom-800 hover:transform hover:scale-105'
                      }
                    `}
                  >
                    <Icon size={20} className="flex-shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom section */}
        <div className="flex-shrink-0 p-6 border-t border-custom-200 bg-gradient-to-r from-custom-100 to-custom-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-custom-500 to-custom-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
              <span className="text-sm font-medium text-white">AU</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-custom-800 truncate">Admin User</p>
              <p className="text-xs text-custom-600 truncate">admin@city.gov</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;