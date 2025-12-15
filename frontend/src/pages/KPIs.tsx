import { useState, useEffect, useMemo, useRef } from 'react';
import { useAuthStore } from '../store/authStore';
import { BarChart3, TrendingUp, TrendingDown, Minus, Plus, Search, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Brush } from 'recharts';
import api from '../lib/api';

import type { KPI, Goal } from '../types';

const KPIs = () => {
  const [kpis, setKpis] = useState<KPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const chartRef = useRef<HTMLDivElement | null>(null);
  const [showBars, setShowBars] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [creating, setCreating] = useState(false);

  // Form state for new KPI
  const [newKPI, setNewKPI] = useState({
    name: '',
    description: '',
    unit: '',
    target: 0,
    current: 0,
    baseline: 0,
    frequency: 'monthly',
    category: '',
    goalId: '',
  });

  useEffect(() => {
    const fetchKPIs = async () => {
      try {
        const response = await api.get('/kpis');
        setKpis(response.data);
      } catch (error) {
        console.error('Failed to fetch KPIs:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchGoals = async () => {
      try {
        const response = await api.get('/goals');
        setGoals(response.data);
      } catch (error) {
        console.error('Failed to fetch goals:', error);
      }
    };

    fetchKPIs();
    fetchGoals();
  }, [useAuthStore().user]);

  const handleCreateKPI = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    
    try {
      await api.post('/kpis', newKPI);
      setShowCreateModal(false);
      setNewKPI({
        name: '',
        description: '',
        unit: '',
        target: 0,
        current: 0,
        baseline: 0,
        frequency: 'monthly',
        category: '',
        goalId: '',
      });
      // Refresh KPIs
      const response = await api.get('/kpis');
      setKpis(response.data);
    } catch (error) {
      console.error('Failed to create KPI:', error);
    } finally {
      setCreating(false);
    }
  };

  const trendData = [
    { month: 'Apr', value: 65 },
    { month: 'May', value: 68 },
    { month: 'Jun', value: 70 },
    { month: 'Jul', value: 73 },
    { month: 'Aug', value: 75 },
    { month: 'Sep', value: 77 },
    { month: 'Oct', value: 78 },
  ];

  const memoizedTrend = useMemo(() => trendData, [trendData]);

  const exportCSV = () => {
    try {
      const rows = [Object.keys(memoizedTrend[0]).join(',')];
      memoizedTrend.forEach((r: any) => rows.push(Object.values(r).join(',')));
      const csv = rows.join('\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `kpi-trend.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Export CSV failed', err);
    }
  };

  const exportPNG = async () => {
    try {
      if (!chartRef.current) return;
      const svg = chartRef.current.querySelector('svg');
      if (!svg) return;
      const serializer = new XMLSerializer();
      const svgString = serializer.serializeToString(svg as any);
      const canvas = document.createElement('canvas');
      const bbox = (svg as any).getBBox ? (svg as any).getBBox() : { width: 800, height: 300 };
      canvas.width = Math.max(800, Math.ceil(bbox.width));
      canvas.height = Math.max(300, Math.ceil(bbox.height));
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const img = new Image();
      const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);
      await new Promise<void>((resolve, reject) => {
        img.onload = () => {
          ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--bg') || '#0f172a';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
          URL.revokeObjectURL(url);
          resolve();
        };
        img.onerror = (e) => reject(e);
        img.src = url;
      });
      const pngUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = pngUrl;
      a.download = 'kpi-chart.png';
      a.click();
    } catch (err) {
      console.error('Export PNG failed', err);
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="text-green-500" size={20} />;
      case 'down':
        return <TrendingDown className="text-red-500" size={20} />;
      default:
        return <Minus className="text-yellow-500" size={20} />;
    }
  };

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const filteredKPIs = kpis.filter(kpi =>
    kpi.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    kpi.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Loading KPIs...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Key Performance Indicators</h1>
          <p className="text-gray-400 mt-1">Monitor and track performance metrics</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="btn-primary mt-4 md:mt-0"
        >
          <Plus size={20} className="inline mr-2" />
          Add New KPI
        </button>
      </div>

      {/* Search */}
      <div className="card p-4">
        <div className="relative">
          <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search KPIs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-11"
          />
        </div>
      </div>

      {/* KPI Trend Chart */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Overall KPI Trend</h2>
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-400">Interactive KPI trend — brush to zoom, export CSV/PNG.</div>
          <div className="flex gap-2">
            <button onClick={() => setShowBars((s) => !s)} className="btn-secondary">{showBars ? 'Hide' : 'Show'} Bars</button>
            <button onClick={exportCSV} className="btn-secondary">Export CSV</button>
            <button onClick={exportPNG} className="btn-secondary">Export PNG</button>
          </div>
        </div>

        <div ref={chartRef}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={memoizedTrend} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22c55e" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#22c55e" stopOpacity="0.35" />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#0f172a" />
              <XAxis dataKey="month" stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
              <YAxis stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0b1220', border: '1px solid #111827', borderRadius: 8 }}
                formatter={(value: any) => [value, 'Value']}
              />
              <Legend />
              {showBars && (
                <Bar dataKey="value" fill="url(#barGrad)" radius={[8, 8, 0, 0]} isAnimationActive={!window.matchMedia || !window.matchMedia('(prefers-reduced-motion: reduce)').matches} animationDuration={700} />
              )}
              <Brush dataKey="month" height={28} stroke="#475569" travellerWidth={8} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* KPIs Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredKPIs.map((kpi, index) => {
          const progressPercentage = getProgressPercentage(kpi.current, kpi.target);
          
          return (
            <motion.div
              key={kpi.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card p-6 hover:border-secondary-500/50 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="text-secondary-400" size={20} />
                    <h3 className="text-lg font-semibold text-white">{kpi.name}</h3>
                  </div>
                  <p className="text-sm text-gray-400">{kpi.description}</p>
                </div>
                {getTrendIcon(kpi.trend)}
              </div>

              <div className="space-y-4">
                {/* Current vs Target */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-slate-800/50 p-3 rounded-lg">
                    <p className="text-xs text-gray-400 mb-1">Baseline</p>
                    <p className="text-lg font-bold text-gray-300">{kpi.baseline}{kpi.unit}</p>
                  </div>
                  <div className="bg-blue-500/20 p-3 rounded-lg border border-blue-500/50">
                    <p className="text-xs text-blue-400 mb-1">Current</p>
                    <p className="text-lg font-bold text-blue-400">{kpi.current}{kpi.unit}</p>
                  </div>
                  <div className="bg-green-500/20 p-3 rounded-lg border border-green-500/50">
                    <p className="text-xs text-green-400 mb-1">Target</p>
                    <p className="text-lg font-bold text-green-400">{kpi.target}{kpi.unit}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Target Achievement</span>
                    <span className="font-semibold text-secondary-400">
                      {Math.round(progressPercentage)}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercentage}%` }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="h-full bg-gradient-to-r from-secondary-600 to-secondary-700 rounded-full"
                    />
                  </div>
                </div>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-xs text-gray-400 pt-2 border-t border-slate-700">
                  <span className="flex items-center">
                    <Calendar size={14} className="mr-1" />
                    {kpi.frequency}
                  </span>
                  <span className="px-2 py-1 bg-primary-500/20 text-primary-400 rounded">
                    {kpi.category}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      {/* Create KPI Modal */}
      <CreateKPIModal
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateKPI}
        newKPI={newKPI}
        setNewKPI={(k: any) => setNewKPI(k)}
        goals={goals}
        creating={creating}
      />
    </div>
  );
};

// Create KPI Modal Component
const CreateKPIModal = ({ 
  show, 
  onClose, 
  onSubmit, 
  newKPI, 
  setNewKPI, 
  goals, 
  creating 
}: {
  show: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  newKPI: any;
  setNewKPI: (kpi: any) => void;
  goals: Goal[];
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
        <h2 className="text-2xl font-bold text-white mb-6">Create New KPI</h2>
        
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
              <input
                type="text"
                value={newKPI.name}
                onChange={(e) => setNewKPI({...newKPI, name: e.target.value})}
                className="input-field"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Unit</label>
              <input
                type="text"
                value={newKPI.unit}
                onChange={(e) => setNewKPI({...newKPI, unit: e.target.value})}
                className="input-field"
                placeholder="e.g., %, hours, count"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <textarea
              value={newKPI.description}
              onChange={(e) => setNewKPI({...newKPI, description: e.target.value})}
              className="input-field"
              rows={3}
              required
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Baseline</label>
              <input
                type="number"
                step="0.01"
                value={newKPI.baseline}
                onChange={(e) => setNewKPI({...newKPI, baseline: parseFloat(e.target.value) || 0})}
                className="input-field"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Current</label>
              <input
                type="number"
                step="0.01"
                value={newKPI.current}
                onChange={(e) => setNewKPI({...newKPI, current: parseFloat(e.target.value) || 0})}
                className="input-field"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Target</label>
              <input
                type="number"
                step="0.01"
                value={newKPI.target}
                onChange={(e) => setNewKPI({...newKPI, target: parseFloat(e.target.value) || 0})}
                className="input-field"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Frequency</label>
              <select
                value={newKPI.frequency}
                onChange={(e) => setNewKPI({...newKPI, frequency: e.target.value})}
                className="input-field"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
              <input
                type="text"
                value={newKPI.category}
                onChange={(e) => setNewKPI({...newKPI, category: e.target.value})}
                className="input-field"
                placeholder="e.g., Performance, Quality, Finance"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Associated Goal (Optional)</label>
            <select
              value={newKPI.goalId}
              onChange={(e) => setNewKPI({...newKPI, goalId: e.target.value})}
              className="input-field"
            >
              <option value="">No associated goal</option>
              {goals.map((goal) => (
                <option key={goal.id} value={goal.id}>{goal.title}</option>
              ))}
            </select>
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
              {creating ? 'Creating...' : 'Create KPI'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default KPIs;
export { CreateKPIModal };
