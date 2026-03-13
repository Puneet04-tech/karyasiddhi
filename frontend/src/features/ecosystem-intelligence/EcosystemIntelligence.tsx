import React, { useState, useEffect, useRef } from 'react';
import { 
  Network, Activity, Users, Zap, TrendingUp, BarChart3, 
  Globe, Link, ArrowRight, AlertTriangle, CheckCircle,
  Settings, RefreshCw, Eye, Brain, Target
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Treemap } from 'recharts';

interface EcosystemNode {
  id: string;
  name: string;
  type: 'department' | 'system' | 'process' | 'stakeholder' | 'resource';
  status: 'active' | 'inactive' | 'degraded' | 'optimizing';
  connections: number;
  efficiency: number;
  influence: number;
  health_score: number;
  metrics: {
    performance: number;
    collaboration: number;
    innovation: number;
    resilience: number;
  };
  position: {
    x: number;
    y: number;
  };
}

interface EcosystemConnection {
  id: string;
  source: string;
  target: string;
  type: 'data_flow' | 'collaboration' | 'dependency' | 'influence';
  strength: number;
  bidirectional: boolean;
  metrics: {
    frequency: number;
    latency: number;
    reliability: number;
    impact: number;
  };
}

interface EcosystemInsight {
  id: string;
  title: string;
  description: string;
  type: 'optimization' | 'risk' | 'opportunity' | 'trend';
  severity: 'low' | 'medium' | 'high' | 'critical';
  confidence: number;
  affected_nodes: string[];
  recommendation: string;
  potential_impact: number;
  created_at: Date;
}

const EcosystemIntelligence = () => {
  const [nodes, setNodes] = useState<EcosystemNode[]>([]);
  const [connections, setConnections] = useState<EcosystemConnection[]>([]);
  const [insights, setInsights] = useState<EcosystemInsight[]>([]);
  const [selectedNode, setSelectedNode] = useState<EcosystemNode | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [ecosystemHealth, setEcosystemHealth] = useState(87.3);
  const [activeConnections, setActiveConnections] = useState(0);

  useEffect(() => {
    generateEcosystemNodes();
    generateEcosystemConnections();
    generateEcosystemInsights();
    const interval = setInterval(updateEcosystemData, 30000);
    return () => clearInterval(interval);
  }, []);

  const generateEcosystemNodes = () => {
    const mockNodes: EcosystemNode[] = [
      {
        id: '1',
        name: 'Department of Revenue',
        type: 'department',
        status: 'active',
        connections: 12,
        efficiency: 89.2,
        influence: 78.5,
        health_score: 92.1,
        metrics: {
          performance: 87.3,
          collaboration: 91.2,
          innovation: 85.7,
          resilience: 88.9
        },
        position: { x: 200, y: 150 }
      },
      {
        id: '2',
        name: 'Digital Services Platform',
        type: 'system',
        status: 'active',
        connections: 18,
        efficiency: 94.7,
        influence: 92.3,
        health_score: 95.8,
        metrics: {
          performance: 93.1,
          collaboration: 88.7,
          innovation: 96.2,
          resilience: 91.4
        },
        position: { x: 400, y: 200 }
      },
      {
        id: '3',
        name: 'Citizen Services',
        type: 'process',
        status: 'active',
        connections: 15,
        efficiency: 87.8,
        influence: 85.6,
        health_score: 89.4,
        metrics: {
          performance: 86.2,
          collaboration: 89.5,
          innovation: 87.1,
          resilience: 90.3
        },
        position: { x: 300, y: 350 }
      },
      {
        id: '4',
        name: 'Policy Management',
        type: 'system',
        status: 'optimizing',
        connections: 10,
        efficiency: 82.4,
        influence: 79.8,
        health_score: 84.7,
        metrics: {
          performance: 81.3,
          collaboration: 84.7,
          innovation: 79.2,
          resilience: 86.1
        },
        position: { x: 500, y: 100 }
      },
      {
        id: '5',
        name: 'Stakeholder Network',
        type: 'stakeholder',
        status: 'active',
        connections: 20,
        efficiency: 91.5,
        influence: 88.9,
        health_score: 90.2,
        metrics: {
          performance: 89.7,
          collaboration: 93.4,
          innovation: 88.1,
          resilience: 87.9
        },
        position: { x: 150, y: 300 }
      },
      {
        id: '6',
        name: 'Resource Management',
        type: 'resource',
        status: 'active',
        connections: 14,
        efficiency: 88.9,
        influence: 82.3,
        health_score: 87.6,
        metrics: {
          performance: 87.1,
          collaboration: 90.2,
          innovation: 86.4,
          resilience: 89.8
        },
        position: { x: 450, y: 300 }
      }
    ];

    setNodes(mockNodes);
  };

  const generateEcosystemConnections = () => {
    const mockConnections: EcosystemConnection[] = [
      {
        id: '1',
        source: '1',
        target: '2',
        type: 'data_flow',
        strength: 0.85,
        bidirectional: true,
        metrics: {
          frequency: 145,
          latency: 23,
          reliability: 94.2,
          impact: 78.5
        }
      },
      {
        id: '2',
        source: '2',
        target: '3',
        type: 'collaboration',
        strength: 0.92,
        bidirectional: true,
        metrics: {
          frequency: 234,
          latency: 18,
          reliability: 96.7,
          impact: 85.3
        }
      },
      {
        id: '3',
        source: '1',
        target: '5',
        type: 'influence',
        strength: 0.78,
        bidirectional: false,
        metrics: {
          frequency: 89,
          latency: 31,
          reliability: 91.4,
          impact: 72.6
        }
      },
      {
        id: '4',
        source: '4',
        target: '2',
        type: 'dependency',
        strength: 0.88,
        bidirectional: true,
        metrics: {
          frequency: 167,
          latency: 25,
          reliability: 93.8,
          impact: 81.2
        }
      },
      {
        id: '5',
        source: '6',
        target: '3',
        type: 'data_flow',
        strength: 0.91,
        bidirectional: true,
        metrics: {
          frequency: 198,
          latency: 20,
          reliability: 95.3,
          impact: 83.7
        }
      },
      {
        id: '6',
        source: '5',
        target: '6',
        type: 'collaboration',
        strength: 0.83,
        bidirectional: true,
        metrics: {
          frequency: 156,
          latency: 27,
          reliability: 92.1,
          impact: 76.9
        }
      }
    ];

    setConnections(mockConnections);
    setActiveConnections(mockConnections.length);
  };

  const generateEcosystemInsights = () => {
    const mockInsights: EcosystemInsight[] = [
      {
        id: '1',
        title: 'Optimize Digital Services Integration',
        description: 'Strong collaboration between Digital Services and Citizen Services creates optimization opportunity',
        type: 'optimization',
        severity: 'medium',
        confidence: 87.3,
        affected_nodes: ['2', '3'],
        recommendation: 'Implement API integration to reduce latency by 15%',
        potential_impact: 23.4,
        created_at: new Date(Date.now() - 2 * 60 * 60 * 1000)
      },
      {
        id: '2',
        title: 'Policy Management Bottleneck Detected',
        description: 'Policy Management system showing degraded performance affecting multiple departments',
        type: 'risk',
        severity: 'high',
        confidence: 91.7,
        affected_nodes: ['4', '1', '2'],
        recommendation: 'Immediate system optimization required to prevent cascading failures',
        potential_impact: -15.8,
        created_at: new Date(Date.now() - 4 * 60 * 60 * 1000)
      },
      {
        id: '3',
        title: 'Stakeholder Network Expansion Opportunity',
        description: 'Stakeholder Network shows high influence with untapped collaboration potential',
        type: 'opportunity',
        severity: 'low',
        confidence: 82.4,
        affected_nodes: ['5', '1', '6'],
        recommendation: 'Expand stakeholder engagement to improve ecosystem resilience',
        potential_impact: 18.7,
        created_at: new Date(Date.now() - 6 * 60 * 60 * 1000)
      },
      {
        id: '4',
        title: 'Resource Management Efficiency Trend',
        description: 'Resource Management showing consistent improvement in cross-department collaboration',
        type: 'trend',
        severity: 'low',
        confidence: 88.9,
        affected_nodes: ['6', '3', '5'],
        recommendation: 'Scale successful resource sharing practices across ecosystem',
        potential_impact: 12.3,
        created_at: new Date(Date.now() - 8 * 60 * 60 * 1000)
      }
    ];

    setInsights(mockInsights);
  };

  const updateEcosystemData = () => {
    setNodes(prev => prev.map(node => ({
      ...node,
      efficiency: Math.max(0, Math.min(100, node.efficiency + (Math.random() - 0.5) * 3)),
      health_score: Math.max(0, Math.min(100, node.health_score + (Math.random() - 0.5) * 2)),
      metrics: {
        performance: Math.max(0, Math.min(100, node.metrics.performance + (Math.random() - 0.5) * 4)),
        collaboration: Math.max(0, Math.min(100, node.metrics.collaboration + (Math.random() - 0.5) * 3)),
        innovation: Math.max(0, Math.min(100, node.metrics.innovation + (Math.random() - 0.5) * 5)),
        resilience: Math.max(0, Math.min(100, node.metrics.resilience + (Math.random() - 0.5) * 2))
      }
    })));

    setEcosystemHealth(prev => Math.min(99, prev + (Math.random() - 0.5) * 2));
  };

  const analyzeEcosystem = () => {
    setIsAnalyzing(true);

    setTimeout(() => {
      const newInsight: EcosystemInsight = {
        id: Date.now().toString(),
        title: 'Real-time Ecosystem Analysis',
        description: 'AI-powered analysis reveals new optimization opportunities',
        type: 'optimization',
        severity: 'medium',
        confidence: 89.2,
        affected_nodes: nodes.slice(0, 3).map(n => n.id),
        recommendation: 'Implement suggested optimizations to improve overall ecosystem health',
        potential_impact: 15.6,
        created_at: new Date()
      };

      setInsights(prev => [newInsight, ...prev.slice(0, 9)]);
      setIsAnalyzing(false);
    }, 3000);
  };

  const getNodeStatusColor = (status: EcosystemNode['status']) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-500/20';
      case 'inactive': return 'text-gray-400 bg-gray-500/20';
      case 'degraded': return 'text-yellow-400 bg-yellow-500/20';
      case 'optimizing': return 'text-blue-400 bg-blue-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getNodeTypeIcon = (type: EcosystemNode['type']) => {
    switch (type) {
      case 'department': return Users;
      case 'system': return BarChart3;
      case 'process': return Activity;
      case 'stakeholder': return Globe;
      case 'resource': return Target;
      default: return Network;
    }
  };

  const getInsightSeverityColor = (severity: EcosystemInsight['severity']) => {
    switch (severity) {
      case 'critical': return 'text-red-400 bg-red-500/20';
      case 'high': return 'text-orange-400 bg-orange-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'low': return 'text-green-400 bg-green-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getConnectionTypeColor = (type: EcosystemConnection['type']) => {
    switch (type) {
      case 'data_flow': return '#3b82f6';
      case 'collaboration': return '#10b981';
      case 'dependency': return '#f59e0b';
      case 'influence': return '#8b5cf6';
      default: return '#6b7280';
    }
  };

  const ecosystemHealthData = [
    { metric: 'Performance', current: 87.3, target: 92 },
    { metric: 'Collaboration', current: 89.7, target: 94 },
    { metric: 'Innovation', current: 85.4, target: 90 },
    { metric: 'Resilience', current: 88.9, target: 93 }
  ];

  const nodeTypeDistribution = [
    { type: 'Departments', count: 12, color: '#3b82f6' },
    { type: 'Systems', count: 18, color: '#10b981' },
    { type: 'Processes', count: 15, color: '#f59e0b' },
    { type: 'Stakeholders', count: 8, color: '#8b5cf6' },
    { type: 'Resources', count: 14, color: '#ef4444' }
  ];

  const connectionMetrics = [
    { type: 'Data Flow', strength: 0.85, frequency: 145, reliability: 94.2 },
    { type: 'Collaboration', strength: 0.92, frequency: 234, reliability: 96.7 },
    { type: 'Dependency', strength: 0.88, frequency: 167, reliability: 93.8 },
    { type: 'Influence', strength: 0.78, frequency: 89, reliability: 91.4 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl box-shadow-glow" style={{
            background: 'linear-gradient(135deg, #3b82f630, #10b98130)'
          }}>
            <Network className="w-8 h-8 text-blue-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold gradient-text">Ecosystem Intelligence</h1>
            <p className="text-gray-300">Interconnected Governance Analytics</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 px-3 py-1 rounded-lg ${
            isAnalyzing ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-500/20 text-gray-400'
          }`}>
            <Brain className="w-4 h-4" />
            <span className="font-semibold">{isAnalyzing ? 'Analyzing' : 'Monitoring'}</span>
          </div>
          <button className="btn-secondary">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Overall Ecosystem Health */}
      <div className="card p-6 border border-blue-500/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Globe className="w-6 h-6 text-blue-400" />
            <div>
              <h2 className="text-xl font-semibold text-white">Ecosystem Health Score</h2>
              <p className="text-sm text-gray-400">Overall system interconnectedness</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-blue-400">{ecosystemHealth.toFixed(1)}</div>
            <p className="text-sm text-gray-400">Health Score</p>
          </div>
        </div>
      </div>

      {/* Ecosystem Network Visualization */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <Network className="w-5 h-5 mr-2 text-blue-400" />
          Ecosystem Network
        </h2>
        <div className="card p-6">
          <div className="relative h-96 bg-gray-800/50 rounded-lg overflow-hidden">
            {/* Network visualization placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Network className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                <p className="text-lg font-semibold text-white">Interactive Network Visualization</p>
                <p className="text-sm text-gray-400">Real-time ecosystem connections and interactions</p>
              </div>
            </div>
            
            {/* Node representations */}
            {nodes.map((node, index) => {
              const NodeIcon = getNodeTypeIcon(node.type);
              return (
                <motion.div
                  key={node.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  className="absolute cursor-pointer"
                  style={{
                    left: `${node.position.x}px`,
                    top: `${node.position.y}px`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  onClick={() => setSelectedNode(node)}
                >
                  <div className={`p-2 rounded-full ${getNodeStatusColor(node.status)}`}>
                    <NodeIcon className="w-6 h-6" />
                  </div>
                  <div className="text-xs text-white mt-1 text-center">{node.name}</div>
                </motion.div>
              );
            })}

            {/* Connection lines */}
            <svg className="absolute inset-0 pointer-events-none">
              {connections.map((connection) => {
                const sourceNode = nodes.find(n => n.id === connection.source);
                const targetNode = nodes.find(n => n.id === connection.target);
                if (!sourceNode || !targetNode) return null;

                return (
                  <motion.line
                    key={connection.id}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    x1={sourceNode.position.x}
                    y1={sourceNode.position.y}
                    x2={targetNode.position.x}
                    y2={targetNode.position.y}
                    stroke={getConnectionTypeColor(connection.type)}
                    strokeWidth={connection.strength * 3}
                    strokeOpacity={0.6}
                  />
                );
              })}
            </svg>
          </div>
        </div>
      </div>

      {/* Selected Node Details */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="card p-6 border border-blue-500/50"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white flex items-center">
                {React.createElement(getNodeTypeIcon(selectedNode.type), { 
                  className: "w-5 h-5 mr-2 text-blue-400" 
                })}
                {selectedNode.name}
              </h2>
              <button
                onClick={() => setSelectedNode(null)}
                className="btn-secondary"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-400">Efficiency</p>
                <p className="text-lg font-bold text-green-400">{selectedNode.efficiency.toFixed(1)}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Influence</p>
                <p className="text-lg font-bold text-blue-400">{selectedNode.influence.toFixed(1)}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Health Score</p>
                <p className="text-lg font-bold text-purple-400">{selectedNode.health_score.toFixed(1)}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Connections</p>
                <p className="text-lg font-bold text-white">{selectedNode.connections}</p>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-white mb-4">Node Metrics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Performance</p>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                    <div 
                      className="h-2 rounded-full bg-green-500"
                      style={{ width: `${selectedNode.metrics.performance}%` }}
                    />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Collaboration</p>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                    <div 
                      className="h-2 rounded-full bg-blue-500"
                      style={{ width: `${selectedNode.metrics.collaboration}%` }}
                    />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Innovation</p>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                    <div 
                      className="h-2 rounded-full bg-purple-500"
                      style={{ width: `${selectedNode.metrics.innovation}%` }}
                    />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Resilience</p>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                    <div 
                      className="h-2 rounded-full bg-yellow-500"
                      style={{ width: `${selectedNode.metrics.resilience}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      )}

      {/* Ecosystem Insights */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <Brain className="w-5 h-5 mr-2 text-purple-400" />
          AI Ecosystem Insights
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {insights.map((insight, index) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="card p-6 cursor-pointer hover:border-purple-500/50"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-white">{insight.title}</h3>
                  <p className="text-sm text-gray-400 mb-2">{insight.description}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded ${getInsightSeverityColor(insight.severity)}`}>
                  {insight.severity.toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-400">Confidence</p>
                  <p className="text-lg font-bold text-purple-400">{insight.confidence.toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Potential Impact</p>
                  <p className={`text-lg font-bold ${insight.potential_impact > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {insight.potential_impact > 0 ? '+' : ''}{insight.potential_impact.toFixed(1)}%
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">Affected Nodes</p>
                <div className="flex flex-wrap gap-2">
                  {insight.affected_nodes.map((nodeId, idx) => {
                    const node = nodes.find(n => n.id === nodeId);
                    return node ? (
                      <span key={idx} className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">
                        {node.name}
                      </span>
                    ) : null;
                  })}
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">Recommendation</p>
                <p className="text-sm text-white">{insight.recommendation}</p>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-400">{insight.created_at.toLocaleDateString()}</p>
                <button className="btn-primary">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Apply Insight
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Analytics Dashboard */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Ecosystem Health Metrics */}
        <div className="card p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Ecosystem Health Metrics</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={ecosystemHealthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="metric" stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
              <YAxis stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0b1220', border: '1px solid #3b82f650', borderRadius: 8 }}
                labelStyle={{ color: '#f1f5f9' }}
              />
              <Bar dataKey="current" fill="#3b82f6" />
              <Bar dataKey="target" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Node Type Distribution */}
        <div className="card p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Node Type Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={nodeTypeDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="type" stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
              <YAxis stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0b1220', border: '1px solid #3b82f650', borderRadius: 8 }}
                labelStyle={{ color: '#f1f5f9' }}
              />
              <Bar dataKey="count" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Connection Metrics */}
      <div className="card p-6">
        <h3 className="text-xl font-semibold text-white mb-6">Connection Metrics</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={connectionMetrics}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="type" stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
            <YAxis stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
            <Tooltip
              contentStyle={{ backgroundColor: '#0b1220', border: '1px solid #3b82f650', borderRadius: 8 }}
              labelStyle={{ color: '#f1f5f9' }}
            />
            <Bar dataKey="strength" fill="#3b82f6" />
            <Bar dataKey="reliability" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Analyze Button */}
      <div className="card p-6 border border-purple-500/50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-white">AI Ecosystem Analysis</h3>
            <p className="text-sm text-gray-400">Run comprehensive ecosystem intelligence analysis</p>
          </div>
          <button
            onClick={analyzeEcosystem}
            disabled={isAnalyzing}
            className="btn-primary"
          >
            <Brain className="w-4 h-4 mr-2" />
            {isAnalyzing ? 'Analyzing...' : 'Analyze Ecosystem'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EcosystemIntelligence;
