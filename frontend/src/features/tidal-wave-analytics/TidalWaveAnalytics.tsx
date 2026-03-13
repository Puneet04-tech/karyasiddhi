import React, { useState, useEffect, useRef } from 'react';
import { 
  Network, Users, TrendingUp, BarChart3, Activity, Target,
  Globe, Link, ArrowRight, AlertTriangle, CheckCircle,
  Settings, RefreshCw, Eye, Brain, Zap, Share2,
  MessageCircle, Heart, Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Treemap } from 'recharts';

interface SocialNetworkNode {
  id: string;
  name: string;
  role: string;
  department: string;
  influence_score: number;
  connection_count: number;
  collaboration_index: number;
  innovation_score: number;
  communication_style: 'formal' | 'informal' | 'mixed';
  digital_footprint: {
    messages_sent: number;
    meetings_attended: number;
    projects_collaborated: number;
    knowledge_shared: number;
  };
  position: {
    x: number;
    y: number;
  };
}

interface SocialConnection {
  id: string;
  source: string;
  target: string;
  strength: number;
  type: 'formal' | 'informal' | 'project' | 'mentorship';
  frequency: number;
  duration: number;
  last_interaction: Date;
  collaboration_projects: string[];
}

interface NetworkInsight {
  id: string;
  title: string;
  description: string;
  type: 'influence' | 'collaboration' | 'knowledge' | 'bottleneck' | 'opportunity';
  severity: 'low' | 'medium' | 'high' | 'critical';
  confidence: number;
  affected_nodes: string[];
  recommendation: string;
  potential_impact: number;
  created_at: Date;
}

interface NetworkMetric {
  category: string;
  current_value: number;
  target_value: number;
  trend: 'improving' | 'stable' | 'declining';
  change_percentage: number;
}

const TidalWaveAnalytics = () => {
  const [networkNodes, setNetworkNodes] = useState<SocialNetworkNode[]>([]);
  const [connections, setConnections] = useState<SocialConnection[]>([]);
  const [insights, setInsights] = useState<NetworkInsight[]>([]);
  const [networkMetrics, setNetworkMetrics] = useState<NetworkMetric[]>([]);
  const [selectedNode, setSelectedNode] = useState<SocialNetworkNode | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [networkHealth, setNetworkHealth] = useState(84.7);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  useEffect(() => {
    generateNetworkNodes();
    generateConnections();
    generateInsights();
    generateNetworkMetrics();
    const interval = setInterval(updateNetworkData, 25000);
    return () => clearInterval(interval);
  }, []);

  const generateNetworkNodes = () => {
    const mockNodes: SocialNetworkNode[] = [
      {
        id: '1',
        name: 'Priya Sharma',
        role: 'Technical Lead',
        department: 'Digital Services',
        influence_score: 92.3,
        connection_count: 47,
        collaboration_index: 88.7,
        innovation_score: 85.4,
        communication_style: 'mixed',
        digital_footprint: {
          messages_sent: 1247,
          meetings_attended: 234,
          projects_collaborated: 18,
          knowledge_shared: 156
        },
        position: { x: 300, y: 200 }
      },
      {
        id: '2',
        name: 'Rahul Kumar',
        role: 'Senior Developer',
        department: 'Digital Services',
        influence_score: 78.9,
        connection_count: 35,
        collaboration_index: 82.3,
        innovation_score: 79.1,
        communication_style: 'formal',
        digital_footprint: {
          messages_sent: 987,
          meetings_attended: 189,
          projects_collaborated: 14,
          knowledge_shared: 123
        },
        position: { x: 450, y: 150 }
      },
      {
        id: '3',
        name: 'Sunita Patel',
        role: 'Product Manager',
        department: 'Revenue Department',
        influence_score: 87.6,
        connection_count: 52,
        collaboration_index: 91.2,
        innovation_score: 82.7,
        communication_style: 'informal',
        digital_footprint: {
          messages_sent: 1456,
          meetings_attended: 267,
          projects_collaborated: 22,
          knowledge_shared: 189
        },
        position: { x: 200, y: 350 }
      },
      {
        id: '4',
        name: 'Amit Singh',
        role: 'Data Analyst',
        department: 'Policy Management',
        influence_score: 71.4,
        connection_count: 28,
        collaboration_index: 76.8,
        innovation_score: 68.9,
        communication_style: 'formal',
        digital_footprint: {
          messages_sent: 734,
          meetings_attended: 156,
          projects_collaborated: 11,
          knowledge_shared: 97
        },
        position: { x: 500, y: 300 }
      },
      {
        id: '5',
        name: 'Vikram Reddy',
        role: 'Innovation Lead',
        department: 'Resource Management',
        influence_score: 89.2,
        connection_count: 41,
        collaboration_index: 85.6,
        innovation_score: 94.3,
        communication_style: 'mixed',
        digital_footprint: {
          messages_sent: 1123,
          meetings_attended: 198,
          projects_collaborated: 16,
          knowledge_shared: 145
        },
        position: { x: 350, y: 400 }
      },
      {
        id: '6',
        name: 'Meera Gupta',
        role: 'HR Manager',
        department: 'Human Resources',
        influence_score: 83.7,
        connection_count: 38,
        collaboration_index: 87.9,
        innovation_score: 74.2,
        communication_style: 'informal',
        digital_footprint: {
          messages_sent: 892,
          meetings_attended: 145,
          projects_collaborated: 13,
          knowledge_shared: 112
        },
        position: { x: 150, y: 250 }
      }
    ];

    setNetworkNodes(mockNodes);
  };

  const generateConnections = () => {
    const mockConnections: SocialConnection[] = [
      {
        id: '1',
        source: '1',
        target: '2',
        strength: 0.85,
        type: 'project',
        frequency: 45,
        duration: 120,
        last_interaction: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        collaboration_projects: ['Digital Transformation', 'API Integration']
      },
      {
        id: '2',
        source: '1',
        target: '3',
        strength: 0.72,
        type: 'informal',
        frequency: 23,
        duration: 90,
        last_interaction: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        collaboration_projects: ['Cross-department Initiative']
      },
      {
        id: '3',
        source: '3',
        target: '4',
        strength: 0.91,
        type: 'formal',
        frequency: 67,
        duration: 150,
        last_interaction: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        collaboration_projects: ['Policy Analysis', 'Data Governance']
      },
      {
        id: '4',
        source: '5',
        target: '1',
        strength: 0.78,
        type: 'mentorship',
        frequency: 34,
        duration: 180,
        last_interaction: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
        collaboration_projects: ['Innovation Workshop', 'R&D Initiative']
      },
      {
        id: '5',
        source: '6',
        target: '3',
        strength: 0.83,
        type: 'project',
        frequency: 56,
        duration: 135,
        last_interaction: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        collaboration_projects: ['HR Digital Transformation', 'Employee Engagement']
      },
      {
        id: '6',
        source: '2',
        target: '5',
        strength: 0.69,
        type: 'informal',
        frequency: 28,
        duration: 105,
        last_interaction: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        collaboration_projects: ['Resource Optimization', 'Process Improvement']
      }
    ];

    setConnections(mockConnections);
  };

  const generateInsights = () => {
    const mockInsights: NetworkInsight[] = [
      {
        id: '1',
        title: 'Influence Hub Detected',
        description: 'Priya Sharma serves as a critical knowledge bridge between departments',
        type: 'influence',
        severity: 'high',
        confidence: 91.2,
        affected_nodes: ['1', '2', '3', '5'],
        recommendation: 'Leverage influence hub for cross-department knowledge sharing',
        potential_impact: 28.4,
        created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      },
      {
        id: '2',
        title: 'Collaboration Bottleneck',
        description: 'Limited cross-functional collaboration affecting innovation',
        type: 'bottleneck',
        severity: 'medium',
        confidence: 84.7,
        affected_nodes: ['4', '6'],
        recommendation: 'Establish formal cross-department collaboration programs',
        potential_impact: -15.3,
        created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000)
      },
      {
        id: '3',
        title: 'Knowledge Sharing Opportunity',
        description: 'High innovation potential not fully utilized across organization',
        type: 'opportunity',
        severity: 'medium',
        confidence: 88.9,
        affected_nodes: ['2', '4', '5'],
        recommendation: 'Create innovation sharing platform and recognition program',
        potential_impact: 22.7,
        created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      },
      {
        id: '4',
        title: 'Communication Pattern Analysis',
        description: 'Informal communication networks showing 35% higher collaboration rates',
        type: 'collaboration',
        severity: 'low',
        confidence: 87.3,
        affected_nodes: ['1', '3', '5', '6'],
        recommendation: 'Encourage informal knowledge sharing while maintaining formal channels',
        potential_impact: 18.9,
        created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
      }
    ];

    setInsights(mockInsights);
  };

  const generateNetworkMetrics = () => {
    const mockMetrics: NetworkMetric[] = [
      {
        category: 'Network Density',
        current_value: 0.73,
        target_value: 0.85,
        trend: 'improving',
        change_percentage: 12.3
      },
      {
        category: 'Collaboration Index',
        current_value: 82.4,
        target_value: 90,
        trend: 'improving',
        change_percentage: 8.7
      },
      {
        category: 'Knowledge Flow',
        current_value: 68.9,
        target_value: 80,
        trend: 'stable',
        change_percentage: 2.1
      },
      {
        category: 'Innovation Diffusion',
        current_value: 74.2,
        target_value: 85,
        trend: 'improving',
        change_percentage: 15.6
      }
    ];

    setNetworkMetrics(mockMetrics);
  };

  const updateNetworkData = () => {
    setNetworkNodes(prev => prev.map(node => ({
      ...node,
      influence_score: Math.max(0, Math.min(100, node.influence_score + (Math.random() - 0.5) * 2)),
      collaboration_index: Math.max(0, Math.min(100, node.collaboration_index + (Math.random() - 0.5) * 3))
    })));

    setNetworkHealth(prev => Math.min(99, prev + (Math.random() - 0.5) * 2));
  };

  const runNetworkAnalysis = () => {
    setIsAnalyzing(true);

    setTimeout(() => {
      const newInsight: NetworkInsight = {
        id: Date.now().toString(),
        title: 'AI-Generated Network Insight',
        description: 'Advanced analysis reveals hidden collaboration patterns and optimization opportunities',
        type: 'opportunity',
        severity: 'medium',
        confidence: 93.7,
        affected_nodes: ['1', '2', '3', '5'],
        recommendation: 'Implement AI-suggested collaboration optimization strategy',
        potential_impact: 25.4,
        created_at: new Date()
      };

      setInsights(prev => [newInsight, ...prev.slice(0, 9)]);
      setIsAnalyzing(false);
    }, 3000);
  };

  const getInsightTypeColor = (type: NetworkInsight['type']) => {
    switch (type) {
      case 'influence': return 'text-purple-400 bg-purple-500/20';
      case 'collaboration': return 'text-blue-400 bg-blue-500/20';
      case 'knowledge': return 'text-green-400 bg-green-500/20';
      case 'bottleneck': return 'text-orange-400 bg-orange-500/20';
      case 'opportunity': return 'text-yellow-400 bg-yellow-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getSeverityColor = (severity: NetworkInsight['severity']) => {
    switch (severity) {
      case 'critical': return 'text-red-400';
      case 'high': return 'text-orange-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getCommunicationStyleColor = (style: string) => {
    switch (style) {
      case 'formal': return 'text-blue-400';
      case 'informal': return 'text-green-400';
      case 'mixed': return 'text-purple-400';
      default: return 'text-gray-400';
    }
  };

  const networkActivityData = [
    { month: 'Jan', connections: 145, messages: 2340, collaborations: 18 },
    { month: 'Feb', connections: 167, messages: 2670, collaborations: 22 },
    { month: 'Mar', connections: 189, messages: 2890, collaborations: 25 },
    { month: 'Apr', connections: 178, messages: 2560, collaborations: 21 },
    { month: 'May', connections: 201, messages: 3120, collaborations: 28 },
    { month: 'Jun', connections: 223, messages: 3450, collaborations: 32 }
  ];

  const influenceDistribution = [
    { range: '90-100', count: 8, color: '#8b5cf6' },
    { range: '80-89', count: 12, color: '#3b82f6' },
    { range: '70-79', count: 15, color: '#10b981' },
    { range: '60-69', count: 18, color: '#f59e0b' },
    { range: 'Below 60', count: 7, color: '#ef4444' }
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
            <h1 className="text-3xl font-bold gradient-text">Tidal Wave Analytics</h1>
            <p className="text-gray-300">Social Network Mapping</p>
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

      {/* Network Health Score */}
      <div className="card p-6 border border-blue-500/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Network className="w-6 h-6 text-blue-400" />
            <div>
              <h2 className="text-xl font-semibold text-white">Network Health Score</h2>
              <p className="text-sm text-gray-400">Overall social network effectiveness</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-blue-400">{networkHealth.toFixed(1)}</div>
            <p className="text-sm text-gray-400">Health Score</p>
          </div>
        </div>
      </div>

      {/* Network Visualization */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <Globe className="w-5 h-5 mr-2 text-blue-400" />
          Social Network Map
        </h2>
        <div className="card p-6">
          <div className="relative h-96 bg-gray-800/50 rounded-lg overflow-hidden">
            {/* Network visualization placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Network className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                <p className="text-lg font-semibold text-white">Interactive Network Visualization</p>
                <p className="text-sm text-gray-400">Real-time social network connections and influence mapping</p>
              </div>
            </div>
            
            {/* Node representations */}
            {networkNodes.map((node, index) => (
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
                <div className={`p-3 rounded-full bg-blue-500/20 border-2 border-blue-400`}>
                  <Users className="w-6 h-6 text-blue-400" />
                </div>
                <div className="text-xs text-white mt-1 text-center">{node.name}</div>
              </div>
            ))}

            {/* Connection lines */}
            <svg className="absolute inset-0 pointer-events-none">
              {connections.map((connection) => {
                const sourceNode = networkNodes.find(n => n.id === connection.source);
                const targetNode = networkNodes.find(n => n.id === connection.target);
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
                    stroke="#3b82f6"
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
                <Users className="w-5 h-5 mr-2 text-blue-400" />
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
                <p className="text-sm text-gray-400">Role</p>
                <p className="text-lg font-bold text-white">{selectedNode.role}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Department</p>
                <p className="text-lg font-bold text-white">{selectedNode.department}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Influence Score</p>
                <p className="text-lg font-bold text-purple-400">{selectedNode.influence_score.toFixed(1)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Connections</p>
                <p className="text-lg font-bold text-white">{selectedNode.connection_count}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-400">Collaboration Index</p>
                <p className="text-lg font-bold text-green-400">{selectedNode.collaboration_index.toFixed(1)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Innovation Score</p>
                <p className="text-lg font-bold text-yellow-400">{selectedNode.innovation_score.toFixed(1)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Communication Style</p>
                <p className={`text-lg font-bold ${getCommunicationStyleColor(selectedNode.communication_style)}`}>
                  {selectedNode.communication_style.toUpperCase()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Digital Footprint</p>
                <p className="text-lg font-bold text-blue-400">{selectedNode.digital_footprint.messages_sent.toLocaleString()}</p>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-white mb-4">Digital Activity Metrics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Messages Sent</p>
                  <p className="text-lg font-bold text-white">{selectedNode.digital_footprint.messages_sent.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Meetings Attended</p>
                  <p className="text-lg font-bold text-white">{selectedNode.digital_footprint.meetings_attended}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Projects Collaborated</p>
                  <p className="text-lg font-bold text-white">{selectedNode.digital_footprint.projects_collaborated}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Knowledge Shared</p>
                  <p className="text-lg font-bold text-white">{selectedNode.digital_footprint.knowledge_shared}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
      )}

      {/* Network Insights */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <Brain className="w-5 h-5 mr-2 text-purple-400" />
          AI Network Insights
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

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-400">Severity</p>
                  <p className={`text-lg font-bold ${getSeverityColor(insight.severity)}`}>
                    {insight.severity.toUpperCase()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Potential Impact</p>
                  <p className={`text-lg font-bold ${insight.potential_impact > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {insight.potential_impact > 0 ? '+' : ''}{insight.potential_impact.toFixed(1)}%
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">Recommendation</p>
                <p className="text-sm text-blue-400">{insight.recommendation}</p>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-400">{insight.created_at.toLocaleDateString()}</p>
                <button className="btn-primary">
                  <Target className="w-4 h-4 mr-2" />
                  Apply Insight
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Network Metrics */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <BarChart3 className="w-5 h-5 mr-2 text-green-400" />
          Network Metrics
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {networkMetrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card p-4"
            >
              <div className="flex items-center gap-3 mb-2">
                <Activity className="w-5 h-5 text-green-400" />
                <p className="text-sm text-gray-400">{metric.category}</p>
              </div>
              <p className="text-2xl font-bold text-white">{metric.current_value.toFixed(1)}</p>
              <p className="text-xs text-gray-400">Target: {metric.target_value}</p>
              <div className="mt-2">
                <p className={`text-sm font-semibold ${
                  metric.trend === 'improving' ? 'text-green-400' :
                  metric.trend === 'stable' ? 'text-yellow-400' :
                  'text-red-400'
                }`}>
                  {metric.trend.toUpperCase()} {metric.change_percentage > 0 ? '+' : ''}{metric.change_percentage.toFixed(1)}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Analytics Dashboard */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Network Activity Trend */}
        <div className="card p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Network Activity Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={networkActivityData}>
              <defs>
                <linearGradient id="connectionsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
                </linearGradient>
                <linearGradient id="messagesGrad" x1="0" y1="0" x2="0" y2="1">
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
              <Area type="monotone" dataKey="connections" stroke="#3b82f6" fill="url(#connectionsGrad)" />
              <Line type="monotone" dataKey="messages" stroke="#10b981" strokeWidth={2} />
              <Line type="monotone" dataKey="collaborations" stroke="#f59e0b" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Influence Distribution */}
        <div className="card p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Influence Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={influenceDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="range" stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
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

      {/* Network Analysis Button */}
      <div className="card p-6 border border-purple-500/50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-white">Advanced Network Analysis</h3>
            <p className="text-sm text-gray-400">Run comprehensive AI-powered network analysis</p>
          </div>
          <button
            onClick={runNetworkAnalysis}
            disabled={isAnalyzing}
            className="btn-primary"
          >
            <Brain className="w-4 h-4 mr-2" />
            {isAnalyzing ? 'Analyzing...' : 'Start Analysis'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TidalWaveAnalytics;
