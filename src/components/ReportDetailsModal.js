import React, { useState } from 'react';
import { 
  MapPin, 
  Calendar, 
  User, 
  Phone, 
  Mail, 
  Image as ImageIcon,
  Send
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import Modal from './ui/Modal';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Select, Textarea } from './ui/Input';
import Button from './ui/Button';
import StatusBadge from './ui/StatusBadge';
import GoogleMapsView from './GoogleMapsView';
import { getRelevantImages } from '../utils/imageUtils';

const ReportDetailsModal = () => {
  const { state, actions } = useApp();
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!state.selectedReport) return null;

  const report = state.selectedReport;

  const handleStatusChange = (newStatus) => {
    actions.updateReportStatus(report.id, newStatus);
  };

  const handleAssignDepartment = (department) => {
    actions.assignReport(report.id, department, null);
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      actions.addComment(report.id, newComment);
      setNewComment('');
      setIsSubmitting(false);
    }, 500);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
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
    <Modal
      isOpen={state.showReportModal}
      onClose={actions.toggleReportModal}
      title={`Report Details - ${report.id}`}
      size="xl"
    >
      <div className="space-y-6">
        {/* Report Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {report.title}
            </h2>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {formatDate(report.reportedDate)}
              </span>
              <span className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {report.location}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${getPriorityColor(report.priority)}`}>
              {report.priority} Priority
            </span>
            <StatusBadge status={report.status} size="md" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{report.description}</p>
              </CardContent>
            </Card>

            {/* Images */}
            <Card>
              <CardHeader>
                <CardTitle>Relevant Images</CardTitle>
                <p className="text-sm text-gray-500 mt-1">
                  Images related to {report.category} issues
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {getRelevantImages(report).map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`${report.title} - Issue example ${index + 1}`}
                        className="w-full h-32 md:h-40 object-cover rounded-lg border border-gray-200 shadow-sm"
                        onError={(e) => {
                          // Fallback to a default image if the specific image fails to load
                          e.target.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400';
                          e.target.alt = 'Default issue image';
                        }}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-lg flex items-center justify-center">
                        <ImageIcon className="w-6 h-6 text-white opacity-0 group-hover:opacity-100" />
                      </div>
                      {/* Image loading indicator */}
                      <div className="absolute top-2 right-2 bg-white bg-opacity-80 rounded-full p-1">
                        <span className="text-xs text-gray-600 font-medium">{index + 1}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Google Maps View */}
            <Card>
              <CardHeader>
                <CardTitle>Issue Location</CardTitle>
                <p className="text-sm text-gray-500 mt-1">
                  Interactive Google Maps view with exact location marker
                </p>
              </CardHeader>
              <CardContent>
                <GoogleMapsView report={report} />
              </CardContent>
            </Card>

            {/* Citizen Information */}
            <Card>
              <CardHeader>
                <CardTitle>Citizen Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-700">{report.citizenName}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-700">{report.citizenEmail}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-700">{report.citizenPhone}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Status Management */}
            <Card>
              <CardHeader>
                <CardTitle>Status Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Status
                  </label>
                  <StatusBadge status={report.status} size="lg" />
                </div>
                <div>
                  <Select
                    label="Change Status"
                    value={report.status}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    options={[
                      { value: 'Pending', label: 'Pending' },
                      { value: 'In Progress', label: 'In Progress' },
                      { value: 'Resolved', label: 'Resolved' }
                    ]}
                  />
                </div>
                <div>
                  <Select
                    label="Assign Department"
                    value={report.assignedDepartment || ''}
                    onChange={(e) => handleAssignDepartment(e.target.value)}
                    options={state.departments.map(dept => ({ 
                      value: dept.name, 
                      label: dept.name 
                    }))}
                    placeholder="Select Department"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Comments */}
            <Card>
              <CardHeader>
                <CardTitle>Comments & Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Add Comment */}
                  <div className="space-y-2">
                    <Textarea
                      placeholder="Add a comment or note..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      rows={3}
                    />
                    <Button
                      onClick={handleAddComment}
                      disabled={!newComment.trim() || isSubmitting}
                      size="sm"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      {isSubmitting ? 'Adding...' : 'Add Comment'}
                    </Button>
                  </div>

                  {/* Comments List */}
                  <div className="space-y-3">
                    {report.comments && report.comments.length > 0 ? (
                      report.comments.map((comment) => (
                        <div key={comment.id} className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-gray-900">
                              {comment.author}
                            </span>
                            <span className="text-xs text-gray-500">
                              {formatDate(comment.timestamp)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700">{comment.text}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500 text-center py-4">
                        No comments yet
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
          <Button variant="outline" onClick={actions.toggleReportModal}>
            Close
          </Button>
          <Button>
            Save Changes
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ReportDetailsModal;
