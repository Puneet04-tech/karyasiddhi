import { useState, useEffect, useMemo, useRef } from 'react';
import { 
  TrendingUp, TrendingDown, Target, Award, AlertTriangle, 
  CheckCircle, Clock, Users, Activity, BarChart3
} from 'lucide-react';
import { motion } from 'framer-motion';
import { LineChart, Line, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ComposedChart, ScatterChart, Scatter, Treemap } from 'recharts';
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
  const [teamRankings, setTeamRankings] = useState<any[]>([]);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const overviewRes = await api.get('/analytics/overview');
        console.debug('analytics/overview response:', overviewRes.status, overviewRes.data);
        
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
          console.debug('analytics/team-rankings response:', rankingsRes.status, rankingsRes.data?.length);
          setTeamRankings(rankingsRes.data || []);
          
          // Fetch all users
          const usersRes = await api.get('/users');
          console.debug('users response:', usersRes.status, usersRes.data?.length);
          setAllUsers(usersRes.data || []);
        }
      } catch (error: any) {
        console.error('Failed to fetch dashboard data:', error?.response?.status, error?.response?.data || error?.message || error);
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

  // Additional data for new charts
  const weeklyProgress = useMemo(() => [
    { week: 'Week 1', completed: 3, started: 5, delayed: 1 },
    { week: 'Week 2', completed: 4, started: 7, delayed: 2 },
    { week: 'Week 3', completed: 6, started: 4, delayed: 1 },
    { week: 'Week 4', completed: 5, started: 6, delayed: 3 },
    { week: 'Week 5', completed: 8, started: 5, delayed: 2 },
    { week: 'Week 6', completed: 7, started: 8, delayed: 1 },
  ], []);

  const departmentPerformance = useMemo(() => [
    { department: 'IT', goals: 15, completed: 12, efficiency: 80, satisfaction: 4.2 },
    { department: 'HR', goals: 8, completed: 6, efficiency: 75, satisfaction: 4.5 },
    { department: 'Finance', goals: 12, completed: 10, efficiency: 83, satisfaction: 4.1 },
    { department: 'Operations', goals: 18, completed: 14, efficiency: 78, satisfaction: 4.3 },
    { department: 'Marketing', goals: 6, completed: 5, efficiency: 85, satisfaction: 4.6 },
  ], []);

  const kpiTrends = useMemo(() => [
    { month: 'Jan', efficiency: 72, quality: 85, innovation: 68, collaboration: 78 },
    { month: 'Feb', efficiency: 75, quality: 87, innovation: 70, collaboration: 80 },
    { month: 'Mar', efficiency: 78, quality: 86, innovation: 73, collaboration: 82 },
    { month: 'Apr', efficiency: 82, quality: 88, innovation: 75, collaboration: 85 },
    { month: 'May', efficiency: 85, quality: 90, innovation: 78, collaboration: 87 },
    { month: 'Jun', efficiency: 87, quality: 92, innovation: 82, collaboration: 89 },
  ], []);

  const resourceAllocation = useMemo(() => [
    { resource: 'Development', allocated: 40, utilized: 35, efficiency: 88 },
    { resource: 'Design', allocated: 20, utilized: 18, efficiency: 90 },
    { resource: 'Testing', allocated: 25, utilized: 22, efficiency: 88 },
    { resource: 'Management', allocated: 15, utilized: 14, efficiency: 93 },
  ], []);

  const riskAssessment = useMemo(() => [
    { risk: 'Technical', probability: 30, impact: 70, mitigation: 60 },
    { risk: 'Resource', probability: 45, impact: 50, mitigation: 75 },
    { risk: 'Timeline', probability: 25, impact: 80, mitigation: 70 },
    { risk: 'Budget', probability: 20, impact: 90, mitigation: 85 },
    { risk: 'Quality', probability: 15, impact: 75, mitigation: 80 },
  ], []);

  const skillsRadar = useMemo(() => [
    { skill: 'Technical', A: 85, B: 75, fullMark: 100 },
    { skill: 'Communication', A: 78, B: 85, fullMark: 100 },
    { skill: 'Leadership', A: 82, B: 70, fullMark: 100 },
    { skill: 'Innovation', A: 75, B: 80, fullMark: 100 },
    { skill: 'Problem Solving', A: 88, B: 72, fullMark: 100 },
    { skill: 'Time Management', A: 80, B: 78, fullMark: 100 },
  ], []);

  const productivityHeatmap = useMemo(() => [
    { day: 'Mon', hour: '9AM', value: 85 }, { day: 'Mon', hour: '11AM', value: 92 },
    { day: 'Mon', hour: '1PM', value: 78 }, { day: 'Mon', hour: '3PM', value: 88 },
    { day: 'Tue', hour: '9AM', value: 88 }, { day: 'Tue', hour: '11AM', value: 95 },
    { day: 'Tue', hour: '1PM', value: 82 }, { day: 'Tue', hour: '3PM', value: 90 },
    { day: 'Wed', hour: '9AM', value: 82 }, { day: 'Wed', hour: '11AM', value: 90 },
    { day: 'Wed', hour: '1PM', value: 75 }, { day: 'Wed', hour: '3PM', value: 85 },
    { day: 'Thu', hour: '9AM', value: 90 }, { day: 'Thu', hour: '11AM', value: 93 },
    { day: 'Thu', hour: '1PM', value: 80 }, { day: 'Thu', hour: '3PM', value: 87 },
    { day: 'Fri', hour: '9AM', value: 75 }, { day: 'Fri', hour: '11AM', value: 85 },
    { day: 'Fri', hour: '1PM', value: 70 }, { day: 'Fri', hour: '3PM', value: 80 },
  ], []);

  const goalCompletionRates = useMemo(() => [
    { goal: 'Website Redesign', planned: 100, actual: 95, team: 'Frontend' },
    { goal: 'API Development', planned: 100, actual: 88, team: 'Backend' },
    { goal: 'Database Migration', planned: 100, actual: 102, team: 'DevOps' },
    { goal: 'Security Audit', planned: 100, actual: 85, team: 'Security' },
    { goal: 'User Testing', planned: 100, actual: 110, team: 'QA' },
    { goal: 'Documentation', planned: 100, actual: 78, team: 'Technical Writing' },
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
            {typeof user?.department === 'object' ? user?.department?.name : user?.department}
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

      {/* Comprehensive Charts Section */}
      <div className="space-y-6">
        
        {/* First Row: Performance Trend & Goals by Category */}
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

        {/* Second Row: Weekly Progress & Department Performance */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Weekly Progress */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Weekly Progress Analysis</h2>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={weeklyProgress} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <defs>
                  <linearGradient id="completedGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.3" />
                  </linearGradient>
                  <linearGradient id="startedGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
                  </linearGradient>
                  <linearGradient id="delayedGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#0f172a" />
                <XAxis dataKey="week" stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
                <YAxis stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0b1220', border: '1px solid #111827', borderRadius: 8 }}
                  labelStyle={{ color: '#f1f5f9' }}
                />
                <Legend />
                <Bar dataKey="completed" fill="url(#completedGrad)" name="Completed" />
                <Bar dataKey="started" fill="url(#startedGrad)" name="Started" />
                <Bar dataKey="delayed" fill="url(#delayedGrad)" name="Delayed" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Department Performance */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Department Performance</h2>
            <ResponsiveContainer width="100%" height={280}>
              <ComposedChart data={departmentPerformance} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <defs>
                  <linearGradient id="efficiencyGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#0f172a" />
                <XAxis dataKey="department" stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
                <YAxis stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0b1220', border: '1px solid #111827', borderRadius: 8 }}
                  labelStyle={{ color: '#f1f5f9' }}
                />
                <Legend />
                <Bar dataKey="goals" fill="#6366f1" name="Total Goals" />
                <Bar dataKey="completed" fill="#10b981" name="Completed" />
                <Line type="monotone" dataKey="efficiency" stroke="url(#efficiencyGrad)" strokeWidth={3} name="Efficiency %" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Third Row: KPI Trends & Resource Allocation */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* KPI Trends */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Multi-KPI Trends</h2>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={kpiTrends} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#0f172a" />
                <XAxis dataKey="month" stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
                <YAxis stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0b1220', border: '1px solid #111827', borderRadius: 8 }}
                  labelStyle={{ color: '#f1f5f9' }}
                />
                <Legend />
                <Line type="monotone" dataKey="efficiency" stroke="#10b981" strokeWidth={2} name="Efficiency" />
                <Line type="monotone" dataKey="quality" stroke="#3b82f6" strokeWidth={2} name="Quality" />
                <Line type="monotone" dataKey="innovation" stroke="#f59e0b" strokeWidth={2} name="Innovation" />
                <Line type="monotone" dataKey="collaboration" stroke="#8b5cf6" strokeWidth={2} name="Collaboration" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Resource Allocation */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Resource Allocation</h2>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={resourceAllocation} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <defs>
                  <linearGradient id="allocatedGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.3" />
                  </linearGradient>
                  <linearGradient id="utilizedGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f97316" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#f97316" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#0f172a" />
                <XAxis dataKey="resource" stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
                <YAxis stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0b1220', border: '1px solid #111827', borderRadius: 8 }}
                  labelStyle={{ color: '#f1f5f9' }}
                />
                <Legend />
                <Bar dataKey="allocated" fill="url(#allocatedGrad)" name="Allocated %" />
                <Bar dataKey="utilized" fill="url(#utilizedGrad)" name="Utilized %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Fourth Row: Skills Radar & Risk Assessment */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Skills Radar Chart */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Skills Comparison Radar</h2>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={skillsRadar} margin={{ top: 20, right: 80, bottom: 20, left: 80 }}>
                <PolarGrid stroke="#374151" />
                <PolarAngleAxis dataKey="skill" stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#374151" tick={{ fill: '#6b7280' }} />
                <Radar name="Team A" dataKey="A" stroke="#10b981" fill="#10b981" fillOpacity={0.3} strokeWidth={2} />
                <Radar name="Team B" dataKey="B" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} strokeWidth={2} />
                <Legend />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0b1220', border: '1px solid #111827', borderRadius: 8 }}
                  labelStyle={{ color: '#f1f5f9' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Risk Assessment */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Risk Assessment Matrix</h2>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#0f172a" />
                <XAxis type="number" dataKey="probability" name="Probability" unit="%" domain={[0, 100]} stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
                <YAxis type="number" dataKey="impact" name="Impact" unit="%" domain={[0, 100]} stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0b1220', border: '1px solid #111827', borderRadius: 8 }}
                  labelStyle={{ color: '#f1f5f9' }}
                  cursor={{ strokeDasharray: '3 3' }}
                />
                <Scatter name="Risks" data={riskAssessment} fill="#ef4444">
                  {riskAssessment.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={
                      entry.probability * entry.impact > 4000 ? '#ef4444' :
                      entry.probability * entry.impact > 2000 ? '#f59e0b' : '#10b981'
                    } />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Fifth Row: Goal Completion Rates */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Goal Completion Rates by Team</h2>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={goalCompletionRates} margin={{ top: 20, right: 80, bottom: 20, left: 20 }}>
              <defs>
                <linearGradient id="plannedGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0.3" />
                </linearGradient>
                <linearGradient id="actualGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.3" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#0f172a" />
              <XAxis dataKey="goal" stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} angle={-45} textAnchor="end" height={100} />
              <YAxis stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0b1220', border: '1px solid #111827', borderRadius: 8 }}
                labelStyle={{ color: '#f1f5f9' }}
              />
              <Legend />
              <Bar dataKey="planned" fill="url(#plannedGrad)" name="Planned %" />
              <Bar dataKey="actual" fill="url(#actualGrad)" name="Actual %" />
            </ComposedChart>
          </ResponsiveContainer>
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

      {/* Employee Uploads Section - Manager Only */}
      {user?.role === 'manager' && (
        <EmployeeUploadsSection />
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

const EmployeeUploadsSection = () => {
  const [uploads, setUploads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        console.log('Fetching uploads...');
        const response = await api.get('/goal-uploads/manager');
        console.log('Uploads response:', response.data);
        setUploads(response.data);
      } catch (error) {
        console.error('Failed to fetch uploads:', error);
        // Fallback to empty array if API fails
        setUploads([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUploads();
  }, []);

  if (loading) {
    return (
      <div className="mt-8">
        <div className="card p-6">
          <div className="text-center text-gray-400">Loading uploads...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <BarChart3 className="mr-3 text-green-500" size={32} />
          Employee Work Uploads
        </h2>
        <p className="text-gray-400 mt-1">Recent work submissions from team members</p>
      </div>
      <div className="card p-6">
        {uploads.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            <BarChart3 size={48} className="mx-auto text-gray-600 mb-4" />
            <p>No uploads yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {uploads.slice(0, 10).map((upload: any) => (
              <div key={upload.id} className="flex items-center justify-between p-4 bg-slate-800/50 border border-slate-700 rounded-lg hover:border-primary-500 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center text-white font-bold">
                    {upload.user?.name?.charAt(0) || 'U'}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{upload.fileName}</h3>
                    <p className="text-sm text-gray-400">
                      {upload.user?.name} • {upload.goal?.title} • {new Date(upload.uploadedAt).toLocaleDateString()}
                    </p>
                    {upload.description && (
                      <p className="text-xs text-gray-500 mt-1">{upload.description}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">
                    {(upload.fileSize / 1024).toFixed(1)} KB
                  </span>
                  <button
                    onClick={() => {
                      const baseUrl = api.defaults.baseURL.replace('/api', '');
                      window.open(`${baseUrl}${upload.fileUrl}`, '_blank');
                    }}
                    className="px-3 py-1 bg-primary-600 text-white text-sm rounded hover:bg-primary-700 transition-colors"
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
