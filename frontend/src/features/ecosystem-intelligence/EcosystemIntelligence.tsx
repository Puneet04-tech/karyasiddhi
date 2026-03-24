import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useEnterpriseData } from '../../lib/useEnterpriseData';
import {
  Network, Share2, Activity, BarChart3, TrendingUp,
  Settings, RefreshCw, LinkIcon, Zap, Users, Target,
  ArrowRight, CheckCircle, AlertCircle, Microscope
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Legend, ScatterChart, Scatter
} from 'recharts';

interface Department {
  id: string;
  name: string;
  health: number;
  resources: number;
  dependencies: string[];
  collaboration_score: number;
  efficiency: number;
}

interface ResourceFlow {
  timestamp: string;
  shared_resources: number;
  efficiency: number;
  collaboration_level: number;
}

const EcosystemIntelligence: React.FC = () => {
  const { user } = useAuthStore();
  const { data: ecosystemData } = useEnterpriseData('ecosystem', user?.id);

  const [departments, setDepartments] = useState<Department[]>([]);
  const [selectedDept, setSelectedDept] = useState<Department | null>(null);
  const [resourceFlows, setResourceFlows] = useState<ResourceFlow[]>([]);
  const [ecosystemHealth, setEcosystemHealth] = useState(78.5);

  useEffect(() => {
    if (ecosystemData) {
      const data = ecosystemData
      
      // Transform analytics to department data
      const deptNames = ['IT', 'DSD', 'EGU', 'R&D', 'Operations', 'Strategy'];
      const mockDepts: Department[] = deptNames.map((name, idx) => ({
        id: (idx + 1).toString(),
        name,
        health: Math.round((data?.performance_score || 0.78) * 100),
        resources: Math.floor((data?.performance_score || 0.78) * 100),
        dependencies: deptNames.filter((_, i) => i !== idx).slice(0, 2),
        collaboration_score: Math.round((data?.avg_kpi || 0.75) * 100),
        efficiency: Math.round((data?.performance_score || 0.78) * 100)
      }));
      
      setDepartments(mockDepts);
      if (mockDepts.length > 0) setSelectedDept(mockDepts[0]);
      
      // Calculate ecosystem health from analytics
      const health = ((data?.performance_score || 0.78) + (data?.avg_kpi || 0.75)) / 2 * 100;
      setEcosystemHealth(health);
      
      // Generate resource flows from time-series analytics
      const resourceData: ResourceFlow[] = Array.from({ length: 12 }, (_, i) => ({
        timestamp: `${i}:00`,
        shared_resources: Math.floor((data?.performance_score || 0.78) * 100),
        efficiency: Math.round((data?.avg_kpi || 0.75) * 100),
        collaboration_level: Math.floor((data?.team_size || 5) * 20)
      }));
      
      setResourceFlows(resourceData);
    }
  }, [ecosystemData]);

  const deptHealthData = departments.map(d => ({ name: d.name, health: d.health, color: '#3b82f6' }));
  const collaborationData = departments.map(d => ({ name: d.name, x: d.resources, y: d.collaboration_score, size: d.health }));
  const healthDistribution = [
    { name: 'Optimal (>80)', value: departments.filter(d => d.health > 80).length, color: '#10b981' },
    { name: 'Good (60-80)', value: departments.filter(d => d.health >= 60 && d.health <= 80).length, color: '#f59e0b' },
    { name: 'At Risk (<60)', value: departments.filter(d => d.health < 60).length, color: '#ef4444' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-cyan-500/20">
            <Network className="w-8 h-8 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold gradient-text">Ecosystem Intelligence</h1>
            <p className="text-gray-400">Department Interconnectivity & Resource Flow Analysis</p>
          </div>
        </div>
        <button className="btn-secondary">
          <Settings className="w-4 h-4" />
        </button>
      </div>

      {/* Ecosystem Health */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6 bg-gradient-to-r from-cyan-500/10 to-blue-500/10"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Overall Ecosystem Health</p>
            <h2 className="text-4xl font-bold text-white mt-2">{ecosystemHealth.toFixed(1)}%</h2>
          </div>
          <div className="w-40 h-40 relative">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#374151" strokeWidth="8" />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 45 * (ecosystemHealth / 100)} ${2 * Math.PI * 45}`}
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Activity className="w-6 h-6 text-cyan-400 mx-auto mb-1" />
                <p className="text-sm text-gray-400">Healthy</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Departments</span>
            <Users className="w-5 h-5 text-blue-400" />
          </div>
          <p className="text-3xl font-bold text-white">{departments.length}</p>
          <p className="text-xs text-gray-500 mt-1">Active & Connected</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Dependencies</span>
            <LinkIcon className="w-5 h-5 text-cyan-400" />
          </div>
          <p className="text-3xl font-bold text-white">{departments.reduce((sum, d) => sum + d.dependencies.length, 0)}</p>
          <p className="text-xs text-gray-500 mt-1">Inter-Department Links</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Avg Collaboration</span>
            <Zap className="w-5 h-5 text-yellow-400" />
          </div>
          <p className="text-3xl font-bold text-white">{(departments.reduce((sum, d) => sum + d.collaboration_score, 0) / departments.length).toFixed(0)}%</p>
          <p className="text-xs text-gray-500 mt-1">Score</p>
        </motion.div>
      </div>

      {/* Department Health Chart */}
      <div className="card p-6">
        <h3 className="text-xl font-semibold text-white mb-6">Department Health Status</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={deptHealthData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #06b6d4' }} />
            <Bar dataKey="health" fill="#06b6d4" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Resource Flow & Collaboration */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Resource Flow */}
        <div className="card p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Resource Flow Over Time</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={resourceFlows}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="timestamp" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#1a1a2e' }} />
              <Legend />
              <Line type="monotone" dataKey="shared_resources" stroke="#06b6d4" strokeWidth={2} name="Resources" />
              <Line type="monotone" dataKey="collaboration_level" stroke="#8b5cf6" strokeWidth={2} name="Collaboration" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Health Distribution */}
        <div className="card p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Health Distribution</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={healthDistribution} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value}`} outerRadius={80} fill="#8884d8" dataKey="value">
                {healthDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Department Network */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <Share2 className="w-5 h-5 mr-2 text-cyan-400" />
          Department Network
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {departments.map((dept) => (
            <motion.div
              key={dept.id}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedDept(dept)}
              className={`card p-4 cursor-pointer transition-all ${
                selectedDept?.id === dept.id ? 'border-cyan-500/75' : 'hover:border-cyan-500/50'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-white">{dept.name}</p>
                  <p className="text-xs text-gray-400 mt-1">{dept.dependencies.length} dependencies</p>
                </div>
                <Network className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-gray-400">Health: {dept.health}%</p>
                  <div className="w-full bg-gray-700 rounded-full h-1.5">
                    <div className="h-1.5 rounded-full bg-cyan-500" style={{ width: `${dept.health}%` }} />
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Collaboration: {dept.collaboration_score}%</p>
                  <div className="w-full bg-gray-700 rounded-full h-1.5">
                    <div className="h-1.5 rounded-full bg-purple-500" style={{ width: `${dept.collaboration_score}%` }} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Selected Department Details */}
      <AnimatePresence>
        {selectedDept && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="card p-6 border border-cyan-500/50">
            <h3 className="text-xl font-semibold text-white mb-4">{selectedDept.name} Department Details</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div>
                <p className="text-sm text-gray-400">Health</p>
                <p className="text-2xl font-bold text-cyan-400">{selectedDept.health}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Resources</p>
                <p className="text-2xl font-bold text-blue-400">{selectedDept.resources}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Collaboration</p>
                <p className="text-2xl font-bold text-purple-400">{selectedDept.collaboration_score}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Efficiency</p>
                <p className="text-2xl font-bold text-green-400">{selectedDept.efficiency}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Dependencies</p>
                <p className="text-2xl font-bold text-orange-400">{selectedDept.dependencies.length}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EcosystemIntelligence;
