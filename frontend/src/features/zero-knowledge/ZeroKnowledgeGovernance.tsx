import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, Eye, EyeOff, Lock, Unlock, Key, Database, 
  Zap, CheckCircle, AlertTriangle, Users, Activity,
  BarChart3, LineChart, Settings, RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

interface ZeroKnowledgeProof {
  id: string;
  title: string;
  description: string;
  type: 'performance_proof' | 'resource_proof' | 'policy_proof' | 'compliance_proof';
  status: 'generating' | 'verifying' | 'verified' | 'failed';
  confidence: number;
  proof_data: {
    commitment: string;
    verification_method: string;
    privacy_level: 'minimal' | 'standard' | 'enhanced' | 'maximum';
    data_points: number;
    encrypted_hash: string;
  };
  created_at: Date;
  verified_at?: Date;
}

interface PrivacyControl {
  id: string;
  name: string;
  type: 'data_minimization' | 'anonymization' | 'encryption' | 'access_control';
  status: 'active' | 'inactive' | 'breached';
  effectiveness: number;
  last_audit: Date;
  settings: {
    strength_level: number;
    coverage_percentage: number;
    compliance_score: number;
  };
}

interface PrivacyMetric {
  category: string;
  current_score: number;
  target_score: number;
  trend: 'improving' | 'stable' | 'declining';
  risk_level: 'low' | 'medium' | 'high' | 'critical';
  details: string[];
}

const ZeroKnowledgeGovernance = () => {
  const [proofs, setProofs] = useState<ZeroKnowledgeProof[]>([]);
  const [privacyControls, setPrivacyControls] = useState<PrivacyControl[]>([]);
  const [privacyMetrics, setPrivacyMetrics] = useState<PrivacyMetric[]>([]);
  const [isGeneratingProof, setIsGeneratingProof] = useState(false);
  const [overallPrivacyScore, setOverallPrivacyScore] = useState(91.2);
  const [activeVerification, setActiveVerification] = useState<ZeroKnowledgeProof | null>(null);

  useEffect(() => {
    generateMockProofs();
    generatePrivacyControls();
    generatePrivacyMetrics();
    const interval = setInterval(updatePrivacyMetrics, 25000);
    return () => clearInterval(interval);
  }, []);

  const generateMockProofs = () => {
    const mockProofs: ZeroKnowledgeProof[] = [
      {
        id: '1',
        title: 'Department Performance Verification',
        description: 'Zero-knowledge proof of department performance metrics without revealing individual data',
        type: 'performance_proof',
        status: 'verified',
        confidence: 94.7,
        proof_data: {
          commitment: 'Prove department efficiency > 85% without revealing individual employee data',
          verification_method: 'zk-SNARKs with bulletproofs',
          privacy_level: 'maximum',
          data_points: 1247,
          encrypted_hash: '0x7f8a9d5e4c3b2a1f6c8e9b4d8e9a5f6c8e9b4d8e9a5'
        },
        created_at: new Date(Date.now() - 2 * 60 * 60 * 1000),
        verified_at: new Date(Date.now() - 1 * 60 * 60 * 1000)
      },
      {
        id: '2',
        title: 'Resource Allocation Fairness',
        description: 'Cryptographic proof that resource allocation follows fair distribution principles',
        type: 'resource_proof',
        status: 'verified',
        confidence: 89.3,
        proof_data: {
          commitment: 'Prove resource allocation fairness using zero-knowledge proofs',
          verification_method: 'zk-STARKs with recursive composition',
          privacy_level: 'enhanced',
          data_points: 892,
          encrypted_hash: '0x9b2c4d5e6f7a8b3c2d4e7f8b9c3d4e7f8b9c3d4e7f8b'
        },
        created_at: new Date(Date.now() - 4 * 60 * 60 * 1000),
        verified_at: new Date(Date.now() - 3 * 60 * 60 * 1000)
      },
      {
        id: '3',
        title: 'Policy Compliance Verification',
        description: 'Zero-knowledge proof of policy compliance without revealing sensitive policy details',
        type: 'policy_proof',
        status: 'generating',
        confidence: 87.1,
        proof_data: {
          commitment: 'Verify policy compliance using homomorphic encryption',
          verification_method: 'Fully Homomorphic Encryption (FHE)',
          privacy_level: 'standard',
          data_points: 567,
          encrypted_hash: '0x3d5e6f7a8b9c4d5e6f7a8b9c4d5e6f7a8b9c'
        },
        created_at: new Date(Date.now() - 6 * 60 * 60 * 1000)
      },
      {
        id: '4',
        title: 'Audit Trail Integrity',
        description: 'Cryptographic proof of audit trail integrity and completeness',
        type: 'compliance_proof',
        status: 'verified',
        confidence: 96.2,
        proof_data: {
          commitment: 'Prove audit trail integrity using Merkle trees',
          verification_method: 'Merkle Tree Proofs',
          privacy_level: 'maximum',
          data_points: 2341,
          encrypted_hash: '0x8c3e7f9a5b6d4c8e9b7a5d6f8c3e7f9a5'
        },
        created_at: new Date(Date.now() - 8 * 60 * 60 * 1000),
        verified_at: new Date(Date.now() - 7 * 60 * 60 * 1000)
      }
    ];

    setProofs(mockProofs);
  };

  const generatePrivacyControls = () => {
    const mockControls: PrivacyControl[] = [
      {
        id: '1',
        name: 'Data Minimization Protocol',
        type: 'data_minimization',
        status: 'active',
        effectiveness: 94.2,
        last_audit: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        settings: {
          strength_level: 9,
          coverage_percentage: 87,
          compliance_score: 92
        }
      },
      {
        id: '2',
        name: 'Differential Privacy System',
        type: 'anonymization',
        status: 'active',
        effectiveness: 89.7,
        last_audit: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        settings: {
          strength_level: 8,
          coverage_percentage: 92,
          compliance_score: 88
        }
      },
      {
        id: '3',
        name: 'End-to-End Encryption',
        type: 'encryption',
        status: 'active',
        effectiveness: 96.8,
        last_audit: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        settings: {
          strength_level: 10,
          coverage_percentage: 95,
          compliance_score: 98
        }
      },
      {
        id: '4',
        name: 'Zero-Knowledge Access Control',
        type: 'access_control',
        status: 'active',
        effectiveness: 91.3,
        last_audit: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
        settings: {
          strength_level: 9,
          coverage_percentage: 89,
          compliance_score: 90
        }
      }
    ];

    setPrivacyControls(mockControls);
  };

  const generatePrivacyMetrics = () => {
    const mockMetrics: PrivacyMetric[] = [
      {
        category: 'Data Protection',
        current_score: 94.2,
        target_score: 96,
        trend: 'improving',
        risk_level: 'low',
        details: ['Encryption strength at maximum', 'No data breaches detected', 'Compliance score 98%']
      },
      {
        category: 'Access Control',
        current_score: 87.8,
        target_score: 92,
        trend: 'stable',
        risk_level: 'medium',
        details: ['Multi-factor authentication active', 'Zero-knowledge proofs implemented', 'Role-based access enforced']
      },
      {
        category: 'Anonymization',
        current_score: 91.5,
        target_score: 94,
        trend: 'improving',
        risk_level: 'low',
        details: ['Differential privacy active', 'K-anonymity: k=100', 'Noise injection enabled']
      },
      {
        category: 'Audit Compliance',
        current_score: 89.3,
        target_score: 93,
        trend: 'improving',
        risk_level: 'medium',
        details: ['Real-time audit logging', 'Cryptographic proofs generated', 'Compliance monitoring active']
      }
    ];

    setPrivacyMetrics(mockMetrics);
  };

  const updatePrivacyMetrics = () => {
    setPrivacyMetrics(prev => prev.map(metric => ({
      ...metric,
      current_score: Math.max(0, Math.min(100, metric.current_score + (Math.random() - 0.5) * 3))
    })));
    
    setOverallPrivacyScore(prev => Math.min(99, prev + (Math.random() - 0.5) * 2));
  };

  const generateProof = (type: ZeroKnowledgeProof['type']) => {
    setIsGeneratingProof(true);

    setTimeout(() => {
      const newProof: ZeroKnowledgeProof = {
        id: Date.now().toString(),
        title: `New ${type.replace('_', ' ')} Proof`,
        description: `Zero-knowledge proof for ${type.replace('_', ' ')} verification`,
        type: type,
        status: 'generating',
        confidence: 0,
        proof_data: {
          commitment: `Generate zero-knowledge proof for ${type.replace('_', ' ')}`,
          verification_method: 'zk-SNARKs',
          privacy_level: 'maximum',
          data_points: Math.floor(Math.random() * 1000) + 500,
          encrypted_hash: '0x' + Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join('')
        },
        created_at: new Date()
      };

      setProofs(prev => [newProof, ...prev.slice(0, 9)]);
      
      setTimeout(() => {
        setProofs(prev => prev.map(p => 
          p.id === newProof.id 
            ? { ...p, status: 'verified', confidence: 93.7, verified_at: new Date() }
            : p
        ));
        setIsGeneratingProof(false);
      }, 5000);
    }, 1000);
  };

  const getProofStatusColor = (status: ZeroKnowledgeProof['status']) => {
    switch (status) {
      case 'verified': return 'text-green-400 bg-green-500/20';
      case 'verifying': return 'text-blue-400 bg-blue-500/20';
      case 'generating': return 'text-yellow-400 bg-yellow-500/20';
      case 'failed': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getPrivacyLevelColor = (level: string) => {
    switch (level) {
      case 'maximum': return 'text-purple-400 bg-purple-500/20';
      case 'enhanced': return 'text-blue-400 bg-blue-500/20';
      case 'standard': return 'text-green-400 bg-green-500/20';
      case 'minimal': return 'text-yellow-400 bg-yellow-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getControlStatusColor = (status: PrivacyControl['status']) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-500/20';
      case 'inactive': return 'text-gray-400 bg-gray-500/20';
      case 'breached': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getRiskLevelColor = (level: PrivacyMetric['risk_level']) => {
    switch (level) {
      case 'low': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'high': return 'text-orange-400';
      case 'critical': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const privacyScoreData = [
    { month: 'Jan', score: 85.2, target: 90 },
    { month: 'Feb', score: 87.8, target: 90 },
    { month: 'Mar', score: 89.3, target: 92 },
    { month: 'Apr', score: 91.7, target: 92 },
    { month: 'May', score: 93.1, target: 94 },
    { month: 'Jun', score: 94.5, target: 96 }
  ];

  const proofTypeDistribution = [
    { type: 'Performance', count: 45, color: '#3b82f6' },
    { type: 'Resource', count: 32, color: '#10b981' },
    { type: 'Policy', count: 28, color: '#f59e0b' },
    { type: 'Compliance', count: 67, color: '#8b5cf6' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl box-shadow-glow" style={{
            background: 'linear-gradient(135deg, #3b82f630, #8b5cf630)'
          }}>
            <Shield className="w-8 h-8 text-blue-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold gradient-text">Zero-Knowledge Governance</h1>
            <p className="text-gray-300">Privacy-First Analytics & Verification</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 px-3 py-1 rounded-lg ${
            isGeneratingProof ? 'bg-yellow-500/20 text-yellow-400' : 'bg-gray-500/20 text-gray-400'
          }`}>
            <Key className="w-4 h-4" />
            <span className="font-semibold">{isGeneratingProof ? 'Generating' : 'Secure'}</span>
          </div>
          <button className="btn-secondary">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Overall Privacy Score */}
      <div className="card p-6 border border-blue-500/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-blue-400" />
            <div>
              <h2 className="text-xl font-semibold text-white">Overall Privacy Score</h2>
              <p className="text-sm text-gray-400">Zero-knowledge governance effectiveness</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-blue-400">{overallPrivacyScore.toFixed(1)}</div>
            <p className="text-sm text-gray-400">Privacy Score</p>
          </div>
        </div>
      </div>

      {/* Zero-Knowledge Proofs */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <Lock className="w-5 h-5 mr-2 text-blue-400" />
          Zero-Knowledge Proofs
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {proofs.map((proof) => (
            <motion.div
              key={proof.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              className="card p-6 cursor-pointer hover:border-blue-500/50"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-white">{proof.title}</h3>
                  <p className="text-sm text-gray-400 capitalize">{proof.type.replace('_', ' ')}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded ${getProofStatusColor(proof.status)}`}>
                  {proof.status}
                </span>
              </div>

              <p className="text-sm text-gray-300 mb-4">{proof.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-400">Confidence</p>
                  <p className="text-lg font-bold text-blue-400">{proof.confidence.toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Data Points</p>
                  <p className="text-lg font-bold text-white">{proof.proof_data.data_points.toLocaleString()}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">Privacy Level</p>
                <span className={`px-2 py-1 text-xs rounded ${getPrivacyLevelColor(proof.proof_data.privacy_level)}`}>
                  {proof.proof_data.privacy_level.toUpperCase()}
                </span>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">Verification Method</p>
                <p className="text-sm text-white">{proof.proof_data.verification_method}</p>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">Encrypted Hash</p>
                <p className="text-xs text-blue-400 font-mono break-all">
                  {proof.proof_data.encrypted_hash.substring(0, 32)}...
                </p>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-400">
                  <p>Created: {proof.created_at.toLocaleDateString()}</p>
                  {proof.verified_at && <p>Verified: {proof.verified_at.toLocaleDateString()}</p>}
                </div>
                <button className="btn-secondary text-sm">
                  <Eye className="w-3 h-3 mr-1" />
                  Verify
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy Controls */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <Eye className="w-5 h-5 mr-2 text-green-400" />
          Privacy Controls
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {privacyControls.map((control) => (
            <motion.div
              key={control.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className="card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white">{control.name}</h3>
                <span className={`px-2 py-1 text-xs rounded ${getControlStatusColor(control.status)}`}>
                  {control.status}
                </span>
              </div>

              <p className="text-sm text-gray-400 mb-4 capitalize">{control.type.replace('_', ' ')}</p>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-400">Effectiveness</p>
                  <p className="text-lg font-bold text-green-400">{control.effectiveness.toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Coverage</p>
                  <p className="text-lg font-bold text-blue-400">{control.settings.coverage_percentage}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Compliance</p>
                  <p className="text-lg font-bold text-purple-400">{control.settings.compliance_score}%</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">Strength Level</p>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
                    style={{ width: `${control.settings.strength_level * 10}%` }}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-400">Last Audit: {control.last_audit.toLocaleDateString()}</p>
                <button className="btn-secondary text-sm">
                  <RefreshCw className="w-3 h-3 mr-1" />
                  Audit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy Metrics */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <BarChart3 className="w-5 h-5 mr-2 text-purple-400" />
          Privacy Metrics
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {privacyMetrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white">{metric.category}</h3>
                <span className={`px-2 py-1 text-xs rounded ${
                  metric.risk_level === 'low' ? 'bg-green-500/20 text-green-400' :
                  metric.risk_level === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                  metric.risk_level === 'high' ? 'bg-orange-500/20 text-orange-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {metric.risk_level.toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-400">Current Score</p>
                  <p className="text-lg font-bold text-white">{metric.current_score.toFixed(1)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Target Score</p>
                  <p className="text-lg font-bold text-green-400">{metric.target_score}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">Trend</p>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-semibold ${
                    metric.trend === 'improving' ? 'text-green-400' :
                    metric.trend === 'stable' ? 'text-yellow-400' :
                    'text-red-400'
                  }`}>
                    {metric.trend}
                  </span>
                  <Activity className={`w-4 h-4 ${
                    metric.trend === 'improving' ? 'text-green-400' :
                    metric.trend === 'stable' ? 'text-yellow-400' :
                    'text-red-400'
                  }`} />
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-gray-400">Details:</p>
                {metric.details.map((detail, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-gray-300">
                    <CheckCircle className="w-3 h-3 text-green-400" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Analytics Dashboard */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Privacy Score Trend */}
        <div className="card p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Privacy Score Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={privacyScoreData}>
              <defs>
                <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
                </linearGradient>
                <linearGradient id="targetGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
              <YAxis stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0b1220', border: '1px solid #3b82f650', borderRadius: 8 }}
                labelStyle={{ color: '#f1f5f9' }}
              />
              <Area type="monotone" dataKey="score" stroke="#3b82f6" fill="url(#scoreGrad)" />
              <Line type="monotone" dataKey="target" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Proof Type Distribution */}
        <div className="card p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Proof Type Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={proofTypeDistribution}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
                label={({ type, count }) => `${type}: ${count}`}
              >
                {proofTypeDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#0b1220', border: '1px solid #3b82f650', borderRadius: 8 }}
                labelStyle={{ color: '#f1f5f9' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Generate Proof Controls */}
      <div className="card p-6 border border-blue-500/50">
        <h3 className="text-xl font-semibold text-white mb-6">Generate Zero-Knowledge Proof</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => generateProof('performance_proof')}
            disabled={isGeneratingProof}
            className="btn-primary"
          >
            <Lock className="w-4 h-4 mr-2" />
            Performance
          </button>
          <button
            onClick={() => generateProof('resource_proof')}
            disabled={isGeneratingProof}
            className="btn-primary"
          >
            <Database className="w-4 h-4 mr-2" />
            Resource
          </button>
          <button
            onClick={() => generateProof('policy_proof')}
            disabled={isGeneratingProof}
            className="btn-primary"
          >
            <Shield className="w-4 h-4 mr-2" />
            Policy
          </button>
          <button
            onClick={() => generateProof('compliance_proof')}
            disabled={isGeneratingProof}
            className="btn-primary"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Compliance
          </button>
        </div>
      </div>
    </div>
  );
};

export default ZeroKnowledgeGovernance;
