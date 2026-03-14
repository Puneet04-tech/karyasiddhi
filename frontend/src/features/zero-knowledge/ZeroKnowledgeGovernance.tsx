import React, { useState, useEffect } from 'react';
import {
  Lock, Shield, Key, CheckCircle, AlertCircle, Zap, Brain,
  TrendingUp, Activity, BarChart3, Eye, EyeOff, RefreshCw,
  Download, Upload, Settings, History, Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { useAuthStore } from '../../store/authStore';
import { useRealTimeAnalytics } from '../../lib/useRealTimeData';

interface ZKProof {
  id: string;
  title: string;
  type: 'identity' | 'access' | 'compliance' | 'transaction' | 'credential';
  status: 'verified' | 'pending' | 'failed';
  confidence: number;
  prover: string;
  verifier: string;
  timestamp: Date;
  metadata_hidden: boolean;
}

interface GovernanceRecord {
  id: string;
  action: string;
  actor: string;
  timestamp: Date;
  encrypted: boolean;
  verification_count: number;
  compliance_score: number;
}

interface CryptographicMetric {
  name: string;
  current: number;
  target: number;
  status: 'optimal' | 'warning' | 'critical';
}

const ZeroKnowledgeGovernance: React.FC = () => {
  const { user } = useAuthStore();
  const { data: analyticsData, loading: analyticsLoading } = useRealTimeAnalytics(user?.id);

  const [proofs, setProofs] = useState<ZKProof[]>([]);
  const [records, setRecords] = useState<GovernanceRecord[]>([]);
  const [metrics, setMetrics] = useState<CryptographicMetric[]>([]);
  const [selectedProof, setSelectedProof] = useState<ZKProof | null>(null);
  const [verificationMode, setVerificationMode] = useState(true);
  const [systemHealth, setSystemHealth] = useState(94.2);

  // Transform analytics data to cryptographic metrics
  useEffect(() => {
    if (analyticsData) {
      const data = Array.isArray(analyticsData) ? analyticsData[0] : analyticsData;
      const performanceScore = data?.performance_score || 0.7;
      const avgKpi = data?.avg_kpi || 0.75;

      // Generate proofs based on analytics
      const mockProofs: ZKProof[] = [
        {
          id: '1',
          title: `Performance Verification (${Math.round(performanceScore * 100)}%)`,
          type: 'identity',
          status: performanceScore > 0.7 ? 'verified' : 'pending',
          confidence: Math.round(performanceScore * 100),
          prover: user?.name || 'System',
          verifier: 'Analytics-Verification',
          timestamp: new Date(),
          metadata_hidden: true
        },
        {
          id: '2',
          title: `KPI Compliance (${Math.round(avgKpi * 100)}%)`,
          type: 'compliance',
          status: avgKpi > 0.75 ? 'verified' : 'pending',
          confidence: Math.round(avgKpi * 100),
          prover: user?.department || 'Department',
          verifier: 'Compliance-Engine',
          timestamp: new Date(),
          metadata_hidden: true
        }
      ];

      // Generate governance records
      const mockRecords: GovernanceRecord[] = [
        {
          id: '1',
          action: `Performance update to ${Math.round(performanceScore * 100)}%`,
          actor: user?.name || 'System',
          timestamp: new Date(),
          encrypted: true,
          verification_count: 3,
          compliance_score: Math.round(avgKpi * 100)
        },
        {
          id: '2',
          action: 'System verification completed',
          actor: 'Verification-System',
          timestamp: new Date(Date.now() - 60 * 60 * 1000),
          encrypted: true,
          verification_count: 5,
          compliance_score: 95
        }
      ];

      // Generate metrics
      const mockMetrics: CryptographicMetric[] = [
        {
          name: 'Verification Confidence',
          current: Math.round(performanceScore * 100),
          target: 95,
          status: performanceScore > 0.9 ? 'optimal' : 'warning'
        },
        {
          name: 'Governance Compliance',
          current: Math.round(avgKpi * 100),
          target: 90,
          status: avgKpi > 0.85 ? 'optimal' : 'warning'
        },
        {
          name: 'System Integrity',
          current: 99,
          target: 99,
          status: 'optimal'
        }
      ];

      setProofs(mockProofs);
      setRecords(mockRecords);
      setMetrics(mockMetrics);
      setSystemHealth(Math.round((performanceScore + avgKpi) / 2 * 100));
    }
  }, [analyticsData]);

  const generateMockProofs = () => {
    const mockProofs: ZKProof[] = [
      {
        id: '1',
        title: 'User Identity Verification',
        type: 'identity',
        status: 'verified',
        confidence: 99.8,
        prover: 'Officer-001',
        verifier: 'System-Auth',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        metadata_hidden: true
      },
      {
        id: '2',
        title: 'Access Authorization',
        type: 'access',
        status: 'verified',
        confidence: 98.5,
        prover: 'Manager-002',
        verifier: 'Access-Control',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
        metadata_hidden: true
      },
      {
        id: '3',
        title: 'Compliance Check',
        type: 'compliance',
        status: 'verified',
        confidence: 97.2,
        prover: 'Auditor-003',
        verifier: 'Compliance-Engine',
        timestamp: new Date(),
        metadata_hidden: true
      },
      {
        id: '4',
        title: 'Transaction Validation',
        type: 'transaction',
        status: 'pending',
        confidence: 85.3,
        prover: 'System-TX',
        verifier: 'Verification',
        timestamp: new Date(),
        metadata_hidden: true
      },
      {
        id: '5',
        title: 'Credential Verification',
        type: 'credential',
        status: 'verified',
        confidence: 96.1,
        prover: 'HR-System',
        verifier: 'Credential-Service',
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
        metadata_hidden: true
      }
    ];
    setProofs(mockProofs);
  };

  const generateMockRecords = () => {
    const actions = ['Data Access', 'Policy Update', 'User Grant', 'System Change', 'Audit Log'];
    const mockRecords: GovernanceRecord[] = Array.from({ length: 8 }, (_, i) => ({
      id: (i + 1).toString(),
      action: actions[i % actions.length],
      actor: `User-${Math.floor(i / 2) + 1}`,
      timestamp: new Date(Date.now() - (i * 30 * 60 * 1000)),
      encrypted: true,
      verification_count: Math.floor(Math.random() * 5) + 3,
      compliance_score: 90 + Math.random() * 10
    }));
    setRecords(mockRecords);
  };

  const generateMockMetrics = () => {
    const mockMetrics: CryptographicMetric[] = [
      { name: 'Encryption Level', current: 256, target: 256, status: 'optimal' },
      { name: 'Proof Verification', current: 99.2, target: 99.0, status: 'optimal' },
      { name: 'System Security', current: 98.5, target: 98.0, status: 'optimal' },
      { name: 'Compliance Rate', current: 97.8, target: 95.0, status: 'optimal' }
    ];
    setMetrics(mockMetrics);
  };

  const chartData = [
    { time: '00:00', verified: 125, pending: 8, failed: 2 },
    { time: '06:00', verified: 156, pending: 12, failed: 3 },
    { time: '12:00', verified: 189, pending: 15, failed: 2 },
    { time: '18:00', verified: 234, pending: 10, failed: 1 },
    { time: '23:59', verified: 267, pending: 6, failed: 1 }
  ];

  const proofTypeData = [
    { name: 'Identity', value: 85, color: '#3b82f6' },
    { name: 'Access', value: 72, color: '#10b981' },
    { name: 'Compliance', value: 68, color: '#f59e0b' },
    { name: 'Transaction', value: 54, color: '#8b5cf6' },
    { name: 'Credential', value: 62, color: '#ef4444' }
  ];

  const radarData = [
    { metric: 'Encryption', value: 95 },
    { metric: 'Authentication', value: 98 },
    { metric: 'Verification', value: 99 },
    { metric: 'Compliance', value: 97 },
    { metric: 'Transparency', value: 94 },
    { metric: 'Auditability', value: 96 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-blue-500/20">
            <Lock className="w-8 h-8 text-blue-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold gradient-text">Zero Knowledge Governance</h1>
            <p className="text-gray-400">Cryptographic Proof & Privacy-Preserving Verification</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-500/20">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-green-400 font-semibold">{systemHealth.toFixed(1)}% Secure</span>
          </div>
          <button className="btn-secondary">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* System Health & Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <motion.div
            key={metric.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-4"
          >
            <p className="text-sm text-gray-400 mb-2">{metric.name}</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-white">{metric.current}</p>
                <p className="text-xs text-gray-500">Target: {metric.target}</p>
              </div>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                metric.status === 'optimal' ? 'bg-green-500/20' : 'bg-yellow-500/20'
              }`}>
                <CheckCircle className={`w-6 h-6 ${
                  metric.status === 'optimal' ? 'text-green-400' : 'text-yellow-400'
                }`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Zero Knowledge Proofs List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white flex items-center">
            <Key className="w-5 h-5 mr-2 text-blue-400" />
            Zero Knowledge Proofs
          </h2>
          <button className="btn-primary text-sm">
            <Upload className="w-4 h-4 mr-1" />
            Generate Proof
          </button>
        </div>

        <div className="space-y-2">
          {proofs.map((proof) => (
            <motion.div
              key={proof.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card p-4 hover:border-blue-500/50 cursor-pointer transition-all"
              onClick={() => setSelectedProof(proof)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    proof.status === 'verified' ? 'bg-green-400' :
                    proof.status === 'pending' ? 'bg-yellow-400' :
                    'bg-red-400'
                  }`} />
                  <div>
                    <p className="font-semibold text-white">{proof.title}</p>
                    <p className="text-xs text-gray-400">Type: {proof.type.replace('_', ' ')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-bold text-blue-400">{proof.confidence.toFixed(1)}%</p>
                    <p className="text-xs text-gray-500 capitalize">{proof.status}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {proof.metadata_hidden ? (
                      <EyeOff className="w-4 h-4 text-gray-500" />
                    ) : (
                      <Eye className="w-4 h-4 text-blue-400" />
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Prover: {proof.prover}</span>
                <span>{proof.timestamp.toLocaleTimeString()}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Proof Verification Timeline */}
      <div className="card p-6">
        <h3 className="text-xl font-semibold text-white mb-6">Verification Timeline</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <defs>
              <linearGradient id="verifiedGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="time" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #3b82f6' }} />
            <Line type="monotone" dataKey="verified" stroke="#3b82f6" strokeWidth={2} fill="url(#verifiedGrad)" />
            <Line type="monotone" dataKey="pending" stroke="#f59e0b" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Proof Types Distribution */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Proof Type Pie Chart */}
        <div className="card p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Proof Type Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={proofTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {proofTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Security Metrics Radar */}
        <div className="card p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Security Coverage</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#374151" />
              <PolarAngleAxis dataKey="metric" stroke="#94a3b8" />
              <PolarRadiusAxis stroke="#94a3b8" />
              <Radar name="Coverage" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Governance Records */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <History className="w-5 h-5 mr-2 text-purple-400" />
          Encrypted Governance Records
        </h2>
        <div className="space-y-2">
          {records.map((record) => (
            <motion.div
              key={record.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="card p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-purple-400" />
                  <div>
                    <p className="font-semibold text-white">{record.action}</p>
                    <p className="text-xs text-gray-400">By {record.actor} • {record.verification_count} verifications</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-bold text-green-400">{record.compliance_score.toFixed(1)}%</p>
                    <p className="text-xs text-gray-500">{record.timestamp.toLocaleTimeString()}</p>
                  </div>
                  {record.encrypted && (
                    <Lock className="w-4 h-4 text-green-400" />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Selected Proof Details */}
      <AnimatePresence>
        {selectedProof && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="card p-6 border border-blue-500/50"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">Proof Details</h3>
              <button
                onClick={() => setSelectedProof(null)}
                className="btn-secondary"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-400">Title</p>
                <p className="text-white font-semibold">{selectedProof.title}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Type</p>
                <p className="text-white font-semibold capitalize">{selectedProof.type}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Status</p>
                <p className={`font-semibold ${
                  selectedProof.status === 'verified' ? 'text-green-400' : 'text-yellow-400'
                }`}>{selectedProof.status}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Confidence</p>
                <p className="text-blue-400 font-semibold">{selectedProof.confidence.toFixed(1)}%</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ZeroKnowledgeGovernance;
