import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts';
import { useApp } from '../context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { analyticsData } from '../data/dummyData';

const Analytics = () => {
  const { state } = useApp();

  // Colors for charts
  const colors = {
    primary: '#3b82f6',
    success: '#22c55e',
    warning: '#f59e0b',
    danger: '#ef4444',
    purple: '#8b5cf6',
    pink: '#ec4899'
  };

  const pieColors = [colors.danger, colors.warning, colors.success];

  // Calculate additional metrics
  const totalReports = state.reports.length;
  const avgResolutionTime = 3.2; // days (dummy data)
  const citizenSatisfaction = 4.2; // out of 5 (dummy data)

  const metrics = [
    {
      title: 'Total Reports',
      value: totalReports,
      change: '+12%',
      changeType: 'positive',
      icon: '📊'
    },
    {
      title: 'Avg. Resolution Time',
      value: `${avgResolutionTime} days`,
      change: '-8%',
      changeType: 'positive',
      icon: '⏱️'
    },
    {
      title: 'Citizen Satisfaction',
      value: `${citizenSatisfaction}/5`,
      change: '+5%',
      changeType: 'positive',
      icon: '😊'
    },
    {
      title: 'Response Rate',
      value: '94%',
      change: '+2%',
      changeType: 'positive',
      icon: '📈'
    }
  ];

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
          <h1 className="text-4xl font-bold text-white mb-3">Analytics</h1>
          <p className="text-custom-100 text-lg">Insights and trends for civic issue management</p>
          
          {/* Quick Stats */}
          <div className="mt-6 flex space-x-6">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-4 py-2">
              <span className="text-white text-sm font-medium">Data Insights</span>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-4 py-2">
              <span className="text-white text-sm font-medium">Performance Metrics</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                  <p className={`text-sm ${metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                    {metric.change} from last month
                  </p>
                </div>
                <div className="text-2xl">{metric.icon}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Reports by Category */}
        <Card>
          <CardHeader>
            <CardTitle>Reports by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analyticsData.reportsByCategory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="category" 
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    fontSize={12}
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill={colors.primary} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analyticsData.statusDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ status, percentage }) => `${status}: ${percentage}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {analyticsData.statusDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analyticsData.weeklyTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="reports" 
                  stackId="1" 
                  stroke={colors.primary} 
                  fill={colors.primary}
                  fillOpacity={0.6}
                />
                <Area 
                  type="monotone" 
                  dataKey="resolved" 
                  stackId="1" 
                  stroke={colors.success} 
                  fill={colors.success}
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Report Volume</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analyticsData.monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="reports" 
                  stroke={colors.primary} 
                  strokeWidth={2}
                  name="New Reports"
                />
                <Line 
                  type="monotone" 
                  dataKey="resolved" 
                  stroke={colors.success} 
                  strokeWidth={2}
                  name="Resolved"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Department Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Department Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {state.departments.map((dept, index) => {
              const deptReports = state.reports.filter(r => r.assignedDepartment === dept.name);
              const resolvedReports = deptReports.filter(r => r.status === 'Resolved').length;
              const resolutionRate = deptReports.length > 0 ? (resolvedReports / deptReports.length) * 100 : 0;
              
              return (
                <div key={dept.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">{dept.name}</h4>
                    <p className="text-sm text-gray-600">
                      {dept.activeReports} active reports • {dept.staff} staff members
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">
                      {resolutionRate.toFixed(1)}%
                    </p>
                    <p className="text-sm text-gray-600">Resolution Rate</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  );
};

export default Analytics;
