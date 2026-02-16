import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { 
  Plus, User, Calendar, AlertCircle, CheckCircle, Clock, XCircle, 
  Search, Filter, Edit, Trash2, UserCheck
} from 'lucide-react';
import { motion } from 'framer-motion';
import { formatDate } from '../lib/utils';
import api from '../lib/api';
import { toast } from 'react-hot-toast';

interface Issue {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  solution?: string;
  resolvedAt?: string;
  createdAt: string;
  updatedAt: string;
  createdBy: {
    id: string;
    name: string;
    email: string;
  };
  assignedTo?: {
    id: string;
    name: string;
    email: string;
  };
  goal?: {
    id: string;
    title: string;
  };
  kpi?: {
    id: string;
    name: string;
  };
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const Issues = () => {
  const { user } = useAuthStore();
  const [issues, setIssues] = useState<Issue[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [creating, setCreating] = useState(false);
  const [assigning, setAssigning] = useState(false);

  const [createData, setCreateData] = useState({
    title: '',
    description: '',
    priority: 'medium' as Issue['priority'],
    goalId: '',
    kpiId: '',
  });

  const [assignData, setAssignData] = useState({
    issueId: '',
    assignedToId: '',
  });

  useEffect(() => {
    fetchIssues();
    if (user?.role === 'Department Head') {
      fetchUsers();
    }
  }, [user]);

  const fetchIssues = async () => {
    try {
      const response = await api.get('/issues');
      setIssues(response.data);
    } catch (error) {
      console.error('Failed to fetch issues:', error);
      toast.error('Failed to load issues');
    } finally {
      setLoading(false);
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

  const handleCreateIssue = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setCreating(true);
    try {
      // Filter out empty strings for optional fields
      const dataToSend = {
        title: createData.title,
        description: createData.description,
        priority: createData.priority,
        ...(createData.goalId && { goalId: createData.goalId }),
        ...(createData.kpiId && { kpiId: createData.kpiId }),
      };

      await api.post('/issues', dataToSend);
      setShowCreateModal(false);
      setCreateData({
        title: '',
        description: '',
        priority: 'medium',
        goalId: '',
        kpiId: '',
      });
      fetchIssues();
      toast.success('Issue created successfully!');
    } catch (error: any) {
      console.error('Failed to create issue:', error);
      toast.error(error.response?.data?.message || 'Failed to create issue');
    } finally {
      setCreating(false);
    }
  };

  const handleAssignIssue = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignData.assignedToId) return;

    setAssigning(true);
    try {
      await api.patch(`/issues/${assignData.issueId}/assign`, {
        assignedToId: assignData.assignedToId,
      });
      setShowAssignModal(false);
      setAssignData({ issueId: '', assignedToId: '' });
      setSelectedIssue(null);
      fetchIssues();
      toast.success('Issue assigned successfully!');
    } catch (error: any) {
      console.error('Failed to assign issue:', error);
      toast.error(error.response?.data?.message || 'Failed to assign issue');
    } finally {
      setAssigning(false);
    }
  };

  const handleUpdateStatus = async (issueId: string, status: Issue['status']) => {
    try {
      await api.patch(`/issues/${issueId}/status`, { status });
      fetchIssues();
      toast.success('Issue status updated!');
    } catch (error: any) {
      console.error('Failed to update issue status:', error);
      toast.error(error.response?.data?.message || 'Failed to update status');
    }
  };

  const getStatusColor = (status: Issue['status']) => {
    switch (status) {
      case 'open':
        return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'in_progress':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'resolved':
        return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'closed':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
      default:
        return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
    }
  };

  const getPriorityColor = (priority: Issue['priority']) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'high':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'low':
        return 'bg-green-500/20 text-green-400 border-green-500/50';
      default:
        return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
    }
  };

  const filteredIssues = issues.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || issue.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const isManager = user?.role === 'Department Head';

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Loading issues...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Issues Management</h1>
          <p className="text-gray-400 mt-1">Report and track problems with goals and KPIs</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="btn-primary mt-4 md:mt-0"
        >
          <Plus size={20} className="inline mr-2" />
          Report Issue
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-4">
          <div className="flex items-center">
            <AlertCircle className="text-red-400" size={24} />
            <div className="ml-3">
              <p className="text-gray-400 text-sm">Open Issues</p>
              <p className="text-2xl font-bold text-white">
                {issues.filter(i => i.status === 'open').length}
              </p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center">
            <Clock className="text-yellow-400" size={24} />
            <div className="ml-3">
              <p className="text-gray-400 text-sm">In Progress</p>
              <p className="text-2xl font-bold text-white">
                {issues.filter(i => i.status === 'in_progress').length}
              </p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center">
            <CheckCircle className="text-green-400" size={24} />
            <div className="ml-3">
              <p className="text-gray-400 text-sm">Resolved</p>
              <p className="text-2xl font-bold text-white">
                {issues.filter(i => i.status === 'resolved').length}
              </p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center">
            <XCircle className="text-gray-400" size={24} />
            <div className="ml-3">
              <p className="text-gray-400 text-sm">Total Issues</p>
              <p className="text-2xl font-bold text-white">{issues.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search issues..."
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
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Issues List */}
      <div className="space-y-4">
        {filteredIssues.map((issue) => (
          <motion.div
            key={issue.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-6"
          >
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-semibold text-white">{issue.title}</h3>
                  <div className="flex gap-2 ml-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(issue.status)}`}>
                      {issue.status.replace('_', ' ').toUpperCase()}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(issue.priority)}`}>
                      {issue.priority.toUpperCase()}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-300 mb-4">{issue.description}</p>
                
                <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-4">
                  <div className="flex items-center">
                    <User size={16} className="mr-1" />
                    {issue.createdBy.name}
                  </div>
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-1" />
                    {formatDate(issue.createdAt)}
                  </div>
                  {issue.goal && (
                    <div className="flex items-center">
                      <AlertCircle size={16} className="mr-1" />
                      Goal: {issue.goal.title}
                    </div>
                  )}
                  {issue.kpi && (
                    <div className="flex items-center">
                      <AlertCircle size={16} className="mr-1" />
                      KPI: {issue.kpi.name}
                    </div>
                  )}
                </div>

                {issue.assignedTo && (
                  <div className="flex items-center text-sm text-gray-400 mb-4">
                    <UserCheck size={16} className="mr-1" />
                    Assigned to: {issue.assignedTo.name}
                  </div>
                )}

                {issue.solution && (
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                    <p className="text-green-400 text-sm font-medium mb-1">Solution:</p>
                    <p className="text-gray-300 text-sm">{issue.solution}</p>
                  </div>
                )}
              </div>

              <div className="flex gap-2 mt-4 lg:mt-0 lg:ml-4">
                {isManager && issue.status === 'open' && (
                  <button
                    onClick={() => {
                      setSelectedIssue(issue);
                      setAssignData({ issueId: issue.id, assignedToId: '' });
                      setShowAssignModal(true);
                    }}
                    className="btn-secondary"
                  >
                    <UserCheck size={16} className="mr-1" />
                    Assign
                  </button>
                )}
                
                {issue.status === 'in_progress' && (
                  <button
                    onClick={() => handleUpdateStatus(issue.id, 'resolved')}
                    className="btn-success"
                  >
                    <CheckCircle size={16} className="mr-1" />
                    Resolve
                  </button>
                )}
                
                {issue.status === 'resolved' && (
                  <button
                    onClick={() => handleUpdateStatus(issue.id, 'closed')}
                    className="btn-secondary"
                  >
                    <XCircle size={16} className="mr-1" />
                    Close
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredIssues.length === 0 && (
        <div className="text-center py-12">
          <AlertCircle className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-xl font-medium text-white mb-2">No issues found</h3>
          <p className="text-gray-400">Try adjusting your search or filter criteria.</p>
        </div>
      )}

      {/* Create Issue Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Report New Issue</h2>
              
              <form onSubmit={handleCreateIssue} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={createData.title}
                    onChange={(e) => setCreateData(prev => ({ ...prev, title: e.target.value }))}
                    className="input-field"
                    placeholder="Brief description of the issue"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description *
                  </label>
                  <textarea
                    required
                    value={createData.description}
                    onChange={(e) => setCreateData(prev => ({ ...prev, description: e.target.value }))}
                    className="input-field min-h-[100px]"
                    placeholder="Detailed description of the problem"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Priority
                  </label>
                  <select
                    value={createData.priority}
                    onChange={(e) => setCreateData(prev => ({ ...prev, priority: e.target.value as Issue['priority'] }))}
                    className="input-field"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={creating}
                    className="btn-primary flex-1"
                  >
                    {creating ? 'Creating...' : 'Create Issue'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}

      {/* Assign Issue Modal */}
      {showAssignModal && selectedIssue && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card max-w-md w-full"
          >
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Assign Issue</h2>
              <p className="text-gray-300 mb-6">
                Assign "{selectedIssue.title}" to an intern
              </p>
              
              <form onSubmit={handleAssignIssue} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Select Intern *
                  </label>
                  <select
                    required
                    value={assignData.assignedToId}
                    onChange={(e) => setAssignData(prev => ({ ...prev, assignedToId: e.target.value }))}
                    className="input-field"
                  >
                    <option value="">Choose an intern...</option>
                    {users
                      .filter(u => u.role === 'Intern')
                      .map(u => (
                        <option key={u.id} value={u.id}>{u.name}</option>
                      ))}
                  </select>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAssignModal(false)}
                    className="btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={assigning}
                    className="btn-primary flex-1"
                  >
                    {assigning ? 'Assigning...' : 'Assign Issue'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Issues;