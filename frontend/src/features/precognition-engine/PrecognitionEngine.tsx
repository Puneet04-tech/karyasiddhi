import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useEnterpriseData } from '../../lib/useEnterpriseData';
import {
  Brain, Zap, TrendingUp, Settings, RefreshCw, AlertCircle,
  CheckCircle, Clock, Target, Activity, BarChart3, LineChart as LineChartIcon,
  ArrowUp, ArrowDown, Gauge, Eye
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';

interface Prediction {
  id: string;
  metric: string;
  current_value: number;
  predicted_value: number;
  confidence: number;
  trend: 'up' | 'down' | 'stable';
  days_ahead: number;
  category: 'risk' | 'opportunity' | 'warning' | 'positive';
}

interface TimeSeriesForecast {
  timestamp: string;
  actual: number;
  predicted: number;
  confidence_upper: number;
  confidence_lower: number;
}

interface AnomalyAlert {
  id: string;
  type: string;
  severity: 'high' | 'medium' | 'low';
  description: string;
  detected_at: Date;
  probability: number;
}

const PrecognitionEngine: React.FC = () => {
  const { user } = useAuthStore();
  const { data: precognitionData } = useEnterpriseData('precognition', user?.id);

  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [forecastData, setForecastData] = useState<TimeSeriesForecast[]>([]);
  const [anomalies, setAnomalies] = useState<AnomalyAlert[]>([]);
  const [selectedPrediction, setSelectedPrediction] = useState<Prediction | null>(null);
  const [modelAccuracy, setModelAccuracy] = useState(87.3);

  useEffect(() => {
    if (precognitionData) {
      const data = precognitionData
      
      const mockPredictions: Prediction[] = [
        {
          id: '1',
          metric: 'Employee Engagement',
          current_value: Math.round((data?.performance_score || 0.72) * 100),
          predicted_value: Math.round((data?.performance_score || 0.72) * 110),
          confidence: Math.round((data?.avg_kpi || 0.75) * 100),
          trend: (data?.performance_score || 0.72) > 0.7 ? 'up' : 'down',
          days_ahead: 30,
          category: (data?.performance_score || 0.72) > 0.7 ? 'positive' : 'warning'
        },
        {
          id: '2',
          metric: 'Project Delivery Risk',
          current_value: Math.round((100 - (data?.performance_score || 0.72) * 100) * 0.2),
          predicted_value: Math.round((100 - (data?.performance_score || 0.72) * 100) * 0.3),
          confidence: 88,
          trend: 'up',
          days_ahead: 30,
          category: 'warning'
        },
        {
          id: '3',
          metric: 'Attrition Rate',
          current_value: Math.round((100 - (data?.performance_score || 0.72) * 100) * 0.08),
          predicted_value: Math.round((100 - (data?.performance_score || 0.72) * 100) * 0.12),
          confidence: 85,
          trend: 'up',
          days_ahead: 30,
          category: 'risk'
        }
      ];
      
      setPredictions(mockPredictions);
      if (mockPredictions.length > 0) setSelectedPrediction(mockPredictions[0]);
      
      const mockForecastData: TimeSeriesForecast[] = Array.from({ length: 14 }, (_, i) => ({
        timestamp: `Day ${i + 1}`,
        actual: Math.round((data?.performance_score || 0.72) * 100) - i * 1,
        predicted: Math.round((data?.performance_score || 0.72) * 105) - i * 1,
        confidence_upper: Math.round((data?.performance_score || 0.72) * 115) - i * 1,
        confidence_lower: Math.round((data?.performance_score || 0.72) * 95) - i * 1
      }));
      
      setForecastData(mockForecastData);
      setModelAccuracy(Math.round((data?.avg_kpi || 0.75) * 100));
      
      // Get anomalies from precognition data
      const mockAnomalies: AnomalyAlert[] = (data?.anomalies || []).slice(0, 3).map((_, i) => ({
        id: ((i + 1).toString()),
        type: i === 0 ? 'Performance Spike' : i === 1 ? 'Engagement Drop' : 'Resource Anomaly',
        severity: i === 0 ? 'high' : i === 1 ? 'medium' : 'low',
        description: `Detected anomaly in system metrics`,
        detected_at: new Date(),
        probability: 0.85 - i * 0.1
      }));
      
      setAnomalies(mockAnomalies);
    }
  }, [precognitionData]);

  const generatePredictions = () => {
    const mockPredictions: Prediction[] = [
      {
        id: '1',
        metric: 'Employee Engagement',
        current_value: 72.5,
        predicted_value: 78.3,
        confidence: 92.1,
        trend: 'up',
        days_ahead: 30,
        category: 'positive'
      },
      {
        id: '2',
        metric: 'Project Delivery Risk',
        current_value: 15.2,
        predicted_value: 22.8,
        confidence: 88.5,
        trend: 'up',
        days_ahead: 30,
        category: 'warning'
      },
      {
        id: '3',
        metric: 'Attrition Rate',
        current_value: 8.3,
        predicted_value: 12.1,
        confidence: 85.7,
        trend: 'up',
        days_ahead: 60,
        category: 'risk'
      },
      {
        id: '4',
        metric: 'Innovation Output',
        current_value: 45.2,
        predicted_value: 58.6,
        confidence: 79.3,
        trend: 'up',
        days_ahead: 90,
        category: 'opportunity'
      },
      {
        id: '5',
        metric: 'Cost Efficiency',
        current_value: 82.1,
        predicted_value: 84.5,
        confidence: 90.2,
        trend: 'up',
        days_ahead: 45,
        category: 'positive'
      }
    ];
    setPredictions(mockPredictions);
    if (mockPredictions.length > 0) setSelectedPrediction(mockPredictions[0]);
  };

  const generateForecastData = () => {
    const data: TimeSeriesForecast[] = Array.from({ length: 20 }, (_, i) => {
      const baseValue = 50 + i * 1.5;
      return {
        timestamp: new Date(Date.now() - (19 - i) * 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        actual: i < 10 ? baseValue + Math.random() * 10 : NaN,
        predicted: baseValue + (i >= 10 ? (i - 10) * 0.8 : Math.random() * 8),
        confidence_upper: baseValue + 15,
        confidence_lower: baseValue - 5
      };
    });
    setForecastData(data);
  };

  const generateAnomalies = () => {
    const mockAnomalies: AnomalyAlert[] = [
      {
        id: '1',
        type: 'Unusual Spike',
        severity: 'high',
        description: 'Sudden 35% increase in support tickets detected',
        detected_at: new Date(Date.now() - 2 * 60 * 60 * 1000),
        probability: 94.2
      },
      {
        id: '2',
        type: 'Pattern Deviation',
        severity: 'medium',
        description: 'Project timeline deviating from predicted path',
        detected_at: new Date(Date.now() - 5 * 60 * 60 * 1000),
        probability: 81.5
      },
      {
        id: '3',
        type: 'Behavior Change',
        severity: 'low',
        description: 'Slight variation in resource allocation patterns',
        detected_at: new Date(Date.now() - 8 * 60 * 60 * 1000),
        probability: 68.3
      }
    ];
    setAnomalies(mockAnomalies);
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'risk': 'bg-red-500/20 text-red-400 border-red-500/50',
      'warning': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
      'opportunity': 'bg-green-500/20 text-green-400 border-green-500/50',
      'positive': 'bg-purple-500/20 text-purple-400 border-purple-500/50'
    };
    return colors[category] || 'bg-gray-500/20 text-gray-400';
  };

  const radarData = predictions.map(p => ({
    metric: p.metric.split(' ')[0],
    confidence: p.confidence,
    change: Math.abs(p.predicted_value - p.current_value)
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-indigo-500/20">
            <Brain className="w-8 h-8 text-indigo-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold gradient-text">Precognition Engine</h1>
            <p className="text-gray-400">Predictive Analytics & Anomaly Detection</p>
          </div>
        </div>
        <button className="btn-secondary">
          <Settings className="w-4 h-4" />
        </button>
      </div>

      {/* Model Performance */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-6 bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">ML Model Accuracy</p>
            <h2 className="text-4xl font-bold text-indigo-400 mt-2">{modelAccuracy.toFixed(1)}%</h2>
            <p className="text-gray-400 text-sm mt-2">Based on {predictions.length} active predictions</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-white">5</p>
            <p className="text-sm text-gray-400">Prediction Models</p>
            <p className="text-xl font-bold text-green-400 mt-2">Active</p>
          </div>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Active Predictions</span>
            <Eye className="w-5 h-5 text-indigo-400" />
          </div>
          <p className="text-3xl font-bold text-white">{predictions.length}</p>
          <p className="text-xs text-gray-500 mt-1">Next 90 Days</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Anomalies Detected</span>
            <AlertCircle className="w-5 h-5 text-red-400" />
          </div>
          <p className="text-3xl font-bold text-white">{anomalies.length}</p>
          <p className="text-xs text-gray-500 mt-1">Requiring Attention</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Avg Confidence</span>
            <Gauge className="w-5 h-5 text-blue-400" />
          </div>
          <p className="text-3xl font-bold text-white">{(predictions.reduce((sum, p) => sum + p.confidence, 0) / predictions.length).toFixed(1)}%</p>
          <p className="text-xs text-gray-500 mt-1">Across Models</p>
        </motion.div>
      </div>

      {/* Forecast Chart */}
      <div className="card p-6">
        <h3 className="text-xl font-semibold text-white mb-6">Engagement Forecast (30-Day Prediction)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={forecastData}>
            <defs>
              <linearGradient id="forecastGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="timestamp" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #4f46e5' }} />
            <Area type="monotone" dataKey="confidence_upper" fill="transparent" stroke="none" />
            <Area type="monotone" dataKey="confidence_lower" fill="url(#forecastGrad)" stroke="none" />
            <Line type="monotone" dataKey="actual" stroke="#06b6d4" strokeWidth={2} name="Actual" />
            <Line type="monotone" dataKey="predicted" stroke="#4f46e5" strokeWidth={2} strokeDasharray="5 5" name="Predicted" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Predictions Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-indigo-400" />
          Predictive Insights
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-3">
          {predictions.map((pred) => (
            <motion.div
              key={pred.id}
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedPrediction(pred)}
              className={`card p-4 cursor-pointer transition-all border ${
                selectedPrediction?.id === pred.id ? 'border-indigo-500/75' : 'hover:border-indigo-500/50'
              } ${getCategoryColor(pred.category)}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs font-semibold">In {pred.days_ahead} days</p>
                  <p className="text-sm font-semibold">{pred.metric}</p>
                </div>
                {pred.trend === 'up' ? (
                  <ArrowUp className="w-5 h-5" />
                ) : pred.trend === 'down' ? (
                  <ArrowDown className="w-5 h-5" />
                ) : (
                  <Activity className="w-5 h-5" />
                )}
              </div>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-gray-400">Current: {pred.current_value.toFixed(1)}</p>
                  <p className="text-xs text-gray-400">Predicted: {pred.predicted_value.toFixed(1)}</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs">Confidence</span>
                  <span className="text-xs font-bold">{pred.confidence.toFixed(0)}%</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Anomalies */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <AlertCircle className="w-5 h-5 mr-2 text-red-400" />
          Detected Anomalies
        </h2>
        <div className="space-y-2">
          {anomalies.map((anomaly) => (
            <motion.div
              key={anomaly.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`card p-4 border-l-4 ${
                anomaly.severity === 'high' ? 'border-l-red-500 bg-red-500/5' :
                anomaly.severity === 'medium' ? 'border-l-yellow-500 bg-yellow-500/5' :
                'border-l-blue-500 bg-blue-500/5'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-semibold text-white">{anomaly.type}</p>
                  <p className="text-sm text-gray-400 mt-1">{anomaly.description}</p>
                  <p className="text-xs text-gray-500 mt-2">Detected {Math.floor((Date.now() - anomaly.detected_at.getTime()) / (60 * 60 * 1000))} hours ago</p>
                </div>
                <div className="text-right flex-shrink-0 ml-4">
                  <p className={`text-lg font-bold ${
                    anomaly.severity === 'high' ? 'text-red-400' :
                    anomaly.severity === 'medium' ? 'text-yellow-400' :
                    'text-blue-400'
                  }`}>{anomaly.probability.toFixed(1)}%</p>
                  <p className="text-xs text-gray-400">Probability</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Selected Prediction Details */}
      <AnimatePresence>
        {selectedPrediction && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="card p-6 border border-indigo-500/50"
          >
            <h3 className="text-xl font-semibold text-white mb-4">{selectedPrediction.metric} Prediction</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div>
                <p className="text-sm text-gray-400">Current Value</p>
                <p className="text-2xl font-bold text-white">{selectedPrediction.current_value.toFixed(1)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Predicted Value</p>
                <p className="text-2xl font-bold text-indigo-400">{selectedPrediction.predicted_value.toFixed(1)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Change</p>
                <p className={`text-2xl font-bold ${selectedPrediction.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                  {selectedPrediction.trend === 'up' ? '+' : ''}{(selectedPrediction.predicted_value - selectedPrediction.current_value).toFixed(1)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Confidence</p>
                <p className="text-2xl font-bold text-blue-400">{selectedPrediction.confidence.toFixed(1)}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Timeframe</p>
                <p className="text-2xl font-bold text-white">{selectedPrediction.days_ahead}d</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PrecognitionEngine;
