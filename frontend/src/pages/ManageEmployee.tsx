import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../lib/api';
import { useAuthStore } from '../store/authStore';
import { 
  ArrowLeft, User, Target, BarChart3, Plus, Edit2, Trash2, 
  Save, X, Calendar, TrendingUp
} from 'lucide-react';
import { motion } from 'framer-motion';

interface Goal {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  progress: number;
  startDate: string;
  endDate: string;
}

interface KPI {
  id: string;
  name: string;
  description: string;
  target: number;
  current: number;
  unit: string;
  category: string;
}

interface Employee {
  id: string;
  name: string;
  email: string;
  employeeId?: string;
  designation?: string;
  department?: any;
  role: string;
}

const ManageEmployee = () => {
  const { employeeId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [kpis, setKPIs] = useState<KPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'goals' | 'kpis'>('goals');
  
  // Edit states
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [editingKPI, setEditingKPI] = useState<KPI | null>(null);
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [showAddKPI, setShowAddKPI] = useState(false);

  const isManager = user?.role === 'Department Head' || user?.role === 'Director' || 
                    user?.role === 'Additional Secretary' || user?.role === 'Joint Secretary';

  useEffect(() => {
    if (!isManager) {
      navigate('/');
      return;
    }
    fetchEmployeeData();
  }, [employeeId, isManager, navigate]);

  const fetchEmployeeData = async () => {
    try {
      setLoading(true);
      const [empResponse, goalsResponse] = await Promise.all([
        api.get(`/users/${employeeId}`),
        api.get(`/goals`)
      ]);
      
      setEmployee(empResponse.data);
      
      // Filter goals for this employee
      const allGoals = Array.isArray(goalsResponse.data) ? goalsResponse.data : [];
      const employeeGoals = allGoals.filter((g: any) => 
        g.assignedUser?.id === employeeId
      );
      setGoals(employeeGoals);

      // Fetch KPIs for employee goals
      if (employeeGoals.length > 0) {
        const kpisResponse = await api.get('/kpis');
        const allKPIs = Array.isArray(kpisResponse.data) ? kpisResponse.data : [];
        const employeeKPIs = allKPIs.filter((k: any) => 
          employeeGoals.some((g: Goal) => g.id === k.goal?.id)
        );
        setKPIs(employeeKPIs);
      }
    } catch (error) {
      console.error('Failed to fetch employee data:', error);
      alert('Failed to load employee data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateGoal = async (goal: Goal) => {
    try {
      await api.put(`/goals/${goal.id}`, goal);
      await fetchEmployeeData();
      setEditingGoal(null);
    } catch (error) {
      console.error('Failed to update goal:', error);
      alert('Failed to update goal');
    }
  };

  const handleDeleteGoal = async (goalId: string) => {
    if (!confirm('Are you sure you want to delete this goal?')) return;
    
    try {
      await api.delete(`/goals/${goalId}`);
      await fetchEmployeeData();
    } catch (error) {
      console.error('Failed to delete goal:', error);
      alert('Failed to delete goal');
    }
  };

  const handleUpdateKPI = async (kpi: KPI) => {
    try {
      await api.put(`/kpis/${kpi.id}`, kpi);
      await fetchEmployeeData();
      setEditingKPI(null);
    } catch (error) {
      console.error('Failed to update KPI:', error);
      alert('Failed to update KPI');
    }
  };

  const handleDeleteKPI = async (kpiId: string) => {
    if (!confirm('Are you sure you want to delete this KPI?')) return;
    
    try {
      await api.delete(`/kpis/${kpiId}`);
      await fetchEmployeeData();
    } catch (error) {
      console.error('Failed to delete KPI:', error);
      alert('Failed to delete KPI');
    }
  };

  const handleCreateGoal = async (goalData: Partial<Goal>) => {
    try {
      await api.post('/goals', {
        ...goalData,
        assignedUserId: employeeId
      });
      await fetchEmployeeData();
      setShowAddGoal(false);
    } catch (error) {
      console.error('Failed to create goal:', error);
      alert('Failed to create goal');
    }
  };

  const handleCreateKPI = async (kpiData: Partial<KPI>) => {
    try {
      if (goals.length === 0) {
        alert('Please create a goal first before adding KPIs');
        return;
      }
      
      await api.post('/kpis', {
        ...kpiData,
        goalId: goals[0].id // Associate with first goal
      });
      await fetchEmployeeData();
      setShowAddKPI(false);
    } catch (error) {
      console.error('Failed to create KPI:', error);
      alert('Failed to create KPI');
    }
  };

  if (!isManager) return null;

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        <p className="text-gray-400 mt-4">Loading employee data...</p>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="text-center py-12 card">
        <p className="text-gray-400">Employee not found</p>
        <button onClick={() => navigate('/all-accounts')} className="btn-primary mt-4">
          Back to All Accounts
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/all-accounts')}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <User className="text-primary-400" />
              Manage {employee.name || 'Employee'}
            </h1>
            <p className="text-gray-400 mt-1">
              {employee.designation || 'No designation'} • {employee.employeeId || 'No ID'}
            </p>
          </div>
        </div>
      </div>

      {/* Employee Info Card */}
      <div className="card p-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold text-2xl">
            {employee.name?.charAt(0) || 'U'}
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-white">{employee.name || 'Unknown'}</h2>
            <p className="text-gray-400">{employee.email || 'N/A'}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Department</p>
            <p className="text-white font-semibold">{employee.department?.name || 'N/A'}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Role</p>
            <p className="text-white font-semibold">{employee.role || 'N/A'}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="card p-2">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('goals')}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
              activeTab === 'goals'
                ? 'bg-primary-600 text-white'
                : 'text-gray-400 hover:bg-white/5'
            }`}
          >
            <Target className="inline mr-2" size={20} />
            Goals ({goals.length})
          </button>
          <button
            onClick={() => setActiveTab('kpis')}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
              activeTab === 'kpis'
                ? 'bg-primary-600 text-white'
                : 'text-gray-400 hover:bg-white/5'
            }`}
          >
            <BarChart3 className="inline mr-2" size={20} />
            KPIs ({kpis.length})
          </button>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'goals' ? (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">Goals Management</h2>
            <button
              onClick={() => setShowAddGoal(true)}
              className="btn-primary flex items-center gap-2"
            >
              <Plus size={20} />
              Add Goal
            </button>
          </div>

          {goals.length === 0 ? (
            <div className="card p-12 text-center">
              <Target className="mx-auto text-gray-600 mb-4" size={48} />
              <p className="text-gray-400">No goals yet. Create one to get started.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {goals.map((goal) => (
                <GoalCard
                  key={goal.id}
                  goal={goal}
                  isEditing={editingGoal?.id === goal.id}
                  onEdit={() => setEditingGoal(goal)}
                  onSave={handleUpdateGoal}
                  onCancel={() => setEditingGoal(null)}
                  onDelete={handleDeleteGoal}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">KPIs Management</h2>
            <button
              onClick={() => setShowAddKPI(true)}
              className="btn-primary flex items-center gap-2"
            >
              <Plus size={20} />
              Add KPI
            </button>
          </div>

          {kpis.length === 0 ? (
            <div className="card p-12 text-center">
              <BarChart3 className="mx-auto text-gray-600 mb-4" size={48} />
              <p className="text-gray-400">No KPIs yet. Create one to track progress.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {kpis.map((kpi) => (
                <KPICard
                  key={kpi.id}
                  kpi={kpi}
                  isEditing={editingKPI?.id === kpi.id}
                  onEdit={() => setEditingKPI(kpi)}
                  onSave={handleUpdateKPI}
                  onCancel={() => setEditingKPI(null)}
                  onDelete={handleDeleteKPI}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Add Goal Modal */}
      {showAddGoal && (
        <AddGoalModal
          onSave={handleCreateGoal}
          onCancel={() => setShowAddGoal(false)}
        />
      )}

      {/* Add KPI Modal */}
      {showAddKPI && (
        <AddKPIModal
          onSave={handleCreateKPI}
          onCancel={() => setShowAddKPI(false)}
        />
      )}
    </div>
  );
};

// Goal Card Component
const GoalCard = ({ goal, isEditing, onEdit, onSave, onCancel, onDelete }: any) => {
  const [editedGoal, setEditedGoal] = useState(goal);

  useEffect(() => {
    setEditedGoal(goal);
  }, [goal]);

  if (isEditing) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="card p-6"
      >
        <div className="space-y-4">
          <input
            type="text"
            value={editedGoal.title}
            onChange={(e) => setEditedGoal({ ...editedGoal, title: e.target.value })}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
            placeholder="Goal Title"
          />
          <textarea
            value={editedGoal.description}
            onChange={(e) => setEditedGoal({ ...editedGoal, description: e.target.value })}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
            rows={3}
            placeholder="Goal Description"
          />
          <div className="grid grid-cols-2 gap-4">
            <select
              value={editedGoal.status}
              onChange={(e) => setEditedGoal({ ...editedGoal, status: e.target.value })}
              className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
            >
              <option value="not_started">Not Started</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="delayed">Delayed</option>
            </select>
            <select
              value={editedGoal.priority}
              onChange={(e) => setEditedGoal({ ...editedGoal, priority: e.target.value })}
              className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Progress: {editedGoal.progress}%</label>
            <input
              type="range"
              min="0"
              max="100"
              value={editedGoal.progress}
              onChange={(e) => setEditedGoal({ ...editedGoal, progress: parseInt(e.target.value) })}
              className="w-full"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onSave(editedGoal)}
              className="flex-1 btn-primary flex items-center justify-center gap-2"
            >
              <Save size={18} />
              Save
            </button>
            <button
              onClick={onCancel}
              className="flex-1 btn-secondary flex items-center justify-center gap-2"
            >
              <X size={18} />
              Cancel
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card p-6"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-2">{goal.title}</h3>
          <p className="text-gray-400 text-sm">{goal.description}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="p-2 hover:bg-primary-600 rounded-lg transition-colors"
          >
            <Edit2 size={18} />
          </button>
          <button
            onClick={() => onDelete(goal.id)}
            className="p-2 hover:bg-red-600 rounded-lg transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Status:</span>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            goal.status === 'completed' ? 'bg-green-500/20 text-green-400' :
            goal.status === 'in_progress' ? 'bg-blue-500/20 text-blue-400' :
            goal.status === 'delayed' ? 'bg-red-500/20 text-red-400' :
            'bg-gray-500/20 text-gray-400'
          }`}>
            {goal.status.replace('_', ' ').toUpperCase()}
          </span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Priority:</span>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            goal.priority === 'critical' ? 'bg-red-500/20 text-red-400' :
            goal.priority === 'high' ? 'bg-orange-500/20 text-orange-400' :
            goal.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
            'bg-gray-500/20 text-gray-400'
          }`}>
            {goal.priority.toUpperCase()}
          </span>
        </div>
        
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">Progress:</span>
            <span className="text-white font-semibold">{goal.progress}%</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all"
              style={{ width: `${goal.progress}%` }}
            />
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-400">
          <span className="flex items-center gap-2">
            <Calendar size={14} />
            {new Date(goal.startDate).toLocaleDateString()}
          </span>
          <span>→</span>
          <span className="flex items-center gap-2">
            <Calendar size={14} />
            {new Date(goal.endDate).toLocaleDateString()}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

// KPI Card Component
const KPICard = ({ kpi, isEditing, onEdit, onSave, onCancel, onDelete }: any) => {
  const [editedKPI, setEditedKPI] = useState(kpi);
  const progress = kpi.target > 0 ? (kpi.current / kpi.target) * 100 : 0;

  useEffect(() => {
    setEditedKPI(kpi);
  }, [kpi]);

  if (isEditing) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="card p-6"
      >
        <div className="space-y-4">
          <input
            type="text"
            value={editedKPI.name}
            onChange={(e) => setEditedKPI({ ...editedKPI, name: e.target.value })}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
            placeholder="KPI Name"
          />
          <input
            type="number"
            value={editedKPI.current}
            onChange={(e) => setEditedKPI({ ...editedKPI, current: parseFloat(e.target.value) })}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
            placeholder="Current Value"
          />
          <input
            type="number"
            value={editedKPI.target}
            onChange={(e) => setEditedKPI({ ...editedKPI, target: parseFloat(e.target.value) })}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
            placeholder="Target Value"
          />
          <div className="flex gap-2">
            <button
              onClick={() => onSave(editedKPI)}
              className="flex-1 btn-primary flex items-center justify-center gap-2"
            >
              <Save size={18} />
              Save
            </button>
            <button
              onClick={onCancel}
              className="flex-1 btn-secondary flex items-center justify-center gap-2"
            >
              <X size={18} />
              Cancel
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="card p-6"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-white">{kpi.name}</h3>
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="p-2 hover:bg-primary-600 rounded-lg transition-colors"
          >
            <Edit2 size={18} />
          </button>
          <button
            onClick={() => onDelete(kpi.id)}
            className="p-2 hover:bg-red-600 rounded-lg transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-3xl font-bold text-white">{kpi.current}</p>
            <p className="text-sm text-gray-400">of {kpi.target} {kpi.unit}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-primary-400">{progress.toFixed(0)}%</p>
            <p className="text-xs text-gray-400">Progress</p>
          </div>
        </div>

        <div className="w-full bg-slate-700 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Category:</span>
          <span className="text-white font-semibold">{kpi.category}</span>
        </div>
      </div>
    </motion.div>
  );
};

// Add Goal Modal
const AddGoalModal = ({ onSave, onCancel }: any) => {
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    status: 'not_started',
    priority: 'medium',
    progress: 0,
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    type: 'specific'
  });

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <h2 className="text-2xl font-bold text-white mb-6">Create New Goal</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Title</label>
            <input
              type="text"
              value={newGoal.title}
              onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
              placeholder="Enter goal title"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Description</label>
            <textarea
              value={newGoal.description}
              onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
              rows={3}
              placeholder="Enter goal description"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Priority</label>
              <select
                value={newGoal.priority}
                onChange={(e) => setNewGoal({ ...newGoal, priority: e.target.value })}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Type</label>
              <select
                value={newGoal.type}
                onChange={(e) => setNewGoal({ ...newGoal, type: e.target.value })}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
              >
                <option value="specific">Specific</option>
                <option value="measurable">Measurable</option>
                <option value="achievable">Achievable</option>
                <option value="relevant">Relevant</option>
                <option value="timebound">Time-bound</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Start Date</label>
              <input
                type="date"
                value={newGoal.startDate}
                onChange={(e) => setNewGoal({ ...newGoal, startDate: e.target.value })}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">End Date</label>
              <input
                type="date"
                value={newGoal.endDate}
                onChange={(e) => setNewGoal({ ...newGoal, endDate: e.target.value })}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
              />
            </div>
          </div>
          <div className="flex gap-2 pt-4">
            <button
              onClick={() => onSave(newGoal)}
              className="flex-1 btn-primary"
              disabled={!newGoal.title}
            >
              Create Goal
            </button>
            <button
              onClick={onCancel}
              className="flex-1 btn-secondary"
            >
              Cancel
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Add KPI Modal
const AddKPIModal = ({ onSave, onCancel }: any) => {
  const [newKPI, setNewKPI] = useState({
    name: '',
    description: '',
    target: 100,
    current: 0,
    baseline: 0,
    unit: 'units',
    frequency: 'monthly',
    category: 'Performance',
    trend: 'stable'
  });

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <h2 className="text-2xl font-bold text-white mb-6">Create New KPI</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Name</label>
            <input
              type="text"
              value={newKPI.name}
              onChange={(e) => setNewKPI({ ...newKPI, name: e.target.value })}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
              placeholder="Enter KPI name"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Description</label>
            <input
              type="text"
              value={newKPI.description}
              onChange={(e) => setNewKPI({ ...newKPI, description: e.target.value })}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
              placeholder="Enter KPI description"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Current</label>
              <input
                type="number"
                value={newKPI.current}
                onChange={(e) => setNewKPI({ ...newKPI, current: parseFloat(e.target.value) })}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Target</label>
              <input
                type="number"
                value={newKPI.target}
                onChange={(e) => setNewKPI({ ...newKPI, target: parseFloat(e.target.value) })}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Unit</label>
              <input
                type="text"
                value={newKPI.unit}
                onChange={(e) => setNewKPI({ ...newKPI, unit: e.target.value })}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Category</label>
              <select
                value={newKPI.category}
                onChange={(e) => setNewKPI({ ...newKPI, category: e.target.value })}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
              >
                <option value="Performance">Performance</option>
                <option value="Quality">Quality</option>
                <option value="Productivity">Productivity</option>
                <option value="Security">Security</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Frequency</label>
              <select
                value={newKPI.frequency}
                onChange={(e) => setNewKPI({ ...newKPI, frequency: e.target.value })}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
              </select>
            </div>
          </div>
          <div className="flex gap-2 pt-4">
            <button
              onClick={() => onSave(newKPI)}
              className="flex-1 btn-primary"
              disabled={!newKPI.name}
            >
              Create KPI
            </button>
            <button
              onClick={onCancel}
              className="flex-1 btn-secondary"
            >
              Cancel
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ManageEmployee;
