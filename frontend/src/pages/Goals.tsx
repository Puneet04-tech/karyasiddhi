import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { 
  Target, Plus, Search, Calendar, 
  AlertCircle, CheckCircle2, Clock, Edit, Trash2, Upload
} from 'lucide-react';
import { motion } from 'framer-motion';
import { formatDate, getProgressColor, getProgressGradient } from '../lib/utils';
import api from '../lib/api';

import type { Goal, Department } from '../types';

const Goals = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [creating, setCreating] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadingGoal, setUploadingGoal] = useState<Goal | null>(null);
  const [uploading, setUploading] = useState(false);

  // Form state for upload
  const [uploadData, setUploadData] = useState({
    file: null as File | null,
    description: '',
  });

  // Form state for new goal
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    type: 'specific',
    priority: 'medium',
    progress: 0,
    startDate: '',
    endDate: '',
    departmentId: '',
    assignedUserId: '',
  });

  const { user } = useAuthStore();

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        // For testing: Use mock data if API fails
        try {
          const response = await api.get('/goals');
          setGoals(response.data as Goal[]);
        } catch (apiError) {
          console.log('API failed, using mock data for testing');
          // Mock data for testing
          const mockGoals: Goal[] = [
            {
              id: '1',
              title: 'Complete Project Documentation',
              description: 'Write comprehensive documentation for the project',
              type: 'specific',
              status: 'in_progress',
              progress: 60,
              startDate: '2024-01-01',
              endDate: '2024-03-01',
              departmentId: '1',
              assignedTo: user?.id || '1',
              assignedUser: {
                id: user?.id || '1',
                name: user?.name || 'Test User',
                email: user?.email || 'test@example.com',
              },
              kpis: [],
              priority: 'high',
              createdAt: '2024-01-01T00:00:00Z',
              updatedAt: '2024-01-01T00:00:00Z',
            },
            {
              id: '2',
              title: 'Implement User Authentication',
              description: 'Add secure login and registration system',
              type: 'measurable',
              status: 'completed',
              progress: 100,
              startDate: '2024-01-15',
              endDate: '2024-02-15',
              departmentId: '1',
              assignedTo: '2', // Different user
              assignedUser: {
                id: '2',
                name: 'Other User',
                email: 'other@example.com',
              },
              kpis: [],
              priority: 'critical',
              createdAt: '2024-01-15T00:00:00Z',
              updatedAt: '2024-02-15T00:00:00Z',
            },
          ];
          setGoals(mockGoals);
        }
      } catch (error) {
        console.error('Failed to fetch goals:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchDepartments = async () => {
      try {
        const response = await api.get('/departments');
        setDepartments(response.data);
      } catch (error) {
        console.error('Failed to fetch departments:', error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await api.get('/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchGoals();
    fetchDepartments();
    fetchUsers();
  }, [user]);

  const handleCreateGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    
    try {
      await api.post('/goals', newGoal);
      setShowCreateModal(false);
      setNewGoal({
        title: '',
        description: '',
        type: 'specific',
        priority: 'medium',
        progress: 0,
        startDate: '',
        endDate: '',
        departmentId: '',
        assignedUserId: '',
      });
      // Refresh goals
      const response = await api.get('/goals');
      setGoals(response.data);
    } catch (error) {
      console.error('Failed to create goal:', error);
    } finally {
      setCreating(false);
    }
  };

  const handleEditGoal = (goal: Goal) => {
    console.log('=== EDIT GOAL HANDLER CALLED ===');
    console.log('Goal to edit:', goal);
    
    setEditingGoal(goal);
    setNewGoal({
      title: goal.title,
      description: goal.description,
      type: goal.type,
      priority: goal.priority,
      progress: Number(goal.progress),
      startDate: goal.startDate?.split('T')[0] || goal.startDate,
      endDate: goal.endDate?.split('T')[0] || goal.endDate,
      departmentId: goal.department?.id || '',
      assignedUserId: goal.assignedUser?.id || '',
    });
    setShowEditModal(true);
    console.log('Edit modal should now be open');
  };

  const handleUpdateGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGoal) return;
    setCreating(true);
    
    try {
      await api.put(`/goals/${editingGoal.id}`, newGoal);
      setShowEditModal(false);
      setEditingGoal(null);
      setNewGoal({
        title: '',
        description: '',
        type: 'specific',
        priority: 'medium',
        progress: 0,
        startDate: '',
        endDate: '',
        departmentId: '',
        assignedUserId: '',
      });
      // Refresh goals
      const response = await api.get('/goals');
      setGoals(response.data);
    } catch (error) {
      console.error('Failed to update goal:', error);
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteGoal = async (goalId: string) => {
    console.log('=== DELETE GOAL HANDLER CALLED ===');
    console.log('Goal ID to delete:', goalId);
    
    const confirmed = window.confirm('Are you sure you want to delete this goal? This action cannot be undone.');
    console.log('User confirmed deletion:', confirmed);
    
    if (!confirmed) return;
    
    try {
      console.log('Sending DELETE request to /goals/' + goalId);
      const deleteResponse = await api.delete(`/goals/${goalId}`);
      console.log('Delete response:', deleteResponse);
      
      // Refresh goals
      console.log('Refreshing goals list...');
      const response = await api.get('/goals');
      setGoals(response.data);
      console.log('Goals refreshed successfully');
      alert('Goal deleted successfully!');
    } catch (error: any) {
      console.error('Failed to delete goal:', error);
      alert('Failed to delete goal: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleUploadFile = (goal: Goal) => {
    setUploadingGoal(goal);
    setShowUploadModal(true);
  };

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadingGoal || !uploadData.file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', uploadData.file);
      formData.append('goalId', uploadingGoal.id);
      if (uploadData.description) {
        formData.append('description', uploadData.description);
      }

      const response = await api.post('/goal-uploads', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Upload successful:', response.data);
      alert(`Upload successful!\n\nGoal: ${uploadingGoal.title}\nFile: ${uploadData.file.name}\nSize: ${(uploadData.file.size / 1024).toFixed(1)} KB\nDescription: ${uploadData.description || 'None'}`);

      setShowUploadModal(false);
      setUploadingGoal(null);
      setUploadData({ file: null, description: '' });
    } catch (error: any) {
      console.error('Failed to upload file:', error);
      alert('Upload failed: ' + (error.response?.data?.message || error.message));
    } finally {
      setUploading(false);
    }
  };

  // Remove mock goals data - now fetched from API

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="text-green-500" size={20} />;
      case 'in_progress':
        return <Clock className="text-blue-500" size={20} />;
      case 'delayed':
        return <AlertCircle className="text-red-500" size={20} />;
      default:
        return <Target className="text-gray-500" size={20} />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'high':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      default:
        return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
    }
  };

  const filteredGoals = goals.filter(goal => {
    const matchesSearch = goal.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || goal.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Loading goals...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">SMART Goals</h1>
          <p className="text-gray-400 mt-1">Track and manage your objectives</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="btn-primary mt-4 md:mt-0"
        >
          <Plus size={20} className="inline mr-2" />
          Create New Goal
        </button>
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search goals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-11"
            />
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="input-field md:w-48"
          >
            <option value="all">All Status</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="delayed">Delayed</option>
            <option value="not_started">Not Started</option>
          </select>
        </div>
      </div>

      {/* Goals Grid */}
      <div className="grid gap-6">
        {filteredGoals.map((goal, index) => {
          const isManager = user?.role === 'manager';
          console.log(`Goal ${goal.id}:`, {
            title: goal.title,
            assignedUser: goal.assignedUser,
            userRole: user?.role,
            isManager: isManager,
            showButtons: isManager ? 'YES - BUTTONS SHOULD SHOW' : 'NO - BUTTONS HIDDEN'
          });
          return (
          <motion.div
            key={goal.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card p-6 border-2 border-slate-700/50 hover:border-primary-500/70 hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-300 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm"
          >
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-start gap-3">
                  {getStatusIcon(goal.status)}
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">{goal.title}</h3>
                        <p className="text-gray-400 text-sm mb-4">{goal.description}</p>
                      </div>
                      <span className={`px-4 py-2 rounded-full text-xs font-bold border-2 shadow-lg ${getPriorityColor(goal.priority)}`}>
                        {goal.priority.toUpperCase()}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm mb-4">
                      <div className="flex items-center text-gray-400">
                        <Calendar size={16} className="mr-2" />
                        <span>{formatDate(goal.startDate)} - {formatDate(goal.endDate)}</span>
                      </div>
                      <div className="flex items-center">
                        <Target size={16} className="mr-2 text-blue-400" />
                        <span className="text-white font-semibold">
                          {goal.assignedUser?.name || 'Unassigned'}
                        </span>
                        {goal.assignedUser?.email && (
                          <span className="text-gray-400 ml-2 text-xs">({goal.assignedUser.email})</span>
                        )}
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-300 font-medium">Progress</span>
                        <span className={`font-bold text-lg ${getProgressColor(goal.progress)}`}>
                          {goal.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-700/50 rounded-full h-4 overflow-hidden border border-slate-600/30 shadow-inner">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${goal.progress}%` }}
                          transition={{ duration: 1, delay: 0.3 }}
                          className={`h-full bg-gradient-to-r ${getProgressGradient(goal.progress)} rounded-full shadow-lg relative`}
                        >
                          <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {user?.role === 'manager' && (
                <div className="flex flex-row lg:flex-col gap-3 shrink-0 ml-4">
                  <button 
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log('🔵 EDIT BUTTON MOUSEDOWN!', goal.id, goal.title);
                      handleEditGoal(goal);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:scale-95 transition-all cursor-pointer font-medium shadow-lg z-10"
                    title="Edit Goal"
                    style={{ pointerEvents: 'auto' }}
                  >
                    <Edit size={18} />
                    <span>Edit</span>
                  </button>
                  <button 
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log('🔴 DELETE BUTTON MOUSEDOWN!', goal.id, goal.title);
                      handleDeleteGoal(goal.id);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 active:scale-95 transition-all cursor-pointer font-medium shadow-lg z-10"
                    title="Delete Goal"
                    style={{ pointerEvents: 'auto' }}
                  >
                    <Trash2 size={18} />
                    <span>Delete</span>
                  </button>
                </div>
              )}

              {goal.assignedUser?.id === user?.id && (
                <div className="flex flex-row lg:flex-col gap-3 shrink-0 ml-4">
                  <button 
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log('Upload button clicked for goal:', goal.title, 'User:', user?.id, 'Assigned:', goal.assignedUser?.id);
                      handleUploadFile(goal);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 active:scale-95 transition-all cursor-pointer font-medium shadow-lg z-10"
                    title="Upload Work"
                    style={{ pointerEvents: 'auto' }}
                  >
                    <Upload size={18} />
                    <span>Upload</span>
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )})}
      </div>

      {/* Empty State */}
      {filteredGoals.length === 0 && (
        <div className="card p-12 text-center">
          <Target size={48} className="mx-auto text-gray-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No goals found</h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}
      {/* Create Goal Modal */}
      <CreateGoalModal
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateGoal}
        newGoal={newGoal}
        setNewGoal={(g: any) => setNewGoal(g)}
        departments={departments}
        users={users}
        creating={creating}
      />

      {/* Edit Goal Modal */}
      <CreateGoalModal
        show={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditingGoal(null);
        }}
        onSubmit={handleUpdateGoal}
        newGoal={newGoal}
        setNewGoal={(g: any) => setNewGoal(g)}
        departments={departments}
        users={users}
        creating={creating}
        isEdit={true}
      />

      {/* Upload Modal */}
      {showUploadModal && uploadingGoal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold text-white mb-4">Upload Work for Goal</h3>
            <p className="text-gray-400 mb-4">{uploadingGoal.title}</p>
            
            <form onSubmit={handleFileUpload}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Select File
                  </label>
                  <input
                    type="file"
                    onChange={(e) => setUploadData(prev => ({ ...prev, file: e.target.files?.[0] || null }))}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-primary-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description (Optional)
                  </label>
                  <textarea
                    value={uploadData.description}
                    onChange={(e) => setUploadData(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-primary-500 resize-none"
                    rows={3}
                    placeholder="Describe your work..."
                  />
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowUploadModal(false);
                    setUploadingGoal(null);
                    setUploadData({ file: null, description: '' });
                  }}
                  className="flex-1 px-4 py-2 bg-slate-700 text-gray-300 rounded-lg hover:bg-slate-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading || !uploadData.file}
                  className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {uploading ? 'Uploading...' : 'Upload'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Create Goal Modal Component
const CreateGoalModal = ({ 
  show, 
  onClose, 
  onSubmit, 
  newGoal, 
  setNewGoal, 
  departments, 
  users, 
  creating,
  isEdit = false
}: {
  show: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  newGoal: any;
  setNewGoal: (goal: any) => void;
  departments: Department[];
  users: any[];
  creating: boolean;
  isEdit?: boolean;
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-slate-900 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <h2 className="text-2xl font-bold text-white mb-6">{isEdit ? 'Edit Goal' : 'Create New Goal'}</h2>
        
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
              <input
                type="text"
                value={newGoal.title}
                onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                className="input-field"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Priority</label>
              <select
                value={newGoal.priority}
                onChange={(e) => setNewGoal({...newGoal, priority: e.target.value})}
                className="input-field"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <textarea
              value={newGoal.description}
              onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
              className="input-field"
              rows={3}
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Goal Type</label>
              <select
                value={newGoal.type}
                onChange={(e) => setNewGoal({...newGoal, type: e.target.value})}
                className="input-field"
              >
                <option value="specific">Specific</option>
                <option value="measurable">Measurable</option>
                <option value="achievable">Achievable</option>
                <option value="relevant">Relevant</option>
                <option value="timebound">Time-bound</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Progress (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={newGoal.progress}
                onChange={(e) => setNewGoal({...newGoal, progress: parseInt(e.target.value) || 0})}
                className="input-field"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Start Date</label>
              <input
                type="date"
                value={newGoal.startDate}
                onChange={(e) => setNewGoal({...newGoal, startDate: e.target.value})}
                className="input-field"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">End Date</label>
              <input
                type="date"
                value={newGoal.endDate}
                onChange={(e) => setNewGoal({...newGoal, endDate: e.target.value})}
                className="input-field"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Department</label>
              <select
                value={newGoal.departmentId}
                onChange={(e) => setNewGoal({...newGoal, departmentId: e.target.value})}
                className="input-field"
                required
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>{dept.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Assigned User (Optional)</label>
              <select
                value={newGoal.assignedUserId}
                onChange={(e) => setNewGoal({...newGoal, assignedUserId: e.target.value})}
                className="input-field"
              >
                <option value="">Assign to me (default)</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>{user.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={creating}
              className="btn-primary"
            >
              {creating ? (isEdit ? 'Updating...' : 'Creating...') : (isEdit ? 'Update Goal' : 'Create Goal')}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Goals;

export { CreateGoalModal };
