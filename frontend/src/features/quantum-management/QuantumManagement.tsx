import React, { useState, useEffect, useRef } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useRealTimeAnalytics } from '../../lib/useRealTimeData';
import { 
  Atom, Zap, Brain, Eye, Activity, TrendingUp, BarChart3,
  Target, Users, Settings, RefreshCw, Clock, AlertTriangle,
  CheckCircle, XCircle, ArrowUp, ArrowDown, Layers,
  Sparkles, Cpu, Database, Network
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ScatterChart, Scatter } from 'recharts';

interface QuantumState {
  id: string;
  name: string;
  superposition: boolean;
  entanglement_level: number;
  coherence_score: number;
  probability_amplitude: number;
  phase: number;
  collapse_probability: number;
  measurement_basis: string;
  last_measured: Date;
  quantum_signature: string;
}

interface DecisionMatrix {
  id: string;
  decision_name: string;
  quantum_states: QuantumState[];
  superposition_weight: number;
  entanglement_connections: string[];
  collapse_threshold: number;
  optimization_score: number;
  uncertainty_level: number;
  decision_outcomes: {
    outcome: string;
    probability: number;
    utility: number;
    risk_level: 'low' | 'medium' | 'high' | 'critical';
  }[];
  created_at: Date;
  last_updated: Date;
}

interface QuantumInsight {
  id: string;
  title: string;
  description: string;
  type: 'superposition' | 'entanglement' | 'coherence' | 'collapse' | 'optimization';
  confidence: number;
  impact: 'low' | 'medium' | 'high' | 'critical';
  quantum_signature: string;
  affected_decisions: string[];
  recommendations: string[];
  potential_outcome: string;
  created_at: Date;
}

interface QuantumMetric {
  category: string;
  current_value: number;
  target_value: number;
  quantum_efficiency: number;
  coherence_stability: number;
  entanglement_strength: number;
  trend: 'improving' | 'stable' | 'declining';
}

const QuantumManagement = () => {
  const { user } = useAuthStore();
  const { data: analyticsData } = useRealTimeAnalytics(user?.id);

  const [quantumStates, setQuantumStates] = useState<QuantumState[]>([]);
  const [decisionMatrices, setDecisionMatrices] = useState<DecisionMatrix[]>([]);
  const [insights, setInsights] = useState<QuantumInsight[]>([]);
  const [metrics, setMetrics] = useState<QuantumMetric[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [quantumEfficiency, setQuantumEfficiency] = useState(87.4);
  const [activeSimulation, setActiveSimulation] = useState<string | null>(null);

  useEffect(() => {
    if (analyticsData) {
      const data = Array.isArray(analyticsData) ? analyticsData[0] : analyticsData;
      
      const mockStates: QuantumState[] = Array.from({ length: 5 }, (_, i) => ({
        id: (i + 1).toString(),
        name: `Quantum State ${i + 1}`,
        superposition: (data?.performance_score || 0.8) > 0.7,
        entanglement_level: Math.round((data?.avg_kpi || 0.75) * 100),
        coherence_score: Math.round((data?.performance_score || 0.8) * 100),
        probability_amplitude: (data?.performance_score || 0.8),
        phase: Math.random() * 2 * Math.PI,
        collapse_probability: 1 - (data?.performance_score || 0.8),
        measurement_basis: 'computational',
        last_measured: new Date(),
        quantum_signature: `QS${i}${Math.random().toString().slice(2, 8)}`
      }));
      
      setQuantumStates(mockStates);
      
      const mockInsights: QuantumInsight[] = [
        {
          id: '1',
          title: 'Quantum Coherence Optimal',
          description: `System coherence at ${Math.round((data?.performance_score || 0.8) * 100)}%`,
          type: 'coherence',
          confidence: 92,
          impact: 'high',
          quantum_signature: 'QSI001',
          affected_decisions: ['D1', 'D2'],
          recommendations: ['Maintain current state', 'Monitor stability'],
          potential_outcome: 'Improved decision quality',
          created_at: new Date()
        }
      ];
      
      setInsights(mockInsights);
      
      const mockMetrics: QuantumMetric[] = [
        {
          category: 'Coherence',
          current_value: Math.round((data?.performance_score || 0.8) * 100),
          target_value: 95,
          quantum_efficiency: Math.round((data?.avg_kpi || 0.75) * 100),
          coherence_stability: 88,
          entanglement_strength: Math.round((data?.team_size || 5) * 15),
          trend: (data?.performance_score || 0.8) > 0.75 ? 'improving' : 'stable'
        }
      ];
      
      setMetrics(mockMetrics);
      setQuantumEfficiency(Math.round((data?.avg_kpi || 0.75) * 100));
    }
  }, [analyticsData]);

  const processQuantumSimulation = async (decisionId: string) => {
    const mockStates: QuantumState[] = [
      {
        id: '1',
        name: 'Resource Allocation State',
        superposition: true,
        entanglement_level: 0.87,
        coherence_score: 0.92,
        probability_amplitude: 0.73,
        phase: 1.47,
        collapse_probability: 0.34,
        measurement_basis: 'efficiency_optimizer',
        last_measured: new Date(Date.now() - 2 * 60 * 60 * 1000),
        quantum_signature: 'ψ₁ = α|0⟩ + β|1⟩'
      },
      {
        id: '2',
        name: 'Policy Decision State',
        superposition: true,
        entanglement_level: 0.91,
        coherence_score: 0.88,
        probability_amplitude: 0.68,
        phase: 2.13,
        collapse_probability: 0.41,
        measurement_basis: 'stakeholder_alignment',
        last_measured: new Date(Date.now() - 1 * 60 * 60 * 1000),
        quantum_signature: 'ψ₂ = γ|A⟩ + δ|B⟩'
      },
      {
        id: '3',
        name: 'Performance Optimization State',
        superposition: false,
        entanglement_level: 0.73,
        coherence_score: 0.95,
        probability_amplitude: 0.89,
        phase: 0.82,
        collapse_probability: 0.67,
        measurement_basis: 'productivity_maximizer',
        last_measured: new Date(Date.now() - 3 * 60 * 60 * 1000),
        quantum_signature: 'ψ₃ = ε|C⟩'
      },
      {
        id: '4',
        name: 'Innovation Potential State',
        superposition: true,
        entanglement_level: 0.94,
        coherence_score: 0.86,
        probability_amplitude: 0.71,
        phase: 1.89,
        collapse_probability: 0.28,
        measurement_basis: 'creative_exploration',
        last_measured: new Date(Date.now() - 4 * 60 * 60 * 1000),
        quantum_signature: 'ψ₄ = ζ|D⟩ + η|E⟩'
      }
    ];

    setQuantumStates(mockStates);
  };

  const generateDecisionMatrices = () => {
    const mockMatrices: DecisionMatrix[] = [
      {
        id: '1',
        decision_name: 'Budget Allocation Optimization',
        quantum_states: [],
        superposition_weight: 0.87,
        entanglement_connections: ['Resource Allocation State', 'Policy Decision State'],
        collapse_threshold: 0.75,
        optimization_score: 91.3,
        uncertainty_level: 0.23,
        decision_outcomes: [
          { outcome: 'Optimal Distribution', probability: 0.67, utility: 0.89, risk_level: 'low' },
          { outcome: 'Balanced Approach', probability: 0.24, utility: 0.73, risk_level: 'medium' },
          { outcome: 'Conservative Allocation', probability: 0.09, utility: 0.56, risk_level: 'low' }
        ],
        created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        last_updated: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      },
      {
        id: '2',
        decision_name: 'Strategic Policy Implementation',
        quantum_states: [],
        superposition_weight: 0.91,
        entanglement_connections: ['Policy Decision State', 'Innovation Potential State'],
        collapse_threshold: 0.82,
        optimization_score: 88.7,
        uncertainty_level: 0.31,
        decision_outcomes: [
          { outcome: 'Aggressive Implementation', probability: 0.43, utility: 0.92, risk_level: 'high' },
          { outcome: 'Phased Rollout', probability: 0.38, utility: 0.81, risk_level: 'medium' },
          { outcome: 'Pilot Testing', probability: 0.19, utility: 0.67, risk_level: 'low' }
        ],
        created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        last_updated: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
      },
      {
        id: '3',
        decision_name: 'Resource Management Strategy',
        quantum_states: [],
        superposition_weight: 0.84,
        entanglement_connections: ['Resource Allocation State', 'Performance Optimization State'],
        collapse_threshold: 0.78,
        optimization_score: 93.1,
        uncertainty_level: 0.18,
        decision_outcomes: [
          { outcome: 'Dynamic Allocation', probability: 0.56, utility: 0.87, risk_level: 'medium' },
          { outcome: 'Fixed Distribution', probability: 0.31, utility: 0.74, risk_level: 'low' },
          { outcome: 'Hybrid Approach', probability: 0.13, utility: 0.81, risk_level: 'medium' }
        ],
        created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
        last_updated: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      }
    ];

    setDecisionMatrices(mockMatrices);
  };

  const generateInsights = () => {
    const mockInsights: QuantumInsight[] = [
      {
        id: '1',
        title: 'Superposition Optimization Detected',
        description: 'Multiple decision states showing optimal superposition for resource allocation',
        type: 'superposition',
        confidence: 92.7,
        impact: 'high',
        quantum_signature: 'ψ_optimal = Σᵢ αᵢ|i⟩',
        affected_decisions: ['Budget Allocation Optimization', 'Resource Management Strategy'],
        recommendations: [
          'Maintain current superposition state',
          'Monitor entanglement stability',
          'Prepare for controlled collapse'
        ],
        potential_outcome: '23% improvement in decision efficiency',
        created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
      },
      {
        id: '2',
        title: 'Entanglement Coherence Alert',
        description: 'Strong quantum entanglement detected between policy and resource states',
        type: 'entanglement',
        confidence: 88.4,
        impact: 'medium',
        quantum_signature: 'Φ_entangled = |ψ₁⟩⊗|ψ₂⟩',
        affected_decisions: ['Strategic Policy Implementation', 'Budget Allocation Optimization'],
        recommendations: [
          'Leverage entanglement for coordinated decisions',
          'Monitor coherence decay',
          'Optimize measurement timing'
        ],
        potential_outcome: '18% improvement in policy-resource alignment',
        created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      },
      {
        id: '3',
        title: 'Coherence Stabilization Opportunity',
        description: 'Quantum coherence showing exceptional stability in innovation potential',
        type: 'coherence',
        confidence: 94.2,
        impact: 'high',
        quantum_signature: 'C = |⟨ψ|φ⟩|²',
        affected_decisions: ['Innovation Potential State'],
        recommendations: [
          'Exploit high coherence for innovation initiatives',
          'Maintain decoherence protection',
          'Scale quantum advantage'
        ],
        potential_outcome: '31% improvement in innovation outcomes',
        created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      },
      {
        id: '4',
        title: 'Collapse Imminent Warning',
        description: 'Performance optimization state approaching collapse threshold',
        type: 'collapse',
        confidence: 86.9,
        impact: 'medium',
        quantum_signature: 'P_collapse = |α|²',
        affected_decisions: ['Performance Optimization State'],
        recommendations: [
          'Prepare measurement apparatus',
          'Stabilize decision parameters',
          'Plan post-collapse strategy'
        ],
        potential_outcome: 'Optimal decision outcome with 67% probability',
        created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000)
      }
    ];

    setInsights(mockInsights);
  };

  const generateMetrics = () => {
    const mockMetrics: QuantumMetric[] = [
      {
        category: 'Quantum Efficiency',
        current_value: 87.4,
        target_value: 92,
        quantum_efficiency: 0.91,
        coherence_stability: 0.88,
        entanglement_strength: 0.85,
        trend: 'improving'
      },
      {
        category: 'Superposition Stability',
        current_value: 83.7,
        target_value: 88,
        quantum_efficiency: 0.86,
        coherence_stability: 0.91,
        entanglement_strength: 0.79,
        trend: 'stable'
      },
      {
        category: 'Entanglement Network',
        current_value: 89.2,
        target_value: 93,
        quantum_efficiency: 0.89,
        coherence_stability: 0.85,
        entanglement_strength: 0.92,
        trend: 'improving'
      },
      {
        category: 'Coherence Preservation',
        current_value: 91.8,
        target_value: 95,
        quantum_efficiency: 0.93,
        coherence_stability: 0.94,
        entanglement_strength: 0.87,
        trend: 'improving'
      }
    ];

    setMetrics(mockMetrics);
  };

  const updateQuantumData = () => {
    setQuantumStates(prev => prev.map(state => ({
      ...state,
      coherence_score: Math.max(0, Math.min(1, state.coherence_score + (Math.random() - 0.5) * 0.05)),
      entanglement_level: Math.max(0, Math.min(1, state.entanglement_level + (Math.random() - 0.5) * 0.03))
    })));

    setQuantumEfficiency(prev => Math.min(99.9, prev + (Math.random() - 0.5) * 2));
  };

  const runQuantumSimulation = () => {
    setIsProcessing(true);
    setActiveSimulation('comprehensive');

    setTimeout(() => {
      const newInsight: QuantumInsight = {
        id: Date.now().toString(),
        title: 'Quantum Simulation Results',
        description: 'Advanced quantum processing reveals optimal decision pathways',
        type: 'optimization',
        confidence: 95.8,
        impact: 'high',
        quantum_signature: 'ψ_optimized = Σⱼ βⱼ|j⟩',
        affected_decisions: ['All Decision Matrices'],
        recommendations: [
          'Implement quantum-optimized decision framework',
          'Maintain quantum coherence across systems',
          'Scale quantum advantage organization-wide'
        ],
        potential_outcome: '28% improvement in overall decision quality',
        created_at: new Date()
      };

      setInsights(prev => [newInsight, ...prev.slice(0, 9)]);
      setIsProcessing(false);
      setActiveSimulation(null);
    }, 3000);
  };

  const getInsightTypeColor = (type: QuantumInsight['type']) => {
    switch (type) {
      case 'superposition': return 'text-blue-400 bg-blue-500/20';
      case 'entanglement': return 'text-purple-400 bg-purple-500/20';
      case 'coherence': return 'text-green-400 bg-green-500/20';
      case 'collapse': return 'text-orange-400 bg-orange-500/20';
      case 'optimization': return 'text-yellow-400 bg-yellow-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'critical': return 'text-red-400';
      case 'high': return 'text-orange-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getTrendColor = (trend: QuantumMetric['trend']) => {
    switch (trend) {
      case 'improving': return 'text-green-400';
      case 'stable': return 'text-yellow-400';
      case 'declining': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const quantumEfficiencyData = [
    { time: '00:00', efficiency: 82.3, coherence: 0.89, entanglement: 0.76 },
    { time: '04:00', efficiency: 84.7, coherence: 0.91, entanglement: 0.82 },
    { time: '08:00', efficiency: 87.4, coherence: 0.92, entanglement: 0.85 },
    { time: '12:00', efficiency: 89.1, coherence: 0.88, entanglement: 0.87 },
    { time: '16:00', efficiency: 86.8, coherence: 0.90, entanglement: 0.83 },
    { time: '20:00', efficiency: 85.2, coherence: 0.87, entanglement: 0.81 }
  ];

  const decisionProbabilityData = [
    { decision: 'Budget', probability: 0.67, utility: 0.89, risk: 0.23 },
    { decision: 'Policy', probability: 0.43, utility: 0.81, risk: 0.31 },
    { decision: 'Resource', probability: 0.56, utility: 0.87, risk: 0.18 },
    { decision: 'Innovation', probability: 0.71, utility: 0.92, risk: 0.28 },
    { decision: 'Performance', probability: 0.89, utility: 0.74, risk: 0.67 }
  ];

  const quantumRadarData = [
    { metric: 'Efficiency', current: 87.4, optimal: 92 },
    { metric: 'Coherence', current: 91.8, optimal: 95 },
    { metric: 'Entanglement', current: 89.2, optimal: 93 },
    { metric: 'Superposition', current: 83.7, optimal: 88 },
    { metric: 'Stability', current: 86.9, optimal: 90 },
    { metric: 'Optimization', current: 90.3, optimal: 94 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl box-shadow-glow" style={{
            background: 'linear-gradient(135deg, #8b5cf630, #3b82f630)'
          }}>
            <Atom className="w-8 h-8 text-purple-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold gradient-text">Quantum Management</h1>
            <p className="text-gray-300">Superposition Decision Making</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 px-3 py-1 rounded-lg ${
            isProcessing ? 'bg-purple-500/20 text-purple-400' : 'bg-gray-500/20 text-gray-400'
          }`}>
            <Cpu className="w-4 h-4" />
            <span className="font-semibold">{isProcessing ? 'Processing' : 'Ready'}</span>
          </div>
          <button className="btn-secondary">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Quantum Efficiency Score */}
      <div className="card p-6 border border-purple-500/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Atom className="w-6 h-6 text-purple-400" />
            <div>
              <h2 className="text-xl font-semibold text-white">Quantum Efficiency Score</h2>
              <p className="text-sm text-gray-400">Overall quantum system performance</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-purple-400">{quantumEfficiency.toFixed(1)}%</div>
            <p className="text-sm text-gray-400">Efficiency Score</p>
          </div>
        </div>
      </div>

      {/* Quantum States */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <Layers className="w-5 h-5 mr-2 text-blue-400" />
          Quantum States
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {quantumStates.map((state) => (
            <motion.div
              key={state.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              className="card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-white">{state.name}</h3>
                  <p className="text-sm text-gray-400">Quantum State</p>
                </div>
                <div className={`px-2 py-1 text-xs rounded ${
                  state.superposition ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'
                }`}>
                  {state.superposition ? 'SUPERPOSITION' : 'COLLAPSED'}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-400">Coherence Score</p>
                  <p className="text-lg font-bold text-green-400">{(state.coherence_score * 100).toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Entanglement Level</p>
                  <p className="text-lg font-bold text-purple-400">{(state.entanglement_level * 100).toFixed(1)}%</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-400">Probability Amplitude</p>
                  <p className="text-lg font-bold text-blue-400">{(state.probability_amplitude * 100).toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Collapse Probability</p>
                  <p className="text-lg font-bold text-orange-400">{(state.collapse_probability * 100).toFixed(1)}%</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">Quantum Signature</p>
                <div className="p-3 bg-purple-500/10 rounded-lg">
                  <code className="text-purple-400 font-mono text-sm">{state.quantum_signature}</code>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">Measurement Parameters</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-gray-400">Phase: {state.phase.toFixed(2)}</p>
                    <p className="text-gray-400">Basis: {state.measurement_basis}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Last Measured: {state.last_measured.toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <button className="btn-secondary text-sm">
                  <Eye className="w-3 h-3 mr-1" />
                  Measure State
                </button>
                <button className="btn-primary">
                  <Zap className="w-4 h-4 mr-2" />
                  Collapse State
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decision Matrices */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <Target className="w-5 h-5 mr-2 text-green-400" />
          Decision Matrices
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {decisionMatrices.map((matrix) => (
            <motion.div
              key={matrix.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className="card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white">{matrix.decision_name}</h3>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-400">{matrix.optimization_score.toFixed(1)}%</p>
                  <p className="text-xs text-gray-400">optimization</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-400">Superposition Weight</p>
                  <p className="text-lg font-bold text-blue-400">{(matrix.superposition_weight * 100).toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Uncertainty Level</p>
                  <p className="text-lg font-bold text-orange-400">{(matrix.uncertainty_level * 100).toFixed(1)}%</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">Decision Outcomes</p>
                <div className="space-y-2">
                  {matrix.decision_outcomes.map((outcome, index) => (
                    <div key={index} className="p-3 bg-gray-800/50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-semibold text-white">{outcome.outcome}</span>
                        <span className={`text-sm font-semibold ${getRiskColor(outcome.risk_level)}`}>
                          {outcome.risk_level.toUpperCase()}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <p className="text-gray-400">Probability</p>
                          <p className="text-blue-400">{(outcome.probability * 100).toFixed(1)}%</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Utility</p>
                          <p className="text-green-400">{(outcome.utility * 100).toFixed(1)}%</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Risk</p>
                          <p className={`${outcome.risk_level === 'low' ? 'text-green-400' : outcome.risk_level === 'medium' ? 'text-yellow-400' : outcome.risk_level === 'high' ? 'text-orange-400' : 'text-red-400'}`}>
                            {outcome.risk_level}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">Entanglement Connections</p>
                <div className="flex flex-wrap gap-2">
                  {matrix.entanglement_connections.map((connection, index) => (
                    <span key={index} className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded">
                      {connection}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-400">Updated: {matrix.last_updated.toLocaleDateString()}</p>
                <button className="btn-primary">
                  <Brain className="w-4 h-4 mr-2" />
                  Optimize Decision
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quantum Insights */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <Sparkles className="w-5 h-5 mr-2 text-yellow-400" />
          Quantum Insights
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {insights.map((insight) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className="card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-white">{insight.title}</h3>
                  <span className={`px-2 py-1 text-xs rounded ${getInsightTypeColor(insight.type)}`}>
                    {insight.type.toUpperCase()}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-purple-400">{insight.confidence.toFixed(1)}%</p>
                  <p className="text-xs text-gray-400">confidence</p>
                </div>
              </div>

              <p className="text-sm text-gray-300 mb-4">{insight.description}</p>

              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">Quantum Signature</p>
                <div className="p-3 bg-purple-500/10 rounded-lg">
                  <code className="text-purple-400 font-mono text-sm">{insight.quantum_signature}</code>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-400">Impact Level</p>
                  <p className={`text-lg font-bold ${getRiskColor(insight.impact)}`}>
                    {insight.impact.toUpperCase()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Affected Decisions</p>
                  <p className="text-lg font-bold text-blue-400">{insight.affected_decisions.length}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">Recommendations</p>
                <div className="space-y-1">
                  {insight.recommendations.slice(0, 2).map((rec, index) => (
                    <div key={index} className="flex items-start gap-2 text-xs text-gray-300">
                      <Target className="w-3 h-3 text-blue-400 mt-0.5" />
                      <span>{rec}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">Potential Outcome</p>
                <p className="text-sm text-green-400">{insight.potential_outcome}</p>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-400">{insight.created_at.toLocaleDateString()}</p>
                <button className="btn-primary">
                  <Zap className="w-4 h-4 mr-2" />
                  Apply Insight
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quantum Metrics */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <BarChart3 className="w-5 h-5 mr-2 text-orange-400" />
          Quantum Metrics
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card p-4"
            >
              <div className="flex items-center gap-3 mb-2">
                <Activity className="w-5 h-5 text-orange-400" />
                <p className="text-sm text-gray-400">{metric.category}</p>
              </div>
              <p className="text-2xl font-bold text-white">{metric.current_value.toFixed(1)}%</p>
              <p className="text-xs text-gray-400">Target: {metric.target_value}%</p>
              <div className="mt-2">
                <p className={`text-sm font-semibold ${getTrendColor(metric.trend)}`}>
                  {metric.trend.toUpperCase()} {metric.current_value > metric.target_value ? '-' : '+'}{Math.abs(metric.current_value - metric.target_value).toFixed(1)}%
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Analytics Dashboard */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Quantum Efficiency Trend */}
        <div className="card p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Quantum Efficiency Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={quantumEfficiencyData}>
              <defs>
                <linearGradient id="efficiencyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1" />
                </linearGradient>
                <linearGradient id="coherenceGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="time" stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
              <YAxis stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0b1220', border: '1px solid #8b5cf650', borderRadius: 8 }}
                labelStyle={{ color: '#f1f5f9' }}
              />
              <Area type="monotone" dataKey="efficiency" stroke="#8b5cf6" fill="url(#efficiencyGrad)" />
              <Line type="monotone" dataKey="coherence" stroke="#10b981" strokeWidth={2} />
              <Line type="monotone" dataKey="entanglement" stroke="#f59e0b" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Decision Probability Analysis */}
        <div className="card p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Decision Probability Analysis</h3>
          <ResponsiveContainer width="100%" height={250}>
            <ScatterChart data={decisionProbabilityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="probability" stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
              <YAxis dataKey="utility" stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0b1220', border: '1px solid #8b5cf650', borderRadius: 8 }}
                labelStyle={{ color: '#f1f5f9' }}
              />
              <Scatter name="Decisions" dataKey="risk" fill="#8b5cf6" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quantum Performance Radar */}
      <div className="card p-6">
        <h3 className="text-xl font-semibold text-white mb-6">Quantum Performance Radar</h3>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={quantumRadarData}>
            <PolarGrid stroke="#374151" />
            <PolarAngleAxis dataKey="metric" stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
            <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
            <Radar name="current" dataKey="current" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
            <Radar name="optimal" dataKey="optimal" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Quantum Simulation Button */}
      <div className="card p-6 border border-purple-500/50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-white">Quantum Simulation</h3>
            <p className="text-sm text-gray-400">Run comprehensive quantum decision optimization</p>
          </div>
          <button
            onClick={runQuantumSimulation}
            disabled={isProcessing}
            className="btn-primary"
          >
            <Cpu className="w-4 h-4 mr-2" />
            {isProcessing ? 'Processing...' : 'Start Simulation'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuantumManagement;
