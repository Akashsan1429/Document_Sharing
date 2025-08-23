// import React from 'react';
// import { Search, Bell, Shield, AlertTriangle, CheckCircle, Settings } from 'lucide-react';

// const AdminHeader = () => {
//   // Sample admin notifications
//   const notifications = [
//     { id: 1, type: 'warning', message: 'Storage usage at 85%', time: '5 min ago' },
//     { id: 2, type: 'success', message: 'System backup completed', time: '1 hour ago' },
//     { id: 3, type: 'info', message: '5 new user registrations', time: '2 hours ago' },
//     { id: 4, type: 'warning', message: 'Suspicious activity detected', time: '3 hours ago' },
//   ];

//   const getNotificationIcon = (type) => {
//     switch (type) {
//       case 'warning':
//         return <AlertTriangle size={14} className="text-orange-500" />;
//       case 'success':
//         return <CheckCircle size={14} className="text-green-500" />;
//       case 'error':
//         return <AlertTriangle size={14} className="text-red-500" />;
//       default:
//         return <CheckCircle size={14} className="text-blue-500" />;
//     }
//   };

//   return (
//     <header className="bg-white shadow-lg border-b-2 sticky top-0 z-40" style={{ borderColor: '#7A85C1' }}>
//       <div className="flex items-center justify-between px-6 py-4">
//         {/* Left side - Admin Logo */}
//         <div className="flex items-center space-x-3">
//           <div 
//             className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-xl"
//             style={{ backgroundColor: '#1A2A80' }}
//           >
//             <Shield size={20} />
//           </div>
//           <div>
//             <h1 
//               className="text-2xl font-bold"
//               style={{ color: '#1A2A80' }}
//             >
//               Admin Panel
//             </h1>
//             <p className="text-xs text-gray-500">Document Sharing System</p>
//           </div>
//         </div>

//         {/* Center - Admin Search */}
//         <div className="flex-1 max-w-2xl mx-8">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//             <input
//               type="text"
//               placeholder="Search users, documents, logs..."
//               className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all shadow-sm hover:shadow-md"
//               style={{ 
//                 '--tw-ring-color': '#7A85C1',
//                 boxShadow: 'focus:0 0 0 3px rgba(122, 133, 193, 0.1)'
//               }}
//             />
//           </div>
//         </div>

//         {/* Right side - Admin Actions and Profile */}
//         <div className="flex items-center space-x-4">
//           {/* System Status Indicator */}
//           <div className="flex items-center space-x-2 px-3 py-2 bg-green-50 rounded-lg">
//             <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
//             <span className="text-sm font-medium text-green-700">System Online</span>
//           </div>

//           {/* Quick Settings */}
//           <button 
//             className="p-3 rounded-xl hover:bg-gray-100 transition-colors"
//             title="Quick Settings"
//           >
//             <Settings size={20} className="text-gray-600" />
//           </button>
          
//           {/* Admin Notifications */}
//           <div className="relative">
//             <button 
//               className="relative p-3 rounded-xl hover:bg-gray-100 transition-colors group"
//               title="Admin Notifications"
//             >
//               <Bell size={20} className="text-gray-600" />
//               <span 
//                 className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs flex items-center justify-center text-white font-medium"
//                 style={{ backgroundColor: '#DC2626' }}
//               >
//                 {notifications.filter(n => n.type === 'warning' || n.type === 'error').length}
//               </span>
              
//               {/* Notification Dropdown */}
//               <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-2xl border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
//                 <div className="p-4 border-b border-gray-200">
//                   <h3 className="font-semibold text-gray-800">System Notifications</h3>
//                   <p className="text-sm text-gray-500">Recent admin alerts and updates</p>
//                 </div>
//                 <div className="max-h-80 overflow-y-auto">
//                   {notifications.map((notification) => (
//                     <div key={notification.id} className="p-4 hover:bg-gray-50 border-b border-gray-100 last:border-b-0">
//                       <div className="flex items-start space-x-3">
//                         {getNotificationIcon(notification.type)}
//                         <div className="flex-1">
//                           <p className="text-sm text-gray-800 font-medium">{notification.message}</p>
//                           <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//                 <div className="p-3 border-t border-gray-200 text-center">
//                   <button 
//                     className="text-sm font-medium hover:underline"
//                     style={{ color: '#3B38A0' }}
//                   >
//                     View All Notifications
//                   </button>
//                 </div>
//               </div>
//             </button>
//           </div>
          
//           {/* Admin Profile */}
//           <div className="flex items-center space-x-3 cursor-pointer group">
//             <div className="text-right hidden sm:block">
//               <p className="text-sm font-semibold text-gray-800 group-hover:text-gray-600 transition-colors">Admin User</p>
//               <p className="text-xs text-gray-500">System Administrator</p>
//             </div>
//             <div className="relative">
//               <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-semibold shadow-lg hover:shadow-xl transition-shadow">
//                 <Shield size={18} />
//               </div>
//               {/* Admin Badge */}
//               <div 
//                 className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center"
//                 style={{ backgroundColor: '#1A2A80' }}
//               >
//                 <CheckCircle size={10} className="text-white" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* Admin Status Bar */}
//       <div 
//         className="px-6 py-2 text-sm flex items-center justify-between"
//         style={{ backgroundColor: '#F8F9FA' }}
//       >
//         <div className="flex items-center space-x-6">
//           <div className="flex items-center space-x-2">
//             <div className="w-2 h-2 bg-green-400 rounded-full"></div>
//             <span className="text-gray-600">Database: Connected</span>
//           </div>
//           <div className="flex items-center space-x-2">
//             <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
//             <span className="text-gray-600">API: Healthy</span>
//           </div>
//           <div className="flex items-center space-x-2">
//             <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
//             <span className="text-gray-600">Storage: 85% Used</span>
//           </div>
//         </div>
//         <div className="text-gray-500">
//           Last backup: 2 hours ago • Next scheduled: 22:00 today
//         </div>
//       </div>
//     </header>
//   );
// };

// export default AdminHeader;