import React, { createContext, useContext, useReducer } from 'react';
import { reports, notifications, departments, staff } from '../data/dummyData';

// Initial state
const initialState = {
  user: {
    id: 1,
    name: 'Admin User',
    email: 'admin@city.gov',
    role: 'Administrator'
  },
  isAuthenticated: false,
  reports: reports,
  notifications: notifications,
  departments: departments,
  staff: staff,
  selectedReport: null,
  showReportModal: false,
  showNotifications: false,
  filters: {
    category: '',
    status: '',
    department: '',
    priority: '',
    dateRange: { start: '', end: '' },
    search: ''
  }
};

// Action types
const actionTypes = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  SET_SELECTED_REPORT: 'SET_SELECTED_REPORT',
  TOGGLE_REPORT_MODAL: 'TOGGLE_REPORT_MODAL',
  TOGGLE_NOTIFICATIONS: 'TOGGLE_NOTIFICATIONS',
  UPDATE_REPORT_STATUS: 'UPDATE_REPORT_STATUS',
  ASSIGN_REPORT: 'ASSIGN_REPORT',
  ADD_COMMENT: 'ADD_COMMENT',
  UPDATE_FILTERS: 'UPDATE_FILTERS',
  MARK_NOTIFICATION_READ: 'MARK_NOTIFICATION_READ',
  ADD_STAFF: 'ADD_STAFF',
  UPDATE_STAFF: 'UPDATE_STAFF',
  DELETE_STAFF: 'DELETE_STAFF'
};

// Reducer
const appReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        isAuthenticated: true
      };
    
    case actionTypes.LOGOUT:
      return {
        ...state,
        isAuthenticated: false
      };
    
    case actionTypes.SET_SELECTED_REPORT:
      return {
        ...state,
        selectedReport: action.payload
      };
    
    case actionTypes.TOGGLE_REPORT_MODAL:
      return {
        ...state,
        showReportModal: !state.showReportModal
      };
    
    case actionTypes.TOGGLE_NOTIFICATIONS:
      return {
        ...state,
        showNotifications: !state.showNotifications
      };
    
    case actionTypes.UPDATE_REPORT_STATUS:
      return {
        ...state,
        reports: state.reports.map(report =>
          report.id === action.payload.reportId
            ? { ...report, status: action.payload.status }
            : report
        )
      };
    
    case actionTypes.ASSIGN_REPORT:
      return {
        ...state,
        reports: state.reports.map(report =>
          report.id === action.payload.reportId
            ? {
                ...report,
                assignedDepartment: action.payload.department,
                assignedStaff: action.payload.staff
              }
            : report
        )
      };
    
    case actionTypes.ADD_COMMENT:
      return {
        ...state,
        reports: state.reports.map(report =>
          report.id === action.payload.reportId
            ? {
                ...report,
                comments: [
                  ...report.comments,
                  {
                    id: Date.now(),
                    author: state.user.name,
                    text: action.payload.comment,
                    timestamp: new Date().toISOString()
                  }
                ]
              }
            : report
        )
      };
    
    case actionTypes.UPDATE_FILTERS:
      return {
        ...state,
        filters: { ...state.filters, ...action.payload }
      };
    
    case actionTypes.MARK_NOTIFICATION_READ:
      return {
        ...state,
        notifications: state.notifications.map(notification =>
          notification.id === action.payload
            ? { ...notification, read: true }
            : notification
        )
      };
    
    case actionTypes.ADD_STAFF:
      return {
        ...state,
        staff: [...state.staff, { ...action.payload, id: Date.now() }]
      };
    
    case actionTypes.UPDATE_STAFF:
      return {
        ...state,
        staff: state.staff.map(staffMember =>
          staffMember.id === action.payload.id
            ? { ...staffMember, ...action.payload }
            : staffMember
        )
      };
    
    case actionTypes.DELETE_STAFF:
      return {
        ...state,
        staff: state.staff.filter(staffMember => staffMember.id !== action.payload)
      };
    
    default:
      return state;
  }
};

// Context
const AppContext = createContext();

// Provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const actions = {
    login: () => dispatch({ type: actionTypes.LOGIN }),
    logout: () => dispatch({ type: actionTypes.LOGOUT }),
    setSelectedReport: (report) => dispatch({ type: actionTypes.SET_SELECTED_REPORT, payload: report }),
    toggleReportModal: () => dispatch({ type: actionTypes.TOGGLE_REPORT_MODAL }),
    toggleNotifications: () => dispatch({ type: actionTypes.TOGGLE_NOTIFICATIONS }),
    updateReportStatus: (reportId, status) => 
      dispatch({ type: actionTypes.UPDATE_REPORT_STATUS, payload: { reportId, status } }),
    assignReport: (reportId, department, staff) =>
      dispatch({ type: actionTypes.ASSIGN_REPORT, payload: { reportId, department, staff } }),
    addComment: (reportId, comment) =>
      dispatch({ type: actionTypes.ADD_COMMENT, payload: { reportId, comment } }),
    updateFilters: (filters) =>
      dispatch({ type: actionTypes.UPDATE_FILTERS, payload: filters }),
    markNotificationRead: (notificationId) =>
      dispatch({ type: actionTypes.MARK_NOTIFICATION_READ, payload: notificationId }),
    addStaff: (staffData) =>
      dispatch({ type: actionTypes.ADD_STAFF, payload: staffData }),
    updateStaff: (staffData) =>
      dispatch({ type: actionTypes.UPDATE_STAFF, payload: staffData }),
    deleteStaff: (staffId) =>
      dispatch({ type: actionTypes.DELETE_STAFF, payload: staffId })
  };

  return (
    <AppContext.Provider value={{ state, actions }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
