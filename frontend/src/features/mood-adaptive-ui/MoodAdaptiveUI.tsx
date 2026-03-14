import React, { useState, useEffect } from 'react';
import {
  Smile, Heart, Zap, Brain, TrendingUp, Settings,
  RefreshCw, Users, Activity, BarChart3, PieChart as PieIcon,
  Gauge, AlertCircle, CheckCircle, Frown, Meh
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';

interface MoodData {
  timestamp: string;
  sentiment: number;
  engagement: number;
  stress_level: number;
  productivity: number;
}

interface DepartmentMood {
  name: string;
  sentiment: number;
  engagement: number;
  satisfaction: number;
  stress: number;
}

interface EmotionalTrend {
  emotion: string;
  score: number;
  color: string;
  count: number;
}

const MoodAdaptiveUI: React.FC = () => {
  const [moodData, setMoodData] = useState<MoodData[]>([]);
  const [deptMoods, setDeptMoods] = useState<DepartmentMood[]>([]);
  const [emotionalTrends, setEmotionalTrends] = useState<EmotionalTrend[]>([]);
  const [currentMood, setCurrentMood] = useState('positive');
  const [orgSentiment, setOrgSentiment] = useState(72.3);
  const [selectedDept, setSelectedDept] = useState<DepartmentMood | null>(null);

  useEffect(() => {
    generateMoodData();
    generateDeptMoods();
    generateEmotionalTrends();
  }, []);

  const generateMoodData = () => {
    const data: MoodData[] = Array.from({ length: 12 }, (_, i) => ({
      timestamp: new Date(Date.now() - (11 - i) * 2 * 60 * 60 * 1000).toLocaleTimeString().slice(0, 5),
      sentiment: 60 + Math.random() * 30,
      engagement: 55 + Math.random() * 35,
      stress_level: 30 + Math.random() * 25,
      productivity: 65 + Math.random() * 25
    }));
    setMoodData(data);
  };

  const generateDeptMoods = () => {
    const depts: DepartmentMood[] = [
      { name: 'IT', sentiment: 78.5, engagement: 81.2, satisfaction: 76.8, stress: 25.3 },
      { name: 'DSD', sentiment: 72.1, engagement: 74.3, satisfaction: 70.5, stress: 32.1 },
      { name: 'EGU', sentiment: 68.9, engagement: 65.7, satisfaction: 64.2, stress: 38.5 },
      { name: 'R&D', sentiment: 82.4, engagement: 85.1, satisfaction: 80.9, stress: 20.1 },
      { name: 'Operations', sentiment: 71.3, engagement: 72.5, satisfaction: 69.7, stress: 35.2 }
    ];
    setDeptMoods(depts);
    if (depts.length > 0) setSelectedDept(depts[0]);
  };

  const generateEmotionalTrends = () => {
    const trends: EmotionalTrend[] = [
      { emotion: 'Positive', score: 72, color: '#10b981', count: 234 },
      { emotion: 'Neutral', score: 18, color: '#f59e0b', count: 89 },
      { emotion: 'Stressed', score: 7, color: '#ef4444', count: 42 },
      { emotion: 'Motivated', score: 3, color: '#3b82f6', count: 28 }
    ];
    setEmotionalTrends(trends);
  };

  const getMoodIcon = (sentiment: number) => {
    if (sentiment > 75) return <Smile className="w-6 h-6 text-green-400" />;
    if (sentiment > 50) return <Meh className="w-6 h-6 text-yellow-400" />;
    return <Frown className="w-6 h-6 text-red-400" />;
  };

  const emotionPieData = emotionalTrends.map(t => ({ name: t.emotion, value: t.count, color: t.color }));

  const getAdaptiveTheme = (sentiment: number) => {
    if (sentiment > 75) return { bg: 'from-green-500/10 to-emerald-500/10', border: 'border-green-500/50', text: 'text-green-400' };
    if (sentiment > 50) return { bg: 'from-yellow-500/10 to-amber-500/10', border: 'border-yellow-500/50', text: 'text-yellow-400' };
    return { bg: 'from-red-500/10 to-orange-500/10', border: 'border-red-500/50', text: 'text-red-400' };
  };

  const theme = getAdaptiveTheme(orgSentiment);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-pink-500/20">
            <Heart className="w-8 h-8 text-pink-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold gradient-text">Mood Adaptive UI</h1>
            <p className="text-gray-400">Organizational Sentiment & Emotional Intelligence</p>
          </div>
        </div>
        <button className="btn-secondary">
          <Settings className="w-4 h-4" />
        </button>
      </div>

      {/* Organizational Sentiment */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`card p-6 bg-gradient-to-r ${theme.bg} border ${theme.border}`}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Organizational Sentiment Score</p>
            <h2 className={`text-5xl font-bold mt-2 ${theme.text}`}>{orgSentiment.toFixed(1)}</h2>
            <p className="text-gray-400 text-sm mt-2">Based on {emotionalTrends.reduce((sum, e) => sum + e.count, 0)} responses</p>
          </div>
          <div className="flex flex-col items-center">
            {getMoodIcon(orgSentiment)}
            <p className="text-sm text-gray-400 mt-2">Overall Mood</p>
          </div>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Avg Engagement</span>
            <Activity className="w-5 h-5 text-blue-400" />
          </div>
          <p className="text-3xl font-bold text-white">{(deptMoods.reduce((s, d) => s + d.engagement, 0) / deptMoods.length).toFixed(0)}%</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Satisfaction</span>
            <Smile className="w-5 h-5 text-green-400" />
          </div>
          <p className="text-3xl font-bold text-white">{(deptMoods.reduce((s, d) => s + d.satisfaction, 0) / deptMoods.length).toFixed(0)}%</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Avg Stress Level</span>
            <AlertCircle className="w-5 h-5 text-red-400" />
          </div>
          <p className="text-3xl font-bold text-white">{(deptMoods.reduce((s, d) => s + d.stress, 0) / deptMoods.length).toFixed(0)}%</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Departments</span>
            <Users className="w-5 h-5 text-purple-400" />
          </div>
          <p className="text-3xl font-bold text-white">{deptMoods.length}</p>
        </motion.div>
      </div>

      {/* Sentiment Over Time */}
      <div className="card p-6">
        <h3 className="text-xl font-semibold text-white mb-6">Sentiment & Engagement Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={moodData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="timestamp" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #ec4899' }} />
            <Legend />
            <Line type="monotone" dataKey="sentiment" stroke="#10b981" strokeWidth={2} name="Sentiment" />
            <Line type="monotone" dataKey="engagement" stroke="#3b82f6" strokeWidth={2} name="Engagement" />
            <Line type="monotone" dataKey="stress_level" stroke="#ef4444" strokeWidth={2} name="Stress" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Emotional Distribution */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="card p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Emotional Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={emotionPieData} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value}`} outerRadius={100} fill="#8884d8" dataKey="value">
                {emotionPieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Emotions List */}
        <div className="card p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Emotion Breakdown</h3>
          <div className="space-y-4">
            {emotionalTrends.map((trend) => (
              <div key={trend.emotion} className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: trend.color }} />
                  <span className="font-semibold text-white">{trend.emotion}</span>
                </div>
                <div className="text-right">
                  <p className="font-bold text-white">{trend.count}</p>
                  <p className="text-xs text-gray-400">{trend.score}% of responses</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Department Sentiment */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <Brain className="w-5 h-5 mr-2 text-pink-400" />
          Department Emotional State
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-3">
          {deptMoods.map((dept) => (
            <motion.div
              key={dept.name}
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedDept(dept)}
              className={`card p-4 cursor-pointer transition-all ${
                selectedDept?.name === dept.name ? 'border-pink-500/75' : 'hover:border-pink-500/50'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <p className="font-semibold text-white">{dept.name}</p>
                {getMoodIcon(dept.sentiment)}
              </div>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-gray-400">Sentiment</p>
                  <p className="text-lg font-bold text-white">{dept.sentiment.toFixed(0)}%</p>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="h-2 rounded-full bg-pink-500" style={{ width: `${dept.sentiment}%` }} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Selected Department Details */}
      <AnimatePresence>
        {selectedDept && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="card p-6 border border-pink-500/50">
            <h3 className="text-xl font-semibold text-white mb-6">{selectedDept.name} Department Mental Health Profile</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-400">Sentiment</p>
                <p className="text-2xl font-bold text-white">{selectedDept.sentiment.toFixed(1)}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Engagement</p>
                <p className="text-2xl font-bold text-blue-400">{selectedDept.engagement.toFixed(1)}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Satisfaction</p>
                <p className="text-2xl font-bold text-green-400">{selectedDept.satisfaction.toFixed(1)}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Stress Level</p>
                <p className="text-2xl font-bold text-red-400">{selectedDept.stress.toFixed(1)}%</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MoodAdaptiveUI;
