import React, { useState } from 'react';
import { 
  File, 
  Folder, 
  Users, 
  Search, 
  Bell,
  Home, 
  HardDrive, 
  Share2, 
  Settings, 
  LogOut, 
  Plus,
  Upload,
  FolderPlus,
  Clock,
  ChevronDown,
  ChevronRight,
  MoreVertical,
  Eye,
  Download,
  Star,
  TrendingUp,
  RefreshCw
} from 'lucide-react';

const UserHomepage = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [showCreateOptions, setShowCreateOptions] = useState(false);
  const [showRecentActivity, setShowRecentActivity] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Sample data
  const quickStats = {
    totalDocuments: 24,
    sharedFiles: 8,
    storageUsed: '2.4 GB',
    recentViews: 15
  };

  const recentDocuments = [
    {
      id: 1,
      name: 'Annual Report 2024.pdf',
      type: 'pdf',
      size: '4.2 MB',
      modified: 'Jan 20, 2024',
      isPublic: false,
      isStarred: true
    },
    {
      id: 2,
      name: 'Marketing Strategy.pptx',
      type: 'pptx',
      size: '8.5 MB',
      modified: 'Jan 19, 2024',
      isPublic: true,
      isStarred: false
    },
    {
      id: 3,
      name: 'Technical Specs.docx',
      type: 'docx',
      size: '2.1 MB',
      modified: 'Jan 18, 2024',
      isPublic: false,
      isStarred: true
    },
    {
      id: 4,
      name: 'Budget Analysis.xlsx',
      type: 'xlsx',
      size: '3.2 MB',
      modified: 'Jan 17, 2024',
      isPublic: false,
      isStarred: false
    }
  ];

  const recentFolders = [
    { id: 1, name: 'Project Files', itemCount: 12, modified: 'Jan 20, 2024', isStarred: true },
    { id: 2, name: 'Templates', itemCount: 8, modified: 'Jan 19, 2024', isStarred: false },
    { id: 3, name: 'Archives', itemCount: 25, modified: 'Jan 15, 2024', isStarred: false },
    { id: 4, name: 'Shared Resources', itemCount: 6, modified: 'Jan 12, 2024', isStarred: true }
  ];

  const sharedDocuments = [
    {
      id: 1,
      name: 'Team Guidelines.pdf',
      owner: 'Sarah Johnson',
      sharedDate: 'Jan 19, 2024',
      permission: 'Read Only',
      avatar: 'SJ'
    },
    {
      id: 2,
      name: 'Meeting Notes.docx',
      owner: 'Mike Chen',
      sharedDate: 'Jan 18, 2024',
      permission: 'Full Access',
      avatar: 'MC'
    },
    {
      id: 3,
      name: 'Design Assets.zip',
      owner: 'Emma Davis',
      sharedDate: 'Jan 17, 2024',
      permission: 'Read Only',
      avatar: 'ED'
    }
  ];

  const recentActivities = [
    { id: 1, action: 'uploaded', file: 'Report.pdf', time: '2 min ago', icon: Upload },
    { id: 2, action: 'created', file: 'New Folder', time: '5 min ago', icon: FolderPlus },
    { id: 3, action: 'shared', file: 'Presentation.pptx', time: '1 hour ago', icon: Share2 },
    { id: 4, action: 'downloaded', file: 'Image.jpg', time: '2 hours ago', icon: File }
  ];

  const sidebarItems = [
    { id: 'dashboard', name: 'Dashboard', icon: Home },
    { id: 'mydrive', name: 'My Drive', icon: HardDrive },
    { id: 'shared', name: 'Shared with me', icon: Share2 },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  const getFileTypeColor = (type) => {
    const colors = {
      'pdf': '#DC2626',
      'docx': '#2563EB',
      'xlsx': '#16A34A',
      'pptx': '#EA580C',
      'default': '#6B7280'
    };
    return colors[type] || colors.default;
  };

  const handleCreateOption = (type) => {
    if (type === 'upload') {
      console.log('Opening file upload dialog...');
    } else if (type === 'folder') {
      console.log('Creating new folder...');
    }
    setShowCreateOptions(false);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div 
        className="w-80 h-screen flex flex-col shadow-xl border-r border-opacity-20"
        style={{ backgroundColor: '#1A2A80' }}
      >
        {/* Create Button */}
        <div className="p-4">
          <div className="relative">
            <button
              onClick={() => setShowCreateOptions(!showCreateOptions)}
              className="w-full bg-white hover:bg-gray-50 text-gray-800 font-semibold py-3 px-4 rounded-lg shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <Plus size={20} />
              <span>Create</span>
            </button>

            {/* Create Options Dropdown */}
            {showCreateOptions && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border z-50">
                <button
                  onClick={() => handleCreateOption('folder')}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center space-x-3 transition-colors border-b"
                >
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: '#B2B0E8' }}
                  >
                    <FolderPlus size={16} style={{ color: '#1A2A80' }} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">New Folder</p>
                    <p className="text-xs text-gray-500">Create a new folder</p>
                  </div>
                </button>
                <button
                  onClick={() => handleCreateOption('upload')}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center space-x-3 transition-colors"
                >
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: '#B2B0E8' }}
                  >
                    <Upload size={16} style={{ color: '#1A2A80' }} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Upload Document</p>
                    <p className="text-xs text-gray-500">Upload files from device</p>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-4 space-y-2">
          {sidebarItems.map((item) => {
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
                <span className="font-medium">{item.name}</span>
              </button>
            );
          })}
        </nav>

        {/* Recent Activity Section */}
        <div className="px-4 mt-6 flex-1 overflow-hidden">
          <button
            onClick={() => setShowRecentActivity(!showRecentActivity)}
            className="w-full flex items-center justify-between text-gray-300 hover:text-white transition-colors mb-3"
          >
            <div className="flex items-center space-x-2">
              <Clock size={16} />
              <span className="font-medium text-sm">Recent Activity</span>
            </div>
            {showRecentActivity ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>

          {showRecentActivity && (
            <div className="space-y-2 overflow-y-auto" style={{ maxHeight: '300px' }}>
              {recentActivities.map((activity) => {
                const ActivityIcon = activity.icon;
                return (
                  <div
                    key={activity.id}
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all duration-200 cursor-pointer"
                  >
                    <div 
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: '#7A85C1' }}
                    >
                      <ActivityIcon size={12} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-white font-medium truncate">
                        {activity.action} <span className="text-gray-300">{activity.file}</span>
                      </p>
                      <p className="text-xs text-gray-400">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Storage Info */}
        <div className="px-4 py-3 border-t border-white border-opacity-20">
          <div className="text-xs text-gray-300 mb-2">Storage Used</div>
          <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
            <div 
              className="h-2 rounded-full"
              style={{ backgroundColor: '#7A85C1', width: '65%' }}
            ></div>
          </div>
          <div className="text-xs text-gray-400 mt-1">6.5 GB of 10 GB used</div>
        </div>

        {/* Logout */}
        <div className="p-4 border-t border-white border-opacity-20">
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
        {/* Header */}
        <header className="bg-white shadow-lg border-b-2 sticky top-0 z-40" style={{ borderColor: '#7A85C1' }}>
          <div className="flex items-center justify-between px-6 py-4">
            {/* Left side - Logo */}
            <div className="flex items-center space-x-3">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-xl"
                style={{ backgroundColor: '#1A2A80' }}
              >
                DS
              </div>
              <h1 
                className="text-2xl font-bold"
                style={{ color: '#1A2A80' }}
              >
                Document Sharing
              </h1>
            </div>

            {/* Center - Search */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search documents, folders, and people..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all shadow-sm hover:shadow-md"
                  style={{ 
                    '--tw-ring-color': '#7A85C1',
                    boxShadow: 'focus:0 0 0 3px rgba(122, 133, 193, 0.1)'
                  }}
                />
              </div>
            </div>

            {/* Right side - Notifications and Profile */}
            <div className="flex items-center space-x-4">
              <button 
                className="relative p-3 rounded-xl hover:bg-gray-100 transition-colors"
                title="Notifications"
              >
                <Bell size={20} className="text-gray-600" />
                <span 
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs flex items-center justify-center text-white font-medium"
                  style={{ backgroundColor: '#3B38A0' }}
                >
                  3
                </span>
              </button>
              
              {/* User Profile */}
              <div className="flex items-center space-x-3 cursor-pointer group">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-gray-800 group-hover:text-gray-600 transition-colors">John Doe</p>
                  <p className="text-xs text-gray-500">john.doe@example.com</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold shadow-lg hover:shadow-xl transition-shadow">
                  JD
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Welcome Section */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">
                  Welcome back! 👋
                </h1>
                <p className="text-gray-600 text-lg">
                  Here's what's happening with your documents today
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleRefresh}
                  disabled={refreshing}
                  className="p-2 text-gray-600 hover:text-gray-800 rounded-lg hover:bg-gray-100 transition-colors"
                  title="Refresh"
                >
                  <RefreshCw size={20} className={refreshing ? 'animate-spin' : ''} />
                </button>
                <button
                  onClick={() => setShowCreateOptions(true)}
                  className="flex items-center space-x-2 px-4 py-2 text-white rounded-lg font-medium transition-all hover:shadow-lg"
                  style={{ backgroundColor: '#3B38A0' }}
                >
                  <Plus size={20} />
                  <span>Create</span>
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: '#3B38A020' }}
                  >
                    <File size={24} style={{ color: '#3B38A0' }} />
                  </div>
                  <span className="text-2xl font-bold text-gray-800">{quickStats.totalDocuments}</span>
                </div>
                <p className="text-gray-600 font-medium">Total Documents</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: '#7A85C120' }}
                  >
                    <Users size={24} style={{ color: '#7A85C1' }} />
                  </div>
                  <span className="text-2xl font-bold text-gray-800">{quickStats.sharedFiles}</span>
                </div>
                <p className="text-gray-600 font-medium">Shared Files</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: '#B2B0E820' }}
                  >
                    <TrendingUp size={24} style={{ color: '#B2B0E8' }} />
                  </div>
                  <span className="text-2xl font-bold text-gray-800">{quickStats.storageUsed}</span>
                </div>
                <p className="text-gray-600 font-medium">Storage Used</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: '#1A2A8020' }}
                  >
                    <Eye size={24} style={{ color: '#1A2A80' }} />
                  </div>
                  <span className="text-2xl font-bold text-gray-800">{quickStats.recentViews}</span>
                </div>
                <p className="text-gray-600 font-medium">Recent Views</p>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Recent Documents and Folders */}
              <div className="xl:col-span-2">
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                      <Folder className="mr-2" size={20} />
                      Recent Folders
                    </h2>
                  </div>
                  <div className="space-y-3">
                    {recentFolders.map((folder) => (
                      <div key={folder.id} className="group flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-all duration-200 border border-transparent hover:border-gray-200">
                        <div className="flex items-center space-x-4">
                          <div 
                            className="w-12 h-12 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: '#B2B0E815' }}
                          >
                            <Folder size={20} style={{ color: '#1A2A80' }} />
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <p className="font-semibold text-gray-800 group-hover:text-gray-600 transition-colors">
                                {folder.name}
                              </p>
                              {folder.isStarred && (
                                <Star size={14} className="text-yellow-500 fill-current" />
                              )}
                            </div>
                            <p className="text-sm text-gray-500">
                              {folder.itemCount} items • Modified {folder.modified}
                            </p>
                          </div>
                        </div>
                        <button className="opacity-0 group-hover:opacity-100 p-2 hover:bg-gray-200 rounded-lg transition-all">
                          <MoreVertical size={16} className="text-gray-400" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                      <Clock className="mr-2" size={20} />
                      Recent Documents
                    </h2>
                    <button 
                      className="text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                      style={{ color: '#3B38A0' }}
                    >
                      View All
                    </button>
                  </div>
                  <div className="space-y-3">
                    {recentDocuments.map((doc) => (
                      <div key={doc.id} className="group flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-all duration-200 border border-transparent hover:border-gray-200">
                        <div className="flex items-center space-x-4">
                          <div 
                            className="w-12 h-12 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: `${getFileTypeColor(doc.type)}15` }}
                          >
                            <File size={20} style={{ color: getFileTypeColor(doc.type) }} />
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <p className="font-semibold text-gray-800 group-hover:text-gray-600 transition-colors">
                                {doc.name}
                              </p>
                              {doc.isStarred && (
                                <Star size={14} className="text-yellow-500 fill-current" />
                              )}
                            </div>
                            <p className="text-sm text-gray-500">
                              {doc.size} • Modified {doc.modified}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {doc.isPublic && (
                            <span 
                              className="px-2 py-1 text-xs font-medium rounded-full text-white"
                              style={{ backgroundColor: '#3B38A0' }}
                            >
                              Public
                            </span>
                          )}
                          <button className="opacity-0 group-hover:opacity-100 p-2 hover:bg-gray-200 rounded-lg transition-all">
                            <MoreVertical size={16} className="text-gray-400" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Shared Documents */}
              <div>
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                      <Users className="mr-2" size={20} />
                      Shared with Me
                    </h2>
                  </div>
                  <div className="space-y-4">
                    {sharedDocuments.map((doc) => (
                      <div key={doc.id} className="group p-4 hover:bg-gray-50 rounded-xl transition-all duration-200">
                        <div className="flex items-start space-x-3">
                          <div 
                            className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-semibold text-sm flex-shrink-0"
                            style={{ backgroundColor: '#7A85C1' }}
                          >
                            {doc.avatar}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-800 truncate group-hover:text-gray-600 transition-colors">
                              {doc.name}
                            </p>
                            <p className="text-sm text-gray-500 mb-2">
                              by {doc.owner}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-400">{doc.sharedDate}</span>
                              <span 
                                className="px-2 py-1 text-xs font-medium rounded-full text-white"
                                style={{ 
                                  backgroundColor: doc.permission === 'Full Access' ? '#3B38A0' : '#7A85C1'
                                }}
                              >
                                {doc.permission}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button 
                    className="w-full mt-4 text-sm font-medium py-2 rounded-lg hover:bg-gray-100 transition-colors"
                    style={{ color: '#3B38A0' }}
                  >
                    View All Shared Files
                  </button>
                </div>

                {/* Activity Timeline */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                    <TrendingUp className="mr-2" size={20} />
                    Recent Activity
                  </h2>
                  <div className="space-y-4">
                    {recentActivities.slice(0, 3).map((activity) => {
                      const ActivityIcon = activity.icon;
                      return (
                        <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                          <div 
                            className="w-8 h-8 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: '#B2B0E8' }}
                          >
                            <ActivityIcon size={16} style={{ color: '#1A2A80' }} />
                          </div>
                          <div className="flex-1">
                            <p className="text-gray-800">
                              <span className="font-medium">You</span> {activity.action} <span className="font-medium">{activity.file}</span>
                            </p>
                            <p className="text-sm text-gray-500">{activity.time}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer 
          className="border-t-2 py-6 px-6"
          style={{ borderColor: '#B2B0E8', backgroundColor: '#1A2A80' }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
              {/* Company Info */}
              <div>
                <h3 className="text-white font-semibold mb-3">Document Sharing System</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Secure, efficient, and collaborative document management platform 
                  built with modern technologies.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-white font-semibold mb-3">Quick Links</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors">
                      Live Chat Support
                    </a>
                  </li>
                  <li>
                    <span className="text-gray-300">
                      Mon-Fri: 9AM-6PM PST
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white border-opacity-20 pt-4">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
                <p className="text-gray-300 text-sm">
                  © 2024 Document Sharing System. All rights reserved.
                </p>
                <div className="flex items-center space-x-6 text-xs text-gray-400">
                  <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
                  <span>•</span>
                  <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
                  <span>•</span>
                  <a href="#" className="hover:text-gray-300 transition-colors">Cookie Policy</a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default UserHomepage;