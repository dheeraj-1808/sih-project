import React from 'react';
import { X, Clock, FileText, User, Bell } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import StatusBadge from '../ui/StatusBadge';

const NotificationsPanel = ({ isOpen, onClose }) => {
  const { state, actions } = useApp();

  const handleNotificationClick = (notification) => {
    actions.markNotificationRead(notification.id);
    if (notification.reportId) {
      const report = state.reports.find(r => r.id === notification.reportId);
      if (report) {
        actions.setSelectedReport(report);
        actions.toggleReportModal();
      }
    }
    onClose();
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return date.toLocaleDateString();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-25"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {state.notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <Bell size={48} className="mb-4 text-gray-300" />
              <p>No notifications</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {state.notifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                    !notification.read ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      {notification.type === 'new_report' && (
                        <FileText className="w-5 h-5 text-blue-600" />
                      )}
                      {notification.type === 'status_update' && (
                        <Clock className="w-5 h-5 text-yellow-600" />
                      )}
                      {notification.type === 'assignment' && (
                        <User className="w-5 h-5 text-green-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {notification.title}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-500">
                          {formatTimestamp(notification.timestamp)}
                        </span>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <button className="w-full text-sm text-primary-600 hover:text-primary-700 font-medium">
            Mark all as read
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPanel;
