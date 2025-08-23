import React, { useState, useRef } from 'react';
import { 
  X, 
  FolderPlus, 
  Upload, 
  File, 
  AlertCircle,
  CheckCircle,
  Loader,
  Globe,
  Lock
} from 'lucide-react';
import { folderAPI, documentAPI } from '../services/api';

const CreateFormModal = ({ isOpen, onClose, onSuccess, currentFolderId = null }) => {
  const [activeTab, setActiveTab] = useState('folder'); // 'folder' or 'document'
  const [formData, setFormData] = useState({
    title: '', // Document title (required for Document entity)
    name: '',  // Folder name or file name
    description: '',
    isPublic: false
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const fileInputRef = useRef(null);

  // Reset form when modal opens/closes
  React.useEffect(() => {
    if (isOpen) {
      setFormData({
        title: '',
        name: '',
        description: '',
        isPublic: false
      });
      setSelectedFile(null);
      setError('');
      setSuccess('');
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (50MB limit as per SRS)
      if (file.size > 50 * 1024 * 1024) {
        setError('File size must be less than 50MB');
        return;
      }
      
      setSelectedFile(file);
      // Set both title (for Document entity) and name (filename)
      const fileNameWithoutExt = file.name.split('.').slice(0, -1).join('.');
      setFormData(prev => ({
        ...prev,
        title: fileNameWithoutExt, // Document title
        name: file.name // Full filename with extension
      }));
      setError('');
    }
  };

  const handleCreateFolder = async () => {
    if (!formData.name.trim()) {
      setError('Folder name is required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const folderData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        parentFolderId: currentFolderId
      };

      const folder = await folderAPI.create(folderData);
      setSuccess('Folder created successfully!');
      
      setTimeout(() => {
        onSuccess('folder', folder);
        handleClose();
      }, 1500);

    } catch (err) {
      setError(err.message || 'Failed to create folder');
    } finally {
      setLoading(false);
    }
  };

  const handleUploadDocument = async () => {
    if (!selectedFile) {
      setError('Please select a file');
      return;
    }

    if (!formData.title.trim()) {
      setError('Document title is required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Prepare document metadata according to Document entity structure
      const metadata = {
        title: formData.title.trim(), // Required title field
        fileName: selectedFile.name, // Required fileName field
        fileType: selectedFile.type.split('/')[1] || selectedFile.name.split('.').pop(), // Extract file type
        size: selectedFile.size, // File size in bytes
        isPublic: formData.isPublic,
        parentFolderId: currentFolderId,
        description: formData.description.trim()
      };

      const document = await documentAPI.upload(selectedFile, metadata);
      setSuccess('Document uploaded successfully!');
      
      setTimeout(() => {
        onSuccess('document', document);
        handleClose();
      }, 1500);

    } catch (err) {
      setError(err.message || 'Failed to upload document');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (activeTab === 'folder') {
      handleCreateFolder();
    } else {
      handleUploadDocument();
    }
  };

  const handleClose = () => {
    setFormData({
      title: '',
      name: '',
      description: '',
      isPublic: false
    });
    setSelectedFile(null);
    setError('');
    setSuccess('');
    onClose();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const file = files[0];
      if (file.size > 50 * 1024 * 1024) {
        setError('File size must be less than 50MB');
        return;
      }
      
      setSelectedFile(file);
      const fileNameWithoutExt = file.name.split('.').slice(0, -1).join('.');
      setFormData(prev => ({
        ...prev,
        title: fileNameWithoutExt,
        name: file.name
      }));
      setError('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            Create New {activeTab === 'folder' ? 'Folder' : 'Document'}
          </h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            disabled={loading}
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('folder')}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === 'folder'
                ? 'text-white border-b-2'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            style={{ 
              backgroundColor: activeTab === 'folder' ? '#3B38A0' : 'transparent',
              borderBottomColor: activeTab === 'folder' ? '#3B38A0' : 'transparent'
            }}
            disabled={loading}
          >
            <FolderPlus size={16} className="inline mr-2" />
            New Folder
          </button>
          <button
            onClick={() => setActiveTab('document')}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === 'document'
                ? 'text-white border-b-2'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            style={{ 
              backgroundColor: activeTab === 'document' ? '#3B38A0' : 'transparent',
              borderBottomColor: activeTab === 'document' ? '#3B38A0' : 'transparent'
            }}
            disabled={loading}
          >
            <Upload size={16} className="inline mr-2" />
            Upload Document
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Error Message */}
          {error && (
            <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle size={16} className="text-red-500 flex-shrink-0" />
              <span className="text-sm text-green-700">{success}</span>
            </div>
          )}

          {/* File Upload Section */}
          {activeTab === 'document' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Document
              </label>
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer"
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileSelect}
                  className="hidden"
                  disabled={loading}
                />
                {selectedFile ? (
                  <div className="flex items-center justify-center space-x-3">
                    <File size={24} style={{ color: '#3B38A0' }} />
                    <div className="text-left">
                      <p className="font-medium text-gray-800">{selectedFile.name}</p>
                      <p className="text-sm text-gray-500">
                        {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <Upload size={32} className="mx-auto mb-2 text-gray-400" />
                    <p className="text-gray-600 mb-1">Click to browse or drag and drop</p>
                    <p className="text-sm text-gray-500">Maximum file size: 50MB</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Document Title Field (for documents only) */}
          {activeTab === 'document' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Document Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter document title..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ '--tw-ring-color': '#7A85C1' }}
                disabled={loading}
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                This will be the display name for your document
              </p>
            </div>
          )}

          {/* Folder Name Field (for folders only) */}
          {activeTab === 'folder' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Folder Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter folder name..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ '--tw-ring-color': '#7A85C1' }}
                disabled={loading}
                required
              />
            </div>
          )}

          {/* Description Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description (Optional)
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Add a description..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent resize-none"
              style={{ '--tw-ring-color': '#7A85C1' }}
              disabled={loading}
            />
          </div>

          {/* Visibility Settings (Documents only) */}
          {activeTab === 'document' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Visibility
              </label>
              <div className="space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="visibility"
                    checked={!formData.isPublic}
                    onChange={() => setFormData(prev => ({ ...prev, isPublic: false }))}
                    className="text-blue-600"
                    disabled={loading}
                  />
                  <div className="flex items-center space-x-2">
                    <Lock size={16} className="text-gray-500" />
                    <div>
                      <p className="font-medium text-gray-800">Private</p>
                      <p className="text-sm text-gray-500">Only you and people you share with can access</p>
                    </div>
                  </div>
                </label>
                
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="visibility"
                    checked={formData.isPublic}
                    onChange={() => setFormData(prev => ({ ...prev, isPublic: true }))}
                    className="text-blue-600"
                    disabled={loading}
                  />
                  <div className="flex items-center space-x-2">
                    <Globe size={16} className="text-gray-500" />
                    <div>
                      <p className="font-medium text-gray-800">Public</p>
                      <p className="text-sm text-gray-500">Anyone with the link can view</p>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-4">
            <button
              onClick={handleClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={
                loading || 
                (activeTab === 'folder' && !formData.name.trim()) || 
                (activeTab === 'document' && (!selectedFile || !formData.title.trim()))
              }
              className="px-6 py-2 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              style={{ backgroundColor: '#3B38A0' }}
            >
              {loading && <Loader size={16} className="animate-spin" />}
              <span>
                {loading 
                  ? (activeTab === 'folder' ? 'Creating...' : 'Uploading...')
                  : (activeTab === 'folder' ? 'Create Folder' : 'Upload Document')
                }
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateFormModal; 