// API Service for Document Sharing System
// Base URL for the Spring Boot backend
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
};

// Helper function for file upload headers
const getFileUploadHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Authorization': `Bearer ${token}`
    // Note: Don't set Content-Type for FormData, let browser handle it
  };
};

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage;
    
    try {
      const errorJson = JSON.parse(errorText);
      errorMessage = errorJson.message || errorJson.error || 'An error occurred';
    } catch {
      errorMessage = errorText || `HTTP ${response.status}: ${response.statusText}`;
    }
    
    throw new Error(errorMessage);
  }
  
  const contentType = response.headers.get('Content-Type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }
  return response;
};

// ==================== FOLDER API ====================

export const folderAPI = {
  // Create a new folder
  create: async (folderData) => {
    const response = await fetch(`${BASE_URL}/folders`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        name: folderData.name,
        description: folderData.description || null,
        parentFolderId: folderData.parentFolderId || null
      })
    });
    return handleResponse(response);
  },

  // Get folder by ID
  getById: async (folderId) => {
    const response = await fetch(`${BASE_URL}/folders/${folderId}`, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  // Get all folders for current user
  getAll: async () => {
    const response = await fetch(`${BASE_URL}/folders`, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  // Get folders by parent ID (for nested folder structure)
  getByParent: async (parentFolderId = null) => {
    const url = parentFolderId 
      ? `${BASE_URL}/folders?parentId=${parentFolderId}`
      : `${BASE_URL}/folders?parentId=root`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  // Update folder
  update: async (folderId, folderData) => {
    const response = await fetch(`${BASE_URL}/folders/${folderId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        name: folderData.name,
        description: folderData.description
      })
    });
    return handleResponse(response);
  },

  // Delete folder
  delete: async (folderId) => {
    const response = await fetch(`${BASE_URL}/folders/${folderId}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  }
};

// ==================== DOCUMENT API ====================

export const documentAPI = {
  // Upload a new document
  upload: async (file, metadata = {}) => {
    const formData = new FormData();
    formData.append('file', file);
    
    // Add metadata
    if (metadata.name) formData.append('name', metadata.name);
    if (metadata.description) formData.append('description', metadata.description);
    if (metadata.isPublic !== undefined) formData.append('isPublic', metadata.isPublic);
    if (metadata.parentFolderId) formData.append('parentFolderId', metadata.parentFolderId);

    const response = await fetch(`${BASE_URL}/documents/upload`, {
      method: 'POST',
      headers: getFileUploadHeaders(),
      body: formData
    });
    return handleResponse(response);
  },

  // Create document metadata without file upload
  create: async (documentData) => {
    const response = await fetch(`${BASE_URL}/documents`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        name: documentData.name,
        description: documentData.description || null,
        fileType: documentData.fileType,
        isPublic: documentData.isPublic || false,
        parentFolderId: documentData.parentFolderId || null
      })
    });
    return handleResponse(response);
  },

  // Get document by ID
  getById: async (documentId) => {
    const response = await fetch(`${BASE_URL}/documents/${documentId}`, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  // Get all documents for current user
  getMy: async () => {
    const response = await fetch(`${BASE_URL}/documents/my`, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  // Get documents by folder
  getByFolder: async (folderId = null) => {
    const url = folderId 
      ? `${BASE_URL}/documents?folderId=${folderId}`
      : `${BASE_URL}/documents?folderId=root`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  // Get shared documents
  getShared: async () => {
    const response = await fetch(`${BASE_URL}/documents/shared`, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  // Update document metadata
  update: async (documentId, documentData) => {
    const response = await fetch(`${BASE_URL}/documents/${documentId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        name: documentData.name,
        description: documentData.description,
        isPublic: documentData.isPublic
      })
    });
    return handleResponse(response);
  },

  // Delete document
  delete: async (documentId) => {
    const response = await fetch(`${BASE_URL}/documents/${documentId}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  // Download document
  download: async (documentId) => {
    const response = await fetch(`${BASE_URL}/documents/download/${documentId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to download document');
    }
    
    return response; // Return response for blob handling
  },

  // Search documents
  search: async (query, filters = {}) => {
    const params = new URLSearchParams();
    if (query) params.append('q', query);
    if (filters.fileType) params.append('fileType', filters.fileType);
    if (filters.owner) params.append('owner', filters.owner);
    if (filters.dateFrom) params.append('dateFrom', filters.dateFrom);
    if (filters.dateTo) params.append('dateTo', filters.dateTo);

    const response = await fetch(`${BASE_URL}/documents/search?${params.toString()}`, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  }
};

// ==================== PERMISSION API ====================

export const permissionAPI = {
  // Create/Grant permission
  create: async (permissionData) => {
    const response = await fetch(`${BASE_URL}/permissions`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        documentId: permissionData.documentId,
        userId: permissionData.userId,
        userEmail: permissionData.userEmail,
        accessLevel: permissionData.accessLevel // 'READ_ONLY' or 'FULL_ACCESS'
      })
    });
    return handleResponse(response);
  },

  // Get permissions for a document
  getByDocument: async (documentId) => {
    const response = await fetch(`${BASE_URL}/permissions?documentId=${documentId}`, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  // Get all permissions
  getAll: async () => {
    const response = await fetch(`${BASE_URL}/permissions`, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  // Update permission
  update: async (permissionId, permissionData) => {
    const response = await fetch(`${BASE_URL}/permissions/${permissionId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        accessLevel: permissionData.accessLevel
      })
    });
    return handleResponse(response);
  },

  // Delete/Revoke permission
  delete: async (permissionId) => {
    const response = await fetch(`${BASE_URL}/permissions/${permissionId}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  }
};

// ==================== USER API ====================

export const userAPI = {
  // Get current user profile
  getProfile: async () => {
    const response = await fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  // Update current user profile
  updateProfile: async (userData) => {
    const response = await fetch(`${BASE_URL}/users/me`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        name: userData.name
      })
    });
    return handleResponse(response);
  },

  // Change password
  changePassword: async (passwordData) => {
    const response = await fetch(`${BASE_URL}/users/me/password`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      })
    });
    return handleResponse(response);
  },

  // Get all users (for sharing - search users by email)
  search: async (query) => {
    const response = await fetch(`${BASE_URL}/users/search?q=${encodeURIComponent(query)}`, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  // Get user by ID
  getById: async (userId) => {
    const response = await fetch(`${BASE_URL}/users/${userId}`, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  }
};

// ==================== ACTIVITY LOG API ====================

export const activityAPI = {
  // Get activity logs for current user
  getMy: async () => {
    const response = await fetch(`${BASE_URL}/activity-logs/my`, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  // Get activity logs for a specific document
  getByDocument: async (documentId) => {
    const response = await fetch(`${BASE_URL}/activity-logs?documentId=${documentId}`, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  // Get all activity logs (Admin only)
  getAll: async () => {
    const response = await fetch(`${BASE_URL}/activity-logs`, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  // Create activity log (usually done automatically by backend)
  create: async (activityData) => {
    const response = await fetch(`${BASE_URL}/activity-logs`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        action: activityData.action,
        documentId: activityData.documentId
      })
    });
    return handleResponse(response);
  }
};

// ==================== UTILITY FUNCTIONS ====================

export const utils = {
  // Format file size
  formatFileSize: (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },

  // Format date
  formatDate: (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  },

  // Get file type icon color
  getFileTypeColor: (fileType) => {
    const colors = {
      'pdf': '#DC2626',
      'doc': '#2563EB',
      'docx': '#2563EB',
      'xls': '#16A34A',
      'xlsx': '#16A34A',
      'ppt': '#EA580C',
      'pptx': '#EA580C',
      'jpg': '#7C3AED',
      'jpeg': '#7C3AED',
      'png': '#7C3AED',
      'gif': '#7C3AED',
      'txt': '#6B7280',
      'zip': '#F59E0B',
      'rar': '#F59E0B',
      'default': '#6B7280'
    };
    return colors[fileType?.toLowerCase()] || colors.default;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  // Get user role from token (basic JWT decode)
  getUserRole: () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role || payload.authorities?.[0] || null;
    } catch {
      return null;
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
};

// Default export
export default {
  folderAPI,
  documentAPI,
  permissionAPI,
  userAPI,
  activityAPI,
  utils
};