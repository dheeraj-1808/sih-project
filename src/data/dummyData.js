// Dummy data for the civic issues admin portal

export const departments = [
  { id: 1, name: 'Public Works', staff: 3, activeReports: 2 },
  { id: 2, name: 'Sanitation', staff: 3, activeReports: 0 },
  { id: 3, name: 'Electrical', staff: 3, activeReports: 1 },
  { id: 4, name: 'General Admin', staff: 3, activeReports: 1 }
];

export const staff = [
  { 
    id: 1, 
    name: 'Rajesh Kumar', 
    role: 'Senior Engineer',
    department: 'Public Works', 
    email: 'rajesh.kumar@city.gov.in', 
    phone: '+91-98765-43210',
    workload: 3, 
    status: 'Active',
    joinDate: '2020-03-15',
    location: 'Main Office'
  },
  { 
    id: 2, 
    name: 'Priya Sharma', 
    role: 'Road Maintenance Lead',
    department: 'Public Works', 
    email: 'priya.sharma@city.gov.in', 
    phone: '+91-98765-43211',
    workload: 2, 
    status: 'On Leave',
    joinDate: '2019-07-22',
    location: 'Road Maintenance Yard'
  },
  { 
    id: 3, 
    name: 'Amit Patel', 
    role: 'Pothole Specialist',
    department: 'Public Works', 
    email: 'amit.patel@city.gov.in', 
    phone: '+91-98765-43212',
    workload: 1, 
    status: 'Active',
    joinDate: '2021-01-10',
    location: 'Field Office'
  },
  { 
    id: 4, 
    name: 'Sunita Singh', 
    role: 'Sanitation Supervisor',
    department: 'Sanitation', 
    email: 'sunita.singh@city.gov.in', 
    phone: '+91-98765-43213',
    workload: 4, 
    status: 'Active',
    joinDate: '2018-11-05',
    location: 'Waste Management Center'
  },
  { 
    id: 5, 
    name: 'Vikram Reddy', 
    role: 'Garbage Collection Manager',
    department: 'Sanitation', 
    email: 'vikram.reddy@city.gov.in', 
    phone: '+91-98765-43214',
    workload: 2, 
    status: 'Active',
    joinDate: '2020-09-18',
    location: 'Sanitation Depot'
  },
  { 
    id: 6, 
    name: 'Anjali Gupta', 
    role: 'Electrical Technician',
    department: 'Electrical', 
    email: 'anjali.gupta@city.gov.in', 
    phone: '+91-98765-43215',
    workload: 5, 
    status: 'Suspended',
    joinDate: '2017-05-12',
    location: 'Electrical Depot'
  },
  { 
    id: 7, 
    name: 'Ravi Verma', 
    role: 'Streetlight Inspector',
    department: 'Electrical', 
    email: 'ravi.verma@city.gov.in', 
    phone: '+91-98765-43216',
    workload: 3, 
    status: 'Active',
    joinDate: '2019-02-28',
    location: 'Electrical Workshop'
  },
  { 
    id: 8, 
    name: 'Deepika Joshi', 
    role: 'Electrical Engineer',
    department: 'Electrical', 
    email: 'deepika.joshi@city.gov.in', 
    phone: '+91-98765-43217',
    workload: 2, 
    status: 'Resigned',
    joinDate: '2020-06-14',
    location: 'Electrical Depot'
  },
  { 
    id: 9, 
    name: 'Arjun Mehta', 
    role: 'General Administrator',
    department: 'General Admin', 
    email: 'arjun.mehta@city.gov.in', 
    phone: '+91-98765-43218',
    workload: 4, 
    status: 'Active',
    joinDate: '2018-08-30',
    location: 'City Hall'
  },
  { 
    id: 10, 
    name: 'Kavya Nair', 
    role: 'Admin Coordinator',
    department: 'General Admin', 
    email: 'kavya.nair@city.gov.in', 
    phone: '+91-98765-43219',
    workload: 3, 
    status: 'Active',
    joinDate: '2016-12-03',
    location: 'Admin Office'
  },
  { 
    id: 11, 
    name: 'Suresh Yadav', 
    role: 'Sanitation Worker',
    department: 'Sanitation', 
    email: 'suresh.yadav@city.gov.in', 
    phone: '+91-98765-43220',
    workload: 1, 
    status: 'Active',
    joinDate: '2021-04-20',
    location: 'Waste Management Center'
  },
  { 
    id: 12, 
    name: 'Meera Iyer', 
    role: 'Admin Assistant',
    department: 'General Admin', 
    email: 'meera.iyer@city.gov.in', 
    phone: '+91-98765-43221',
    workload: 2, 
    status: 'Active',
    joinDate: '2020-10-15',
    location: 'Admin Office'
  }
];

export const reports = [
  {
    id: 'RPT-001',
    title: 'Large Pothole on MG Road',
    description: 'Deep pothole causing traffic issues and potential vehicle damage. Located near the intersection of MG Road and Brigade Road.',
    category: 'Potholes',
    priority: 'High',
    status: 'Pending',
    location: 'MG Road & Brigade Road',
    coordinates: { lat: 12.9716, lng: 77.5946 },
    citizenName: 'Ravi Kumar',
    citizenEmail: 'ravi.kumar@gmail.com',
    citizenPhone: '+91-98765-12345',
    reportedDate: '2024-01-15T09:30:00Z',
    assignedDepartment: 'Public Works',
    assignedStaff: 'Rajesh Kumar',
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'],
    comments: []
  },
  {
    id: 'RPT-002',
    title: 'Broken Streetlight on Residency Road',
    description: 'Streetlight not working on Residency Road, making the area unsafe at night.',
    category: 'Streetlights',
    priority: 'Medium',
    status: 'In Progress',
    location: 'Residency Road (between Church Street and Brigade Road)',
    coordinates: { lat: 12.9716, lng: 77.5946 },
    citizenName: 'Priya Sharma',
    citizenEmail: 'priya.sharma@gmail.com',
    citizenPhone: '+91-98765-12346',
    reportedDate: '2024-01-14T18:45:00Z',
    assignedDepartment: 'Electrical',
    assignedStaff: 'Ravi Verma',
    images: ['https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400'],
    comments: [
      {
        id: 1,
        author: 'Ravi Verma',
        text: 'Inspected the area. Need to replace the entire fixture.',
        timestamp: '2024-01-15T10:15:00Z'
      }
    ]
  },
  {
    id: 'RPT-003',
    title: 'Garbage Collection Missed',
    description: 'Garbage was not collected on Tuesday as scheduled. Bins are overflowing.',
    category: 'Garbage',
    priority: 'Medium',
    status: 'Resolved',
    location: 'Koramangala (100-200 block)',
    coordinates: { lat: 12.9352, lng: 77.6245 },
    citizenName: 'Amit Patel',
    citizenEmail: 'amit.patel@gmail.com',
    citizenPhone: '+91-98765-12347',
    reportedDate: '2024-01-13T07:20:00Z',
    assignedDepartment: 'Sanitation',
    assignedStaff: 'Sunita Singh',
    images: ['https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400'],
    comments: [
      {
        id: 2,
        author: 'Sunita Singh',
        text: 'Arranged for special collection. Completed yesterday.',
        timestamp: '2024-01-14T16:30:00Z'
      }
    ]
  },
  {
    id: 'RPT-004',
    title: 'Damaged Traffic Signal',
    description: 'Traffic signal at Silk Board junction is malfunctioning. Safety hazard for commuters.',
    category: 'Others',
    priority: 'High',
    status: 'Pending',
    location: 'Silk Board Junction',
    coordinates: { lat: 12.9141, lng: 77.6786 },
    citizenName: 'Deepika Joshi',
    citizenEmail: 'deepika.joshi@gmail.com',
    citizenPhone: '+91-98765-12348',
    reportedDate: '2024-01-16T14:10:00Z',
    assignedDepartment: 'General Admin',
    assignedStaff: 'Arjun Mehta',
    images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400'],
    comments: []
  },
  {
    id: 'RPT-005',
    title: 'Multiple Potholes on Outer Ring Road',
    description: 'Several potholes on Outer Ring Road causing traffic congestion.',
    category: 'Potholes',
    priority: 'High',
    status: 'In Progress',
    location: 'Outer Ring Road (near Marathahalli)',
    coordinates: { lat: 12.9581, lng: 77.7010 },
    citizenName: 'Vikram Reddy',
    citizenEmail: 'vikram.reddy@gmail.com',
    citizenPhone: '+91-98765-12349',
    reportedDate: '2024-01-16T08:15:00Z',
    assignedDepartment: 'Public Works',
    assignedStaff: 'Amit Patel',
    images: ['https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400'],
    comments: [
      {
        id: 3,
        author: 'Amit Patel',
        text: 'Work in progress. ETA 2 hours.',
        timestamp: '2024-01-16T08:45:00Z'
      }
    ]
  },
  {
    id: 'RPT-006',
    title: 'Garbage Dump Near Park',
    description: 'Illegal garbage dumping near Cubbon Park entrance.',
    category: 'Garbage',
    priority: 'Medium',
    status: 'Resolved',
    location: 'Cubbon Park Entrance',
    coordinates: { lat: 12.9716, lng: 77.5946 },
    citizenName: 'Anjali Gupta',
    citizenEmail: 'anjali.gupta@gmail.com',
    citizenPhone: '+91-98765-12350',
    reportedDate: '2024-01-12T11:30:00Z',
    assignedDepartment: 'Sanitation',
    assignedStaff: 'Vikram Reddy',
    images: ['https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400'],
    comments: [
      {
        id: 4,
        author: 'Vikram Reddy',
        text: 'Garbage cleared and area cleaned.',
        timestamp: '2024-01-13T15:20:00Z'
      }
    ]
  }
];

export const notifications = [
  {
    id: 1,
    type: 'new_report',
    title: 'New High Priority Report',
    message: 'RPT-004: Damaged Playground Equipment reported by Jennifer Lee',
    timestamp: '2024-01-16T14:10:00Z',
    read: false,
    reportId: 'RPT-004'
  },
  {
    id: 2,
    type: 'status_update',
    title: 'Report Status Updated',
    message: 'RPT-002: Broken Streetlight status changed to In Progress',
    timestamp: '2024-01-15T10:15:00Z',
    read: false,
    reportId: 'RPT-002'
  },
  {
    id: 3,
    type: 'assignment',
    title: 'New Assignment',
    message: 'You have been assigned to RPT-005: Traffic Signal Malfunction',
    timestamp: '2024-01-16T08:45:00Z',
    read: true,
    reportId: 'RPT-005'
  }
];

export const analyticsData = {
  reportsByCategory: [
    { category: 'Potholes', count: 8, percentage: 35 },
    { category: 'Garbage', count: 6, percentage: 26 },
    { category: 'Streetlights', count: 5, percentage: 22 },
    { category: 'Others', count: 4, percentage: 17 }
  ],
  statusDistribution: [
    { status: 'Pending', count: 18, percentage: 30 },
    { status: 'In Progress', count: 24, percentage: 40 },
    { status: 'Resolved', count: 18, percentage: 30 }
  ],
  weeklyTrends: [
    { week: 'Week 1', reports: 12, resolved: 8 },
    { week: 'Week 2', reports: 15, resolved: 12 },
    { week: 'Week 3', reports: 18, resolved: 15 },
    { week: 'Week 4', reports: 14, resolved: 16 }
  ],
  monthlyTrends: [
    { month: 'Oct 2023', reports: 45, resolved: 42 },
    { month: 'Nov 2023', reports: 52, resolved: 48 },
    { month: 'Dec 2023', reports: 38, resolved: 41 },
    { month: 'Jan 2024', reports: 60, resolved: 35 }
  ]
};

export const mapPins = [
  { id: 'RPT-001', lat: 12.9716, lng: 77.5946, status: 'Pending', category: 'Potholes' },
  { id: 'RPT-002', lat: 12.9716, lng: 77.5946, status: 'In Progress', category: 'Streetlights' },
  { id: 'RPT-003', lat: 12.9352, lng: 77.6245, status: 'Resolved', category: 'Garbage' },
  { id: 'RPT-004', lat: 12.9141, lng: 77.6786, status: 'Pending', category: 'Others' },
  { id: 'RPT-005', lat: 12.9581, lng: 77.7010, status: 'In Progress', category: 'Potholes' },
  { id: 'RPT-006', lat: 12.9716, lng: 77.5946, status: 'Resolved', category: 'Garbage' }
];
