import React, { useState } from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  Save
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Input, Select } from '../components/ui/Input';
import Button from '../components/ui/Button';

const Settings = () => {
  const { state, actions } = useApp();
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);

  const [profileData, setProfileData] = useState({
    name: state.user.name,
    email: state.user.email,
    role: state.user.role
  });


  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    reportUpdates: true,
    systemAlerts: true,
    weeklyDigest: false
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'preferences', label: 'Preferences', icon: Shield }
  ];

  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };


  const handleNotificationChange = (e) => {
    setNotificationSettings({
      ...notificationSettings,
      [e.target.name]: e.target.checked
    });
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      // Show success message
    }, 1000);
  };


  const handleLogout = () => {
    actions.logout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-custom-50 via-white to-custom-100">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-custom-500 to-custom-600 px-6 py-12 shadow-lg relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white via-transparent to-transparent"></div>
          <div className="absolute top-4 right-4 w-32 h-32 bg-white rounded-full opacity-20"></div>
          <div className="absolute bottom-4 left-4 w-24 h-24 bg-white rounded-full opacity-15"></div>
        </div>
        
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-white mb-3">Settings</h1>
          <p className="text-custom-100 text-lg">Manage your account settings and preferences</p>
          
          {/* Quick Stats */}
          <div className="mt-6 flex space-x-6">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-4 py-2">
              <span className="text-white text-sm font-medium">Account Settings</span>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-4 py-2">
              <span className="text-white text-sm font-medium">Preferences</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-0">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 text-left text-sm font-medium rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-primary-100 text-primary-700'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      <Icon size={20} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Full Name"
                    name="name"
                    value={profileData.name}
                    onChange={handleProfileChange}
                  />
                  <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                  />
                </div>
                <div>
                  <Input
                    label="Role"
                    name="role"
                    value={profileData.role}
                    onChange={handleProfileChange}
                    disabled
                  />
                </div>
                <div className="flex justify-end">
                  <Button onClick={handleSaveProfile} disabled={isSaving}>
                    <Save className="w-4 h-4 mr-2" />
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}


          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Email Notifications</h4>
                      <p className="text-sm text-gray-600">Receive notifications via email</p>
                    </div>
                    <input
                      type="checkbox"
                      name="emailNotifications"
                      checked={notificationSettings.emailNotifications}
                      onChange={handleNotificationChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Push Notifications</h4>
                      <p className="text-sm text-gray-600">Receive push notifications in browser</p>
                    </div>
                    <input
                      type="checkbox"
                      name="pushNotifications"
                      checked={notificationSettings.pushNotifications}
                      onChange={handleNotificationChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Report Updates</h4>
                      <p className="text-sm text-gray-600">Get notified when reports are updated</p>
                    </div>
                    <input
                      type="checkbox"
                      name="reportUpdates"
                      checked={notificationSettings.reportUpdates}
                      onChange={handleNotificationChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">System Alerts</h4>
                      <p className="text-sm text-gray-600">Receive system-wide alerts and announcements</p>
                    </div>
                    <input
                      type="checkbox"
                      name="systemAlerts"
                      checked={notificationSettings.systemAlerts}
                      onChange={handleNotificationChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Weekly Digest</h4>
                      <p className="text-sm text-gray-600">Receive a weekly summary of activities</p>
                    </div>
                    <input
                      type="checkbox"
                      name="weeklyDigest"
                      checked={notificationSettings.weeklyDigest}
                      onChange={handleNotificationChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button onClick={handleSaveProfile} disabled={isSaving}>
                    <Save className="w-4 h-4 mr-2" />
                    {isSaving ? 'Saving...' : 'Save Preferences'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>System Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Select
                      label="Default View"
                      options={[
                        { value: 'dashboard', label: 'Dashboard' },
                        { value: 'reports', label: 'Reports' },
                        { value: 'analytics', label: 'Analytics' }
                      ]}
                      placeholder="Select default view"
                    />
                    <Select
                      label="Reports Per Page"
                      options={[
                        { value: '10', label: '10' },
                        { value: '25', label: '25' },
                        { value: '50', label: '50' },
                        { value: '100', label: '100' }
                      ]}
                      placeholder="Select page size"
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={handleSaveProfile} disabled={isSaving}>
                      <Save className="w-4 h-4 mr-2" />
                      {isSaving ? 'Saving...' : 'Save Preferences'}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Danger Zone</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div>
                      <h4 className="text-sm font-medium text-red-800">Logout</h4>
                      <p className="text-sm text-red-600">Sign out of your account</p>
                    </div>
                    <Button variant="danger" onClick={handleLogout}>
                      Logout
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
};

export default Settings;
