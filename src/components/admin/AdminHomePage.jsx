import React, { useState } from 'react';
import { 
  BarChart3,
  Users, 
  File, 
  Activity,
  Settings, 
  LogOut, 
  Plus,
  Search,
  Bell,
  Shield,
  ChevronDown,
  ChevronRight,
  AlertTriangle,
  TrendingUp,
  Database,
  UserCheck,
  CheckCircle,
  XCircle,
  HardDrive,
  Clock,
  UserPlus,
  Download,
  Eye,
  Edit,
  Trash2,
  Ban,
  UnlockKeyhole
} from 'lucide-react';

const AdminHomepage = () => {
  const [activeSection, setActiveSection] = useState('admin-overview');
  const [showCreateOptions, setShowCreateOptions] = useState(false);
  const [showRecentActivity, setShowRecentActivity] = useState(true);

  // Sample system statistics
  const systemStats = {
    totalUsers: 1247,
    totalDocuments: 8953,
    storageUsed: '2.4 TB',
    activeUsers: 892,
    documentsSharedToday: 156,
    newUsersThisWeek: 23
  };

  // Sample admin notifications
  const notifications = [
    { id: 1, type: 'warning', message: 'Storage usage at 85%', time: '5 min ago' },
    { id: 2, type: 'success', message: 'System backup completed', time: '1 hour ago' },
    { id: 3, type: 'info', message: '5 new user registrations', time: '2 hours ago' },
    { id: 4, type: 'warning', message: 'Suspicious activity detected', time: '3 hours ago' },
  ];

  // Sample recent admin activity data
  const recentActivities = [
    { id: 1, action: 'User Created', detail: 'John Doe registered', time: '5 min ago', icon: UserCheck, type: 'success' },
    { id: 2, action: 'Document Deleted', detail: 'Suspicious file removed', time: '15 min ago', icon: AlertTriangle, type: 'warning' },
    { id: 3, action: 'Storage Alert', detail: '80% capacity reached', time: '1 hour ago', icon: Database, type: 'info' },
    { id: 4, action: 'User Deactivated', detail: 'Inactive account suspended', time: '2 hours ago', icon: Shield, type: 'warning' },
  ];

  // Sample system alerts
  const systemAlerts = [
    { id: 1, message: 'System backup completed', severity: 'success', time: '30 min ago' },
    { id: 2, message: 'Storage usage at 85%', severity: 'warning', time: '1 hour ago' },
    { id: 3, message: '5 new user registrations', severity: 'info', time: '2 hours ago' },
  ];

  // Sample activity logs
  const activityLogs = [
    {
      id: 1,
      user: 'John Doe',
      action: 'UPLOAD',
      document: 'Annual Report 2024.pdf',
      timestamp: '2024-01-20 14:30:25',
      status: 'success'
    },
    {
      id: 2,
      user: 'Sarah Johnson',
      action: 'SHARE',
      document: 'Marketing Strategy.pptx',
      timestamp: '2024-01-20 13:45:12',
      status: 'success'
    },
    {
      id: 3,
      user: 'Emma Davis',
      action: 'DELETE',
      document: 'Old Meeting Notes.docx',
      timestamp: '2024-01-20 12:20:08',
      status: 'success'
    },
    {
      id: 4,
      user: 'Mike Chen',
      action: 'PERMISSION_CHANGE',
      document: 'Technical Specs.docx',
      timestamp: '2024-01-20 11:15:33',
      status: 'success'
    },
    {
      id: 5,
      user: 'John Doe',
      action: 'DOWNLOAD',
      document: 'Budget Report.xlsx',
      timestamp: '2024-01-20 10:30:45',
      status: 'failed'
    }
  ];

  // Sample user data
  const recentUsers = [
    { id: 1, name: 'John Doe', email: 'john@company.com', role: 'User', status: 'active', lastLogin: '2 hours ago', documentsCount: 23 },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@company.com', role: 'Manager', status: 'active', lastLogin: '1 day ago', documentsCount: 45 },
    { id: 3, name: 'Mike Chen', email: 'mike@company.com', role: 'User', status: 'inactive', lastLogin: '1 week ago', documentsCount: 12 },
    { id: 4, name: 'Emma Davis', email: 'emma@company.com', role: 'User', status: 'suspended', lastLogin: '3 days ago', documentsCount: 8 },
  ];

  // Sample document data
  const recentDocuments = [
    { id: 1, name: 'Annual Report 2024.pdf', owner: 'John Doe', size: '2.4 MB', uploaded: '2 hours ago', shares: 5, downloads: 12 },
    { id: 2, name: 'Marketing Strategy.pptx', owner: 'Sarah Johnson', size: '5.8 MB', uploaded: '1 day ago', shares: 8, downloads: 23 },
    { id: 3, name: 'Technical Specs.docx', owner: 'Mike Chen', size: '1.2 MB', uploaded: '3 days ago', shares: 3, downloads: 7 },
    { id: 4, name: 'Budget Report.xlsx', owner: 'Emma Davis', size: '890 KB', uploaded: '1 week ago', shares: 12, downloads: 34 },
  ];

  const adminSidebarItems = [
    { id: 'admin-overview', name: 'Overview', icon: BarChart3, description: 'System dashboard' },
    { id: 'admin-users', name: 'User Management', icon: Users, description: 'Manage all users' },
    { id: 'admin-documents', name: 'Document Management', icon: File, description: 'System-wide documents' },
    { id: 'admin-logs', name: 'Activity Logs', icon: Activity, description: 'System activity' },
    { id: 'admin-settings', name: 'System Settings', icon: Settings, description: 'Configuration' },
  ];

  const handleCreateOption = (type) => {
    if (type === 'user') {
      console.log('Opening create user dialog...');
    } else if (type === 'backup') {
      console.log('Initiating system backup...');
    }
    setShowCreateOptions(false);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle size={14} className="text-orange-500" />;
      case 'success':
        return <CheckCircle size={14} className="text-green-500" />;
      case 'error':
        return <AlertTriangle size={14} className="text-red-500" />;
      default:
        return <CheckCircle size={14} className="text-blue-500" />;
    }
  };

  const getActivityTypeColor = (type) => {
    const colors = {
      'success': '#16A34A',
      'warning': '#F59E0B',
      'error': '#DC2626',
      'info': '#3B82F6'
    };
    return colors[type] || '#6B7280';
  };

  const getSeverityColor = (severity) => {
    const colors = {
      'success': '#16A34A',
      'warning': '#F59E0B',
      'error': '#DC2626',
      'info': '#3B82F6'
    };
    return colors[severity] || '#6B7280';
  };

  const getActionBadgeColor = (action) => {
    const colors = {
      'UPLOAD': '#16A34A',
      'DOWNLOAD': '#3B82F6',
      'SHARE': '#7C3AED',
      'DELETE': '#DC2626',
      'PERMISSION_CHANGE': '#F59E0B'
    };
    return colors[action] || '#6B7280';
  };

  const getStatusIcon = (status) => {
    return status === 'success' ? 
      <CheckCircle size={16} className="text-green-500" /> : 
      <XCircle size={16} className="text-red-500" />;
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'active': { color: 'bg-green-100 text-green-800', label: 'Active' },
      'inactive': { color: 'bg-gray-100 text-gray-800', label: 'Inactive' },
      'suspended': { color: 'bg-red-100 text-red-800', label: 'Suspended' }
    };
    const config = statusConfig[status] || statusConfig.inactive;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const StatCard = ({ title, value, icon: Icon, color, subtitle, trend }) => (
    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div 
          className="w-12 h-12 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon size={24} style={{ color }} />
        </div>
        {trend && (
          <div className="flex items-center space-x-1 text-sm">
            <TrendingUp size={16} className="text-green-500" />
            <span className="text-green-500 font-medium">{trend}</span>
          </div>
        )}
      </div>
      <div className="mb-2">
        <span className="text-3xl font-bold text-gray-800">{value}</span>
      </div>
      <div>
        <p className="text-gray-600 font-medium">{title}</p>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'admin-overview':
        return (
          <div className="space-y-6">
            {/* Admin Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 text-lg">
                System administration and management panel
              </p>
            </div>

            {/* System Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <StatCard
                title="Total Users"
                value={systemStats.totalUsers.toLocaleString()}
                icon={Users}
                color="#1A2A80"
                subtitle="Registered accounts"
                trend="+12%"
              />
              <StatCard
                title="Total Documents"
                value={systemStats.totalDocuments.toLocaleString()}
                icon={File}
                color="#3B38A0"
                subtitle="Files stored"
                trend="+8%"
              />
              <StatCard
                title="Storage Used"
                value={systemStats.storageUsed}
                icon={HardDrive}
                color="#7A85C1"
                subtitle="Of total capacity"
              />
              <StatCard
                title="Active Users"
                value={systemStats.activeUsers.toLocaleString()}
                icon={Activity}
                color="#B2B0E8"
                subtitle="Last 30 days"
              />
              <StatCard
                title="Documents Shared Today"
                value={systemStats.documentsSharedToday}
                icon={TrendingUp}
                color="#3B38A0"
                subtitle="New shares"
              />
              <StatCard
                title="New Users This Week"
                value={systemStats.newUsersThisWeek}
                icon={UserPlus}
                color="#1A2A80"
                subtitle="Registrations"
              />
            </div>

            {/* Recent Activity Summary */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Activity className="mr-2" size={24} />
                Recent System Activity
              </h3>
              <div className="space-y-3">
                {activityLogs.slice(0, 5).map((log) => (
                  <div key={log.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${getActionBadgeColor(log.action)}20` }}
                      >
                        <Activity size={16} style={{ color: getActionBadgeColor(log.action) }} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">
                          <span className="text-blue-600">{log.user}</span> {log.action.toLowerCase().replace('_', ' ')}d{' '}
                          <span className="font-semibold">{log.document}</span>
                        </p>
                        <p className="text-sm text-gray-500">{log.timestamp}</p>
                      </div>
                    </div>
                    {getStatusIcon(log.status)}
                  </div>
                ))}
              </div>
              <button 
                className="w-full mt-4 text-center py-2 text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors"
                style={{ color: '#3B38A0' }}
              >
                View All Activity Logs
              </button>
            </div>
          </div>
        );

      case 'admin-users':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
                <p className="text-gray-600 mt-1">Manage system users and their permissions</p>
              </div>
              <button 
                className="px-4 py-2 rounded-lg text-white font-medium hover:opacity-90 transition-opacity flex items-center space-x-2"
                style={{ backgroundColor: '#1A2A80' }}
              >
                <UserPlus size={20} />
                <span>Add User</span>
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800">Recent Users</h3>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors">
                      All Users
                    </button>
                    <button className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors">
                      Active
                    </button>
                    <button className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors">
                      Suspended
                    </button>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Documents</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.role}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(user.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.lastLogin}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.documentsCount}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-800 p-1">
                              <Eye size={16} />
                            </button>
                            <button className="text-green-600 hover:text-green-800 p-1">
                              <Edit size={16} />
                            </button>
                            <button className="text-red-600 hover:text-red-800 p-1">
                              <Ban size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'admin-documents':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Document Management</h1>
                <p className="text-gray-600 mt-1">Monitor and manage all system documents</p>
              </div>
              <button 
                className="px-4 py-2 rounded-lg text-white font-medium hover:opacity-90 transition-opacity flex items-center space-x-2"
                style={{ backgroundColor: '#1A2A80' }}
              >
                <Download size={20} />
                <span>Export Report</span>
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">Recent Documents</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uploaded</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shares</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Downloads</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentDocuments.map((doc) => (
                      <tr key={doc.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <File size={20} className="text-gray-400 mr-3" />
                            <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{doc.owner}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.size}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.uploaded}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{doc.shares}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{doc.downloads}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-800 p-1">
                              <Eye size={16} />
                            </button>
                            <button className="text-green-600 hover:text-green-800 p-1">
                              <Download size={16} />
                            </button>
                            <button className="text-red-600 hover:text-red-800 p-1">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'admin-logs':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Activity Logs</h1>
                <p className="text-gray-600 mt-1">Monitor all system activities and user actions</p>
              </div>
              <button 
                className="px-4 py-2 rounded-lg text-white font-medium hover:opacity-90 transition-opacity flex items-center space-x-2"
                style={{ backgroundColor: '#1A2A80' }}
              >
                <Download size={20} />
                <span>Export Logs</span>
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {activityLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.user}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span 
                            className="px-2 py-1 rounded-full text-xs font-medium text-white"
                            style={{ backgroundColor: getActionBadgeColor(log.action) }}
                          >
                            {log.action.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.document}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.timestamp}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusIcon(log.status)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'admin-settings':
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-800">System Settings</h1>
              <p className="text-gray-600 mt-1">Configure system parameters and preferences</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* System Configuration */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Settings className="mr-2" size={20} />
                  System Configuration
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Storage Limit</label>
                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>3 TB</option>
                      <option>5 TB</option>
                      <option>10 TB</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Max File Size</label>
                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>100 MB</option>
                      <option>500 MB</option>
                      <option>1 GB</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Backup Frequency</label>
                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Daily</option>
                      <option>Weekly</option>
                      <option>Monthly</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Security Settings */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Shield className="mr-2" size={20} />
                  Security Settings
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">Two-Factor Authentication</label>
                    <div className="relative">
                      <input type="checkbox" className="sr-only" />
                      <div className="w-10 h-6 bg-gray-200 rounded-full cursor-pointer"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">Password Expiry</label>
                    <div className="relative">
                      <input type="checkbox" className="sr-only" defaultChecked />
                      <div className="w-10 h-6 bg-blue-600 rounded-full cursor-pointer"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">Login Monitoring</label>
                    <div className="relative">
                      <input type="checkbox" className="sr-only" defaultChecked />
                      <div className="w-10 h-6 bg-blue-600 rounded-full cursor-pointer"></div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout</label>
                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>15 minutes</option>
                      <option>30 minutes</option>
                      <option>1 hour</option>
                      <option>2 hours</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Save Settings Button */}
            <div className="flex justify-end">
              <button 
                className="px-6 py-3 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#1A2A80' }}
              >
                Save Settings
              </button>
            </div>
          </div>
        );

      default:
        return (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <Settings size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Section Not Found</h3>
              <p className="text-gray-600">The requested section could not be found.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Admin Sidebar */}
      <div 
        className="w-80 h-screen flex flex-col shadow-xl border-r border-opacity-20 overflow-y-auto"
        style={{ backgroundColor: '#1A2A80' }}
      >
        {/* Admin Create Button */}
        <div className="p-4">
          <div className="relative">
            <button
              onClick={() => setShowCreateOptions(!showCreateOptions)}
              className="w-full bg-white hover:bg-gray-50 text-gray-800 font-semibold py-3 px-4 rounded-lg shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <Plus size={20} />
              <span>Admin Actions</span>
            </button>

            {/* Admin Create Options Dropdown */}
            {showCreateOptions && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border z-50">
                <button
                  onClick={() => handleCreateOption('user')}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center space-x-3 transition-colors border-b"
                >
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: '#B2B0E8' }}
                  >
                    <Users size={16} style={{ color: '#1A2A80' }} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Create User</p>
                    <p className="text-xs text-gray-500">Add new user account</p>
                  </div>
                </button>
                <button
                  onClick={() => handleCreateOption('backup')}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center space-x-3 transition-colors"
                >
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: '#B2B0E8' }}
                  >
                    <Database size={16} style={{ color: '#1A2A80' }} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">System Backup</p>
                    <p className="text-xs text-gray-500">Create system backup</p>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Admin Navigation */}
        <nav className="px-4 space-y-2 flex-1">
          {adminSidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                  isActive 
                    ? 'bg-white bg-opacity-20 text-white shadow-lg' 
                    : 'text-gray-300 hover:bg-white hover:bg-opacity-10 hover:text-white'
                }`}
              >
                <Icon size={20} />
                <div className="flex-1">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs text-gray-400">{item.description}</div>
                </div>
              </button>
            );
          })}
        </nav>

        {/* System Alerts Section */}
        <div className="px-4 mt-4">
          <button
            onClick={() => setShowRecentActivity(!showRecentActivity)}
            className="w-full flex items-center justify-between text-gray-300 hover:text-white transition-colors mb-3"
          >
            <div className="flex items-center space-x-2">
              <AlertTriangle size={16} />
              <span className="font-medium text-sm">System Alerts</span>
            </div>
            {showRecentActivity ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>

          {showRecentActivity && (
            <div className="space-y-2 mb-4" style={{ maxHeight: '200px', overflowY: 'auto' }}>
              {systemAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-start space-x-2 px-3 py-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all duration-200 cursor-pointer"
                >
                  <div 
                    className="w-2 h-2 rounded-full flex-shrink-0 mt-2"
                    style={{ backgroundColor: getSeverityColor(alert.severity) }}
                  ></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-white font-medium">
                      {alert.message}
                    </p>
                    <p className="text-xs text-gray-400">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Admin Activity Section */}
        <div className="px-4">
          <div className="text-gray-300 mb-3">
            <div className="flex items-center space-x-2">
              <Activity size={16} />
              <span className="font-medium text-sm">Recent Activity</span>
            </div>
          </div>

          <div className="space-y-2 mb-4" style={{ maxHeight: '200px', overflowY: 'auto' }}>
            {recentActivities.map((activity) => {
              const ActivityIcon = activity.icon;
              return (
                <div
                  key={activity.id}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all duration-200 cursor-pointer"
                >
                  <div 
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: getActivityTypeColor(activity.type) + '40' }}
                  >
                    <ActivityIcon size={12} style={{ color: getActivityTypeColor(activity.type) }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-white font-medium truncate">
                      {activity.action}
                    </p>
                    <p className="text-xs text-gray-400 truncate">{activity.detail}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* System Status */}
        <div className="px-4 py-3 border-t border-white border-opacity-20">
          <div className="text-xs text-gray-300 mb-2">System Status</div>
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-green-400"></div>
            <span className="text-xs text-gray-400">All systems operational</span>
          </div>
          <div className="text-xs text-gray-400 mb-2">Server Uptime: 99.9%</div>
          <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
            <div 
              className="h-2 rounded-full"
              style={{ backgroundColor: '#7A85C1', width: '85%' }}
            ></div>
          </div>
          <div className="text-xs text-gray-400 mt-1">Storage: 2.4TB of 3TB used</div>
        </div>

        {/* Admin Profile & Logout */}
        <div className="p-4 border-t border-white border-opacity-20">
          <div className="flex items-center space-x-3 mb-4 p-3 rounded-lg bg-white bg-opacity-10">
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm"
              style={{ backgroundColor: '#3B38A0' }}
            >
              <Shield size={16} />
            </div>
            <div>
              <p className="text-white font-medium text-sm">Administrator</p>
              <p className="text-gray-400 text-xs">System Admin</p>
            </div>
          </div>
          
          <button
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-red-500 hover:bg-opacity-20 hover:text-white transition-all duration-200"
          >
            <LogOut size={20} />
            <span className="font-medium">Log Out</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Admin Header */}
        <header className="bg-white shadow-lg border-b-2 sticky top-0 z-40" style={{ borderColor: '#7A85C1' }}>
          <div className="flex items-center justify-between px-6 py-4">
            {/* Left side - Admin Logo */}
            <div className="flex items-center space-x-3">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-xl"
                style={{ backgroundColor: '#1A2A80' }}
              >
                <Shield size={20} />
              </div>
              <div>
                <h1 
                  className="text-2xl font-bold"
                  style={{ color: '#1A2A80' }}
                >
                  Admin Panel
                </h1>
                <p className="text-xs text-gray-500">Document Sharing System</p>
              </div>
            </div>

            {/* Center - Admin Search */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search users, documents, logs..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all shadow-sm hover:shadow-md"
                  style={{ 
                    '--tw-ring-color': '#7A85C1',
                    boxShadow: 'focus:0 0 0 3px rgba(122, 133, 193, 0.1)'
                  }}
                />
              </div>
            </div>

            {/* Right side - Admin Actions and Profile */}
            <div className="flex items-center space-x-4">
              {/* System Status Indicator */}
              <div className="flex items-center space-x-2 px-3 py-2 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-green-700">System Online</span>
              </div>

              {/* Quick Settings */}
              <button 
                className="p-3 rounded-xl hover:bg-gray-100 transition-colors"
                title="Quick Settings"
              >
                <Settings size={20} className="text-gray-600" />
              </button>
              
              {/* Admin Notifications */}
              <div className="relative">
                <button 
                  className="relative p-3 rounded-xl hover:bg-gray-100 transition-colors group"
                  title="Admin Notifications"
                >
                  <Bell size={20} className="text-gray-600" />
                  <span 
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs flex items-center justify-center text-white font-medium"
                    style={{ backgroundColor: '#DC2626' }}
                  >
                    {notifications.filter(n => n.type === 'warning' || n.type === 'error').length}
                  </span>
                  
                  {/* Notification Dropdown */}
                  <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-2xl border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="font-semibold text-gray-800">System Notifications</h3>
                      <p className="text-sm text-gray-500">Recent admin alerts and updates</p>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div key={notification.id} className="p-4 hover:bg-gray-50 border-b border-gray-100 last:border-b-0">
                          <div className="flex items-start space-x-3">
                            {getNotificationIcon(notification.type)}
                            <div className="flex-1">
                              <p className="text-sm text-gray-800 font-medium">{notification.message}</p>
                              <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 border-t border-gray-200 text-center">
                      <button 
                        className="text-sm font-medium hover:underline"
                        style={{ color: '#3B38A0' }}
                      >
                        View All Notifications
                      </button>
                    </div>
                  </div>
                </button>
              </div>
              
              {/* Admin Profile */}
              <div className="flex items-center space-x-3 cursor-pointer group">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-gray-800 group-hover:text-gray-600 transition-colors">Admin User</p>
                  <p className="text-xs text-gray-500">System Administrator</p>
                </div>
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-semibold shadow-lg hover:shadow-xl transition-shadow">
                    <Shield size={18} />
                  </div>
                  {/* Admin Badge */}
                  <div 
                    className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: '#1A2A80' }}
                  >
                    <CheckCircle size={10} className="text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Admin Status Bar */}
          <div 
            className="px-6 py-2 text-sm flex items-center justify-between"
            style={{ backgroundColor: '#F8F9FA' }}
          >
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-600">Database: Connected</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-gray-600">API: Healthy</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                <span className="text-gray-600">Storage: 85% Used</span>
              </div>
            </div>
            <div className="text-gray-500">
              Last backup: 2 hours ago • Next scheduled: 22:00 today
            </div>
          </div>
        </header>

        {/* Admin Dashboard Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHomepage;