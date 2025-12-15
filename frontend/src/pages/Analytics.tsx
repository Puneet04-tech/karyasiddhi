import { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Brain, TrendingUp, AlertTriangle, Award, Lightbulb, 
  Calendar, Download, Share2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  AreaChart, Area, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Brush, ReferenceLine 
} from 'recharts';
import api from '../lib/api';
import { useAuthStore } from '../store/authStore';
import type { Analytics, Prediction, Anomaly } from '../types';

const Analytics = () => {
  const { user } = useAuthStore();
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [anomalies, setAnomalies] = useState<Anomaly[]>([]);
  const [insights, setInsights] = useState<any[]>([]);
  const [teamRankings, setTeamRankings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('7d');
  const chartRef = useRef<HTMLDivElement | null>(null);

  const [visibleSeries, setVisibleSeries] = useState({
    productivity: true,
    quality: true,
    efficiency: true,
    collaboration: true,
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        // Fetch overview data
        const overviewResponse = await api.get('/analytics/overview');
        setAnalytics(overviewResponse.data);
        
        // Fetch predictions
        const predictionsResponse = await api.get('/analytics/predictions');
        setPredictions(predictionsResponse.data);
        
        // Fetch anomalies
        const anomaliesResponse = await api.get('/analytics/anomalies');
        setAnomalies(anomaliesResponse.data);
        
        // Fetch insights
        const insightsResponse = await api.get('/analytics/insights');
        setInsights(insightsResponse.data);
        
        // Fetch team rankings
        const rankingsResponse = await api.get('/analytics/team-rankings');
        setTeamRankings(rankingsResponse.data);
      } catch (error) {
        console.error('Failed to fetch analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  // Remove mock data - now fetched from API

  // Performance metrics over time
  const performanceMetrics = [
    { month: 'Apr', productivity: 78, quality: 82, efficiency: 75, collaboration: 80 },
    { month: 'May', productivity: 82, quality: 84, efficiency: 79, collaboration: 83 },
    { month: 'Jun', productivity: 79, quality: 86, efficiency: 81, collaboration: 85 },
    { month: 'Jul', productivity: 85, quality: 88, efficiency: 84, collaboration: 87 },
    { month: 'Aug', productivity: 83, quality: 87, efficiency: 82, collaboration: 86 },
    { month: 'Sep', productivity: 88, quality: 90, efficiency: 86, collaboration: 89 },
    { month: 'Oct', productivity: 87, quality: 89, efficiency: 88, collaboration: 90 },
  ];

  const memoizedMetrics = useMemo(() => performanceMetrics, [performanceMetrics]);

  const handleLegendClick = (payload: any) => {
    // payload may be event or payload object depending on recharts version
    const dataKey = payload?.dataKey ?? payload?.value;
    if (!dataKey) return;
    setVisibleSeries((prev) => ({ ...prev, [dataKey]: !prev[dataKey] }));
  };

  const exportCSV = () => {
    try {
      const rows = [Object.keys(memoizedMetrics[0]).join(',')];
      memoizedMetrics.forEach((r: any) => rows.push(Object.values(r).join(',')));
      const csv = rows.join('\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `performance-metrics.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Export CSV failed', err);
    }
  };

  const exportPNG = async () => {
    try {
      if (!chartRef.current) return;
      const svg = chartRef.current.querySelector('svg');
      if (!svg) return;
      const serializer = new XMLSerializer();
      const svgString = serializer.serializeToString(svg as any);
      const canvas = document.createElement('canvas');
      const bbox = (svg as any).getBBox ? (svg as any).getBBox() : { width: 800, height: 400 };
      canvas.width = Math.max(800, Math.ceil(bbox.width));
      canvas.height = Math.max(400, Math.ceil(bbox.height));
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const img = new Image();
      const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);
      await new Promise<void>((resolve, reject) => {
        img.onload = () => {
          ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--bg') || '#0f172a';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
          URL.revokeObjectURL(url);
          resolve();
        };
        img.onerror = (e) => reject(e);
        img.src = url;
      });
      const pngUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = pngUrl;
      a.download = 'chart.png';
      a.click();
    } catch (err) {
      console.error('Export PNG failed', err);
    }
  };

  // Radar chart data
  const skillsData = [
    { skill: 'Technical', value: 85 },
    { skill: 'Leadership', value: 78 },
    { skill: 'Communication', value: 82 },
    { skill: 'Problem Solving', value: 88 },
    { skill: 'Innovation', value: 80 },
    { skill: 'Collaboration', value: 90 },
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'text-green-400 bg-green-500/20 border-green-500/50';
      case 'medium':
        return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/50';
      case 'high':
        return 'text-red-400 bg-red-500/20 border-red-500/50';
      default:
        return 'text-gray-400 bg-gray-500/20 border-gray-500/50';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'text-red-500';
      case 'high':
        return 'text-orange-500';
      case 'medium':
        return 'text-yellow-500';
      default:
        return 'text-blue-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center">
            <Brain className="mr-3 text-purple-500" size={36} />
            AI-Powered Analytics
          </h1>
          <p className="text-gray-400 mt-1">Advanced insights and predictions</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <button className="btn-secondary">
            <Download size={20} className="inline mr-2" />
            Export Report
          </button>
          <button className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg hover:border-primary-500 transition-all">
            <Share2 size={20} />
          </button>
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="card p-4">
        <div className="flex items-center gap-2">
          <Calendar size={20} className="text-gray-400" />
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="input-field w-48"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="1y">Last Year</option>
          </select>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Performance Metrics Trend</h2>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-400">Interactive chart: toggle series, zoom with brush, export as CSV/PNG.</div>
            <div className="flex items-center gap-2">
              <button onClick={exportCSV} className="btn-secondary">Export CSV</button>
              <button onClick={exportPNG} className="btn-secondary">Export PNG</button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Custom legend */}
            {[
              { key: 'productivity', color: '#6366F1', label: 'Productivity' },
              { key: 'quality', color: '#14B8A6', label: 'Quality' },
              { key: 'efficiency', color: '#F59E0B', label: 'Efficiency' },
              { key: 'collaboration', color: '#EC4899', label: 'Collaboration' },
            ].map((s) => (
              <button
                key={s.key}
                onClick={() => setVisibleSeries((p) => ({ ...p, [s.key]: !p[s.key] }))}
                className={`flex items-center gap-2 px-2 py-1 rounded ${visibleSeries[s.key as keyof typeof visibleSeries] ? 'bg-white/6' : 'bg-white/2'}`}
                aria-pressed={visibleSeries[s.key as keyof typeof visibleSeries]}
              >
                <span style={{ width: 12, height: 12, background: s.color, display: 'inline-block', borderRadius: 2 }} aria-hidden />
                <span className="text-sm text-gray-200">{s.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div ref={chartRef}>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={memoizedMetrics} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="gradProd" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366F1" stopOpacity="0.65" />
                  <stop offset="100%" stopColor="#6366F1" stopOpacity="0.08" />
                </linearGradient>
                <linearGradient id="gradQual" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#14B8A6" stopOpacity="0.65" />
                  <stop offset="100%" stopColor="#14B8A6" stopOpacity="0.08" />
                </linearGradient>
                <linearGradient id="gradEff" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.06" />
                </linearGradient>
                <linearGradient id="gradCollab" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#EC4899" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#EC4899" stopOpacity="0.06" />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#0f172a" />
              <XAxis dataKey="month" stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
              <YAxis stroke="#94a3b8" tickFormatter={(v) => `${v}%`} tick={{ fill: '#9aa6b2' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0b1220', border: '1px solid #111827', borderRadius: 8 }}
                formatter={(value: any, name: any) => [`${value}%`, String(name).charAt(0).toUpperCase() + String(name).slice(1)]}
              />

              {/* Areas with gradients and rounded strokes */}
              {visibleSeries.productivity && (
                <Area
                  type="monotone"
                  dataKey="productivity"
                  stackId="1"
                  stroke="#6366F1"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="url(#gradProd)"
                  fillOpacity={1}
                  dot={{ r: 3 }}
                  activeDot={{ r: 6 }}
                  isAnimationActive={!window.matchMedia || !window.matchMedia('(prefers-reduced-motion: reduce)').matches}
                  animationDuration={800}
                />
              )}

              {visibleSeries.quality && (
                <Area
                  type="monotone"
                  dataKey="quality"
                  stackId="1"
                  stroke="#14B8A6"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="url(#gradQual)"
                  fillOpacity={1}
                  dot={{ r: 3 }}
                  activeDot={{ r: 6 }}
                  isAnimationActive={!window.matchMedia || !window.matchMedia('(prefers-reduced-motion: reduce)').matches}
                  animationDuration={800}
                />
              )}

              {visibleSeries.efficiency && (
                <Area
                  type="monotone"
                  dataKey="efficiency"
                  stackId="1"
                  stroke="#F59E0B"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="url(#gradEff)"
                  fillOpacity={1}
                  dot={{ r: 3 }}
                  activeDot={{ r: 6 }}
                  isAnimationActive={!window.matchMedia || !window.matchMedia('(prefers-reduced-motion: reduce)').matches}
                  animationDuration={800}
                />
              )}

              {visibleSeries.collaboration && (
                <Area
                  type="monotone"
                  dataKey="collaboration"
                  stackId="1"
                  stroke="#EC4899"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="url(#gradCollab)"
                  fillOpacity={1}
                  dot={{ r: 3 }}
                  activeDot={{ r: 6 }}
                  isAnimationActive={!window.matchMedia || !window.matchMedia('(prefers-reduced-motion: reduce)').matches}
                  animationDuration={800}
                />
              )}

              <Brush dataKey="month" height={28} stroke="#475569" travellerWidth={8} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Team Rankings - Manager View */}
      {user?.role === 'manager' && (
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
            <Award className="mr-2 text-yellow-500" />
            Team Performance Rankings
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Rank</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Employee</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Designation</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Department</th>
                  <th className="text-center py-3 px-4 text-gray-400 font-medium">Performance Score</th>
                  <th className="text-center py-3 px-4 text-gray-400 font-medium">Completion Rate</th>
                  <th className="text-center py-3 px-4 text-gray-400 font-medium">Avg Progress</th>
                  <th className="text-center py-3 px-4 text-gray-400 font-medium">Goals</th>
                </tr>
              </thead>
              <tbody>
                {teamRankings.map((employee, index) => (
                  <motion.tr
                    key={employee.userId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors"
                  >
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
                    <td className="py-4 px-4 text-gray-300">{employee.department || 'N/A'}</td>
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
                    <td className="py-4 px-4 text-center text-gray-300">{employee.averageProgress}%</td>
                    <td className="py-4 px-4 text-center">
                      <span className="text-white font-semibold">{employee.completedGoals}</span>
                      <span className="text-gray-400">/{employee.totalGoals}</span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Skills Assessment */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Competency Analysis</h2>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={skillsData}>
              <PolarGrid stroke="#334155" />
              <PolarAngleAxis dataKey="skill" stroke="#94a3b8" />
              <PolarRadiusAxis stroke="#94a3b8" />
              <Radar name="Skills" dataKey="value" stroke="#6366F1" fill="#6366F1" fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* AI Insights Summary */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
            <Lightbulb className="mr-2 text-yellow-500" />
            Key Insights
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-green-500/10 border border-green-500/50 rounded-lg">
              <div className="flex items-start gap-3">
                <Award className="text-green-500 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-semibold text-green-400 mb-1">Outstanding Performance</h3>
                  <p className="text-sm text-gray-300">Your team ranks in the top 10% for productivity across all departments.</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-500/10 border border-blue-500/50 rounded-lg">
              <div className="flex items-start gap-3">
                <TrendingUp className="text-blue-500 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-semibold text-blue-400 mb-1">Positive Trend</h3>
                  <p className="text-sm text-gray-300">Goal completion rate has improved by 23% compared to last quarter.</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-yellow-500/10 border border-yellow-500/50 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="text-yellow-500 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-semibold text-yellow-400 mb-1">Attention Needed</h3>
                  <p className="text-sm text-gray-300">2 goals require immediate action to meet deadlines.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Predictions */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
          <Brain className="mr-2 text-purple-500" />
          Goal Completion Predictions
        </h2>
        <div className="space-y-4">
          {predictions.map((prediction) => (
            <motion.div
              key={prediction.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-5 bg-slate-800/50 border border-slate-700 rounded-lg hover:border-purple-500/50 transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">{prediction.goalTitle}</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gray-400">Predicted:</span>
                      <span className="text-purple-400 font-semibold">{prediction.predictedCompletion}</span>
                      <span className="text-gray-400">Original:</span>
                      <span className="text-gray-300">{(prediction as any).originalDeadline}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {prediction.factors.map((factor, idx) => (
                        <span key={idx} className="text-xs px-2 py-1 bg-slate-700 text-gray-300 rounded">
                          {factor}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-xs text-gray-400 mb-1">Confidence</p>
                    <p className="text-2xl font-bold text-purple-400">{prediction.confidence}%</p>
                  </div>
                  <div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getRiskColor(prediction.riskLevel)}`}>
                      {prediction.riskLevel.toUpperCase()} RISK
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Anomalies */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
          <AlertTriangle className="mr-2 text-red-500" />
          Detected Anomalies
        </h2>
        <div className="space-y-4">
          {anomalies.map((anomaly) => (
            <motion.div
              key={anomaly.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-5 bg-slate-800/50 border border-slate-700 rounded-lg hover:border-red-500/50 transition-all"
            >
              <div className="flex items-start gap-4">
                <AlertTriangle className={`flex-shrink-0 ${getSeverityColor(anomaly.severity)}`} size={24} />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-white">{anomaly.description}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getSeverityColor(anomaly.severity)}`}>
                      {anomaly.severity.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>Detected: {anomaly.detectedAt}</span>
                    <span>Affected: {anomaly.affectedGoals.join(', ')}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
