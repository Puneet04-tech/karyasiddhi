import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useRealTimeAnalytics } from '../../lib/useRealTimeData';
import {
  Beaker, FlaskConical, BarChart3, TrendingUp, CheckCircle,
  AlertCircle, Settings, RefreshCw, Play, Pause, Users,
  Zap, Target, Clock, Plus, Microscope
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';

interface PolicyExperiment {
  id: string;
  name: string;
  hypothesis: string;
  status: 'planning' | 'active' | 'completed' | 'failed';
  control_group: number;
  test_group: number;
  confidence: number;
  impact: number;
  start_date: Date;
  end_date?: Date;
}

interface ExperimentMetric {
  timestamp: string;
  control_performance: number;
  test_performance: number;
  statistical_significance: number;
}

const LaboratoryOfGovernance: React.FC = () => {
  const { user } = useAuthStore();
  const { data: analyticsData } = useRealTimeAnalytics(user?.id);

  const [experiments, setExperiments] = useState<PolicyExperiment[]>([]);
  const [selectedExperiment, setSelectedExperiment] = useState<PolicyExperiment | null>(null);
  const [metrics, setMetrics] = useState<ExperimentMetric[]>([]);
  const [totalExperiments, setTotalExperiments] = useState(12);
  const [successRate, setSuccessRate] = useState(75);

  useEffect(() => {
    if (analyticsData) {
      const data = Array.isArray(analyticsData) ? analyticsData[0] : analyticsData;
      
      const mockExperiments: PolicyExperiment[] = [
        {
          id: '1',
          name: 'Flexible Work Policy A/B Test',
          hypothesis: 'Remote work increases productivity by 15%',
          status: (data?.performance_score || 0.75) > 0.85 ? 'completed' : 'active',
          control_group: 150,
          test_group: 150,
          confidence: Math.round((data?.performance_score || 0.75) * 100),
          impact: Math.round((data?.avg_kpi || 0.75) * 20),
          start_date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000)
        },
        {
          id: '2',
          name: 'Performance Bonus Restructure',
          hypothesis: 'New bonus structure improves engagement',
          status: 'active',
          control_group: 120,
          test_group: 120,
          confidence: Math.round((data?.performance_score || 0.75) * 95),
          impact: Math.round((data?.avg_kpi || 0.75) * 15),
          start_date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        }
      ];
      
      setExperiments(mockExperiments);
      if (mockExperiments.length > 0) setSelectedExperiment(mockExperiments[0]);
      
      const mockMetrics: ExperimentMetric[] = Array.from({ length: 12 }, (_, i) => ({
        timestamp: `Day ${i + 1}`,
        control_performance: Math.round((data?.performance_score || 0.75) * 80) + i * 2,
        test_performance: Math.round((data?.performance_score || 0.75) * 85) + i * 3,
        statistical_significance: Math.round((data?.avg_kpi || 0.75) * 90) + i * 1
      }));
      
      setMetrics(mockMetrics);
      setSuccessRate(Math.round((data?.performance_score || 0.75) * 100));
    }
  }, [analyticsData]);

  const generateExperiments = () => {
    const mockExperiments: PolicyExperiment[] = [
      {
        id: '1',
        name: 'Flexible Work Policy A/B Test',
        hypothesis: 'Remote work increases productivity by 15%',
        status: 'completed',
        control_group: 150,
        test_group: 150,
        confidence: 94.5,
        impact: 18.2,
        start_date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
        end_date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
      },
      {
        id: '2',
        name: 'Performance Bonus Restructure',
        hypothesis: 'New bonus structure improves engagement',
        status: 'active',
        control_group: 120,
        test_group: 120,
        confidence: 72.3,
        impact: 12.8,
        start_date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      },
      {
        id: '3',
        name: 'Training Program Innovation',
        hypothesis: 'AI-powered training reduces time by 40%',
        status: 'active',
        control_group: 100,
        test_group: 100,
        confidence: 81.6,
        impact: 38.5,
        start_date: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000)
      },
      {
        id: '4',
        name: 'Cross-Department Collaboration',
        hypothesis: 'Cross-functional teams reduce project time',
        status: 'planning',
        control_group: 80,
        test_group: 80,
        confidence: 0,
        impact: 0,
        start_date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)
      },
      {
        id: '5',
        name: 'Decision-Making Process',
        hypothesis: 'Consensus model speeds up approvals',
        status: 'failed',
        control_group: 200,
        test_group: 200,
        confidence: 88.9,
        impact: -5.2,
        start_date: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
        end_date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000)
      }
    ];
    setExperiments(mockExperiments);
    if (mockExperiments.length > 0) setSelectedExperiment(mockExperiments[0]);
  };

  const generateMetrics = () => {
    const data: ExperimentMetric[] = Array.from({ length: 10 }, (_, i) => ({
      timestamp: new Date(Date.now() - (9 - i) * 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      control_performance: 60 + Math.random() * 20,
      test_performance: 65 + Math.random() * 20 + i,
      statistical_significance: 50 + i * 4 + Math.random() * 5
    }));
    setMetrics(data);
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'planning': 'bg-blue-500/20 text-blue-400',
      'active': 'bg-green-500/20 text-green-400',
      'completed': 'bg-purple-500/20 text-purple-400',
      'failed': 'bg-red-500/20 text-red-400'
    };
    return colors[status] || 'bg-gray-500/20 text-gray-400';
  };

  const radarData = selectedExperiment ? [
    { metric: 'Control Performance', value: 65 + Math.random() * 20 },
    { metric: 'Test Performance', value: 70 + Math.random() * 20 },
    { metric: 'Confidence Level', value: selectedExperiment.confidence },
    { metric: 'Impact Score', value: Math.min(100, selectedExperiment.impact * 3) },
    { metric: 'Sample Size', value: Math.min(100, (selectedExperiment.control_group + selectedExperiment.test_group) / 4) }
  ] : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-orange-500/20">
            <Beaker className="w-8 h-8 text-orange-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold gradient-text">Laboratory of Governance</h1>
            <p className="text-gray-400">A/B Testing & Policy Experimentation Platform</p>
          </div>
        </div>
        <button className="btn-secondary">
          <Settings className="w-4 h-4" />
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Total Experiments</span>
            <Microscope className="w-5 h-5 text-orange-400" />
          </div>
          <p className="text-3xl font-bold text-white">{totalExperiments}</p>
          <p className="text-xs text-gray-500 mt-1">Completed & Active</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Success Rate</span>
            <CheckCircle className="w-5 h-5 text-green-400" />
          </div>
          <p className="text-3xl font-bold text-white">{successRate}%</p>
          <p className="text-xs text-gray-500 mt-1">Positive Outcomes</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Active Tests</span>
            <Zap className="w-5 h-5 text-yellow-400" />
          </div>
          <p className="text-3xl font-bold text-white">{experiments.filter(e => e.status === 'active').length}</p>
          <p className="text-xs text-gray-500 mt-1">Running Now</p>
        </motion.div>
      </div>

      {/* Performance Comparison Chart */}
      <div className="card p-6">
        <h3 className="text-xl font-semibold text-white mb-6">Control vs Test Group Performance</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={metrics}>
            <defs>
              <linearGradient id="controlGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="testGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="timestamp" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #3b82f6' }} />
            <Legend />
            <Area type="monotone" dataKey="control_performance" fill="url(#controlGrad)" stroke="#3b82f6" name="Control Group" />
            <Area type="monotone" dataKey="test_performance" fill="url(#testGrad)" stroke="#10b981" name="Test Group" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Experiments List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <FlaskConical className="w-5 h-5 mr-2 text-orange-400" />
          Active & Completed Experiments
        </h2>
        <div className="space-y-3">
          {experiments.map((exp) => (
            <motion.div
              key={exp.id}
              whileHover={{ scale: 1.01 }}
              onClick={() => setSelectedExperiment(exp)}
              className={`card p-4 cursor-pointer transition-all ${
                selectedExperiment?.id === exp.id ? 'border-orange-500/75' : 'hover:border-orange-500/50'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-white">{exp.name}</h3>
                  <p className="text-sm text-gray-400 mt-1">{exp.hypothesis}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(exp.status)}`}>
                  {exp.status.charAt(0).toUpperCase() + exp.status.slice(1)}
                </span>
              </div>
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-400">Control: {exp.control_group}</p>
                </div>
                <div>
                  <p className="text-gray-400">Test: {exp.test_group}</p>
                </div>
                <div>
                  <p className="text-gray-400">Confidence: {exp.confidence.toFixed(1)}%</p>
                </div>
                <div>
                  <p className={exp.impact >= 0 ? 'text-green-400' : 'text-red-400'}>
                    Impact: {exp.impact > 0 ? '+' : ''}{exp.impact.toFixed(1)}%
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Selected Experiment Details */}
      <AnimatePresence>
        {selectedExperiment && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="space-y-6">
            {/* Radar Chart */}
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-white mb-6">Experiment Metrics</h3>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#374151" />
                  <PolarAngleAxis dataKey="metric" stroke="#94a3b8" tick={{ fontSize: 12 }} />
                  <PolarRadiusAxis stroke="#94a3b8" />
                  <Radar name="Performance" dataKey="value" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Detailed Metrics */}
            <div className="card p-6 border border-orange-500/50">
              <h3 className="text-xl font-semibold text-white mb-4">Statistical Analysis</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-white mb-4">Sample Details</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Control Group Size</span>
                      <span className="text-white font-bold">{selectedExperiment.control_group}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Test Group Size</span>
                      <span className="text-white font-bold">{selectedExperiment.test_group}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Total Participants</span>
                      <span className="text-blue-400 font-bold">{selectedExperiment.control_group + selectedExperiment.test_group}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-4">Results</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Confidence Level</span>
                      <span className={selectedExperiment.confidence >= 95 ? 'text-green-400' : 'text-yellow-400'} style={{ fontWeight: 'bold' }}>
                        {selectedExperiment.confidence.toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Impact Measured</span>
                      <span className={selectedExperiment.impact >= 0 ? 'text-green-400' : 'text-red-400'} style={{ fontWeight: 'bold' }}>
                        {selectedExperiment.impact > 0 ? '+' : ''}{selectedExperiment.impact.toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Duration</span>
                      <span className="text-white font-bold">
                        {selectedExperiment.end_date
                          ? Math.floor((selectedExperiment.end_date.getTime() - selectedExperiment.start_date.getTime()) / (24 * 60 * 60 * 1000))
                          : Math.floor((Date.now() - selectedExperiment.start_date.getTime()) / (24 * 60 * 60 * 1000))}
                        {' '}days
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LaboratoryOfGovernance;
