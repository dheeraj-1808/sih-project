# Civic Issues Admin Portal

A modern, responsive admin web portal for managing civic issues built with React and TailwindCSS. This application provides a comprehensive dashboard for tracking, managing, and analyzing civic reports and issues.

## 🚀 Features

### Core Functionality
- **User Authentication** - Secure login system with demo credentials
- **Dashboard Overview** - Real-time statistics and recent reports
- **Report Management** - Complete CRUD operations for civic reports
- **Analytics & Insights** - Interactive charts and performance metrics
- **Staff Management** - Department and staff assignment system
- **Notifications** - Real-time notification panel
- **Settings** - User preferences and system configuration

### Pages & Components
1. **Login Page** - Clean authentication interface
2. **Dashboard** - Overview with stats cards, recent reports, and quick actions
3. **Reports Page** - Filterable table with search and bulk operations
4. **Report Details Modal** - Comprehensive report view with status management
5. **Analytics Page** - Interactive charts and performance metrics
6. **Settings Page** - User profile, security, and notification preferences

### UI/UX Features
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Modern UI** - Clean, professional interface with TailwindCSS
- **Interactive Components** - Modals, dropdowns, charts, and notifications
- **Status Management** - Color-coded status indicators and priority levels
- **Real-time Updates** - Context-based state management

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Styling**: TailwindCSS 3.2
- **Routing**: React Router DOM 6
- **Charts**: Recharts 2.5
- **Icons**: Lucide React
- **State Management**: React Context API
- **Build Tool**: Create React App

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd civic-issues-admin-portal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔐 Demo Credentials

Use these credentials to access the admin portal:

- **Username**: `admin`
- **Password**: `admin`

## 📱 Usage

### Login
1. Enter the demo credentials above
2. Click "Sign in" to access the dashboard

### Dashboard
- View real-time statistics (Total Reports, Pending, In Progress, Resolved)
- Access recent reports with quick actions
- Use quick action buttons for common tasks
- View issue locations on the map placeholder

### Reports Management
- Browse all reports in a filterable table
- Use search bar to find specific reports
- Filter by category, status, department, and priority
- Click "View" to open detailed report modal
- Update report status and assign departments

### Report Details
- View comprehensive report information
- See citizen contact details and images
- Add comments and notes
- Change report status (Pending → In Progress → Resolved)
- Assign reports to departments

### Analytics
- View reports by category (bar chart)
- See status distribution (pie chart)
- Analyze weekly and monthly trends
- Review department performance metrics

### Settings
- Update profile information
- Change password securely
- Configure notification preferences
- Set system preferences
- Access logout functionality

## 🎨 Design System

### Color Scheme
- **Primary**: Blue (#3b82f6)
- **Success**: Green (#22c55e)
- **Warning**: Yellow (#f59e0b)
- **Danger**: Red (#ef4444)
- **Gray Scale**: Various shades for text and backgrounds

### Status Colors
- **Pending**: Red background with red text
- **In Progress**: Yellow background with yellow text
- **Resolved**: Green background with green text

### Priority Levels
- **High**: Red indicator
- **Medium**: Yellow indicator
- **Low**: Green indicator

## 📊 Data Structure

The application uses comprehensive dummy data including:

- **Reports**: 6 sample reports with full details
- **Departments**: 6 city departments with staff counts
- **Staff**: 6 staff members with workload information
- **Notifications**: 3 sample notifications
- **Analytics**: Chart data for trends and metrics

## 🔧 Customization

### Adding New Pages
1. Create a new component in `src/pages/`
2. Add the route in `src/App.js`
3. Update the sidebar navigation in `src/components/layout/Sidebar.js`

### Modifying Data
- Update dummy data in `src/data/dummyData.js`
- Modify the context state in `src/context/AppContext.js`

### Styling Changes
- Customize TailwindCSS configuration in `tailwind.config.js`
- Add custom styles in `src/index.css`
- Modify component styles using Tailwind classes

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Sidebar.js
│   │   ├── Navbar.js
│   │   └── NotificationsPanel.js
│   ├── ui/
│   │   ├── Button.js
│   │   ├── Card.js
│   │   ├── Modal.js
│   │   ├── Input.js
│   │   └── StatusBadge.js
│   └── ReportDetailsModal.js
├── context/
│   └── AppContext.js
├── data/
│   └── dummyData.js
├── pages/
│   ├── Login.js
│   ├── Dashboard.js
│   ├── Reports.js
│   ├── Analytics.js
│   └── Settings.js
├── App.js
├── index.js
└── index.css
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Static Hosting
The built files in the `build` folder can be deployed to any static hosting service like:
- Vercel
- Netlify
- AWS S3
- GitHub Pages

## 🔮 Future Enhancements

- **Backend Integration**: Connect to a real API
- **Real-time Updates**: WebSocket integration
- **Advanced Filtering**: More filter options and saved filters
- **Bulk Operations**: Select multiple reports for batch actions
- **Export Functionality**: PDF and Excel export
- **Mobile App**: React Native version
- **Advanced Analytics**: More chart types and metrics
- **User Management**: Multiple user roles and permissions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support or questions, please open an issue in the repository or contact the development team.

---

**Built with ❤️ using React and TailwindCSS**
