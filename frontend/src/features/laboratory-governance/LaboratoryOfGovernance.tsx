import React, { useState, useEffect, useRef } from 'react';
import { 
  FlaskConical, Beaker, TestTube, BarChart3, TrendingUp, Target,
  Users, Activity, Clock, Settings, RefreshCw, Play, Pause,
  CheckCircle, AlertTriangle, Zap, Eye, Brain, Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface Experiment {
  id: string;
  title: string;
  description: string;
  hypothesis: string;
  type: 'ui' | 'process' | 'policy' | 'feature' | 'workflow';
  status: 'planning' | 'running' | 'completed' | 'failed' | 'analyzing';
  variants: {
    id: string;
    name: string;
    description: string;
    traffic_percentage: number;
    conversion_rate: number;
    engagement_score: number;
    user_satisfaction: number;
  }[];
  metrics: {
    sample_size: number;
    confidence_level: number;
    statistical_significance: number;
    effect_size: number;
    duration: number;
  };
  results?: {
    winning_variant: string;
    improvement_percentage: number;
    confidence_interval: {
      lower: number;
      upper: number;
    };
    recommendation: string;
  };
  created_at: Date;
  completed_at?: Date;
}

interface ExperimentTemplate {
  id: string;
  name: string;
  category: 'productivity' | 'engagement' | 'satisfaction' | 'efficiency';
  description: string;
  hypothesis_template: string;
  metrics_to_track: string[];
  estimated_duration: number;
  sample_size_required: number;
}

interface ATestInsight {
  id: string;
  title: string;
  description: string;
  type: 'pattern' | 'anomaly' | 'opportunity' | 'trend';
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  actionable: boolean;
  created_at: Date;
}

const LaboratoryOfGovernance = () => {
  const [experiments, setExperiments] = useState<Experiment[]>([]);
  const [templates, setTemplates] = useState<ExperimentTemplate[]>([]);
  const [insights, setInsights] = useState<ATestInsight[]>([]);
  const [activeExperiment, setActiveExperiment] = useState<Experiment | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [overallSuccessRate, setOverallSuccessRate] = useState(73.4);

  useEffect(() => {
    generateExperiments();
    generateTemplates();
    generateInsights();
    const interval = setInterval(updateExperimentData, 30000);
    return () => clearInterval(interval);
  }, []);

  const generateExperiments = () => {
    const mockExperiments: Experiment[] = [
      {
        id: '1',
        title: 'Dashboard Layout Optimization',
        description: 'Test different dashboard layouts for improved user engagement',
        hypothesis: 'Simplified dashboard layout will increase task completion rate by 15%',
        type: 'ui',
        status: 'completed',
        variants: [
          {
            id: 'control',
            name: 'Current Layout',
            description: 'Existing multi-panel dashboard with all features visible',
            traffic_percentage: 50,
            conversion_rate: 67.3,
            engagement_score: 72.1,
            user_satisfaction: 68.9
          },
          {
            id: 'simplified',
            name: 'Simplified Layout',
            description: 'Clean, minimal layout with essential features only',
            traffic_percentage: 50,
            conversion_rate: 78.5,
            engagement_score: 85.2,
            user_satisfaction: 81.7
          }
        ],
        metrics: {
          sample_size: 5000,
          confidence_level: 95,
          statistical_significance: 0.82,
          effect_size: 0.23,
          duration: 14 * 24 * 60 * 60 * 1000
        },
        results: {
          winning_variant: 'simplified',
          improvement_percentage: 16.6,
          confidence_interval: { lower: 12.3, upper: 20.9 },
          recommendation: 'Implement simplified layout across all departments'
        },
        created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        completed_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      },
      {
        id: '2',
        title: 'Task Assignment Algorithm',
        description: 'Compare AI-powered vs manual task assignment methods',
        hypothesis: 'AI-assigned tasks will show 20% higher completion rates',
        type: 'process',
        status: 'running',
        variants: [
          {
            id: 'manual',
            name: 'Manual Assignment',
            description: 'Traditional manager-led task assignment',
            traffic_percentage: 50,
            conversion_rate: 71.2,
            engagement_score: 74.3,
            user_satisfaction: 76.1
          },
          {
            id: 'ai',
            name: 'AI Assignment',
            description: 'Machine learning optimized task distribution',
            traffic_percentage: 50,
            conversion_rate: 84.7,
            engagement_score: 82.9,
            user_satisfaction: 79.3
          }
        ],
        metrics: {
          sample_size: 3000,
          confidence_level: 90,
          statistical_significance: 0.76,
          effect_size: 0.31,
          duration: 21 * 24 * 60 * 60 * 1000
        },
        created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
      },
      {
        id: '3',
        title: 'Notification Frequency Test',
        description: 'Optimize notification timing and frequency for user engagement',
        hypothesis: 'Personalized notification timing will reduce task completion time by 10%',
        type: 'feature',
        status: 'analyzing',
        variants: [
          {
            id: 'current',
            name: 'Current Notifications',
            description: 'Standard notification schedule and frequency',
            traffic_percentage: 50,
            conversion_rate: 69.4,
            engagement_score: 71.2,
            user_satisfaction: 73.8
          },
          {
            id: 'personalized',
            name: 'Personalized Notifications',
            description: 'AI-optimized notification timing based on user patterns',
            traffic_percentage: 50,
            conversion_rate: 76.1,
            engagement_score: 79.4,
            user_satisfaction: 81.2
          }
        ],
        metrics: {
          sample_size: 4000,
          confidence_level: 92,
          statistical_significance: 0.68,
          effect_size: 0.18,
          duration: 7 * 24 * 60 * 60 * 1000
        },
        created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
      },
      {
        id: '4',
        title: 'Meeting Scheduling Approach',
        description: 'Test different meeting scheduling strategies for productivity',
        hypothesis: 'Flexible scheduling will improve meeting effectiveness by 25%',
        type: 'workflow',
        status: 'planning',
        variants: [
          {
            id: 'fixed',
            name: 'Fixed Schedule',
            description: 'Traditional weekly recurring meetings',
            traffic_percentage: 50,
            conversion_rate: 64.2,
            engagement_score: 67.8,
            user_satisfaction: 71.3
          },
          {
            id: 'flexible',
            name: 'Flexible Schedule',
            description: 'Dynamic meeting scheduling based on project needs',
            traffic_percentage: 50,
            conversion_rate: 78.9,
            engagement_score: 83.4,
            user_satisfaction: 86.7
          }
        ],
        metrics: {
          sample_size: 2500,
          confidence_level: 88,
          statistical_significance: 0.71,
          effect_size: 0.27,
          duration: 28 * 24 * 60 * 60 * 1000
        },
        created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
      }
    ];

    setExperiments(mockExperiments);
  };

  const generateTemplates = () => {
    const mockTemplates: ExperimentTemplate[] = [
      {
        id: '1',
        name: 'Productivity Boost Template',
        category: 'productivity',
        description: 'Test productivity enhancement strategies',
        hypothesis_template: 'Implementing [VARIANT] will improve productivity by [METRIC]%',
        metrics_to_track: ['Task completion rate', 'Time to completion', 'Error rate', 'User satisfaction'],
        estimated_duration: 14,
        sample_size_required: 1000
      },
      {
        id: '2',
        name: 'User Engagement Template',
        category: 'engagement',
        description: 'Optimize user engagement and interaction',
        hypothesis_template: '[VARIANT] approach will increase engagement by [METRIC]%',
        metrics_to_track: ['Daily active users', 'Session duration', 'Feature adoption', 'Return rate'],
        estimated_duration: 21,
        sample_size_required: 2000
      },
      {
        id: '3',
        name: 'Satisfaction Improvement Template',
        category: 'satisfaction',
        description: 'Test user satisfaction enhancement strategies',
        hypothesis_template: '[VARIANT] will improve satisfaction scores by [METRIC] points',
        metrics_to_track: ['Satisfaction score', 'Net Promoter Score', 'Support tickets', 'User feedback'],
        estimated_duration: 28,
        sample_size_required: 1500
      },
      {
        id: '4',
        name: 'Efficiency Optimization Template',
        category: 'efficiency',
        description: 'Test process efficiency improvements',
        hypothesis_template: '[VARIANT] will reduce process time by [METRIC]%',
        metrics_to_track: ['Process time', 'Resource utilization', 'Error reduction', 'Cost savings'],
        estimated_duration: 35,
        sample_size_required: 3000
      }
    ];

    setTemplates(mockTemplates);
  };

  const generateInsights = () => {
    const mockInsights: ATestInsight[] = [
      {
        id: '1',
        title: 'UI Simplification Pattern',
        description: 'Experiments consistently show 15-20% improvement with simplified interfaces',
        type: 'pattern',
        confidence: 89.2,
        impact: 'high',
        actionable: true,
        created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000)
      },
      {
        id: '2',
        title: 'AI Assistance Anomaly',
        description: 'AI-assisted processes showing unusually high success rates',
        type: 'anomaly',
        confidence: 84.7,
        impact: 'medium',
        actionable: true,
        created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      },
      {
        id: '3',
        title: 'Personalization Opportunity',
        description: 'Personalized features consistently outperform generic ones',
        type: 'opportunity',
        confidence: 91.3,
        impact: 'high',
        actionable: true,
        created_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000)
      },
      {
        id: '4',
        title: 'Mobile vs Desktop Trend',
        description: 'Mobile users showing 25% higher engagement than desktop users',
        type: 'trend',
        confidence: 87.8,
        impact: 'medium',
        actionable: true,
        created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      }
    ];

    setInsights(mockInsights);
  };

  const updateExperimentData = () => {
    setExperiments(prev => prev.map(experiment => {
      if (experiment.status === 'running') {
        return {
          ...experiment,
          variants: experiment.variants.map(variant => ({
            ...variant,
            conversion_rate: Math.max(0, Math.min(100, variant.conversion_rate + (Math.random() - 0.5) * 3)),
            engagement_score: Math.max(0, Math.min(100, variant.engagement_score + (Math.random() - 0.5) * 2))
          }))
        };
      }
      return experiment;
    }));

    setOverallSuccessRate(prev => Math.min(99, prev + (Math.random() - 0.5) * 2));
  };

  const startExperiment = (experiment: Experiment) => {
    setActiveExperiment(experiment);
    setIsRunning(true);

    setTimeout(() => {
      setExperiments(prev => prev.map(e => 
        e.id === experiment.id 
          ? { ...e, status: 'running' as const }
          : e
      ));
    }, 1000);
  };

  const getExperimentStatusColor = (status: Experiment['status']) => {
    switch (status) {
      case 'planning': return 'text-gray-400 bg-gray-500/20';
      case 'running': return 'text-blue-400 bg-blue-500/20';
      case 'completed': return 'text-green-400 bg-green-500/20';
      case 'failed': return 'text-red-400 bg-red-500/20';
      case 'analyzing': return 'text-yellow-400 bg-yellow-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getInsightTypeColor = (type: ATestInsight['type']) => {
    switch (type) {
      case 'pattern': return 'text-blue-400 bg-blue-500/20';
      case 'anomaly': return 'text-orange-400 bg-orange-500/20';
      case 'opportunity': return 'text-green-400 bg-green-500/20';
      case 'trend': return 'text-purple-400 bg-purple-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getImpactColor = (impact: ATestInsight['impact']) => {
    switch (impact) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const experimentTypeData = [
    { type: 'UI Tests', count: 45, successRate: 78.3 },
    { type: 'Process Tests', count: 32, successRate: 82.1 },
    { type: 'Feature Tests', count: 28, successRate: 71.6 },
    { type: 'Workflow Tests', count: 19, successRate: 69.4 }
  ];

  const performanceTrendData = [
    { month: 'Jan', experiments: 8, successRate: 71.2, improvements: 2.3 },
    { month: 'Feb', experiments: 12, successRate: 74.8, improvements: 3.1 },
    { month: 'Mar', experiments: 15, successRate: 78.3, improvements: 4.2 },
    { month: 'Apr', experiments: 18, successRate: 76.9, improvements: 3.8 },
    { month: 'May', experiments: 22, successRate: 79.4, improvements: 5.1 },
    { month: 'Jun', experiments: 25, successRate: 81.2, improvements: 6.3 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl box-shadow-glow" style={{
            background: 'linear-gradient(135deg, #3b82f630, #10b98130)'
          }}>
            <FlaskConical className="w-8 h-8 text-blue-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold gradient-text">Laboratory of Governance</h1>
            <p className="text-gray-300">A/B Testing Platform</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 px-3 py-1 rounded-lg ${
            isRunning ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-500/20 text-gray-400'
          }`}>
            <TestTube className="w-4 h-4" />
            <span className="font-semibold">{isRunning ? 'Testing' : 'Ready'}</span>
          </div>
          <button className="btn-secondary">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Overall Success Rate */}
      <div className="card p-6 border border-green-500/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-6 h-6 text-green-400" />
            <div>
              <h2 className="text-xl font-semibold text-white">A/B Testing Success Rate</h2>
              <p className="text-sm text-gray-400">Overall experiment effectiveness</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-green-400">{overallSuccessRate.toFixed(1)}%</div>
            <p className="text-sm text-gray-400">Success Rate</p>
          </div>
        </div>
      </div>

      {/* Active Experiments */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <Beaker className="w-5 h-5 mr-2 text-blue-400" />
          Active Experiments
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {experiments.map((experiment) => (
            <motion.div
              key={experiment.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              className="card p-6 cursor-pointer hover:border-blue-500/50"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-white">{experiment.title}</h3>
                  <p className="text-sm text-gray-400 capitalize">{experiment.type}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded ${getExperimentStatusColor(experiment.status)}`}>
                  {experiment.status}
                </span>
              </div>

              <p className="text-sm text-gray-300 mb-4">{experiment.description}</p>

              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">Hypothesis</p>
                <p className="text-sm text-blue-400">{experiment.hypothesis}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-400">Sample Size</p>
                  <p className="text-lg font-bold text-white">{experiment.metrics.sample_size.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Confidence</p>
                  <p className="text-lg font-bold text-green-400">{experiment.metrics.confidence_level}%</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">Variants Performance</p>
                <div className="space-y-2">
                  {experiment.variants.map((variant, index) => (
                    <div key={variant.id} className="p-3 bg-gray-800/50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-semibold text-white">{variant.name}</span>
                        {experiment.results && experiment.results.winning_variant === variant.id && (
                          <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">
                            WINNER
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <p className="text-gray-400">Traffic: {variant.traffic_percentage}%</p>
                          <p className="text-gray-400">Conversion: {variant.conversion_rate}%</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Engagement: {variant.engagement_score}</p>
                          <p className="text-gray-400">Satisfaction: {variant.user_satisfaction}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {experiment.results && (
                <div className="mb-4 p-3 bg-green-500/20 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Results</h4>
                  <div className="grid grid-cols-2 gap-4 mb-2">
                    <div>
                      <p className="text-sm text-gray-400">Winning Variant</p>
                      <p className="text-lg font-bold text-green-400">{experiment.results.winning_variant}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Improvement</p>
                      <p className="text-lg font-bold text-green-400">+{experiment.results.improvement_percentage}%</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">Confidence Interval</p>
                  <div className="flex justify-between text-sm">
                    <span>Lower: {experiment.results.confidence_interval.lower}%</span>
                    <span>Upper: {experiment.results.confidence_interval.upper}%</span>
                  </div>
                  <p className="text-sm text-blue-400 mt-2">{experiment.results.recommendation}</p>
                </div>
              )}

              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-400">
                  <p>Created: {experiment.created_at.toLocaleDateString()}</p>
                  {experiment.completed_at && <p>Completed: {experiment.completed_at.toLocaleDateString()}</p>}
                </div>
                <button
                  onClick={() => startExperiment(experiment)}
                  disabled={experiment.status !== 'planning'}
                  className="btn-primary"
                >
                  {experiment.status === 'running' ? (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Monitor
                    </>
                  ) : (
                    <>
                      <FlaskConical className="w-4 h-4 mr-2" />
                      Start Experiment
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Experiment Templates */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <Target className="w-5 h-5 mr-2 text-green-400" />
          Experiment Templates
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {templates.map((template) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className="card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white">{template.name}</h3>
                <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">
                  {template.category.toUpperCase()}
                </span>
              </div>

              <p className="text-sm text-gray-300 mb-4">{template.description}</p>

              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">Hypothesis Template</p>
                <p className="text-sm text-blue-400 font-mono">{template.hypothesis_template}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-400">Duration</p>
                  <p className="text-lg font-bold text-white">{template.estimated_duration} days</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Sample Size</p>
                  <p className="text-lg font-bold text-white">{template.sample_size_required.toLocaleString()}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">Metrics to Track</p>
                <div className="flex flex-wrap gap-2">
                  {template.metrics_to_track.map((metric, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">
                      {metric}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <button className="btn-secondary text-sm">
                  <Eye className="w-3 h-3 mr-1" />
                  Preview
                </button>
                <button className="btn-primary">
                  <FlaskConical className="w-4 h-4 mr-2" />
                  Use Template
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Testing Insights */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <Brain className="w-5 h-5 mr-2 text-purple-400" />
          AI Testing Insights
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
                  <p className="text-sm text-gray-400">Impact</p>
                  <p className={`text-lg font-bold ${getImpactColor(insight.impact)}`}>
                    {insight.impact.toUpperCase()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Actionable</p>
                  <p className={`text-lg font-bold ${insight.actionable ? 'text-green-400' : 'text-gray-400'}`}>
                    {insight.actionable ? 'YES' : 'NO'}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-400">{insight.created_at.toLocaleDateString()}</p>
                {insight.actionable && (
                  <button className="btn-primary text-sm">
                    <Target className="w-3 h-3 mr-1" />
                    Apply Insight
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Analytics Dashboard */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Experiment Type Distribution */}
        <div className="card p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Experiment Type Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={experimentTypeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="type" stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
              <YAxis stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0b1220', border: '1px solid #3b82f650', borderRadius: 8 }}
                labelStyle={{ color: '#f1f5f9' }}
              />
              <Bar dataKey="count" fill="#3b82f6" />
              <Bar dataKey="successRate" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Trend */}
        <div className="card p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Testing Performance Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={performanceTrendData}>
              <defs>
                <linearGradient id="successGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.1" />
                </linearGradient>
                <linearGradient id="improvementGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
              <YAxis stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0b1220', border: '1px solid #3b82f650', borderRadius: 8 }}
                labelStyle={{ color: '#f1f5f9' }}
              />
              <Area type="monotone" dataKey="successRate" stroke="#10b981" fill="url(#successGrad)" />
              <Line type="monotone" dataKey="improvements" stroke="#f59e0b" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Create New Experiment */}
      <div className="card p-6 border border-blue-500/50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-white">Create New Experiment</h3>
            <p className="text-sm text-gray-400">Start a new A/B test using AI-powered insights</p>
          </div>
          <button className="btn-primary">
            <FlaskConical className="w-4 h-4 mr-2" />
            Design Experiment
          </button>
        </div>
      </div>
    </div>
  );
};

export default LaboratoryOfGovernance;
