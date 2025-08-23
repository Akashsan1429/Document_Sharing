import React, { useState } from 'react';
import { 
  Users, 
  File, 
  Search, 
  Filter,
  MoreVertical,
  Download,
  Eye,
  Star,
  Clock,
  Shield,
  User,
  Calendar
} from 'lucide-react';

const SharedWithMe = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all'); // all, read_only, full_access
  const [sortBy, setSortBy] = useState('recent'); // recent, name, owner

  // Sample shared documents data
  const sharedDocuments = [
    {
      id: 1,
      name: 'Marketing Strategy 2024.pptx',
      type: 'pptx',
      size: '5.2 MB',
      owner: {
        name: 'Sarah Johnson',
        email: 'sarah.j@company.com',
        avatar: 'SJ'
      },
      sharedDate: '2024-01-15',
      permission: 'Read Only',
      isStarred: true,
      lastAccessed: '2 hours ago',
      description: 'Comprehensive marketing strategy for 2024 including market analysis and growth plans.'
    },
    {
      id: 2,
      name: 'Technical Architecture.pdf',
      type: 'pdf',
      size: '3.8 MB',
      owner: {
        name: 'Mike Chen',
        email: 'mike.c@company.com',
        avatar: 'MC'
      },
      sharedDate: '2024-01-10',
      permission: 'Full Access',
      isStarred: false,
      lastAccessed: '1 day ago',
      description: 'System architecture documentation and technical specifications.'
    },
    {
      id: 3,
      name: 'Budget Proposal Q1.xlsx',
      type: 'xlsx',
      size: '2.1 MB',
      owner: {
        name: 'Emma Davis',
        email: 'emma.d@company.com',
        avatar: 'ED'
      },
      sharedDate: '2024-01-08',
      permission: 'Read Only',
      isStarred: true,
      lastAccessed: '3 days ago',
      description: 'First quarter budget proposal with detailed financial projections.'
    },
    {
      id: 4,
      name: 'Team Meeting Minutes.docx',
      type: 'docx',
      size: '1.2 MB',
      owner: {
        name: 'Alex Rodriguez',
        email: 'alex.r@company.com',
        avatar: 'AR'
      },
      sharedDate: '2024-01-05',
      permission: 'Full Access',
      isStarred: false,
      lastAccessed: '1 week ago',
      description: 'Meeting minutes from weekly team sync and action items.'
    },
    {
      id: 5,
      name: 'Design Guidelines.pdf',
      type: 'pdf',
      size: '8.5 MB',
      owner: {
        name: 'Lisa Park',
        email: 'lisa.p@company.com',
        avatar: 'LP'
      },
      sharedDate: '2024-01-03',
      permission: 'Read Only',
      isStarred: false,
      lastAccessed: '2 weeks ago',
      description: 'Brand design guidelines and style specifications for the company.'
    }
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const filteredDocuments = sharedDocuments
    .filter(doc => {
      const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           doc.owner.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterBy === 'all' || 
                           (filterBy === 'read_only' && doc.permission === 'Read Only') ||
                           (filterBy === 'full_access' && doc.permission === 'Full Access');
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'owner':
          return a.owner.name.localeCompare(b.owner.name);
        case 'recent':
        default:
          return new Date(b.sharedDate) - new Date(a.sharedDate);
      }
    });

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Shared with Me</h1>
        <p className="text-gray-600">Documents and files that others have shared with you</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-800">{sharedDocuments.length}</p>
              <p className="text-gray-600">Total Shared</p>
            </div>
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: '#B2B0E8' }}
            >
              <Users size={24} style={{ color: '#1A2A80' }} />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {sharedDocuments.filter(doc => doc.permission === 'Full Access').length}
              </p>
              <p className="text-gray-600">Full Access</p>
            </div>
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: '#7A85C1' }}
            >
              <Shield size={24} className="text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {sharedDocuments.filter(doc => doc.isStarred).length}
              </p>
              <p className="text-gray-600">Starred</p>
            </div>
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: '#3B38A0' }}
            >
              <Star size={24} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search shared documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                style={{ '--tw-ring-color': '#7A85C1' }}
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
              style={{ '--tw-ring-color': '#7A85C1' }}
            >
              <option value="all">All Permissions</option>
              <option value="read_only">Read Only</option>
              <option value="full_access">Full Access</option>
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
              style={{ '--tw-ring-color': '#7A85C1' }}
            >
              <option value="recent">Recently Shared</option>
              <option value="name">Name</option>
              <option value="owner">Owner</option>
            </select>
          </div>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredDocuments.map((doc) => (
          <div key={doc.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${getFileTypeColor(doc.type)}15` }}
                >
                  <File size={24} style={{ color: getFileTypeColor(doc.type) }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-gray-800 truncate">{doc.name}</h3>
                    {doc.isStarred && (
                      <Star size={16} className="text-yellow-500 fill-current" />
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{doc.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-400">
                    <span>{doc.size}</span>
                    <span>•</span>
                    <span>Last accessed {doc.lastAccessed}</span>
                  </div>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <MoreVertical size={16} className="text-gray-400" />
              </button>
            </div>

            {/* Owner Information */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                  style={{ backgroundColor: '#7A85C1' }}
                >
                  {doc.owner.avatar}
                </div>
                <div>
                  <p className="font-medium text-gray-800 text-sm">{doc.owner.name}</p>
                  <p className="text-xs text-gray-500">{doc.owner.email}</p>
                </div>
              </div>
              <div className="text-right">
                <span 
                  className="px-3 py-1 text-xs font-medium rounded-full text-white"
                  style={{ 
                    backgroundColor: doc.permission === 'Full Access' ? '#3B38A0' : '#7A85C1'
                  }}
                >
                  {doc.permission}
                </span>
                <p className="text-xs text-gray-500 mt-1">
                  Shared {formatDate(doc.sharedDate)}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-2">
                <button 
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium"
                  style={{ color: '#3B38A0' }}
                >
                  <Eye size={16} />
                  <span>View</span>
                </button>
                <button 
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium text-gray-600"
                >
                  <Download size={16} />
                  <span>Download</span>
                </button>
              </div>
              <div className="flex items-center space-x-1 text-xs text-gray-400">
                <Calendar size={12} />
                <span>Shared {formatDate(doc.sharedDate)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredDocuments.length === 0 && (
        <div className="text-center py-12">
          <div 
            className="w-16 h-16 mx-auto mb-4 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: '#B2B0E8' }}
          >
            <Users size={32} style={{ color: '#1A2A80' }} />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {searchTerm ? 'No matching documents' : 'No shared documents yet'}
          </h3>
          <p className="text-gray-600 max-w-md mx-auto">
            {searchTerm 
              ? 'Try adjusting your search terms or filters to find what you\'re looking for.'
              : 'When someone shares a document with you, it will appear here. You can organize, download, and collaborate on shared files.'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default SharedWithMe;