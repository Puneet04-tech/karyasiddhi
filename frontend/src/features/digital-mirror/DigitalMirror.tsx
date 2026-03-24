import React, { useState, useEffect, useRef } from 'react';
import { 
  Camera, Eye, Brain, Heart, Zap, TrendingUp, BarChart3,
  Target, Users, Activity, Clock, Settings, RefreshCw,
  AlertTriangle, CheckCircle, Star, Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import { useAuthStore } from '../../store/authStore';
import { useEnterpriseData } from '../../lib/useEnterpriseData';

interface SelfAwarenessMetric {
  id: string;
  name: string;
  category: 'performance' | 'wellness' | 'skills' | 'growth' | 'collaboration';
  current_value: number;
  target_value: number;
  trend: 'improving' | 'stable' | 'declining';
  insight: string;
  recommendations: string[];
  last_updated: Date;
}

interface DigitalTwinProfile {
  id: string;
  name: string;
  avatar: string;
  department: string;
  role: string;
  experience_level: number;
  skills: {
    technical: number;
    leadership: number;
    communication: number;
    innovation: number;
    problem_solving: number;
    collaboration: number;
  };
  performance_history: {
    date: Date;
    productivity: number;
    efficiency: number;
    quality: number;
    teamwork: number;
  }[];
  digital_footprint: {
    tasks_completed: number;
    hours_worked: number;
    meetings_attended: number;
    projects_led: number;
    innovations_submitted: number;
  };
}

interface ReflectionInsight {
  id: string;
  type: 'strength' | 'improvement' | 'opportunity' | 'pattern';
  title: string;
  description: string;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  actionable: boolean;
  created_at: Date;
}

interface GrowthPrediction {
  id: string;
  category: 'career' | 'skills' | 'performance' | 'leadership';
  timeframe: '3_months' | '6_months' | '1_year' | '3_years';
  prediction: string;
  probability: number;
  required_actions: string[];
  potential_outcome: string;
  confidence_interval: {
    lower: number;
    upper: number;
  };
}

const DigitalMirror = () => {
  const { user } = useAuthStore();
  const { data: mirrorData, loading: mirrorLoading } = useEnterpriseData('digital-mirror', user?.id);

  const [metrics, setMetrics] = useState<SelfAwarenessMetric[]>([]);
  const [digitalProfile, setDigitalProfile] = useState<DigitalTwinProfile | null>(null);
  const [insights, setInsights] = useState<ReflectionInsight[]>([]);
  const [predictions, setPredictions] = useState<GrowthPrediction[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selfAwarenessScore, setSelfAwarenessScore] = useState(87.3);
  const [activeReflection, setActiveReflection] = useState<string | null>(null);

  // Transform analytics data to mirror metrics and profile
  useEffect(() => {
    if (mirrorData) {
      const data = mirrorData
      
      const performanceScore = data?.performance_score || 0.7;
      const avgKpi = data?.avg_kpi || 0.75;
      
      // Create metrics from analytics
      const mockMetrics: SelfAwarenessMetric[] = [
        {
          id: '1',
          name: 'Performance Score',
          category: 'performance',
          current_value: Math.round(performanceScore * 100),
          target_value: 92,
          trend: performanceScore > 0.8 ? 'improving' : 'stable',
          insight: `Current performance at ${Math.round(performanceScore * 100)}% of target`,
          recommendations: [
            'Focus on high-impact tasks',
            'Maintain consistent delivery',
            'Leverage team collaboration'
          ],
          last_updated: new Date()
        },
        {
          id: '2',
          name: 'KPI Achievement',
          category: 'performance',
          current_value: Math.round(avgKpi * 100),
          target_value: 88,
          trend: avgKpi > 0.8 ? 'improving' : 'improving',
          insight: `KPI performance at ${Math.round(avgKpi * 100)}%`,
          recommendations: [
            'Monitor key metrics',
            'Quarterly reviews',
            'Continuous improvement'
          ],
          last_updated: new Date()
        },
        {
          id: '3',
          name: 'Team Collaboration',
          category: 'collaboration',
          current_value: Math.round((data?.team_size || 0) * 2),
          target_value: 90,
          trend: 'improving',
          insight: `Leading team of ${data?.team_size || 0} members`,
          recommendations: [
            'Strengthen team dynamics',
            'Cross-functional projects',
            'Team development programs'
          ],
          last_updated: new Date()
        }
      ];

      setMetrics(mockMetrics);
      setSelfAwarenessScore(Math.round(performanceScore * 100));

      // Create digital profile
      const mockProfile: DigitalTwinProfile = {
        id: user?.id || '1',
        name: user?.name || 'Employee',
        avatar: '👤',
        department: user?.department || 'Operations',
        role: 'Staff Member',
        experience_level: 5,
        skills: {
          technical: Math.round(performanceScore * 100),
          leadership: Math.round(avgKpi * 100),
          communication: Math.round(performanceScore * 95),
          innovation: Math.round(performanceScore * 85),
          problem_solving: Math.round(performanceScore * 90),
          collaboration: Math.round((data?.team_size || 0) > 0 ? 85 : 70)
        },
        performance_history: [
          {
            date: new Date(),
            productivity: Math.round(performanceScore * 100),
            efficiency: Math.round(avgKpi * 100),
            quality: Math.round(performanceScore * 95),
            teamwork: Math.round((data?.team_size || 0) > 0 ? 88 : 75)
          }
        ],
        digital_footprint: {
          tasks_completed: Math.floor(Math.random() * 1000) + 500,
          hours_worked: Math.floor(Math.random() * 2000) + 1000,
          meetings_attended: Math.floor(Math.random() * 300) + 100,
          projects_led: Math.floor((data?.team_size || 0) / 2),
          innovations_submitted: Math.floor(Math.random() * 20)
        }
      };

      setDigitalProfile(mockProfile);

      // Create insights based on analytics
      const mockInsights: ReflectionInsight[] = [
        {
          id: '1',
          type: 'strength',
          title: 'Strong Performance',
          description: `Maintaining ${Math.round(performanceScore * 100)}% performance`,
          confidence: Math.round(performanceScore * 100),
          impact: 'high',
          actionable: true,
          created_at: new Date()
        },
        {
          id: '2',
          type: 'opportunity',
          title: 'Growth Potential',
          description: 'Opportunity to expand team leadership role',
          confidence: 75,
          impact: 'high',
          actionable: true,
          created_at: new Date()
        }
      ];

      setInsights(mockInsights);

      // Create predictions
      const mockPredictions: GrowthPrediction[] = [
        {
          id: '1',
          category: 'performance',
          timeframe: '3_months',
          prediction: 'Performance improvement expected',
          probability: Math.round(performanceScore * 100),
          required_actions: ['Maintain focus', 'Continuous learning'],
          potential_outcome: 'Improved productivity metrics',
          confidence_interval: {
            lower: Math.round(performanceScore * 90),
            upper: Math.round(performanceScore * 110)
          }
        }
      ];

      setPredictions(mockPredictions);
    }
  }, [mirrorData, mirrorLoading]);

  const runDeepAnalysis = () => {
    setIsAnalyzing(true);
    setActiveReflection('comprehensive');

    setTimeout(() => {
      const newInsight: ReflectionInsight = {
        id: Date.now().toString(),
        type: 'opportunity',
        title: 'AI-Generated Insight',
        description: 'Advanced analysis reveals hidden potential for improvement',
        confidence: 93.7,
        impact: 'high',
        actionable: true,
        created_at: new Date()
      };

      setInsights(prev => [newInsight, ...prev.slice(0, 9)]);
      setIsAnalyzing(false);
      setActiveReflection(null);
    }, 3000);
  };

  const getMetricTrendColor = (trend: SelfAwarenessMetric['trend']) => {
    switch (trend) {
      case 'improving': return 'text-green-400';
      case 'stable': return 'text-yellow-400';
      case 'declining': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getInsightTypeColor = (type: ReflectionInsight['type']) => {
    switch (type) {
      case 'strength': return 'text-green-400 bg-green-500/20';
      case 'improvement': return 'text-yellow-400 bg-yellow-500/20';
      case 'opportunity': return 'text-blue-400 bg-blue-500/20';
      case 'pattern': return 'text-purple-400 bg-purple-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getImpactColor = (impact: ReflectionInsight['impact']) => {
    switch (impact) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const performanceTrendData = digitalProfile ? digitalProfile.performance_history.map(history => ({
    date: history.date.toLocaleDateString(),
    productivity: history.productivity,
    efficiency: history.efficiency,
    quality: history.quality,
    teamwork: history.teamwork
  })) : [];

  const skillsRadarData = digitalProfile ? [
    { skill: 'Technical', value: digitalProfile.skills.technical },
    { skill: 'Leadership', value: digitalProfile.skills.leadership },
    { skill: 'Communication', value: digitalProfile.skills.communication },
    { skill: 'Innovation', value: digitalProfile.skills.innovation },
    { skill: 'Problem Solving', value: digitalProfile.skills.problem_solving },
    { skill: 'Collaboration', value: digitalProfile.skills.collaboration }
  ] : [];

  const predictionConfidenceData = predictions.map(pred => ({
    category: pred.category,
    confidence: pred.probability,
    timeframe: pred.timeframe
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl box-shadow-glow" style={{
            background: 'linear-gradient(135deg, #3b82f630, #8b5cf630)'
          }}>
            <Camera className="w-8 h-8 text-blue-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold gradient-text">Digital Mirror</h1>
            <p className="text-gray-300">Real-time Self-Awareness</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 px-3 py-1 rounded-lg ${
            isAnalyzing ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-500/20 text-gray-400'
          }`}>
            <Brain className="w-4 h-4" />
            <span className="font-semibold">{isAnalyzing ? 'Analyzing' : 'Reflecting'}</span>
          </div>
          <button className="btn-secondary">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Self-Awareness Score */}
      <div className="card p-6 border border-blue-500/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Eye className="w-6 h-6 text-blue-400" />
            <div>
              <h2 className="text-xl font-semibold text-white">Self-Awareness Score</h2>
              <p className="text-sm text-gray-400">Overall self-reflection accuracy</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-blue-400">{selfAwarenessScore.toFixed(1)}</div>
            <p className="text-sm text-gray-400">Awareness Score</p>
          </div>
        </div>
      </div>

      {/* Digital Profile */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <Users className="w-5 h-5 mr-2 text-blue-400" />
          Digital Twin Profile
        </h2>
        {digitalProfile && (
          <div className="card p-6">
            <div className="flex items-center gap-6 mb-6">
              <div className="text-6xl">{digitalProfile.avatar}</div>
              <div>
                <h3 className="text-2xl font-bold text-white">{digitalProfile.name}</h3>
                <p className="text-gray-400">{digitalProfile.role}</p>
                <p className="text-sm text-gray-400">{(() => { const d = digitalProfile?.department as any; if (!d) return ''; return typeof d === 'object' ? d.name : d; })()}</p>
                <p className="text-sm text-blue-400">Level {digitalProfile.experience_level} Professional</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-400">Tasks Completed</p>
                <p className="text-lg font-bold text-white">{digitalProfile.digital_footprint.tasks_completed.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Hours Worked</p>
                <p className="text-lg font-bold text-white">{digitalProfile.digital_footprint.hours_worked.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Projects Led</p>
                <p className="text-lg font-bold text-white">{digitalProfile.digital_footprint.projects_led}</p>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-white mb-4">Skills Radar</h4>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={skillsRadarData}>
                  <PolarGrid stroke="#374151" />
                  <PolarAngleAxis dataKey="skill" stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
                  <Radar name="value" dataKey="skill" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>

      {/* Self-Awareness Metrics */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <BarChart3 className="w-5 h-5 mr-2 text-green-400" />
          Self-Awareness Metrics
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {metrics.map((metric) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              className="card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white">{metric.name}</h3>
                <div className={`text-sm font-semibold ${getMetricTrendColor(metric.trend)}`}>
                  {metric.trend.toUpperCase()}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-400">Current</p>
                  <p className="text-lg font-bold text-white">{metric.current_value.toFixed(1)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Target</p>
                  <p className="text-lg font-bold text-green-400">{metric.target_value}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">Progress</p>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-green-500"
                    style={{ width: `${(metric.current_value / metric.target_value) * 100}%` }}
                  />
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">AI Insight</p>
                <p className="text-sm text-blue-400">{metric.insight}</p>
              </div>

              <div>
                <p className="text-sm text-gray-400 mb-2">Recommendations</p>
                <div className="space-y-1">
                  {metric.recommendations.slice(0, 2).map((rec, index) => (
                    <div key={index} className="flex items-start gap-2 text-xs text-gray-300">
                      <Star className="w-3 h-3 text-yellow-400 mt-0.5" />
                      <span>{rec}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-xs text-gray-400">Updated: {metric.last_updated.toLocaleDateString()}</p>
                <button className="btn-secondary text-sm">
                  <Eye className="w-3 h-3 mr-1" />
                  Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* AI Reflection Insights */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <Brain className="w-5 h-5 mr-2 text-purple-400" />
          AI Reflection Insights
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
                    Take Action
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Growth Predictions */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-orange-400" />
          Growth Predictions
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {predictions.map((prediction) => (
            <motion.div
              key={prediction.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className="card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-white capitalize">{prediction.category}</h3>
                  <p className="text-sm text-gray-400">{prediction.timeframe.replace('_', ' ')}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-orange-400">{prediction.probability}%</p>
                  <p className="text-xs text-gray-400">probability</p>
                </div>
              </div>

              <p className="text-sm text-gray-300 mb-4">{prediction.prediction}</p>

              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">Confidence Interval</p>
                <div className="flex justify-between text-sm">
                  <span>Lower: {prediction.confidence_interval.lower}%</span>
                  <span>Upper: {prediction.confidence_interval.upper}%</span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">Required Actions</p>
                <div className="space-y-1">
                  {prediction.required_actions.map((action, index) => (
                    <div key={index} className="flex items-start gap-2 text-xs text-gray-300">
                      <CheckCircle className="w-3 h-3 text-green-400 mt-0.5" />
                      <span>{action}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">Potential Outcome</p>
                <p className="text-sm text-green-400">{prediction.potential_outcome}</p>
              </div>

              <div className="flex justify-between items-center">
                <button className="btn-secondary text-sm">
                  <Clock className="w-3 h-3 mr-1" />
                  Timeline
                </button>
                <button className="btn-primary text-sm">
                  <Target className="w-3 h-3 mr-1" />
                  Focus Path
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Performance Trend Chart */}
      <div className="card p-6">
        <h3 className="text-xl font-semibold text-white mb-6">Performance Trend Analysis</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={performanceTrendData}>
            <defs>
              <linearGradient id="productivityGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="efficiencyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
            <YAxis stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
            <Tooltip
              contentStyle={{ backgroundColor: '#0b1220', border: '1px solid #3b82f650', borderRadius: 8 }}
              labelStyle={{ color: '#f1f5f9' }}
            />
            <Area type="monotone" dataKey="productivity" stroke="#3b82f6" fill="url(#productivityGrad)" />
            <Line type="monotone" dataKey="efficiency" stroke="#10b981" strokeWidth={2} />
            <Line type="monotone" dataKey="quality" stroke="#f59e0b" strokeWidth={2} />
            <Line type="monotone" dataKey="teamwork" stroke="#8b5cf6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Deep Analysis Button */}
      <div className="card p-6 border border-purple-500/50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-white">Deep Self-Analysis</h3>
            <p className="text-sm text-gray-400">Run comprehensive AI-powered self-reflection</p>
          </div>
          <button
            onClick={runDeepAnalysis}
            disabled={isAnalyzing}
            className="btn-primary"
          >
            <Brain className="w-4 h-4 mr-2" />
            {isAnalyzing ? 'Analyzing...' : 'Start Deep Analysis'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DigitalMirror;
