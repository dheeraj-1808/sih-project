import React, { useState } from 'react';
import { Plus, Users, Building2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import StaffTable from '../components/StaffTable';
import StaffModal from '../components/StaffModal';

const StaffManagement = () => {
  const { state, actions } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Calculate statistics
  const totalStaff = state.staff.length;
  const activeStaff = state.staff.filter(member => member.status === 'Active').length;
  const inactiveStaff = state.staff.filter(member => 
    member.status === 'Resigned'
  ).length;
  
  // Department statistics
  const departmentStats = state.staff.reduce((acc, member) => {
    acc[member.department] = (acc[member.department] || 0) + 1;
    return acc;
  }, {});

  const statsCards = [
    {
      title: 'Total Staff',
      value: totalStaff,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Active Staff',
      value: activeStaff,
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Inactive Staff',
      value: inactiveStaff,
      icon: Users,
      color: 'text-gray-600',
      bgColor: 'bg-gray-100'
    },
    {
      title: 'Departments',
      value: Object.keys(departmentStats).length,
      icon: Building2,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  const handleAddStaff = () => {
    setEditingStaff(null);
    setIsEditing(false);
    setShowModal(true);
  };

  const handleEditStaff = (staffMember) => {
    setEditingStaff(staffMember);
    setIsEditing(true);
    setShowModal(true);
  };

  // Remove delete functionality - staff are now managed through status changes

  const handleSubmitStaff = (staffData) => {
    if (isEditing) {
      actions.updateStaff({ ...staffData, id: editingStaff.id });
    } else {
      actions.addStaff(staffData);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingStaff(null);
    setIsEditing(false);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleDepartmentFilter = (department) => {
    setSelectedDepartment(department);
  };

  const handleStatusFilter = (status) => {
    setSelectedStatus(status);
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
          <h1 className="text-4xl font-bold text-white mb-3">Staff Management</h1>
          <p className="text-custom-100 text-lg">Manage your team members and departments</p>
          
          {/* Quick Stats */}
          <div className="mt-6 flex space-x-6">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-4 py-2">
              <span className="text-white text-sm font-medium">Team Overview</span>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-4 py-2">
              <span className="text-white text-sm font-medium">Department Stats</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
      {/* Page Actions */}
      <div className="flex items-center justify-between">
        <div>
        </div>
        <Button onClick={handleAddStaff}>
          <Plus className="w-4 h-4 mr-2" />
          Add Staff Member
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Department Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Department Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Object.entries(departmentStats).map(([department, count]) => (
              <div key={department} className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-lg font-semibold text-gray-900">{count}</p>
                <p className="text-sm text-gray-600">{department}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Staff Table */}
      <Card>
        <CardHeader>
          <CardTitle>Staff Members</CardTitle>
        </CardHeader>
        <CardContent>
          <StaffTable
            staff={state.staff}
            onEdit={handleEditStaff}
            onSearch={handleSearch}
            searchTerm={searchTerm}
            selectedDepartment={selectedDepartment}
            onDepartmentFilter={handleDepartmentFilter}
            selectedStatus={selectedStatus}
            onStatusFilter={handleStatusFilter}
          />
        </CardContent>
      </Card>

      {/* Staff Modal */}
      <StaffModal
        isOpen={showModal}
        onClose={handleCloseModal}
        onSubmit={handleSubmitStaff}
        staffMember={editingStaff}
        isEditing={isEditing}
      />
      </div>
    </div>
  );
};

export default StaffManagement;
