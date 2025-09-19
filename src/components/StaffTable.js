import React, { useState, useMemo } from 'react';
import { Search, Edit, User, Phone, Mail, MapPin, Filter } from 'lucide-react';
import Button from './ui/Button';
import StatusBadge from './ui/StatusBadge';
import { Select } from './ui/Input';

const StaffTable = ({ 
  staff, 
  onEdit, 
  onSearch, 
  searchTerm, 
  selectedDepartment, 
  onDepartmentFilter,
  selectedStatus,
  onStatusFilter
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter staff based on search term, department, and status
  const filteredStaff = useMemo(() => {
    return staff.filter(member => {
      const matchesSearch = !searchTerm || 
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDepartment = !selectedDepartment || 
        selectedDepartment === 'All' || 
        member.department === selectedDepartment;
      
      const matchesStatus = !selectedStatus || 
        selectedStatus === 'All' || 
        member.status === selectedStatus;
      
      return matchesSearch && matchesDepartment && matchesStatus;
    });
  }, [staff, searchTerm, selectedDepartment, selectedStatus]);

  // Pagination
  const totalPages = Math.ceil(filteredStaff.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedStaff = filteredStaff.slice(startIndex, startIndex + itemsPerPage);

  // Department options
  const departments = ['All', 'Public Works', 'Sanitation', 'Electrical', 'General Admin'];

  // Status options
  const statusOptions = [
    { value: 'All', label: 'All Statuses' },
    { value: 'Active', label: 'Active' },
    { value: 'On Leave', label: 'On Leave' },
    { value: 'Suspended', label: 'Suspended' },
    { value: 'Resigned', label: 'Resigned' }
  ];

  // Check if staff member is inactive (No inactive statuses for now)
  const isInactiveStaff = (status) => {
    return false; // No inactive styling since we removed "Removed" status
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Bar */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search staff by name, role, or email..."
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        
        {/* Status Filter */}
        <div className="lg:w-64">
          <Select
            value={selectedStatus}
            onChange={(e) => onStatusFilter(e.target.value)}
            options={statusOptions}
            placeholder="Filter by status"
          />
        </div>
      </div>

      {/* Department Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {departments.map((dept) => (
          <button
            key={dept}
            onClick={() => onDepartmentFilter(dept)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedDepartment === dept
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {dept}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {filteredStaff.length} of {staff.length} staff members
        </p>
        {(selectedDepartment !== 'All' || selectedStatus !== 'All') && (
          <button
            onClick={() => {
              onDepartmentFilter('All');
              onStatusFilter('All');
            }}
            className="text-sm text-primary-600 hover:text-primary-700"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Staff Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Staff Member</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Department</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Contact</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Status</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedStaff.map((member) => {
                const isInactive = isInactiveStaff(member.status);
                return (
                  <tr 
                    key={member.id} 
                    className={`hover:bg-gray-50 ${isInactive ? 'opacity-60' : ''}`}
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-primary-600" />
                        </div>
                        <div className={isInactive ? 'line-through' : ''}>
                          <p className="text-sm font-medium text-gray-900">{member.name}</p>
                          <p className="text-sm text-gray-500">{member.role}</p>
                          <div className="flex items-center text-xs text-gray-400 mt-1">
                            <MapPin className="w-3 h-3 mr-1" />
                            {member.location}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 ${isInactive ? 'line-through' : ''}`}>
                        {member.department}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className={`space-y-1 ${isInactive ? 'line-through' : ''}`}>
                        <div className="flex items-center text-sm text-gray-600">
                          <Mail className="w-3 h-3 mr-2" />
                          <span className="truncate max-w-48">{member.email}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="w-3 h-3 mr-2" />
                          {member.phone}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <StatusBadge 
                        status={member.status} 
                        size="sm"
                      />
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onEdit(member)}
                        >
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredStaff.length === 0 && (
          <div className="text-center py-12">
            <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No staff members found</p>
            <p className="text-sm text-gray-400 mt-1">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredStaff.length)} of {filteredStaff.length} results
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "primary" : "outline"}
                size="sm"
                onClick={() => handlePageChange(page)}
                className="w-8 h-8 p-0"
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffTable;
