import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { 
  Target, Plus, Search, Calendar, 
  AlertCircle, CheckCircle2, Clock, Edit, Trash2
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
  const [departments, setDepartments] = useState<Department[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [creating, setCreating] = useState(false);

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
        // Let the backend scope results based on authenticated user
        const response = await api.get('/goals');
        setGoals(response.data as Goal[]);
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
        {filteredGoals.map((goal, index) => (
          <motion.div
            key={goal.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card p-6 hover:border-primary-500/50 transition-all cursor-pointer"
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
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(goal.priority)}`}>
                        {goal.priority.toUpperCase()}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-4">
                      <div className="flex items-center">
                        <Calendar size={16} className="mr-2" />
                        <span>{formatDate(goal.startDate)} - {formatDate(goal.endDate)}</span>
                      </div>
                      <div className="flex items-center">
                        <Target size={16} className="mr-2" />
                        <span>Assigned to: {goal.assignedUser ? goal.assignedUser.name : 'Unassigned'}</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Progress</span>
                        <span className={`font-semibold ${getProgressColor(goal.progress)}`}>
                          {goal.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${goal.progress}%` }}
                          transition={{ duration: 1, delay: 0.3 }}
                          className={`h-full bg-gradient-to-r ${getProgressGradient(goal.progress)} rounded-full`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex lg:flex-col gap-2">
                <button className="p-2 bg-primary-500/20 text-primary-400 rounded-lg hover:bg-primary-500/30 transition-all">
                  <Edit size={20} />
                </button>
                <button className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
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
  creating 
}: {
  show: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  newGoal: any;
  setNewGoal: (goal: any) => void;
  departments: Department[];
  users: any[];
  creating: boolean;
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-slate-900 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <h2 className="text-2xl font-bold text-white mb-6">Create New Goal</h2>
        
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
              {creating ? 'Creating...' : 'Create Goal'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Goals;

export { CreateGoalModal };
