import React, { useState, useEffect } from 'react';
import { 
  File, 
  Folder, 
  MoreVertical, 
  Users, 
  Eye,
  Download,
  Star,
  Clock,
  TrendingUp,
  Plus,
  Upload,
  FolderPlus,
  RefreshCw,
  Search
} from 'lucide-react';
import { documentAPI, folderAPI, activityAPI, utils } from '../../services/api';
import CreateFormModal from '../CreateFormModel';


const Dashboard = () => {
  const [recentDocuments, setRecentDocuments] = useState([]);
  const [recentFolders, setRecentFolders] = useState([]);
  const [sharedDocuments, setSharedDocuments] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [quickStats, setQuickStats] = useState({
    totalDocuments: 0,
    sharedFiles: 0,
    storageUsed: '0 GB',
    recentViews: 0
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Load dashboard data
  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Load all data in parallel
      const [
        myDocuments,
        myFolders,
        shared,
        activities
      ] = await Promise.all([
        documentAPI.getMy(),
        folderAPI.getAll(),
        documentAPI.getShared(),
        activityAPI.getMy().catch(() => []) // Optional, don't fail if not available
      ]);

      // Process recent documents (last 10, sorted by creation date)
      const sortedDocs = myDocuments
        .sort((a, b) => new Date(b.createdAt || b.uploadDate) - new Date(a.createdAt || a.uploadDate))
        .slice(0, 4)
        .map(doc => ({
          id: doc.id,
          name: doc.fileName || doc.name,
          type: doc.fileType || 'unknown',
          size: utils.formatFileSize(doc.size || 0),
          modified: utils.formatDate(doc.lastModified || doc.createdAt),
          isPublic: doc.isPublic || false,
          isStarred: doc.isStarred || false
        }));

      // Process recent folders
      const sortedFolders = myFolders
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 4)
        .map(folder => ({
          id: folder.id,
          name: folder.name,
          itemCount: folder.itemCount || 0,
          modified: utils.formatDate(folder.lastModified || folder.createdAt),
          isStarred: folder.isStarred || false
        }));

      // Process shared documents
      const processedShared = shared.slice(0, 3).map(doc => ({
        id: doc.id,
        name: doc.fileName || doc.name,
        owner: doc.owner?.name || 'Unknown',
        sharedDate: utils.formatDate(doc.sharedAt || doc.createdAt),
        permission: doc.permission || 'Read Only',
        avatar: doc.owner?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'
      }));

      // Process recent activities
      const processedActivities = activities.slice(0, 3).map(activity => ({
        id: activity.id,
        action: activity.action,
        file: activity.documentName || 'Unknown file',
        time: utils.formatDate(activity.timestamp),
        user: activity.userName || 'You'
      }));

      // Calculate stats
      const totalStorage = myDocuments.reduce((sum, doc) => sum + (doc.size || 0), 0);
      
      setRecentDocuments(sortedDocs);
      setRecentFolders(sortedFolders);
      setSharedDocuments(processedShared);
      setRecentActivities(processedActivities);
      setQuickStats({
        totalDocuments: myDocuments.length,
        sharedFiles: shared.length,
        storageUsed: utils.formatFileSize(totalStorage),
        recentViews: activities.filter(a => a.action === 'VIEW').length
      });

    } catch (err) {
      console.error('Error loading dashboard data:', err);
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Refresh data
  const handleRefresh = async () => {
    setRefreshing(true);
    await loadDashboardData();
    setRefreshing(false);
  };

  // Handle successful creation
  const handleCreateSuccess = (type, item) => {
    // Refresh the dashboard data to show new item
    loadDashboardData();
  };

  // Load data on component mount
  useEffect(() => {
    loadDashboardData();
  }, []);

  const getFileTypeColor = (type) => {
    return utils.getFileTypeColor(type);
  };

  const getActivityIcon = (action) => {
    switch (action?.toLowerCase()) {
      case 'upload':
      case 'create':
        return Upload;
      case 'share':
        return Users;
      case 'download':
        return Download;
      case 'view':
        return Eye;
      case 'folder_create':
        return FolderPlus;
      default:
        return File;
    }
  };

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-gray-200 h-32 rounded-xl"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 bg-gray-200 h-96 rounded-xl"></div>
            <div className="bg-gray-200 h-96 rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
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
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 px-4 py-2 text-white rounded-lg font-medium transition-all hover:shadow-lg"
            style={{ backgroundColor: '#3B38A0' }}
          >
            <Plus size={20} />
            <span>Create</span>
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

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
              {recentFolders.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <FolderPlus size={32} className="mx-auto mb-2 opacity-50" />
                  <p>No folders yet. Create your first folder!</p>
                </div>
              ) : (
                recentFolders.map((folder) => (
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
                ))
              )}
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
              {recentDocuments.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Upload size={32} className="mx-auto mb-2 opacity-50" />
                  <p>No documents yet. Upload your first file!</p>
                </div>
              ) : (
                recentDocuments.map((doc) => (
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
                ))
              )}
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
              {sharedDocuments.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Users size={32} className="mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No shared documents yet</p>
                </div>
              ) : (
                sharedDocuments.map((doc) => (
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
                ))
              )}
            </div>
            {sharedDocuments.length > 0 && (
              <button 
                className="w-full mt-4 text-sm font-medium py-2 rounded-lg hover:bg-gray-100 transition-colors"
                style={{ color: '#3B38A0' }}
              >
                View All Shared Files
              </button>
            )}
          </div>

          {/* Activity Timeline */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <TrendingUp className="mr-2" size={20} />
              Recent Activity
            </h2>
            <div className="space-y-4">
              {recentActivities.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <TrendingUp size={32} className="mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No recent activity</p>
                </div>
              ) : (
                recentActivities.map((activity) => {
                  const ActivityIcon = getActivityIcon(activity.action);
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
                          <span className="font-medium">{activity.user}</span> {activity.action.toLowerCase()}d <span className="font-medium">{activity.file}</span>
                        </p>
                        <p className="text-sm text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Create Form Modal */}
      <CreateFormModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={handleCreateSuccess}
      />
    </div>
  );
};

export default Dashboard;
