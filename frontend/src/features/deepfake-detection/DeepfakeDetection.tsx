import React, { useState, useEffect, useRef } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useEnterpriseData } from '../../lib/useEnterpriseData';
import { 
  Shield, Eye, AlertTriangle, CheckCircle, XCircle, Camera,
  FileVideo, FileImage, Upload, RefreshCw, Settings,
  Zap, Brain, Clock, TrendingUp, BarChart3, Activity,
  Fingerprint, Lock, Unlock, Scan, AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface DetectionResult {
  id: string;
  file_name: string;
  file_type: 'image' | 'video' | 'audio';
  confidence_score: number;
  authenticity_score: number;
  manipulation_indicators: {
    facial_inconsistencies: number;
    audio_anomalies: number;
    temporal_artifacts: number;
    digital_fingerprints: number;
  };
  verdict: 'authentic' | 'suspicious' | 'deepfake';
  processing_time: number;
  detected_techniques: string[];
  metadata: {
    created_at: Date;
    file_size: number;
    duration?: number;
    resolution: string;
  };
}

interface SecurityThreat {
  id: string;
  type: 'deepfake' | 'synthetic_media' | 'identity_theft' | 'information_manipulation';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  affected_files: string[];
  confidence: number;
  status: 'active' | 'mitigated' | 'investigating';
  created_at: Date;
  mitigation_actions: string[];
}

interface AuthenticationModel {
  id: string;
  name: string;
  type: 'neural_network' | 'ensemble' | 'transformer' | 'hybrid';
  accuracy: number;
  false_positive_rate: number;
  false_negative_rate: number;
  processing_speed: number;
  last_trained: Date;
  training_data_size: number;
  version: string;
}

const DeepfakeDetection = () => {
  const { user } = useAuthStore();
  const { data: deepfakeData } = useEnterpriseData('deepfake', user?.id);

  const [detectionResults, setDetectionResults] = useState<DetectionResult[]>([]);
  const [threats, setThreats] = useState<SecurityThreat[]>([]);
  const [models, setModels] = useState<AuthenticationModel[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [overallSecurity, setOverallSecurity] = useState(94.7);
  const [activeScan, setActiveScan] = useState<string | null>(null);

  useEffect(() => {
    if (deepfakeData || true) {
      const data = deepfakeData
      
      const mockResults: DetectionResult[] = [
        {
          id: '1',
          file_name: 'official_video.mp4',
          file_type: 'video',
          confidence_score: Math.round((data?.performance_score || 0.947) * 100),
          authenticity_score: Math.round((data?.avg_kpi || 0.94) * 100),
          manipulation_indicators: {
            facial_inconsistencies: 100 - Math.round((data?.performance_score || 0.947) * 100),
            audio_anomalies: 100 - Math.round((data?.avg_kpi || 0.94) * 100),
            temporal_artifacts: 2,
            digital_fingerprints: 98
          },
          verdict: (data?.performance_score || 0.947) > 0.9 ? 'authentic' : 'suspicious',
          processing_time: 4500,
          detected_techniques: [],
          metadata: {
            created_at: new Date(),
            file_size: 2500000,
            duration: 450,
            resolution: '4K'
          }
        }
      ];
      
      setDetectionResults(mockResults);
      
      const mockThreats: SecurityThreat[] = (data?.performance_score || 0.947) < 0.8
        ? [{
            id: '1',
            type: 'deepfake',
            severity: 'high',
            description: 'Potential deepfake detected',
            affected_files: ['file1.mp4', 'file2.mp4'],
            confidence: Math.round((100 - (data?.performance_score || 0.947) * 100) * 0.9),
            status: 'investigating',
            created_at: new Date(),
            mitigation_actions: ['Quarantine file', 'Notify administrators']
          }]
        : [];
      
      setThreats(mockThreats);
      
      const mockModels: AuthenticationModel[] = [
        {
          id: '1',
          name: 'Primary Detection Model',
          type: 'ensemble',
          accuracy: Math.round((data?.avg_kpi || 0.94) * 100),
          false_positive_rate: 100 - Math.round((data?.avg_kpi || 0.94) * 100),
          false_negative_rate: 100 - Math.round((data?.performance_score || 0.947) * 100),
          processing_speed: 4800,
          last_trained: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          training_data_size: 50000,
          version: '2.1.0'
        }
      ];
      
      setModels(mockModels);
      setOverallSecurity(Math.round((data?.avg_kpi || 0.947) * 100));
    }
  }, [deepfakeData]);

  const scanFile = async (file: File) => {
    const mockResults: DetectionResult[] = [
      {
        id: '1',
        file_name: 'official_announcement_video.mp4',
        file_type: 'video',
        confidence_score: 98.3,
        authenticity_score: 96.7,
        manipulation_indicators: {
          facial_inconsistencies: 2.1,
          audio_anomalies: 1.8,
          temporal_artifacts: 3.2,
          digital_fingerprints: 1.5
        },
        verdict: 'authentic',
        processing_time: 2.3,
        detected_techniques: ['facial_landmark_analysis', 'audio_spectral_analysis'],
        metadata: {
          created_at: new Date(Date.now() - 2 * 60 * 60 * 1000),
          file_size: 15728640,
          duration: 120,
          resolution: '1920x1080'
        }
      },
      {
        id: '2',
        file_name: 'employee_testimonial.jpg',
        file_type: 'image',
        confidence_score: 87.4,
        authenticity_score: 78.9,
        manipulation_indicators: {
          facial_inconsistencies: 12.7,
          audio_anomalies: 0,
          temporal_artifacts: 8.3,
          digital_fingerprints: 15.2
        },
        verdict: 'suspicious',
        processing_time: 1.8,
        detected_techniques: ['facial_landmark_analysis', 'digital_fingerprint_analysis'],
        metadata: {
          created_at: new Date(Date.now() - 4 * 60 * 60 * 1000),
          file_size: 2097152,
          resolution: '2048x1536'
        }
      },
      {
        id: '3',
        file_name: 'policy_document_audio.wav',
        file_type: 'audio',
        confidence_score: 91.2,
        authenticity_score: 89.6,
        manipulation_indicators: {
          facial_inconsistencies: 0,
          audio_anomalies: 3.7,
          temporal_artifacts: 2.1,
          digital_fingerprints: 4.3
        },
        verdict: 'authentic',
        processing_time: 1.2,
        detected_techniques: ['audio_spectral_analysis', 'voice_biometric_verification'],
        metadata: {
          created_at: new Date(Date.now() - 1 * 60 * 60 * 1000),
          file_size: 5242880,
          duration: 180,
          resolution: '1920x1080'
        }
      },
      {
        id: '4',
        file_name: 'suspicious_identity_video.mp4',
        file_type: 'video',
        confidence_score: 96.8,
        authenticity_score: 34.2,
        manipulation_indicators: {
          facial_inconsistencies: 28.9,
          audio_anomalies: 22.4,
          temporal_artifacts: 31.7,
          digital_fingerprints: 26.8
        },
        verdict: 'deepfake',
        processing_time: 3.1,
        detected_techniques: ['deep_neural_network_detection', 'generative_adversarial_network_analysis'],
        metadata: {
          created_at: new Date(Date.now() - 6 * 60 * 60 * 1000),
          file_size: 31457280,
          duration: 90,
          resolution: '1280x720'
        }
      }
    ];

    setDetectionResults(mockResults);
  };

  const generateThreats = () => {
    const mockThreats: SecurityThreat[] = [
      {
        id: '1',
        type: 'deepfake',
        severity: 'high',
        description: 'Potential deepfake video targeting senior officials',
        affected_files: ['suspicious_identity_video.mp4'],
        confidence: 96.8,
        status: 'mitigated',
        created_at: new Date(Date.now() - 6 * 60 * 60 * 1000),
        mitigation_actions: ['File quarantined', 'Security team notified', 'Source investigation initiated']
      },
      {
        id: '2',
        type: 'synthetic_media',
        severity: 'medium',
        description: 'Synthetic audio detected in policy announcement',
        affected_files: ['policy_document_audio.wav'],
        confidence: 87.4,
        status: 'investigating',
        created_at: new Date(Date.now() - 8 * 60 * 60 * 1000),
        mitigation_actions: ['Audio flagged for review', 'Original source verification']
      },
      {
        id: '3',
        type: 'information_manipulation',
        severity: 'low',
        description: 'Minor image manipulation detected in testimonial',
        affected_files: ['employee_testimonial.jpg'],
        confidence: 78.9,
        status: 'active',
        created_at: new Date(Date.now() - 4 * 60 * 60 * 1000),
        mitigation_actions: ['Image marked as suspicious', 'Additional verification required']
      }
    ];

    setThreats(mockThreats);
  };

  const generateModels = () => {
    const mockModels: AuthenticationModel[] = [
      {
        id: '1',
        name: 'NeuralGuard Pro',
        type: 'neural_network',
        accuracy: 98.7,
        false_positive_rate: 1.2,
        false_negative_rate: 0.8,
        processing_speed: 2.3,
        last_trained: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        training_data_size: 2500000,
        version: '3.2.1'
      },
      {
        id: '2',
        name: 'EnsembleShield',
        type: 'ensemble',
        accuracy: 97.9,
        false_positive_rate: 1.5,
        false_negative_rate: 1.1,
        processing_speed: 3.1,
        last_trained: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        training_data_size: 1800000,
        version: '2.8.4'
      },
      {
        id: '3',
        name: 'TransformerGuard',
        type: 'transformer',
        accuracy: 99.1,
        false_positive_rate: 0.9,
        false_negative_rate: 0.6,
        processing_speed: 4.2,
        last_trained: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        training_data_size: 3200000,
        version: '4.1.2'
      },
      {
        id: '4',
        name: 'HybridAuth',
        type: 'hybrid',
        accuracy: 98.4,
        false_positive_rate: 1.1,
        false_negative_rate: 0.9,
        processing_speed: 2.8,
        last_trained: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        training_data_size: 2100000,
        version: '1.9.3'
      }
    ];

    setModels(mockModels);
  };

  const updateSecurityData = () => {
    setDetectionResults(prev => prev.map(result => ({
      ...result,
      confidence_score: Math.max(0, Math.min(100, result.confidence_score + (Math.random() - 0.5) * 2)),
      authenticity_score: Math.max(0, Math.min(100, result.authenticity_score + (Math.random() - 0.5) * 3))
    })));

    setOverallSecurity(prev => Math.min(99.9, prev + (Math.random() - 0.5) * 1));
  };

  const runDeepfakeScan = () => {
    setIsScanning(true);
    setActiveScan('comprehensive');

    setTimeout(() => {
      const newThreat: SecurityThreat = {
        id: Date.now().toString(),
        type: 'deepfake',
        severity: 'medium',
        description: 'AI-generated content detected during routine scan',
        affected_files: ['scanned_file_' + Date.now() + '.mp4'],
        confidence: 89.3,
        status: 'active',
        created_at: new Date(),
        mitigation_actions: ['File quarantined', 'Deep analysis initiated']
      };

      setThreats(prev => [newThreat, ...prev.slice(0, 9)]);
      setIsScanning(false);
      setActiveScan(null);
    }, 3000);
  };

  const getVerdictColor = (verdict: DetectionResult['verdict']) => {
    switch (verdict) {
      case 'authentic': return 'text-green-400 bg-green-500/20';
      case 'suspicious': return 'text-yellow-400 bg-yellow-500/20';
      case 'deepfake': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getSeverityColor = (severity: SecurityThreat['severity']) => {
    switch (severity) {
      case 'critical': return 'text-red-400';
      case 'high': return 'text-orange-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusColor = (status: SecurityThreat['status']) => {
    switch (status) {
      case 'active': return 'text-red-400 bg-red-500/20';
      case 'mitigated': return 'text-green-400 bg-green-500/20';
      case 'investigating': return 'text-yellow-400 bg-yellow-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const detectionTrendData = [
    { date: 'Jan', authentic: 145, suspicious: 23, deepfakes: 8 },
    { date: 'Feb', authentic: 167, suspicious: 31, deepfakes: 12 },
    { date: 'Mar', authentic: 189, suspicious: 28, deepfakes: 15 },
    { date: 'Apr', authentic: 178, suspicious: 35, deepfakes: 18 },
    { date: 'May', authentic: 201, suspicious: 42, deepfakes: 21 },
    { date: 'Jun', authentic: 223, suspicious: 38, deepfakes: 19 }
  ];

  const threatDistribution = [
    { type: 'Deepfake', count: 67, color: '#ef4444' },
    { type: 'Synthetic Media', count: 45, color: '#f59e0b' },
    { type: 'Identity Theft', count: 23, color: '#8b5cf6' },
    { type: 'Information Manipulation', count: 34, color: '#3b82f6' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl box-shadow-glow" style={{
            background: 'linear-gradient(135deg, #ef444430, #f59e0b30)'
          }}>
            <Shield className="w-8 h-8 text-red-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold gradient-text">Deepfake Detection</h1>
            <p className="text-gray-300">Authenticity Verification</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 px-3 py-1 rounded-lg ${
            isScanning ? 'bg-red-500/20 text-red-400' : 'bg-gray-500/20 text-gray-400'
          }`}>
            <Scan className="w-4 h-4" />
            <span className="font-semibold">{isScanning ? 'Scanning' : 'Monitoring'}</span>
          </div>
          <button className="btn-secondary">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Security Score */}
      <div className="card p-6 border border-red-500/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-red-400" />
            <div>
              <h2 className="text-xl font-semibold text-white">Security Score</h2>
              <p className="text-sm text-gray-400">Overall authenticity verification accuracy</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-red-400">{overallSecurity.toFixed(1)}%</div>
            <p className="text-sm text-gray-400">Security Score</p>
          </div>
        </div>
      </div>

      {/* Detection Results */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <Eye className="w-5 h-5 mr-2 text-blue-400" />
          Recent Detection Results
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {detectionResults.map((result) => (
            <motion.div
              key={result.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              className="card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-white">{result.file_name}</h3>
                  <p className="text-sm text-gray-400 capitalize">{result.file_type}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded ${getVerdictColor(result.verdict)}`}>
                  {result.verdict.toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-400">Confidence Score</p>
                  <p className="text-lg font-bold text-blue-400">{result.confidence_score.toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Authenticity Score</p>
                  <p className="text-lg font-bold text-green-400">{result.authenticity_score.toFixed(1)}%</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">Manipulation Indicators</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Facial Inconsistencies</span>
                    <span className={`${result.manipulation_indicators.facial_inconsistencies > 10 ? 'text-red-400' : 'text-green-400'}`}>
                      {result.manipulation_indicators.facial_inconsistencies}%
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Audio Anomalies</span>
                    <span className={`${result.manipulation_indicators.audio_anomalies > 10 ? 'text-red-400' : 'text-green-400'}`}>
                      {result.manipulation_indicators.audio_anomalies}%
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Temporal Artifacts</span>
                    <span className={`${result.manipulation_indicators.temporal_artifacts > 10 ? 'text-red-400' : 'text-green-400'}`}>
                      {result.manipulation_indicators.temporal_artifacts}%
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Digital Fingerprints</span>
                    <span className={`${result.manipulation_indicators.digital_fingerprints > 10 ? 'text-red-400' : 'text-green-400'}`}>
                      {result.manipulation_indicators.digital_fingerprints}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">Detected Techniques</p>
                <div className="flex flex-wrap gap-2">
                  {result.detected_techniques.map((technique, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">
                      {technique}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">File Metadata</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-gray-400">Size: {(result.metadata.file_size / 1024 / 1024).toFixed(1)} MB</p>
                    <p className="text-gray-400">Resolution: {result.metadata.resolution}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Processing: {result.processing_time}s</p>
                    {result.metadata.duration && <p className="text-gray-400">Duration: {result.metadata.duration}s</p>}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-400">{result.metadata.created_at.toLocaleDateString()}</p>
                <button className="btn-secondary text-sm">
                  <Eye className="w-3 h-3 mr-1" />
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Security Threats */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2 text-orange-400" />
          Security Threats
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {threats.map((threat) => (
            <motion.div
              key={threat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className="card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-white capitalize">{threat.type.replace('_', ' ')}</h3>
                  <span className={`px-2 py-1 text-xs rounded ${getStatusColor(threat.status)}`}>
                    {threat.status.toUpperCase()}
                  </span>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-bold ${getSeverityColor(threat.severity)}`}>
                    {threat.severity.toUpperCase()}
                  </p>
                  <p className="text-xs text-gray-400">{threat.confidence.toFixed(1)}% confidence</p>
                </div>
              </div>

              <p className="text-sm text-gray-300 mb-4">{threat.description}</p>

              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">Affected Files</p>
                <div className="space-y-1">
                  {threat.affected_files.map((file, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-300">
                      <FileVideo className="w-3 h-3 text-red-400" />
                      <span>{file}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">Mitigation Actions</p>
                <div className="space-y-1">
                  {threat.mitigation_actions.map((action, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm text-gray-300">
                      <CheckCircle className="w-3 h-3 text-green-400 mt-0.5" />
                      <span>{action}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-400">{threat.created_at.toLocaleDateString()}</p>
                <button className="btn-primary">
                  <Shield className="w-4 h-4 mr-2" />
                  Manage Threat
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Authentication Models */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <Brain className="w-5 h-5 mr-2 text-purple-400" />
          Authentication Models
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {models.map((model) => (
            <motion.div
              key={model.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className="card p-4"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg ${
                  model.type === 'neural_network' ? 'bg-blue-500/20' :
                  model.type === 'ensemble' ? 'bg-green-500/20' :
                  model.type === 'transformer' ? 'bg-purple-500/20' :
                  'bg-orange-500/20'
                }`}>
                  <Brain className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{model.name}</h3>
                  <p className="text-xs text-gray-400 capitalize">{model.type.replace('_', ' ')}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Accuracy</span>
                  <span className="text-green-400 font-semibold">{model.accuracy.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">False Positive</span>
                  <span className="text-yellow-400">{model.false_positive_rate}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">False Negative</span>
                  <span className="text-red-400">{model.false_negative_rate}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Speed</span>
                  <span className="text-blue-400">{model.processing_speed}s</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="flex justify-between text-xs text-gray-400 mb-2">
                  <span>Version: {model.version}</span>
                  <span>Training: {(model.training_data_size / 1000000).toFixed(1)}M samples</span>
                </div>
                <p className="text-xs text-gray-400">Last trained: {model.last_trained.toLocaleDateString()}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Analytics Dashboard */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Detection Trend */}
        <div className="card p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Detection Trend Analysis</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={detectionTrendData}>
              <defs>
                <linearGradient id="authenticGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.1" />
                </linearGradient>
                <linearGradient id="suspiciousGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
              <YAxis stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0b1220', border: '1px solid #ef444450', borderRadius: 8 }}
                labelStyle={{ color: '#f1f5f9' }}
              />
              <Area type="monotone" dataKey="authentic" stroke="#10b981" fill="url(#authenticGrad)" />
              <Area type="monotone" dataKey="suspicious" stroke="#f59e0b" fill="url(#suspiciousGrad)" />
              <Line type="monotone" dataKey="deepfakes" stroke="#ef4444" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Threat Distribution */}
        <div className="card p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Threat Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={threatDistribution}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
                label={({ type, count }) => `${type}: ${count}`}
              >
                {threatDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#0b1220', border: '1px solid #ef444450', borderRadius: 8 }}
                labelStyle={{ color: '#f1f5f9' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Deep Scan Button */}
      <div className="card p-6 border border-red-500/50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-white">Comprehensive Deepfake Scan</h3>
            <p className="text-sm text-gray-400">Run advanced AI-powered authenticity verification</p>
          </div>
          <button
            onClick={runDeepfakeScan}
            disabled={isScanning}
            className="btn-primary"
          >
            <Scan className="w-4 h-4 mr-2" />
            {isScanning ? 'Scanning...' : 'Start Deep Scan'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeepfakeDetection;
