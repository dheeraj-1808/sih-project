import React, { useState, useEffect } from 'react';
import { X, User, Mail, Phone, MapPin, Calendar, Building } from 'lucide-react';
import Modal from './ui/Modal';
import { Input, Select } from './ui/Input';
import Button from './ui/Button';

const StaffModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  staffMember = null, 
  isEditing = false 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    department: '',
    email: '',
    phone: '',
    status: 'Active',
    location: '',
    joinDate: new Date().toISOString().split('T')[0]
  });

  const [errors, setErrors] = useState({});

  // Department options
  const departments = [
    'Public Works',
    'Sanitation',
    'Electrical',
    'General Admin'
  ];

  // Status options
  const statusOptions = [
    { value: 'Active', label: 'Active' },
    { value: 'On Leave', label: 'On Leave' },
    { value: 'Suspended', label: 'Suspended' },
    { value: 'Resigned', label: 'Resigned' }
  ];

  // Reset form when modal opens/closes or when editing different staff member
  useEffect(() => {
    if (isOpen) {
      if (isEditing && staffMember) {
        setFormData({
          name: staffMember.name || '',
          role: staffMember.role || '',
          department: staffMember.department || '',
          email: staffMember.email || '',
          phone: staffMember.phone || '',
          status: staffMember.status || 'Active',
          location: staffMember.location || '',
          joinDate: staffMember.joinDate || new Date().toISOString().split('T')[0]
        });
      } else {
        setFormData({
          name: '',
          role: '',
          department: '',
          email: '',
          phone: '',
          status: 'Active',
          location: '',
          joinDate: new Date().toISOString().split('T')[0]
        });
      }
      setErrors({});
    }
  }, [isOpen, isEditing, staffMember]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.role.trim()) {
      newErrors.role = 'Role is required';
    }

    if (!formData.department) {
      newErrors.department = 'Department is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (!formData.joinDate) {
      newErrors.joinDate = 'Join date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const submitData = {
        ...formData,
        workload: 0 // Default workload for new staff
      };
      
      // TODO: When backend is implemented, trigger API call to soft-delete staff if status is Resigned
      if (formData.status === 'Resigned') {
        // This would trigger a soft delete API call in the backend
        console.log('Soft delete triggered for staff member:', formData.name);
      }
      
      onSubmit(submitData);
      onClose();
    }
  };

  const title = isEditing ? 'Edit Staff Member' : 'Add New Staff Member';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <User className="w-5 h-5 mr-2" />
            Personal Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              placeholder="Enter full name"
              required
            />
            
            <Input
              label="Role/Designation"
              name="role"
              value={formData.role}
              onChange={handleChange}
              error={errors.role}
              placeholder="e.g., Senior Engineer"
              required
            />
          </div>
        </div>

        {/* Department & Status */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <Building className="w-5 h-5 mr-2" />
            Department & Status
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              error={errors.department}
              options={departments.map(dept => ({ value: dept, label: dept }))}
              placeholder="Select department"
              required
            />
            
            <Select
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              error={errors.status}
              options={statusOptions}
              required
            />
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <Mail className="w-5 h-5 mr-2" />
            Contact Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="staff@city.gov"
              required
            />
            
            <Input
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
              placeholder="+1-555-0123"
              required
            />
          </div>
        </div>

        {/* Location & Date */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            Location & Date
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Work Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              error={errors.location}
              placeholder="e.g., Main Office"
              required
            />
            
            <Input
              label="Join Date"
              name="joinDate"
              type="date"
              value={formData.joinDate}
              onChange={handleChange}
              error={errors.joinDate}
              required
            />
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
          >
            {isEditing ? 'Update Staff Member' : 'Add Staff Member'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default StaffModal;
