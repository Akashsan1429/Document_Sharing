import React, { useState, useEffect } from 'react';
import { 
  Folder, 
  File, 
  MoreVertical, 
  Grid,
  List,
  Star,
  Download,
  Share2,
  Trash2,
  Eye,
  Edit,
  Copy,
  Upload,
  Plus,
  FolderPlus
} from 'lucide-react';
import { folderAPI, documentAPI, utils } from '../../services/api';

const MyDrive = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedItems, setSelectedItems] = useState([]);
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentFolderId, setCurrentFolderId] = useState(null);
  const [showUploadDialog, setShowUploadDialog] = useState(false);

  useEffect(() => {
    loadData();
  }, [currentFolderId]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [foldersData, documentsData] = await Promise.all([
        folderAPI.getByParent(currentFolderId),
        documentAPI.getByFolder(currentFolderId)
      ]);
      setFolders(foldersData);
      setFiles(documentsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setLoading(true);
      await documentAPI.upload(file, {
        parentFolderId: currentFolderId,
        isPublic: false
      });
      await loadData();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateFolder = async () => {
    const name = prompt('Enter folder name:');
    if (!name) return;

    try {
      setLoading(true);
      await folderAPI.create({
        name,
        parentFolderId: currentFolderId
      });
      await loadData();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (documentId) => {
    try {
      const response = await documentAPI.download(documentId);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'document'; // Backend should provide filename in headers
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (type, id) => {
  if (!window.confirm('Are you sure you want to delete this item?')) return;

  try {
    setLoading(true);
    if (type === 'folder') {
      await folderAPI.delete(id);
    } else {
      await documentAPI.delete(id);
    }
    await loadData();
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">Error: {error}</p>
          <button 
            onClick={loadData}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Drive</h1>
          <p className="text-gray-600">Manage your documents and folders</p>
        </div>
        <div className="flex items-center space-x-3">
          {/* Action Buttons */}
          <input
            type="file"
            id="file-upload"
            className="hidden"
            onChange={handleFileUpload}
            multiple
          />
          <button
            onClick={() => document.getElementById('file-upload').click()}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Upload size={18} />
            <span>Upload</span>
          </button>
          
          <button
            onClick={handleCreateFolder}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <FolderPlus size={18} />
            <span>New Folder</span>
          </button>

          {/* View Mode Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
              }`}
            >
              <Grid size={18} className={viewMode === 'grid' ? 'text-gray-800' : 'text-gray-500'} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
              }`}
            >
              <List size={18} className={viewMode === 'list' ? 'text-gray-800' : 'text-gray-500'} />
            </button>
          </div>
        </div>
      </div>

      {/* Folders */}
      {folders.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Folders</h2>
          <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
            {folders.map((folder) => (
              <div
                key={folder.id}
                className="group bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-gray-200"
                onDoubleClick={() => setCurrentFolderId(folder.id)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: '#B2B0E8' }}
                  >
                    <Folder size={24} style={{ color: '#1A2A80' }} />
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="relative">
                      <button 
                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded transition-all"
                        onClick={() => handleDelete('folder', folder.id)}
                      >
                        <Trash2 size={16} className="text-red-400" />
                      </button>
                    </div>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2 truncate">{folder.name}</h3>
                <div className="text-sm text-gray-500">
                  <p>Modified {utils.formatDate(folder.modifiedAt)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Files */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Files</h2>
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {files.map((file) => (
              <div
                key={file.id}
                className="group bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-gray-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${utils.getFileTypeColor(file.fileType)}15` }}
                  >
                    <File size={24} style={{ color: utils.getFileTypeColor(file.fileType) }} />
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="relative group/actions">
                      <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded transition-all">
                        <MoreVertical size={16} className="text-gray-400" />
                      </button>
                      {/* Actions Dropdown */}
                      <div className="absolute right-0 top-8 bg-white rounded-lg shadow-xl border py-2 z-50 min-w-48 opacity-0 invisible group-hover/actions:opacity-100 group-hover/actions:visible transition-all">
                        <button 
                          onClick={() => handleDownload(file.id)}
                          className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-2"
                        >
                          <Download size={16} />
                          <span>Download</span>
                        </button>
                        <button 
                          onClick={() => handleDelete('file', file.id)}
                          className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-2 text-red-600"
                        >
                          <Trash2 size={16} />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2 truncate" title={file.name}>
                  {file.name}
                </h3>
                <div className="text-sm text-gray-500">
                  <p>{utils.formatFileSize(file.size)}</p>
                  <p>Modified {utils.formatDate(file.modifiedAt)}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="bg-white rounded-xl shadow-lg">
            <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-200 text-sm font-medium text-gray-600">
              <div className="col-span-6">Name</div>
              <div className="col-span-2">Size</div>
              <div className="col-span-3">Modified</div>
              <div className="col-span-1">Actions</div>
            </div>
            {files.map((file, index) => (
              <div
                key={file.id}
                className={`grid grid-cols-12 gap-4 p-4 hover:bg-gray-50 transition-colors ${
                  index !== files.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <div className="col-span-6 flex items-center space-x-3">
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${utils.getFileTypeColor(file.fileType)}15` }}
                  >
                    <File size={16} style={{ color: utils.getFileTypeColor(file.fileType) }} />
                  </div>
                  <span className="font-medium text-gray-800 truncate">{file.name}</span>
                </div>
                <div className="col-span-2 text-sm text-gray-600 flex items-center">
                  {utils.formatFileSize(file.size)}
                </div>
                <div className="col-span-3 text-sm text-gray-600 flex items-center">
                  {utils.formatDate(file.modifiedAt)}
                </div>
                <div className="col-span-1 flex items-center space-x-2">
                  <button 
                    onClick={() => handleDownload(file.id)}
                    className="p-1 hover:bg-gray-200 rounded transition-colors"
                  >
                    <Download size={16} className="text-gray-400" />
                  </button>
                  <button 
                    onClick={() => handleDelete('file', file.id)}
                    className="p-1 hover:bg-gray-200 rounded transition-colors"
                  >
                    <Trash2 size={16} className="text-red-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Empty State */}
      {folders.length === 0 && files.length === 0 && (
        <div className="text-center py-12">
          <div 
            className="w-16 h-16 mx-auto mb-4 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: '#B2B0E8' }}
          >
            <Folder size={32} style={{ color: '#1A2A80' }} />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No files or folders</h3>
          <p className="text-gray-600 max-w-md mx-auto mb-4">
            Get started by uploading your first document or creating a new folder.
          </p>
          <button
            onClick={() => document.getElementById('file-upload').click()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Upload Your First File
          </button>
        </div>
      )}
    </div>
  );
};

export default MyDrive;