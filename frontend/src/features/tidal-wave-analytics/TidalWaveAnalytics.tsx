import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useEnterpriseData } from '../../lib/useEnterpriseData';
import {
  TrendingUp, Waves, Activity, AlertCircle, BarChart3, LineChart as LineChartIcon,
  Zap, Brain, Target, Clock, Settings, RefreshCw, Download, Filter,
  Wind, Droplets, Volume2, Gauge, ArrowUpRight, ArrowDownLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, ComposedChart,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Legend, PieChart, Pie, Cell, ScatterChart, Scatter
} from 'recharts';

interface DataWave {
  id: string;
  name: string;
  intensity: number;
  volume: number;
  velocity: number;
  timestamp: Date;
  sources: string[];
  trend: 'rising' | 'stable' | 'falling';
}

interface AnalyticsInsight {
  id: string;
  category: 'trend' | 'anomaly' | 'forecast' | 'pattern';
  title: string;
  description: string;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  actionable: boolean;
}

interface WaveMetric {
  timestamp: string;
  volume: number;
  velocity: number;
  intensity: number;
  trend_index: number;
}

const TidalWaveAnalytics: React.FC = () => {
  const { user } = useAuthStore();
  const { data: tidalData } = useEnterpriseData('tidal-wave', user?.id);

  const [waves, setWaves] = useState<DataWave[]>([]);
  const [insights, setInsights] = useState<AnalyticsInsight[]>([]);
  const [activeWave, setActiveWave] = useState<DataWave | null>(null);
  const [timeRange, setTimeRange] = useState<'1h' | '24h' | '7d' | '30d'>('24h');
  const [chartData, setChartData] = useState<WaveMetric[]>([]);

  useEffect(() => {
    if (tidalData || true) {
      const data = tidalData
      
      // Transform analytics to data waves
      const mockWaves: DataWave[] = [
        {
          id: '1',
          name: 'Performance Wave',
          intensity: Math.round((data?.performance_score || 0.7) * 100),
          volume: Math.floor((data?.performance_score || 0.7) * 50000),
          velocity: ((data?.performance_score || 0.7) * 100),
          timestamp: new Date(),
          sources: ['Performance Data', 'Analytics Module'],
          trend: (data?.performance_score || 0.7) > 0.8 ? 'rising' : 'stable'
        }
      ];
      
      setWaves(mockWaves);
      if (!activeWave && mockWaves.length > 0) {
        setActiveWave(mockWaves[0]);
      }

      // Generate insights
      const mockInsights: AnalyticsInsight[] = [
        {
          id: '1',
          category: 'trend',
          title: `Performance Trend: ${data?.performance_score ? 'Trending Up' : 'Stable'}`,
          description: `Current performance at ${Math.round((data?.performance_score || 0.7) * 100)}% of target`,
          confidence: 88,
          impact: 'high',
          actionable: true
        }
      ];
      
      setInsights(mockInsights);

      // Generate chart data
      const mockChartData: WaveMetric[] = [
        {
          timestamp: '00:00',
          volume: Math.floor((data?.performance_score || 0.7) * 40000),
          velocity: ((data?.performance_score || 0.7) * 80),
          intensity: Math.round((data?.performance_score || 0.7) * 80),
          trend_index: Math.round((data?.performance_score || 0.7) * 100)
        },
        {
          timestamp: '12:00',
          volume: Math.floor((data?.performance_score || 0.7) * 50000),
          velocity: ((data?.performance_score || 0.7) * 100),
          intensity: Math.round((data?.performance_score || 0.7) * 100),
          trend_index: Math.round((data?.performance_score || 0.7) * 100)
        }
      ];
      
      setChartData(mockChartData);
    }
  }, [tidalData]);

  const generateWaves = () => {
    const sources = ['Department Data', 'User Activity', 'System Events', 'API Requests', 'Performance Metrics'];
    const mockWaves: DataWave[] = Array.from({ length: 5 }, (_, i) => ({
      id: (i + 1).toString(),
      name: `Data Wave ${i + 1}`,
      intensity: Math.floor(Math.random() * 100) + 40,
      volume: Math.floor(Math.random() * 50000) + 10000,
      velocity: Math.random() * 100,
      timestamp: new Date(Date.now() - i * 2 * 60 * 60 * 1000),
      sources: [sources[i % sources.length], sources[(i + 1) % sources.length]],
      trend: ['rising', 'stable', 'falling'][Math.floor(Math.random() * 3)] as any
    }));
    setWaves(mockWaves);
  };

  const generateInsights = () => {
    const mockInsights: AnalyticsInsight[] = [
      {
        id: '1',
        category: 'trend',
        title: 'Data Volume Surge',
        description: 'Detected 45% increase in incoming data volume over last 6 hours',
        confidence: 94.2,
        impact: 'high',
        actionable: true
      },
      {
        id: '2',
        category: 'anomaly',
        title: 'Unusual Access Pattern',
        description: 'Anomalous user behavior detected in authorization module',
        confidence: 87.5,
        impact: 'high',
        actionable: true
      },
      {
        id: '3',
        category: 'forecast',
        title: 'Peak Load Prediction',
        description: 'System expected to reach peak load in next 2 hours',
        confidence: 91.3,
        impact: 'medium',
        actionable: true
      },
      {
        id: '4',
        category: 'pattern',
        title: 'Cyclical Behavior',
        description: 'Identified recurring pattern in resource consumption',
        confidence: 88.7,
        impact: 'medium',
        actionable: false
      }
    ];
    setInsights(mockInsights);
  };

  const generateChartData = () => {
    const data: WaveMetric[] = Array.from({ length: 12 }, (_, i) => ({
      timestamp: `${i * 2}:00`,
      volume: Math.floor(Math.random() * 40000) + 10000,
      velocity: Math.random() * 100,
      intensity: Math.floor(Math.random() * 60) + 40,
      trend_index: Math.floor(Math.random() * 100) + 50
    }));
    setChartData(data);
  };

  const waveSourceData = [
    { name: 'API Requests', value: 35, color: '#3b82f6' },
    { name: 'User Activity', value: 28, color: '#10b981' },
    { name: 'System Events', value: 22, color: '#f59e0b' },
    { name: 'Performance', value: 15, color: '#8b5cf6' }
  ];

  const velocityData = waves.map((w, i) => ({
    name: w.name,
    velocity: w.velocity,
    intensity: w.intensity,
    volume: w.volume / 1000
  }));

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'trend': return 'bg-blue-500/20 text-blue-400';
      case 'anomaly': return 'bg-red-500/20 text-red-400';
      case 'forecast': return 'bg-yellow-500/20 text-yellow-400';
      case 'pattern': return 'bg-purple-500/20 text-purple-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-blue-500/20">
            <Waves className="w-8 h-8 text-blue-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold gradient-text">Tidal Wave Analytics</h1>
            <p className="text-gray-400">Real-time Data Flow & Trend Analysis</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {(['1h', '24h', '7d', '30d'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                timeRange === range
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {range}
            </button>
          ))}
          <button className="btn-secondary">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Total Volume</span>
            <Droplets className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-2xl font-bold text-white">245.8K</p>
          <p className="text-xs text-green-400 flex items-center mt-2">
            <ArrowUpRight className="w-3 h-3 mr-1" /> +12.5%
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Avg Intensity</span>
            <Volume2 className="w-4 h-4 text-orange-400" />
          </div>
          <p className="text-2xl font-bold text-white">67.3</p>
          <p className="text-xs text-green-400 flex items-center mt-2">
            <ArrowUpRight className="w-3 h-3 mr-1" /> +4.2%
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Peak Velocity</span>
            <Wind className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-2xl font-bold text-white">94.2</p>
          <p className="text-xs text-red-400 flex items-center mt-2">
            <ArrowDownLeft className="w-3 h-3 mr-1" /> -2.1%
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Active Waves</span>
            <Gauge className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-2xl font-bold text-white">{waves.length}</p>
          <p className="text-xs text-green-400 flex items-center mt-2">
            <ArrowUpRight className="w-3 h-3 mr-1" /> 2 rising
          </p>
        </motion.div>
      </div>

      {/* Main Analytics Charts */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Volume & Intensity Trend */}
        <div className="lg:col-span-2 card p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Data Flow Patterns</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="timestamp" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #3b82f6' }} />
              <Legend />
              <Area type="monotone" dataKey="volume" fill="#3b82f650" stroke="#3b82f6" name="Volume" />
              <Line type="monotone" dataKey="intensity" stroke="#f59e0b" strokeWidth={2} name="Intensity" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Wave Source Distribution */}
        <div className="card p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Wave Sources</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={waveSourceData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {waveSourceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {waveSourceData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <span className="text-gray-400">{item.name}</span>
                <span className="font-semibold text-white">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Velocity vs Intensity Scatter */}
      <div className="card p-6">
        <h3 className="text-xl font-semibold text-white mb-6">Wave Characteristics</h3>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="velocity" stroke="#94a3b8" name="Velocity" />
            <YAxis dataKey="intensity" stroke="#94a3b8" name="Intensity" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ backgroundColor: '#1a1a2e' }} />
            <Scatter name="Data Waves" data={velocityData} fill="#3b82f6" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* Current Waves */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <Activity className="w-5 h-5 mr-2 text-blue-400" />
          Active Data Waves
        </h2>
        <div className="space-y-2">
          {waves.map((wave) => (
            <motion.div
              key={wave.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card p-4 hover:border-blue-500/50 cursor-pointer transition-all"
              onClick={() => setActiveWave(wave)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    wave.trend === 'rising' ? 'bg-green-400' :
                    wave.trend === 'falling' ? 'bg-red-400' :
                    'bg-yellow-400'
                  }`} />
                  <div>
                    <p className="font-semibold text-white">{wave.name}</p>
                    <p className="text-xs text-gray-400">{wave.sources.join(', ')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-sm font-bold text-blue-400">{wave.volume.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">volume</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-orange-400">{wave.intensity}%</p>
                    <p className="text-xs text-gray-500">intensity</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-cyan-400">{wave.velocity.toFixed(1)}</p>
                    <p className="text-xs text-gray-500">velocity</p>
                  </div>
                </div>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1.5">
                <div
                  className="h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                  style={{ width: `${wave.intensity}%` }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* AI Insights */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <Brain className="w-5 h-5 mr-2 text-purple-400" />
          Analytical Insights
        </h2>
        <div className="space-y-2">
          {insights.map((insight) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="card p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  {insight.category === 'trend' && <TrendingUp className="w-5 h-5 text-blue-400" />}
                  {insight.category === 'anomaly' && <AlertCircle className="w-5 h-5 text-red-400" />}
                  {insight.category === 'forecast' && <Clock className="w-5 h-5 text-yellow-400" />}
                  {insight.category === 'pattern' && <Target className="w-5 h-5 text-purple-400" />}
                  <div>
                    <p className="font-semibold text-white">{insight.title}</p>
                    <p className="text-sm text-gray-400">{insight.description}</p>
                  </div>
                </div>
                <div className="text-right flex flex-col items-end gap-2">
                  <span className={`px-2 py-1 text-xs rounded ${getCategoryColor(insight.category)}`}>
                    {insight.category.charAt(0).toUpperCase() + insight.category.slice(1)}
                  </span>
                  <p className="text-sm font-bold text-blue-400">{insight.confidence.toFixed(1)}%</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Selected Wave Details */}
      <AnimatePresence>
        {activeWave && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="card p-6 border border-blue-500/50"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">{activeWave.name} Details</h3>
              <button
                onClick={() => setActiveWave(null)}
                className="btn-secondary"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-400">Volume</p>
                <p className="text-2xl font-bold text-white">{(activeWave.volume / 1000).toFixed(1)}K</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Intensity</p>
                <p className="text-2xl font-bold text-orange-400">{activeWave.intensity}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Velocity</p>
                <p className="text-2xl font-bold text-cyan-400">{activeWave.velocity.toFixed(1)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Trend</p>
                <p className="text-lg font-bold capitalize" style={{
                  color: activeWave.trend === 'rising' ? '#10b981' : activeWave.trend === 'falling' ? '#ef4444' : '#f59e0b'
                }}>{activeWave.trend}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TidalWaveAnalytics;
