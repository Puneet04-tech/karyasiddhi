import React, { useState, useEffect } from 'react';
import { Heart, Brain, Users, Activity, AlertTriangle, TrendingUp, Eye, Smile, Frown, Meh, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface EmotionalMetrics {
  empathy: number;
  stress: number;
  engagement: number;
  collaboration: number;
  communication: number;
  leadership: number;
  adaptability: number;
  resilience: number;
}

interface TeamEmotionData {
  timestamp: Date;
  teamHarmony: number;
  collectiveStress: number;
  motivationLevel: number;
  communicationQuality: number;
}

interface EmotionalAlert {
  id: string;
  type: 'stress_spike' | 'burnout_risk' | 'conflict_detected' | 'motivation_drop' | 'collaboration_decline';
  severity: 'low' | 'medium' | 'high' | 'critical';
  user?: string;
  team?: string;
  message: string;
  recommendation: string;
  timestamp: Date;
}

const EmpathyEngine = () => {
  const [currentMetrics, setCurrentMetrics] = useState<EmotionalMetrics>({
    empathy: 75,
    stress: 45,
    engagement: 82,
    collaboration: 78,
    communication: 70,
    leadership: 68,
    adaptability: 85,
    resilience: 72
  });

  const [teamEmotionHistory, setTeamEmotionHistory] = useState<TeamEmotionData[]>([]);
  const [alerts, setAlerts] = useState<EmotionalAlert[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState('day');

  useEffect(() => {
    generateTeamEmotionData();
    generateEmotionalAlerts();
    const interval = setInterval(() => {
      analyzeEmotionalPatterns();
    }, 30000); // Every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const generateTeamEmotionData = () => {
    const data: TeamEmotionData[] = [];
    const now = new Date();
    
    for (let i = 30; i >= 0; i--) {
      const timestamp = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      data.push({
        timestamp,
        teamHarmony: Math.floor(Math.random() * 30) + 60,
        collectiveStress: Math.floor(Math.random() * 40) + 30,
        motivationLevel: Math.floor(Math.random() * 25) + 65,
        communicationQuality: Math.floor(Math.random() * 35) + 55
      });
    }
    
    setTeamEmotionHistory(data);
  };

  const generateEmotionalAlerts = () => {
    const mockAlerts: EmotionalAlert[] = [
      {
        id: '1',
        type: 'stress_spike',
        severity: 'high',
        user: 'Rajesh Kumar',
        message: 'Elevated stress levels detected in work patterns',
        recommendation: 'Consider workload redistribution or stress management session',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
      },
      {
        id: '2',
        type: 'collaboration_decline',
        severity: 'medium',
        team: 'Development Team',
        message: 'Team collaboration metrics decreased by 15%',
        recommendation: 'Schedule team-building activities and review communication channels',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000)
      },
      {
        id: '3',
        type: 'burnout_risk',
        severity: 'critical',
        user: 'Priya Sharma',
        message: 'High burnout risk detected based on workload and stress patterns',
        recommendation: 'Immediate intervention required - consider temporary workload reduction',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000)
      }
    ];
    
    setAlerts(mockAlerts);
  };

  const analyzeEmotionalPatterns = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Update metrics with small variations
    setCurrentMetrics(prev => ({
      empathy: Math.max(0, Math.min(100, prev.empathy + (Math.random() - 0.5) * 5)),
      stress: Math.max(0, Math.min(100, prev.stress + (Math.random() - 0.5) * 8)),
      engagement: Math.max(0, Math.min(100, prev.engagement + (Math.random() - 0.5) * 3)),
      collaboration: Math.max(0, Math.min(100, prev.collaboration + (Math.random() - 0.5) * 4)),
      communication: Math.max(0, Math.min(100, prev.communication + (Math.random() - 0.5) * 6)),
      leadership: Math.max(0, Math.min(100, prev.leadership + (Math.random() - 0.5) * 5)),
      adaptability: Math.max(0, Math.min(100, prev.adaptability + (Math.random() - 0.5) * 4)),
      resilience: Math.max(0, Math.min(100, prev.resilience + (Math.random() - 0.5) * 3))
    }));
    
    setIsAnalyzing(false);
  };

  const getEmotionalState = (value: number) => {
    if (value >= 80) return { icon: Smile, color: 'text-green-400', label: 'Excellent' };
    if (value >= 60) return { icon: Meh, color: 'text-yellow-400', label: 'Good' };
    if (value >= 40) return { icon: Frown, color: 'text-orange-400', label: 'Fair' };
    return { icon: AlertTriangle, color: 'text-red-400', label: 'Needs Attention' };
  };

  const getAlertColor = (severity: EmotionalAlert['severity']) => {
    switch (severity) {
      case 'critical': return 'border-red-500 bg-red-500/10';
      case 'high': return 'border-orange-500 bg-orange-500/10';
      case 'medium': return 'border-yellow-500 bg-yellow-500/10';
      case 'low': return 'border-blue-500 bg-blue-500/10';
      default: return 'border-gray-500 bg-gray-500/10';
    }
  };

  const radarData = Object.entries(currentMetrics).map(([key, value]) => ({
    metric: key.charAt(0).toUpperCase() + key.slice(1),
    value,
    fullMark: 100
  }));

  const teamChartData = teamEmotionHistory.map(data => ({
    date: data.timestamp.toLocaleDateString(),
    harmony: data.teamHarmony,
    stress: data.collectiveStress,
    motivation: data.motivationLevel,
    communication: data.communicationQuality
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-pink-500/30 to-red-500/30 rounded-2xl box-shadow-glow">
            <Heart className="w-8 h-8 text-pink-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold gradient-text">Empathy Engine</h1>
            <p className="text-gray-400">Emotional Intelligence Analytics</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="input-field"
          >
            <option value="day">Last 24 Hours</option>
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
          </select>
          <button
            onClick={analyzeEmotionalPatterns}
            disabled={isAnalyzing}
            className="btn-primary"
          >
            {isAnalyzing ? (
              <>
                <Brain className="w-4 h-4 mr-2 animate-pulse" />
                Analyzing...
              </>
            ) : (
              <>
                <Activity className="w-4 h-4 mr-2" />
                Analyze Patterns
              </>
            )}
          </button>
        </div>
      </div>

      {/* Current Emotional Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(currentMetrics).map(([key, value]) => {
          const state = getEmotionalState(value);
          const Icon = state.icon;
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400 capitalize">{key}</span>
                <Icon className={`w-4 h-4 ${state.color}`} />
              </div>
              <div className="text-2xl font-bold text-white mb-1">{value}%</div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    value >= 80 ? 'bg-green-500' :
                    value >= 60 ? 'bg-yellow-500' :
                    value >= 40 ? 'bg-orange-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${value}%` }}
                />
              </div>
              <span className={`text-xs ${state.color}`}>{state.label}</span>
            </motion.div>
          );
        })}
      </div>

      {/* Emotional Insights Dashboard */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Emotional Radar Chart */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
            <Brain className="w-5 h-5 mr-2 text-purple-400" />
            Emotional Intelligence Profile
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#374151" />
              <PolarAngleAxis dataKey="metric" stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#374151" tick={{ fill: '#6b7280' }} />
              <Radar
                name="Current"
                dataKey="value"
                stroke="#ec4899"
                fill="#ec4899"
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Tooltip
                contentStyle={{ backgroundColor: '#0b1220', border: '1px solid #111827', borderRadius: 8 }}
                labelStyle={{ color: '#f1f5f9' }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Team Emotion Trends */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-blue-400" />
            Team Emotional Trends
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={teamChartData}>
              <defs>
                <linearGradient id="harmonyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.1" />
                </linearGradient>
                <linearGradient id="stressGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#0f172a" />
              <XAxis dataKey="date" stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
              <YAxis stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0b1220', border: '1px solid #111827', borderRadius: 8 }}
                labelStyle={{ color: '#f1f5f9' }}
              />
              <Area type="monotone" dataKey="harmony" stroke="#10b981" fill="url(#harmonyGrad)" />
              <Area type="monotone" dataKey="stress" stroke="#ef4444" fill="url(#stressGrad)" />
              <Line type="monotone" dataKey="motivation" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="communication" stroke="#8b5cf6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Emotional Alerts */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-orange-400" />
            Emotional Intelligence Alerts
          </h2>
          <span className="text-sm text-gray-400">{alerts.length} active alerts</span>
        </div>

        <AnimatePresence>
          {alerts.map((alert) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`card p-6 border ${getAlertColor(alert.severity)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-2 h-2 rounded-full ${
                      alert.severity === 'critical' ? 'bg-red-500' :
                      alert.severity === 'high' ? 'bg-orange-500' :
                      alert.severity === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                    } animate-pulse`} />
                    <div>
                      <h3 className="font-semibold text-white capitalize">
                        {alert.type.replace('_', ' ')}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {alert.user ? `${alert.user} • ${alert.timestamp.toLocaleTimeString()}` : 
                         alert.team ? `${alert.team} • ${alert.timestamp.toLocaleTimeString()}` :
                         alert.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-3">{alert.message}</p>
                  <div className="p-3 bg-gray-800/50 rounded-lg">
                    <p className="text-sm text-gray-400 mb-1">💡 Recommendation:</p>
                    <p className="text-sm text-gray-300">{alert.recommendation}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <span className={`px-2 py-1 text-xs rounded capitalize ${
                    alert.severity === 'critical' ? 'bg-red-500/20 text-red-400' :
                    alert.severity === 'high' ? 'bg-orange-500/20 text-orange-400' :
                    alert.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {alert.severity}
                  </span>
                  <button className="btn-secondary text-sm">
                    <Eye className="w-3 h-3 mr-1" />
                    Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* AI Insights */}
      <div className="card p-6 border border-purple-500/50">
        <div className="flex items-center gap-3 mb-4">
          <Brain className="w-6 h-6 text-purple-400 animate-pulse" />
          <h2 className="text-xl font-semibold text-white">AI Emotional Insights</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-purple-500/10 rounded-lg">
            <h3 className="font-semibold text-purple-400 mb-2">Pattern Recognition</h3>
            <p className="text-sm text-gray-300">
              Team stress levels peak on Tuesdays and Thursdays. Consider redistributing workload across the week.
            </p>
          </div>
          <div className="p-4 bg-blue-500/10 rounded-lg">
            <h3 className="font-semibold text-blue-400 mb-2">Empathy Hotspot</h3>
            <p className="text-sm text-gray-300">
              Development team shows 23% higher empathy scores. Best practices can be shared with other departments.
            </p>
          </div>
          <div className="p-4 bg-green-500/10 rounded-lg">
            <h3 className="font-semibold text-green-400 mb-2">Improvement Opportunity</h3>
            <p className="text-sm text-gray-300">
              Communication quality improves by 35% after team lunch sessions. Schedule more collaborative breaks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpathyEngine;
