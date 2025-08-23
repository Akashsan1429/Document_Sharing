// import React, { useState } from 'react';
// import { 
//   Users, 
//   File, 
//   Activity,
//   Settings,
//   Search,
//   Filter,
//   MoreVertical,
//   Eye,
//   Edit,
//   Trash2,
//   UserPlus,
//   Download,
//   Shield,
//   AlertTriangle,
//   TrendingUp,
//   HardDrive,
//   Clock,
//   Calendar,
//   CheckCircle,
//   XCircle,
//   BarChart3,
//   PieChart
// } from 'lucide-react';

// const AdminDashboard = ({ activeTab: initialActiveTab = 'overview' }) => {
//   const [activeTab, setActiveTab] = useState(initialActiveTab);

//   // Update activeTab when initialActiveTab changes
//   React.useEffect(() => {
//     setActiveTab(initialActiveTab);
//   }, [initialActiveTab]);

//   const [searchTerm, setSearchTerm] = useState('');
//   const [userFilter, setUserFilter] = useState('all');
//   const [selectedUsers, setSelectedUsers] = useState([]);

//   // Sample data based on SRS requirements
//   const systemStats = {
//     totalUsers: 1247,
//     totalDocuments: 8953,
//     storageUsed: '2.4 TB',
//     activeUsers: 892,
//     documentsSharedToday: 156,
//     newUsersThisWeek: 23
//   };

//   const users = [
//     {
//       id: 1,
//       name: 'John Doe',
//       email: 'john.doe@company.com',
//       role: 'USER',
//       status: 'active',
//       lastLogin: '2024-01-20 14:30',
//       documentsCount: 24,
//       storageUsed: '1.2 GB',
//       joinDate: '2023-12-15'
//     },
//     {
//       id: 2,
//       name: 'Sarah Johnson',
//       email: 'sarah.j@company.com',
//       role: 'USER',
//       status: 'active',
//       lastLogin: '2024-01-20 09:15',
//       documentsCount: 18,
//       storageUsed: '890 MB',
//       joinDate: '2024-01-10'
//     },
//     {
//       id: 3,
//       name: 'Mike Chen',
//       email: 'mike.c@company.com',
//       role: 'ADMIN',
//       status: 'active',
//       lastLogin: '2024-01-20 16:45',
//       documentsCount: 45,
//       storageUsed: '3.2 GB',
//       joinDate: '2023-11-20'
//     },
//     {
//       id: 4,
//       name: 'Emma Davis',
//       email: 'emma.d@company.com',
//       role: 'USER',
//       status: 'inactive',
//       lastLogin: '2024-01-18 11:20',
//       documentsCount: 12,
//       storageUsed: '456 MB',
//       joinDate: '2024-01-05'
//     }
//   ];

//   const documents = [
//     {
//       id: 1,
//       name: 'Annual Report 2024.pdf',
//       owner: 'John Doe',
//       size: '4.2 MB',
//       type: 'pdf',
//       visibility: 'PRIVATE',
//       sharedWith: 3,
//       lastModified: '2024-01-20 14:30',
//       downloads: 15
//     },
//     {
//       id: 2,
//       name: 'Marketing Strategy.pptx',
//       owner: 'Sarah Johnson',
//       size: '8.5 MB',
//       type: 'pptx',
//       visibility: 'PUBLIC',
//       sharedWith: 8,
//       lastModified: '2024-01-19 16:20',
//       downloads: 42
//     },
//     {
//       id: 3,
//       name: 'Technical Specs.docx',
//       owner: 'Mike Chen',
//       size: '2.1 MB',
//       type: 'docx',
//       visibility: 'PRIVATE',
//       sharedWith: 12,
//       lastModified: '2024-01-18 10:15',
//       downloads: 28
//     }
//   ];

//   const activityLogs = [
//     {
//       id: 1,
//       user: 'John Doe',
//       action: 'UPLOAD',
//       document: 'Annual Report 2024.pdf',
//       timestamp: '2024-01-20 14:30:25',
//       status: 'success'
//     },
//     {
//       id: 2,
//       user: 'Sarah Johnson',
//       action: 'SHARE',
//       document: 'Marketing Strategy.pptx',
//       timestamp: '2024-01-20 13:45:12',
//       status: 'success'
//     },
//     {
//       id: 3,
//       user: 'Emma Davis',
//       action: 'DELETE',
//       document: 'Old Meeting Notes.docx',
//       timestamp: '2024-01-20 12:20:08',
//       status: 'success'
//     },
//     {
//       id: 4,
//       user: 'Mike Chen',
//       action: 'PERMISSION_CHANGE',
//       document: 'Technical Specs.docx',
//       timestamp: '2024-01-20 11:15:33',
//       status: 'success'
//     },
//     {
//       id: 5,
//       user: 'John Doe',
//       action: 'DOWNLOAD',
//       document: 'Budget Report.xlsx',
//       timestamp: '2024-01-20 10:30:45',
//       status: 'failed'
//     }
//   ];

//   const StatCard = ({ title, value, icon: Icon, color, subtitle, trend }) => (
//     <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
//       <div className="flex items-center justify-between mb-4">
//         <div 
//           className="w-12 h-12 rounded-lg flex items-center justify-center"
//           style={{ backgroundColor: `${color}20` }}
//         >
//           <Icon size={24} style={{ color }} />
//         </div>
//         {trend && (
//           <div className="flex items-center space-x-1 text-sm">
//             <TrendingUp size={16} className="text-green-500" />
//             <span className="text-green-500 font-medium">{trend}</span>
//           </div>
//         )}
//       </div>
//       <div className="mb-2">
//         <span className="text-3xl font-bold text-gray-800">{value}</span>
//       </div>
//       <div>
//         <p className="text-gray-600 font-medium">{title}</p>
//         {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
//       </div>
//     </div>
//   );

//   const TabButton = ({ id, label, icon: Icon, isActive, onClick }) => (
//     <button
//       onClick={() => onClick(id)}
//       className={`flex items-center space-x-3 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
//         isActive 
//           ? 'text-white shadow-lg' 
//           : 'text-gray-600 hover:bg-gray-100'
//       }`}
//       style={isActive ? { backgroundColor: '#3B38A0' } : {}}
//     >
//       <Icon size={20} />
//       <span>{label}</span>
//     </button>
//   );

//   const filteredUsers = users.filter(user => {
//     const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesFilter = userFilter === 'all' || user.role.toLowerCase() === userFilter ||
//                          user.status === userFilter;
//     return matchesSearch && matchesFilter;
//   });

//   const getActionBadgeColor = (action) => {
//     const colors = {
//       'UPLOAD': '#16A34A',
//       'DOWNLOAD': '#3B82F6',
//       'SHARE': '#7C3AED',
//       'DELETE': '#DC2626',
//       'PERMISSION_CHANGE': '#F59E0B'
//     };
//     return colors[action] || '#6B7280';
//   };

//   const getStatusIcon = (status) => {
//     return status === 'success' ? 
//       <CheckCircle size={16} className="text-green-500" /> : 
//       <XCircle size={16} className="text-red-500" />;
//   };

//   const renderOverview = () => (
//     <div className="space-y-6">
//       {/* System Statistics */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         <StatCard
//           title="Total Users"
//           value={systemStats.totalUsers.toLocaleString()}
//           icon={Users}
//           color="#1A2A80"
//           subtitle="Registered accounts"
//           trend="+12%"
//         />
//         <StatCard
//           title="Total Documents"
//           value={systemStats.totalDocuments.toLocaleString()}
//           icon={File}
//           color="#3B38A0"
//           subtitle="Files stored"
//           trend="+8%"
//         />
//         <StatCard
//           title="Storage Used"
//           value={systemStats.storageUsed}
//           icon={HardDrive}
//           color="#7A85C1"
//           subtitle="Of total capacity"
//         />
//         <StatCard
//           title="Active Users"
//           value={systemStats.activeUsers.toLocaleString()}
//           icon={Activity}
//           color="#B2B0E8"
//           subtitle="Last 30 days"
//         />
//         <StatCard
//           title="Documents Shared Today"
//           value={systemStats.documentsSharedToday}
//           icon={TrendingUp}
//           color="#3B38A0"
//           subtitle="New shares"
//         />
//         <StatCard
//           title="New Users This Week"
//           value={systemStats.newUsersThisWeek}
//           icon={UserPlus}
//           color="#1A2A80"
//           subtitle="Registrations"
//         />
//       </div>

//       {/* Recent Activity Summary */}
//       <div className="bg-white rounded-xl shadow-lg p-6">
//         <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
//           <Activity className="mr-2" size={24} />
//           Recent System Activity
//         </h3>
//         <div className="space-y-3">
//           {activityLogs.slice(0, 5).map((log) => (
//             <div key={log.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
//               <div className="flex items-center space-x-3">
//                 <div 
//                   className="w-8 h-8 rounded-full flex items-center justify-center"
//                   style={{ backgroundColor: `${getActionBadgeColor(log.action)}20` }}
//                 >
//                   <Activity size={16} style={{ color: getActionBadgeColor(log.action) }} />
//                 </div>
//                 <div>
//                   <p className="font-medium text-gray-800">
//                     <span className="text-blue-600">{log.user}</span> {log.action.toLowerCase().replace('_', ' ')}d{' '}
//                     <span className="font-semibold">{log.document}</span>
//                   </p>
//                   <p className="text-sm text-gray-500">{log.timestamp}</p>
//                 </div>
//               </div>
//               {getStatusIcon(log.status)}
//             </div>
//           ))}
//         </div>
//         <button 
//           onClick={() => setActiveTab('logs')}
//           className="w-full mt-4 text-center py-2 text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors"
//           style={{ color: '#3B38A0' }}
//         >
//           View All Activity Logs
//         </button>
//       </div>
//     </div>
//   );

//   const renderUserManagement = () => (
//     <div className="space-y-6">
//       {/* Search and Actions */}
//       <div className="bg-white rounded-xl shadow-lg p-6">
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
//           <div className="flex-1 max-w-md">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//               <input
//                 type="text"
//                 placeholder="Search users..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all"
//                 style={{ '--tw-ring-color': '#7A85C1' }}
//               />
//             </div>
//           </div>
          
//           <div className="flex items-center space-x-4">
//             <select
//               value={userFilter}
//               onChange={(e) => setUserFilter(e.target.value)}
//               className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
//               style={{ '--tw-ring-color': '#7A85C1' }}
//             >
//               <option value="all">All Users</option>
//               <option value="user">Users</option>
//               <option value="admin">Admins</option>
//               <option value="active">Active</option>
//               <option value="inactive">Inactive</option>
//             </select>
            
//             <button 
//               className="flex items-center space-x-2 px-4 py-2 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
//               style={{ backgroundColor: '#3B38A0' }}
//             >
//               <UserPlus size={18} />
//               <span>Add User</span>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Users Table */}
//       <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//         <div className="p-6 border-b border-gray-200">
//           <h3 className="text-xl font-semibold text-gray-800 flex items-center">
//             <Users className="mr-2" size={24} />
//             User Management ({filteredUsers.length})
//           </h3>
//         </div>
        
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">User</th>
//                 <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Role</th>
//                 <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Status</th>
//                 <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Documents</th>
//                 <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Storage</th>
//                 <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Last Login</th>
//                 <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {filteredUsers.map((user) => (
//                 <tr key={user.id} className="hover:bg-gray-50 transition-colors">
//                   <td className="px-6 py-4">
//                     <div className="flex items-center space-x-3">
//                       <div 
//                         className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm"
//                         style={{ backgroundColor: '#7A85C1' }}
//                       >
//                         {user.name.split(' ').map(n => n[0]).join('')}
//                       </div>
//                       <div>
//                         <p className="font-medium text-gray-800">{user.name}</p>
//                         <p className="text-sm text-gray-500">{user.email}</p>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <span 
//                       className="px-2 py-1 text-xs font-medium rounded-full text-white"
//                       style={{ backgroundColor: user.role === 'ADMIN' ? '#1A2A80' : '#3B38A0' }}
//                     >
//                       {user.role}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4">
//                     <span 
//                       className={`px-2 py-1 text-xs font-medium rounded-full ${
//                         user.status === 'active' 
//                           ? 'bg-green-100 text-green-800' 
//                           : 'bg-red-100 text-red-800'
//                       }`}
//                     >
//                       {user.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-600">{user.documentsCount}</td>
//                   <td className="px-6 py-4 text-sm text-gray-600">{user.storageUsed}</td>
//                   <td className="px-6 py-4 text-sm text-gray-600">{user.lastLogin}</td>
//                   <td className="px-6 py-4">
//                     <div className="flex items-center space-x-2">
//                       <button className="p-1 hover:bg-gray-200 rounded transition-colors">
//                         <Eye size={16} className="text-gray-400" />
//                       </button>
//                       <button className="p-1 hover:bg-gray-200 rounded transition-colors">
//                         <Edit size={16} className="text-gray-400" />
//                       </button>
//                       <button className="p-1 hover:bg-gray-200 rounded transition-colors">
//                         <Trash2 size={16} className="text-red-400" />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );

//   const renderDocumentManagement = () => (
//     <div className="space-y-6">
//       <div className="bg-white rounded-xl shadow-lg p-6">
//         <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
//           <File className="mr-2" size={24} />
//           System-wide Document Management
//         </h3>
        
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Document</th>
//                 <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Owner</th>
//                 <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Size</th>
//                 <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Visibility</th>
//                 <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Shared With</th>
//                 <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Downloads</th>
//                 <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {documents.map((doc) => (
//                 <tr key={doc.id} className="hover:bg-gray-50 transition-colors">
//                   <td className="px-6 py-4">
//                     <div className="flex items-center space-x-3">
//                       <div 
//                         className="w-8 h-8 rounded-lg flex items-center justify-center"
//                         style={{ backgroundColor: '#B2B0E8' }}
//                       >
//                         <File size={16} style={{ color: '#1A2A80' }} />
//                       </div>
//                       <div>
//                         <p className="font-medium text-gray-800">{doc.name}</p>
//                         <p className="text-sm text-gray-500">Modified {doc.lastModified}</p>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-600">{doc.owner}</td>
//                   <td className="px-6 py-4 text-sm text-gray-600">{doc.size}</td>
//                   <td className="px-6 py-4">
//                     <span 
//                       className={`px-2 py-1 text-xs font-medium rounded-full ${
//                         doc.visibility === 'PUBLIC' 
//                           ? 'bg-green-100 text-green-800' 
//                           : 'bg-gray-100 text-gray-800'
//                       }`}
//                     >
//                       {doc.visibility}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-600">{doc.sharedWith} users</td>
//                   <td className="px-6 py-4 text-sm text-gray-600">{doc.downloads}</td>
//                   <td className="px-6 py-4">
//                     <div className="flex items-center space-x-2">
//                       <button className="p-1 hover:bg-gray-200 rounded transition-colors">
//                         <Eye size={16} className="text-gray-400" />
//                       </button>
//                       <button className="p-1 hover:bg-gray-200 rounded transition-colors">
//                         <Download size={16} className="text-gray-400" />
//                       </button>
//                       <button className="p-1 hover:bg-gray-200 rounded transition-colors">
//                         <Trash2 size={16} className="text-red-400" />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );

//   const renderActivityLogs = () => (
//     <div className="space-y-6">
//       <div className="bg-white rounded-xl shadow-lg p-6">
//         <div className="flex items-center justify-between mb-6">
//           <h3 className="text-xl font-semibold text-gray-800 flex items-center">
//             <Activity className="mr-2" size={24} />
//             System Activity Logs
//           </h3>
//           <button 
//             className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//           >
//             <Download size={16} />
//             <span>Export Logs</span>
//           </button>
//         </div>
        
//         <div className="space-y-3">
//           {activityLogs.map((log) => (
//             <div key={log.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
//               <div className="flex items-center space-x-4">
//                 <div 
//                   className="w-10 h-10 rounded-full flex items-center justify-center"
//                   style={{ backgroundColor: `${getActionBadgeColor(log.action)}20` }}
//                 >
//                   <Activity size={18} style={{ color: getActionBadgeColor(log.action) }} />
//                 </div>
//                 <div>
//                   <div className="flex items-center space-x-2">
//                     <span 
//                       className="px-2 py-1 text-xs font-medium rounded-full text-white"
//                       style={{ backgroundColor: getActionBadgeColor(log.action) }}
//                     >
//                       {log.action}
//                     </span>
//                     <span className="font-medium text-gray-800">{log.user}</span>
//                   </div>
//                   <p className="text-sm text-gray-600 mt-1">
//                     {log.action.toLowerCase().replace('_', ' ')} "{log.document}"
//                   </p>
//                   <p className="text-xs text-gray-500">{log.timestamp}</p>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-2">
//                 {getStatusIcon(log.status)}
//                 <span className={`text-sm font-medium ${
//                   log.status === 'success' ? 'text-green-600' : 'text-red-600'
//                 }`}>
//                   {log.status}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );

//   const renderSystemSettings = () => (
//     <div className="space-y-6">
//       <div className="bg-white rounded-xl shadow-lg p-6">
//         <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
//           <Settings className="mr-2" size={24} />
//           System Configuration
//         </h3>
        
//         <div className="space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="space-y-4">
//               <h4 className="font-medium text-gray-800">Storage Settings</h4>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Maximum file size (MB)
//                 </label>
//                 <input 
//                   type="number" 
//                   defaultValue="50"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
//                   style={{ '--tw-ring-color': '#7A85C1' }}
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Default storage quota per user (GB)
//                 </label>
//                 <input 
//                   type="number" 
//                   defaultValue="10"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
//                   style={{ '--tw-ring-color': '#7A85C1' }}
//                 />
//               </div>
//             </div>
            
//             <div className="space-y-4">
//               <h4 className="font-medium text-gray-800">Security Settings</h4>
//               <div className="space-y-3">
//                 <label className="flex items-center space-x-3">
//                   <input type="checkbox" defaultChecked className="rounded" />
//                   <span className="text-sm text-gray-700">Require email verification</span>
//                 </label>
//                 <label className="flex items-center space-x-3">
//                   <input type="checkbox" defaultChecked className="rounded" />
//                   <span className="text-sm text-gray-700">Enable activity logging</span>
//                 </label>
//                 <label className="flex items-center space-x-3">
//                   <input type="checkbox" className="rounded" />
//                   <span className="text-sm text-gray-700">Allow public document sharing</span>
//                 </label>
//               </div>
//             </div>
//           </div>
          
//           <div className="flex space-x-4 pt-4 border-t border-gray-200">
//             <button 
//               className="px-6 py-2 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
//               style={{ backgroundColor: '#3B38A0' }}
//             >
//               Save Settings
//             </button>
//             <button className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
//               Reset to Defaults
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="p-6">
//       {/* Header */}
//       <div className="mb-8">
//         <h1 className="text-4xl font-bold text-gray-800 mb-2">
//           Admin Dashboard
//         </h1>
//         <p className="text-gray-600 text-lg">
//           System administration and management panel
//         </p>
//       </div>

//       {/* Navigation Tabs */}
//       <div className="mb-8">
//         <div className="flex flex-wrap items-center space-x-2 bg-gray-100 p-2 rounded-xl">
//           <TabButton
//             id="overview"
//             label="Overview"
//             icon={BarChart3}
//             isActive={activeTab === 'overview'}
//             onClick={setActiveTab}
//           />
//           <TabButton
//             id="users"
//             label="User Management"
//             icon={Users}
//             isActive={activeTab === 'users'}
//             onClick={setActiveTab}
//           />
//           <TabButton
//             id="documents"
//             label="Document Management"
//             icon={File}
//             isActive={activeTab === 'documents'}
//             onClick={setActiveTab}
//           />
//           <TabButton
//             id="logs"
//             label="Activity Logs"
//             icon={Activity}
//             isActive={activeTab === 'logs'}
//             onClick={setActiveTab}
//           />
//           <TabButton
//             id="settings"
//             label="System Settings"
//             icon={Settings}
//             isActive={activeTab === 'settings'}
//             onClick={setActiveTab}
//           />
//         </div>
//       </div>

//       {/* Tab Content */}
//       {activeTab === 'overview' && renderOverview()}
//       {activeTab === 'users' && renderUserManagement()}
//       {activeTab === 'documents' && renderDocumentManagement()}
//       {activeTab === 'logs' && renderActivityLogs()}
//       {activeTab === 'settings' && renderSystemSettings()}
//     </div>
//   );
// };

// export default AdminDashboard;