import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  User, 
  Edit,
  Calendar,
  MapPin,
  FileText
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Input, Select } from '../components/ui/Input';
import Button from '../components/ui/Button';
import StatusBadge from '../components/ui/StatusBadge';

const Reports = () => {
  const { state, actions } = useApp();
  const [showFilters, setShowFilters] = useState(false);

  // Filter reports based on current filters
  const filteredReports = useMemo(() => {
    return state.reports.filter(report => {
      const matchesCategory = !state.filters.category || report.category === state.filters.category;
      const matchesStatus = !state.filters.status || report.status === state.filters.status;
      const matchesDepartment = !state.filters.department || report.assignedDepartment === state.filters.department;
      const matchesPriority = !state.filters.priority || report.priority === state.filters.priority;
      const matchesSearch = !state.filters.search || 
        report.title.toLowerCase().includes(state.filters.search.toLowerCase()) ||
        report.description.toLowerCase().includes(state.filters.search.toLowerCase()) ||
        report.citizenName.toLowerCase().includes(state.filters.search.toLowerCase());

      return matchesCategory && matchesStatus && matchesDepartment && matchesPriority && matchesSearch;
    });
  }, [state.reports, state.filters]);

  const categories = [...new Set(state.reports.map(r => r.category))];
  const departments = [...new Set(state.reports.map(r => r.assignedDepartment).filter(Boolean))];
  const statuses = ['Pending', 'In Progress', 'Resolved'];
  const priorities = ['High', 'Medium', 'Low'];

  const handleFilterChange = (key, value) => {
    actions.updateFilters({ [key]: value });
  };

  const handleViewReport = (report) => {
    actions.setSelectedReport(report);
    actions.toggleReportModal();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'text-red-600 bg-red-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'low':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
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
          <h1 className="text-4xl font-bold text-white mb-3">Reports</h1>
          <p className="text-custom-100 text-lg">Manage and track civic issue reports</p>
          
          {/* Quick Stats */}
          <div className="mt-6 flex space-x-6">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-4 py-2">
              <span className="text-white text-sm font-medium">Live Updates</span>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-4 py-2">
              <span className="text-white text-sm font-medium">Real-time Data</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
      {/* Page Actions */}
      <div className="flex items-center justify-between">
        <div>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button>
            <User className="w-4 h-4 mr-2" />
            Assign Staff
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <Input
                  placeholder="Search reports, citizens, locations..."
                  value={state.filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>

            {/* Filter Options */}
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
                <Select
                  label="Category"
                  value={state.filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  options={categories.map(cat => ({ value: cat, label: cat }))}
                  placeholder="All Categories"
                />
                <Select
                  label="Status"
                  value={state.filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  options={statuses.map(status => ({ value: status, label: status }))}
                  placeholder="All Statuses"
                />
                <Select
                  label="Department"
                  value={state.filters.department}
                  onChange={(e) => handleFilterChange('department', e.target.value)}
                  options={departments.map(dept => ({ value: dept, label: dept }))}
                  placeholder="All Departments"
                />
                <Select
                  label="Priority"
                  value={state.filters.priority}
                  onChange={(e) => handleFilterChange('priority', e.target.value)}
                  options={priorities.map(priority => ({ value: priority, label: priority }))}
                  placeholder="All Priorities"
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Reports Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            Reports ({filteredReports.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">ID</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Title</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Category</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Priority</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Location</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Reported</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredReports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">
                      {report.id}
                    </td>
                    <td className="py-3 px-4">
                      <div className="max-w-xs">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {report.title}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          by {report.citizenName}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {report.category}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(report.priority)}`}>
                        {report.priority}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={report.status} />
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-3 h-3 mr-1" />
                        <span className="truncate max-w-32">{report.location}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {formatDate(report.reportedDate)}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewReport(report)}
                        >
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredReports.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No reports found matching your filters</p>
            </div>
          )}
        </CardContent>
      </Card>
      </div>
    </div>
  );
};

export default Reports;
