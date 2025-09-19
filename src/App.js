import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';

// Components
import Sidebar from './components/layout/Sidebar';
import Navbar from './components/layout/Navbar';
import NotificationsPanel from './components/layout/NotificationsPanel';
import ReportDetailsModal from './components/ReportDetailsModal';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import Analytics from './pages/Analytics';
import StaffManagement from './pages/StaffManagement';
import Settings from './pages/Settings';

// Main App Layout Component
const AppLayout = ({ children }) => {
  const { state, actions } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!state.isAuthenticated) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-custom-50 via-white to-custom-100 flex">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Navbar */}
        <Navbar 
          onMenuClick={() => setSidebarOpen(true)}
          showNotifications={state.showNotifications}
          onToggleNotifications={actions.toggleNotifications}
        />
        
        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>

      {/* Modals and Panels */}
      <NotificationsPanel 
        isOpen={state.showNotifications} 
        onClose={actions.toggleNotifications} 
      />
      <ReportDetailsModal />
    </div>
  );
};

// App Component
const App = () => {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route 
            path="/dashboard" 
            element={
              <AppLayout>
                <Dashboard />
              </AppLayout>
            } 
          />
          <Route 
            path="/reports" 
            element={
              <AppLayout>
                <Reports />
              </AppLayout>
            } 
          />
          <Route 
            path="/analytics" 
            element={
              <AppLayout>
                <Analytics />
              </AppLayout>
            } 
          />
          <Route 
            path="/settings" 
            element={
              <AppLayout>
                <Settings />
              </AppLayout>
            } 
          />
          <Route 
            path="/staff" 
            element={
              <AppLayout>
                <StaffManagement />
              </AppLayout>
            } 
          />
        </Routes>
      </Router>
    </AppProvider>
  );
};

export default App;
