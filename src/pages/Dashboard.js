import React from 'react';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Building,
  Heart,
  Bus,
  TreePine,
  Calendar,
  MapPin
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const Dashboard = () => {
  const { state } = useApp();

  // Calculate statistics
  const totalReports = state.reports.length;
  const pendingReports = state.reports.filter(r => r.status === 'Pending').length;
  const resolvedReports = state.reports.filter(r => r.status === 'Resolved').length;

  // Key Metrics Cards
  const keyMetrics = [
    {
      title: 'Total Complaints',
      value: totalReports.toLocaleString(),
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      trend: '+10% from last month',
      trendColor: 'text-blue-600'
    },
    {
      title: 'Pending',
      value: pendingReports.toLocaleString(),
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      trend: '-5% from last month',
      trendColor: 'text-yellow-600'
    },
    {
      title: 'Resolved',
      value: resolvedReports.toLocaleString(),
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      trend: '+15% from last month',
      trendColor: 'text-green-600'
    },
    {
      title: 'In Progress',
      value: '2',
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      trend: '-2% from last month',
      trendColor: 'text-red-600'
    }
  ];

  // Department Overview
  const departments = [
    {
      name: 'Public Works',
      icon: Building,
      color: 'text-blue-600',
      borderColor: 'border-blue-200',
      complaints: 2,
      pending: 2
    },
    {
      name: 'Sanitation',
      icon: Heart,
      color: 'text-green-600',
      borderColor: 'border-green-200',
      complaints: 2,
      pending: 0
    },
    {
      name: 'Electrical',
      icon: Bus,
      color: 'text-yellow-600',
      borderColor: 'border-yellow-200',
      complaints: 1,
      pending: 1
    },
    {
      name: 'General Admin',
      icon: TreePine,
      color: 'text-purple-600',
      borderColor: 'border-purple-200',
      complaints: 1,
      pending: 1
    }
  ];

  // Recent Complaints
  const recentComplaints = state.reports
    .sort((a, b) => new Date(b.reportedDate) - new Date(a.reportedDate))
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-custom-50 via-white to-custom-100">
      {/* Dashboard Header */}
      <div className="bg-gradient-to-r from-custom-500 to-custom-600 px-6 py-12 shadow-lg relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white via-transparent to-transparent"></div>
          <div className="absolute top-4 right-4 w-32 h-32 bg-white rounded-full opacity-20"></div>
          <div className="absolute bottom-4 left-4 w-24 h-24 bg-white rounded-full opacity-15"></div>
        </div>
        
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-white mb-3">Dashboard</h1>
          <p className="text-custom-100 text-lg">Overview of citizen complaints and department performance</p>
          
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

      <div className="p-6 space-y-8">
        {/* Key Metrics */}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyMetrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div key={index} className="bg-white border border-custom-200 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:border-custom-300 hover:-translate-y-1">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-custom-600 mb-1">{metric.title}</p>
                      <p className={`text-3xl font-bold ${metric.color} mb-2`}>{metric.value}</p>
                      <p className={`text-sm ${metric.trendColor}`}>{metric.trend}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-gradient-to-br from-custom-50 to-custom-100 border border-custom-200">
                      <Icon className={`w-6 h-6 ${metric.color}`} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Department Overview */}
        <div>
          <h2 className="text-2xl font-bold text-custom-800 mb-6 flex items-center">
            <div className="w-1 h-8 bg-gradient-to-b from-custom-500 to-custom-600 rounded-full mr-3"></div>
            Department Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {departments.map((dept, index) => {
              const Icon = dept.icon;
              return (
                <div key={index} className="bg-white border border-custom-200 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:border-custom-300 hover:-translate-y-1 group">
                  <div className="flex items-center space-x-4">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-custom-50 to-custom-100 border border-custom-200 group-hover:from-custom-100 group-hover:to-custom-200 transition-all duration-300">
                      <Icon className={`w-6 h-6 ${dept.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-custom-800 mb-1">{dept.name}</h3>
                      <p className="text-sm text-custom-600">
                        {dept.complaints} complaints ({dept.pending} pending)
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Complaints */}
        <div>
          <h2 className="text-2xl font-bold text-custom-800 mb-6 flex items-center">
            <div className="w-1 h-8 bg-gradient-to-b from-custom-500 to-custom-600 rounded-full mr-3"></div>
            Recent Complaints
          </h2>
          <div className="bg-white rounded-2xl shadow-sm border border-custom-200 overflow-hidden">
            <div className="divide-y divide-custom-200">
              {recentComplaints.map((complaint, index) => (
                <div key={complaint.id} className="p-6 hover:bg-custom-50 transition-all duration-300 group">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-medium text-custom-800 group-hover:text-custom-900 transition-colors">{complaint.title}</h3>
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                          complaint.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          complaint.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                          complaint.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                          'bg-custom-100 text-custom-800'
                        }`}>
                          {complaint.status}
                        </span>
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                          complaint.priority === 'High' ? 'bg-red-100 text-red-800' :
                          complaint.priority === 'Medium' ? 'bg-orange-100 text-orange-800' :
                          complaint.priority === 'Low' ? 'bg-green-100 text-green-800' :
                          'bg-custom-100 text-custom-800'
                        }`}>
                          {complaint.priority}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-custom-600">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(complaint.reportedDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{complaint.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FileText className="w-4 h-4" />
                          <span>{complaint.category}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
