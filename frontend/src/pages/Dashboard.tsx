import { useState, useEffect, useMemo, useRef } from 'react';
import { 
  TrendingUp, TrendingDown, Target, Award, AlertTriangle, 
  CheckCircle, Clock, Users, Activity, BarChart3
} from 'lucide-react';
import { motion } from 'framer-motion';
import { LineChart, Line, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useAuthStore } from '../store/authStore';
import { formatPercentage, getProgressColor } from '../lib/utils';
import api from '../lib/api';

const Dashboard = () => {
  const { user } = useAuthStore();
  const [stats, setStats] = useState({
    productivityScore: 0,
    productivityTrend: 0,
    totalGoals: 0,
    completedGoals: 0,
    inProgressGoals: 0,
    delayedGoals: 0,
    averageProgress: 0,
    completionRate: 0,
    weeklyTrend: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const overviewRes = await api.get('/analytics/overview');
        
        const inProgress = overviewRes.data.totalGoals - overviewRes.data.completedGoals - overviewRes.data.delayedGoals;
        
        setStats({
          productivityScore: overviewRes.data.productivityScore || 0,
          productivityTrend: overviewRes.data.productivityTrend || 0,
          totalGoals: overviewRes.data.totalGoals || 0,
          completedGoals: overviewRes.data.completedGoals || 0,
          inProgressGoals: inProgress > 0 ? inProgress : 0,
          delayedGoals: overviewRes.data.delayedGoals || 0,
          averageProgress: overviewRes.data.averageProgress || 0,
          completionRate: overviewRes.data.completionRate || 0,
          weeklyTrend: overviewRes.data.productivityTrend || 0,
        });
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  // Mock data for charts
  const performanceData = useMemo(() => [
    { month: 'Apr', score: 78 },
    { month: 'May', score: 82 },
    { month: 'Jun', score: 79 },
    { month: 'Jul', score: 85 },
    { month: 'Aug', score: 83 },
    { month: 'Sep', score: 88 },
    { month: 'Oct', score: 87 },
  ], []);

  const goalsByCategory = useMemo(() => [
    { name: 'Strategic', value: 12, color: '#6366F1' },
    { name: 'Operational', value: 18, color: '#14B8A6' },
    { name: 'Development', value: 8, color: '#F59E0B' },
    { name: 'Innovation', value: 7, color: '#EC4899' },
  ], []);

  const chartRef = useRef<HTMLDivElement | null>(null);

  const recentActivities = [
    { id: 1, type: 'goal_completed', title: 'Digital Infrastructure Goal', time: '2 hours ago', icon: CheckCircle, color: 'text-green-500' },
    { id: 2, type: 'kpi_updated', title: 'Citizen Services KPI Updated', time: '5 hours ago', icon: Activity, color: 'text-blue-500' },
    { id: 3, type: 'milestone', title: 'Q3 Milestone Achieved', time: '1 day ago', icon: Award, color: 'text-yellow-500' },
    { id: 4, type: 'alert', title: 'Goal Deadline Approaching', time: '2 days ago', icon: AlertTriangle, color: 'text-orange-500' },
  ];

  const aiInsights = [
    {
      id: 1,
      type: 'recommendation',
      title: 'Performance Optimization',
      description: 'Based on current trends, you are on track to exceed quarterly targets by 12%.',
      confidence: 92,
    },
    {
      id: 2,
      type: 'warning',
      title: 'Attention Required',
      description: '3 goals are showing delayed progress. Consider reallocating resources.',
      confidence: 87,
    },
    {
      id: 3,
      type: 'achievement',
      title: 'Excellence Recognition',
      description: 'Your productivity score ranks in the top 15% across all departments.',
      confidence: 95,
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-5xl font-bold gradient-text text-shadow-glow mb-2 animate-fadeIn">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-300 mt-2 text-lg flex items-center gap-2">
            <Users size={20} className="text-orange-500" />
            {user?.department}
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <button className="btn-primary pulse-glow">
            <Target size={20} className="inline mr-2" />
            Create New Goal
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <motion.div 
          variants={item} 
          className="stat-card group cursor-pointer hover:scale-105 transform transition-all duration-300"
          whileHover={{ y: -8 }}
        >
          <div className="flex items-center justify-between relative z-10">
            <div className="flex-1">
              <p className="text-sm text-gray-400 uppercase tracking-wider font-semibold">Productivity Score</p>
              <h3 className="text-5xl font-black gradient-text mt-3 mb-3">{stats.productivityScore}</h3>
              <div className="flex items-center mt-2 text-green-400 text-sm font-semibold">
                <TrendingUp size={18} className="mr-2" />
                <span>+{stats.weeklyTrend}% this week</span>
              </div>
            </div>
            <div className="p-5 bg-gradient-to-br from-orange-500/30 to-red-500/30 rounded-2xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 box-shadow-glow">
              <BarChart3 size={40} className="text-orange-400" />
            </div>
          </div>
        </motion.div>

        <motion.div 
          variants={item} 
          className="stat-card group cursor-pointer hover:scale-105 transform transition-all duration-300"
          whileHover={{ y: -8 }}
        >
          <div className="flex items-center justify-between relative z-10">
            <div className="flex-1">
              <p className="text-sm text-gray-400 uppercase tracking-wider font-semibold">Total Goals</p>
              <h3 className="text-5xl font-black text-white mt-3 mb-3">{stats.totalGoals}</h3>
              <div className="flex items-center mt-2 text-green-400 text-sm font-semibold">
                <CheckCircle size={18} className="mr-2" />
                <span>{stats.completedGoals} completed</span>
              </div>
            </div>
            <div className="p-5 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-2xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 box-shadow-glow">
              <Target size={40} className="text-purple-400" />
            </div>
          </div>
        </motion.div>

        <motion.div 
          variants={item} 
          className="stat-card group cursor-pointer hover:scale-105 transform transition-all duration-300"
          whileHover={{ y: -8 }}
        >
          <div className="flex items-center justify-between relative z-10">
            <div className="flex-1">
              <p className="text-sm text-gray-400 uppercase tracking-wider font-semibold">In Progress</p>
              <h3 className="text-5xl font-black text-white mt-3 mb-3">{stats.inProgressGoals}</h3>
              <div className="flex items-center mt-2 text-blue-400 text-sm font-semibold">
                <Clock size={18} className="mr-2" />
                <span>Active tracking</span>
              </div>
            </div>
            <div className="p-5 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 rounded-2xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 box-shadow-glow">
              <Activity size={40} className="text-blue-400" />
            </div>
          </div>
        </motion.div>

        <motion.div 
          variants={item} 
          className="stat-card group cursor-pointer hover:scale-105 transform transition-all duration-300"
          whileHover={{ y: -8 }}
        >
          <div className="flex items-center justify-between relative z-10">
            <div className="flex-1">
              <p className="text-sm text-gray-400 uppercase tracking-wider font-semibold">Delayed Goals</p>
              <h3 className="text-5xl font-black text-white mt-3 mb-3">{stats.delayedGoals}</h3>
              <div className="flex items-center mt-2 text-amber-400 text-sm font-semibold">
                <AlertTriangle size={18} className="mr-2" />
                <span>Needs attention</span>
              </div>
            </div>
            <div className="p-5 bg-gradient-to-br from-amber-500/30 to-red-500/30 rounded-2xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 box-shadow-glow">
              <AlertTriangle size={40} className="text-amber-400" />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Performance Trend */}
        <div className="lg:col-span-2 card p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Performance Trend</h2>
          <div ref={chartRef} className="relative">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <defs>
                  <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#7c3aed" stopOpacity="1" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="1" />
                  </linearGradient>
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.03" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#0f172a" />
                <XAxis dataKey="month" stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
                <YAxis stroke="#94a3b8" tickFormatter={(v) => `${v}%`} tick={{ fill: '#9aa6b2' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0b1220', border: '1px solid #111827', borderRadius: 8 }}
                  labelStyle={{ color: '#f1f5f9' }}
                  formatter={(v: any) => [`${v}%`, 'Score']}
                />
                <Area dataKey="score" stroke="none" fill="url(#areaGrad)" isAnimationActive={false} />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="url(#lineGrad)"
                  strokeWidth={3}
                  dot={{ fill: '#fff', stroke: '#7c3aed', strokeWidth: 2, r: 5 }}
                  activeDot={{ r: 7 }}
                  strokeLinecap="round"
                  isAnimationActive={!window.matchMedia || !window.matchMedia('(prefers-reduced-motion: reduce)').matches}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Goals by Category */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Goals by Category</h2>
          <div className="relative" style={{ minHeight: 300 }}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <defs>
                  <linearGradient id="sliceGrad1" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#6366F1" stopOpacity="1" />
                    <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.9" />
                  </linearGradient>
                  <linearGradient id="sliceGrad2" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#14B8A6" stopOpacity="1" />
                    <stop offset="100%" stopColor="#0ea5a4" stopOpacity="0.9" />
                  </linearGradient>
                  <linearGradient id="sliceGrad3" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#F59E0B" stopOpacity="1" />
                    <stop offset="100%" stopColor="#f97316" stopOpacity="0.9" />
                  </linearGradient>
                  <linearGradient id="sliceGrad4" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#EC4899" stopOpacity="1" />
                    <stop offset="100%" stopColor="#db2777" stopOpacity="0.9" />
                  </linearGradient>
                </defs>

                <Pie
                  data={goalsByCategory}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={92}
                  paddingAngle={4}
                  labelLine={false}
                  label={(entry) => `${entry.name} (${entry.value})`}
                  dataKey="value"
                >
                  {goalsByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={
                      index === 0 ? 'url(#sliceGrad1)'
                      : index === 1 ? 'url(#sliceGrad2)'
                      : index === 2 ? 'url(#sliceGrad3)'
                      : 'url(#sliceGrad4)'
                    } stroke="#0b1220" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0b1220', border: '1px solid #111827', borderRadius: 8 }}
                  formatter={(value: any, name: any) => [value, String(name)]}
                />
                <Legend layout="vertical" verticalAlign="middle" align="right" />
              </PieChart>
            </ResponsiveContainer>

            {/* Top label (moved to top to avoid overlap) */}
            <div className="absolute top-3 left-1/2 transform -translate-x-1/2 pointer-events-none z-10">
              <div className="text-center">
                <div className="text-xl font-bold text-white">{goalsByCategory.reduce((s, g) => s + g.value, 0)}</div>
                <div className="text-sm text-gray-400">Total Goals</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Insights and Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* AI Insights */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
            <Award className="mr-2 text-yellow-500" size={24} />
            AI-Powered Insights
          </h2>
          <div className="space-y-4">
            {aiInsights.map((insight) => (
              <div key={insight.id} className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg hover:border-primary-500 transition-all">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-white">{insight.title}</h3>
                  <span className="text-xs px-2 py-1 bg-primary-500/20 text-primary-400 rounded">
                    {insight.confidence}% confidence
                  </span>
                </div>
                <p className="text-sm text-gray-400">{insight.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
            <Activity className="mr-2 text-blue-500" size={24} />
            Recent Activity
          </h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="flex items-start space-x-4 p-4 bg-slate-800/50 border border-slate-700 rounded-lg hover:border-secondary-500 transition-all">
                  <div className={`p-2 rounded-lg ${activity.color} bg-opacity-20`}>
                    <Icon size={20} className={activity.color} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-white">{activity.title}</h3>
                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
