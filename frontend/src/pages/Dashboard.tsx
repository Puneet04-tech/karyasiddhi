import { useState, useEffect, useMemo, useRef } from 'react';
import { 
  TrendingUp, TrendingDown, Target, Award, AlertTriangle, 
  CheckCircle, Clock, Users, Activity, BarChart3
} from 'lucide-react';
import { motion } from 'framer-motion';
import { LineChart, Line, Area, AreaChart, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useAuthStore } from '../store/authStore';
import { formatPercentage, getProgressColor } from '../lib/utils';
import api, { aiApi } from '../lib/api';

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
  const [teamRankings, setTeamRankings] = useState<any[]>([]);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [aiInsights, setAiInsights] = useState<any[]>([]);
  const [realTimeData, setRealTimeData] = useState({
    performanceData: [
      { month: 'Apr', score: 78 },
      { month: 'May', score: 82 },
      { month: 'Jun', score: 79 },
      { month: 'Jul', score: 85 },
      { month: 'Aug', score: 83 },
      { month: 'Sep', score: 88 },
      { month: 'Oct', score: 87 },
    ],
    goalsByCategory: [
      { name: 'Strategic', value: 12, color: '#6366F1' },
      { name: 'Operational', value: 18, color: '#14B8A6' },
      { name: 'Development', value: 8, color: '#F59E0B' },
      { name: 'Innovation', value: 7, color: '#EC4899' },
    ],
    completionData: [
      { name: 'Completed', value: 45, color: '#10B981' },
      { name: 'In Progress', value: 23, color: '#3B82F6' },
      { name: 'Delayed', value: 8, color: '#EF4444' },
    ],
    trendData: [
      { time: '00:00', productivity: 85, goals: 12 },
      { time: '04:00', productivity: 87, goals: 13 },
      { time: '08:00', productivity: 82, goals: 11 },
      { time: '12:00', productivity: 89, goals: 15 },
      { time: '16:00', productivity: 91, goals: 16 },
      { time: '20:00', productivity: 88, goals: 14 },
    ]
  });

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

        // Fetch team rankings if user is manager
        if (user?.role === 'manager') {
          const rankingsRes = await api.get('/analytics/team-rankings');
          setTeamRankings(rankingsRes.data || []);
          
          // Fetch all users
          const usersRes = await api.get('/users');
          setAllUsers(usersRes.data || []);
        }

        // Fetch AI insights
        try {
          const insightsRes = await aiApi.get('/insights');
          setAiInsights(insightsRes.data || []);
        } catch (aiError) {
          console.error('Failed to fetch AI insights:', aiError);
          // Fallback to default insights if AI service is unavailable
          setAiInsights([
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
          ]);
        }
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

  // Real-time data updates
  useEffect(() => {
    const updateRealTimeData = () => {
      setRealTimeData(prev => ({
        ...prev,
        performanceData: prev.performanceData.map(item => ({
          ...item,
          score: item.score + (Math.random() - 0.5) * 2 // Small random variation
        })),
        trendData: prev.trendData.map(item => ({
          ...item,
          productivity: Math.max(70, Math.min(100, item.productivity + (Math.random() - 0.5) * 4)),
          goals: Math.max(8, Math.min(20, item.goals + Math.floor((Math.random() - 0.5) * 2)))
        }))
      }));
    };

    const interval = setInterval(updateRealTimeData, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  // Mock data for charts - now managed in state for real-time updates

  const chartRef = useRef<HTMLDivElement | null>(null);

  const recentActivities = [
    { id: 1, type: 'goal_completed', title: 'Digital Infrastructure Goal', time: '2 hours ago', icon: CheckCircle, color: 'text-green-500' },
    { id: 2, type: 'kpi_updated', title: 'Citizen Services KPI Updated', time: '5 hours ago', icon: Activity, color: 'text-blue-500' },
    { id: 3, type: 'milestone', title: 'Q3 Milestone Achieved', time: '1 day ago', icon: Award, color: 'text-yellow-500' },
    { id: 4, type: 'alert', title: 'Goal Deadline Approaching', time: '2 days ago', icon: AlertTriangle, color: 'text-orange-500' },
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
              <h3 className="text-5xl font-black gradient-text mt-3 mb-3 pl-4">{stats.productivityScore}</h3>
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
              <h3 className="text-5xl font-black text-white mt-3 mb-3 pl-4">{stats.totalGoals}</h3>
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
              <h3 className="text-5xl font-black text-white mt-3 mb-3 pl-4">{stats.inProgressGoals}</h3>
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
              <h3 className="text-5xl font-black text-white mt-3 mb-3 pl-4">{stats.delayedGoals}</h3>
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
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Performance Trend - Line Chart */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Performance Trend</h2>
          <div ref={chartRef} className="relative">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={realTimeData.performanceData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
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

        {/* Goals Status - Bar Chart */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Goals Status</h2>
          <div className="relative">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={realTimeData.completionData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <defs>
                  <linearGradient id="barGrad1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" stopOpacity="1" />
                    <stop offset="100%" stopColor="#059669" stopOpacity="0.8" />
                  </linearGradient>
                  <linearGradient id="barGrad2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="1" />
                    <stop offset="100%" stopColor="#2563EB" stopOpacity="0.8" />
                  </linearGradient>
                  <linearGradient id="barGrad3" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#EF4444" stopOpacity="1" />
                    <stop offset="100%" stopColor="#DC2626" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#0f172a" />
                <XAxis dataKey="name" stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
                <YAxis stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0b1220', border: '1px solid #111827', borderRadius: 8 }}
                  labelStyle={{ color: '#f1f5f9' }}
                  formatter={(v: any) => [v, 'Count']}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {realTimeData.completionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={
                      index === 0 ? 'url(#barGrad1)' :
                      index === 1 ? 'url(#barGrad2)' :
                      'url(#barGrad3)'
                    } />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Daily Productivity Trend - Area Chart */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Daily Productivity Trend</h2>
          <div className="relative">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={realTimeData.trendData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <defs>
                  <linearGradient id="areaGrad1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.05" />
                  </linearGradient>
                  <linearGradient id="areaGrad2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.05" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#0f172a" />
                <XAxis dataKey="time" stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
                <YAxis stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0b1220', border: '1px solid #111827', borderRadius: 8 }}
                  labelStyle={{ color: '#f1f5f9' }}
                />
                <Area
                  type="monotone"
                  dataKey="productivity"
                  stackId="1"
                  stroke="#7c3aed"
                  fill="url(#areaGrad1)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="goals"
                  stackId="2"
                  stroke="#06b6d4"
                  fill="url(#areaGrad2)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Goals by Category - Pie Chart */}
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
                  data={realTimeData.goalsByCategory}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={92}
                  paddingAngle={4}
                  labelLine={false}
                  label={(entry) => `${entry.name} (${entry.value})`}
                  dataKey="value"
                >
                  {realTimeData.goalsByCategory.map((entry, index) => (
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
                <div className="text-xl font-bold text-white">{realTimeData.goalsByCategory.reduce((s, g) => s + g.value, 0)}</div>
                <div className="text-sm text-gray-400">Total Goals</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Rankings Section - Manager Only */}
      {user?.role === 'manager' && teamRankings.length > 0 && (
        <div className="mt-8">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <Award className="mr-3 text-yellow-500" size={32} />
              Team Performance Rankings
            </h2>
            <p className="text-gray-400 mt-1">Top performers across all departments</p>
          </div>
          <div className="card p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Rank</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Employee</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Designation</th>
                  <th className="text-center py-3 px-4 text-gray-400 font-medium">Performance</th>
                  <th className="text-center py-3 px-4 text-gray-400 font-medium">Completion</th>
                  <th className="text-center py-3 px-4 text-gray-400 font-medium">Goals</th>
                </tr>
              </thead>
              <tbody>
                {teamRankings.slice(0, 10).map((employee, index) => (
                  <tr key={employee.userId} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                    <td className="py-4 px-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                        index === 0 ? 'bg-yellow-500/20 text-yellow-500' :
                        index === 1 ? 'bg-gray-400/20 text-gray-400' :
                        index === 2 ? 'bg-orange-500/20 text-orange-500' :
                        'bg-slate-700 text-gray-400'
                      }`}>
                        {employee.rank}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <div className="font-semibold text-white">{employee.name}</div>
                        <div className="text-sm text-gray-400">{employee.email}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-300">{employee.designation || 'N/A'}</td>
                    <td className="py-4 px-4 text-center">
                      <div className={`inline-flex items-center justify-center px-3 py-1 rounded-full font-semibold ${
                        employee.performanceScore >= 80 ? 'bg-green-500/20 text-green-500' :
                        employee.performanceScore >= 60 ? 'bg-yellow-500/20 text-yellow-500' :
                        'bg-red-500/20 text-red-500'
                      }`}>
                        {employee.performanceScore}%
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center text-gray-300">{employee.completionRate}%</td>
                    <td className="py-4 px-4 text-center">
                      <span className="text-white font-semibold">{employee.completedGoals}</span>
                      <span className="text-gray-400">/{employee.totalGoals}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        </div>
      )}

      {/* All Employees Section - Manager Only */}
      {user?.role === 'manager' && allUsers.length > 0 && (
        <div className="mt-8">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <Users className="mr-3 text-blue-500" size={32} />
              All Employee Accounts
            </h2>
            <p className="text-gray-400 mt-1">Complete list of {allUsers.length} team members</p>
          </div>
          <div className="card p-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allUsers.map((employee) => (
              <div key={employee.id} className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg hover:border-primary-500 transition-all">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold text-lg">
                    {employee.name?.charAt(0) || 'U'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white truncate">{employee.name}</h3>
                    <p className="text-xs text-gray-400 truncate">{employee.email}</p>
                    <div className="mt-2 space-y-1">
                      <p className="text-xs text-gray-300">{employee.designation || 'Staff'}</p>
                      <p className="text-xs text-gray-400">{employee.department?.name || 'No Department'}</p>
                      <span className={`inline-block text-xs px-2 py-0.5 rounded ${
                        employee.isActive ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                      }`}>
                        {employee.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>
      )}

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
