// import React, { useState } from 'react';
// import { 
//   BarChart3,
//   Users, 
//   File, 
//   Activity,
//   Settings, 
//   LogOut, 
//   Plus,
//   Upload,
//   FolderPlus,
//   Clock,
//   Shield,
//   ChevronDown,
//   ChevronRight,
//   AlertTriangle,
//   TrendingUp,
//   Database,
//   UserCheck,
//   FileText
// } from 'lucide-react';

// const AdminSidebar = ({ activeSection, setActiveSection, onLogout }) => {
//   const [showCreateOptions, setShowCreateOptions] = useState(false);
//   const [showRecentActivity, setShowRecentActivity] = useState(true);

//   // Sample recent admin activity data
//   const recentActivities = [
//     { id: 1, action: 'User Created', detail: 'John Doe registered', time: '5 min ago', icon: UserCheck, type: 'success' },
//     { id: 2, action: 'Document Deleted', detail: 'Suspicious file removed', time: '15 min ago', icon: AlertTriangle, type: 'warning' },
//     { id: 3, action: 'Storage Alert', detail: '80% capacity reached', time: '1 hour ago', icon: Database, type: 'info' },
//     { id: 4, action: 'User Deactivated', detail: 'Inactive account suspended', time: '2 hours ago', icon: Shield, type: 'warning' },
//   ];

//   // Sample system alerts
//   const systemAlerts = [
//     { id: 1, message: 'System backup completed', severity: 'success', time: '30 min ago' },
//     { id: 2, message: 'Storage usage at 85%', severity: 'warning', time: '1 hour ago' },
//     { id: 3, message: '5 new user registrations', severity: 'info', time: '2 hours ago' },
//   ];

//   const adminSidebarItems = [
//     { id: 'admin-overview', name: 'Overview', icon: BarChart3, description: 'System dashboard' },
//     { id: 'admin-users', name: 'User Management', icon: Users, description: 'Manage all users' },
//     { id: 'admin-documents', name: 'Document Management', icon: File, description: 'System-wide documents' },
//     { id: 'admin-logs', name: 'Activity Logs', icon: Activity, description: 'System activity' },
//     { id: 'admin-settings', name: 'System Settings', icon: Settings, description: 'Configuration' },
//   ];

//   const handleCreateOption = (type) => {
//     if (type === 'user') {
//       console.log('Opening create user dialog...');
//     } else if (type === 'backup') {
//       console.log('Initiating system backup...');
//     }
//     setShowCreateOptions(false);
//   };

//   const getActivityTypeColor = (type) => {
//     const colors = {
//       'success': '#16A34A',
//       'warning': '#F59E0B',
//       'error': '#DC2626',
//       'info': '#3B82F6'
//     };
//     return colors[type] || '#6B7280';
//   };

//   const getSeverityColor = (severity) => {
//     const colors = {
//       'success': '#16A34A',
//       'warning': '#F59E0B',
//       'error': '#DC2626',
//       'info': '#3B82F6'
//     };
//     return colors[severity] || '#6B7280';
//   };

//   return (
//     <div 
//       className="w-80 h-screen flex flex-col shadow-xl border-r border-opacity-20 overflow-y-auto"
//       style={{ backgroundColor: '#1A2A80' }}
//     >
//       {/* Admin Create Button */}
//       <div className="p-4">
//         <div className="relative">
//           <button
//             onClick={() => setShowCreateOptions(!showCreateOptions)}
//             className="w-full bg-white hover:bg-gray-50 text-gray-800 font-semibold py-3 px-4 rounded-lg shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
//           >
//             <Plus size={20} />
//             <span>Admin Actions</span>
//           </button>

//           {/* Admin Create Options Dropdown */}
//           {showCreateOptions && (
//             <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border z-50">
//               <button
//                 onClick={() => handleCreateOption('user')}
//                 className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center space-x-3 transition-colors border-b"
//               >
//                 <div 
//                   className="w-8 h-8 rounded-lg flex items-center justify-center"
//                   style={{ backgroundColor: '#B2B0E8' }}
//                 >
//                   <Users size={16} style={{ color: '#1A2A80' }} />
//                 </div>
//                 <div>
//                   <p className="font-medium text-gray-800">Create User</p>
//                   <p className="text-xs text-gray-500">Add new user account</p>
//                 </div>
//               </button>
//               <button
//                 onClick={() => handleCreateOption('backup')}
//                 className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center space-x-3 transition-colors"
//               >
//                 <div 
//                   className="w-8 h-8 rounded-lg flex items-center justify-center"
//                   style={{ backgroundColor: '#B2B0E8' }}
//                 >
//                   <Database size={16} style={{ color: '#1A2A80' }} />
//                 </div>
//                 <div>
//                   <p className="font-medium text-gray-800">System Backup</p>
//                   <p className="text-xs text-gray-500">Create system backup</p>
//                 </div>
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Admin Navigation */}
//       <nav className="px-4 space-y-2 flex-1">
//         {adminSidebarItems.map((item) => {
//           const Icon = item.icon;
//           const isActive = activeSection === item.id;
//           return (
//             <button
//               key={item.id}
//               onClick={() => setActiveSection(item.id)}
//               className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
//                 isActive 
//                   ? 'bg-white bg-opacity-20 text-white shadow-lg' 
//                   : 'text-gray-300 hover:bg-white hover:bg-opacity-10 hover:text-white'
//               }`}
//             >
//               <Icon size={20} />
//               <div className="flex-1">
//                 <div className="font-medium">{item.name}</div>
//                 <div className="text-xs text-gray-400">{item.description}</div>
//               </div>
//             </button>
//           );
//         })}
//       </nav>

//       {/* System Alerts Section */}
//       <div className="px-4 mt-4">
//         <button
//           onClick={() => setShowRecentActivity(!showRecentActivity)}
//           className="w-full flex items-center justify-between text-gray-300 hover:text-white transition-colors mb-3"
//         >
//           <div className="flex items-center space-x-2">
//             <AlertTriangle size={16} />
//             <span className="font-medium text-sm">System Alerts</span>
//           </div>
//           {showRecentActivity ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
//         </button>

//         {showRecentActivity && (
//           <div className="space-y-2 mb-4" style={{ maxHeight: '200px', overflowY: 'auto' }}>
//             {systemAlerts.map((alert) => (
//               <div
//                 key={alert.id}
//                 className="flex items-start space-x-2 px-3 py-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all duration-200 cursor-pointer"
//               >
//                 <div 
//                   className="w-2 h-2 rounded-full flex-shrink-0 mt-2"
//                   style={{ backgroundColor: getSeverityColor(alert.severity) }}
//                 ></div>
//                 <div className="flex-1 min-w-0">
//                   <p className="text-xs text-white font-medium">
//                     {alert.message}
//                   </p>
//                   <p className="text-xs text-gray-400">{alert.time}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Recent Admin Activity Section */}
//       <div className="px-4">
//         <div className="text-gray-300 mb-3">
//           <div className="flex items-center space-x-2">
//             <Activity size={16} />
//             <span className="font-medium text-sm">Recent Activity</span>
//           </div>
//         </div>

//         <div className="space-y-2 mb-4" style={{ maxHeight: '200px', overflowY: 'auto' }}>
//           {recentActivities.map((activity) => {
//             const ActivityIcon = activity.icon;
//             return (
//               <div
//                 key={activity.id}
//                 className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all duration-200 cursor-pointer"
//               >
//                 <div 
//                   className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
//                   style={{ backgroundColor: getActivityTypeColor(activity.type) + '40' }}
//                 >
//                   <ActivityIcon size={12} style={{ color: getActivityTypeColor(activity.type) }} />
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <p className="text-xs text-white font-medium truncate">
//                     {activity.action}
//                   </p>
//                   <p className="text-xs text-gray-400 truncate">{activity.detail}</p>
//                   <p className="text-xs text-gray-500">{activity.time}</p>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* System Status */}
//       <div className="px-4 py-3 border-t border-white border-opacity-20">
//         <div className="text-xs text-gray-300 mb-2">System Status</div>
//         <div className="flex items-center space-x-2 mb-2">
//           <div className="w-2 h-2 rounded-full bg-green-400"></div>
//           <span className="text-xs text-gray-400">All systems operational</span>
//         </div>
//         <div className="text-xs text-gray-400 mb-2">Server Uptime: 99.9%</div>
//         <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
//           <div 
//             className="h-2 rounded-full"
//             style={{ backgroundColor: '#7A85C1', width: '85%' }}
//           ></div>
//         </div>
//         <div className="text-xs text-gray-400 mt-1">Storage: 2.4TB of 3TB used</div>
//       </div>

//       {/* Admin Profile & Logout */}
//       <div className="p-4 border-t border-white border-opacity-20">
//         <div className="flex items-center space-x-3 mb-4 p-3 rounded-lg bg-white bg-opacity-10">
//           <div 
//             className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm"
//             style={{ backgroundColor: '#3B38A0' }}
//           >
//             <Shield size={16} />
//           </div>
//           <div>
//             <p className="text-white font-medium text-sm">Administrator</p>
//             <p className="text-gray-400 text-xs">System Admin</p>
//           </div>
//         </div>
        
//         <button
//           onClick={onLogout}
//           className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-red-500 hover:bg-opacity-20 hover:text-white transition-all duration-200"
//         >
//           <LogOut size={20} />
//           <span className="font-medium">Log Out</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AdminSidebar;