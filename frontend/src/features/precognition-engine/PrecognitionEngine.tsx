import React, { useState, useEffect, useRef } from 'react';
import { 
  Brain, TrendingUp, Eye, Clock, Target, Zap, AlertTriangle,
  BarChart3, LineChart, Activity, Users, Calendar,
  Play, Pause, Settings, RefreshCw, CheckCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

interface PredictionModel {
  id: string;
  name: string;
  type: 'productivity' | 'resource_allocation' | 'policy_impact' | 'citizen_satisfaction' | 'workload_forecast';
  accuracy: number;
  confidence: number;
  timeframe: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  status: 'training' | 'active' | 'predicting' | 'completed';
  last_updated: Date;
  performance: {
    predictions_made: number;
    correct_predictions: number;
    accuracy_trend: 'improving' | 'stable' | 'declining';
  };
}

interface Prediction {
  id: string;
  model_id: string;
  target: string;
  predicted_value: number;
  confidence_interval: {
    lower: number;
    upper: number;
  };
  actual_value?: number;
  accuracy?: number;
  timestamp: Date;
  category: 'performance' | 'resource' | 'policy' | 'citizen_feedback';
  impact: 'high' | 'medium' | 'low';
}

interface ForecastScenario {
  id: string;
  title: string;
  description: string;
  variables: string[];
  timeframe: string;
  predictions: Prediction[];
  confidence_score: number;
  created_at: Date;
  status: 'active' | 'completed' | 'failed';
}

const PrecognitionEngine = () => {
  const [models, setModels] = useState<PredictionModel[]>([]);
  const [activeModel, setActiveModel] = useState<PredictionModel | null>(null);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [scenarios, setScenarios] = useState<ForecastScenario[]>([]);
  const [isPredicting, setIsPredicting] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'daily' | 'weekly' | 'monthly' | 'quarterly'>('monthly');
  const [predictionAccuracy, setPredictionAccuracy] = useState(87.3);

  useEffect(() => {
    generatePredictionModels();
    generatePredictions();
    generateScenarios();
    const interval = setInterval(updatePredictions, 30000);
    return () => clearInterval(interval);
  }, []);

  const generatePredictionModels = () => {
    const mockModels: PredictionModel[] = [
      {
        id: '1',
        name: 'Productivity Forecast Engine',
        type: 'productivity',
        accuracy: 92.1,
        confidence: 88.7,
        timeframe: 'weekly',
        status: 'active',
        last_updated: new Date(),
        performance: {
          predictions_made: 1247,
          correct_predictions: 1149,
          accuracy_trend: 'improving'
        }
      },
      {
        id: '2',
        name: 'Resource Allocation Predictor',
        type: 'resource_allocation',
        accuracy: 89.3,
        confidence: 85.2,
        timeframe: 'monthly',
        status: 'active',
        last_updated: new Date(),
        performance: {
          predictions_made: 892,
          correct_predictions: 796,
          accuracy_trend: 'stable'
        }
      },
      {
        id: '3',
        name: 'Policy Impact Analyzer',
        type: 'policy_impact',
        accuracy: 94.5,
        confidence: 91.3,
        timeframe: 'quarterly',
        status: 'active',
        last_updated: new Date(),
        performance: {
          predictions_made: 234,
          correct_predictions: 221,
          accuracy_trend: 'improving'
        }
      },
      {
        id: '4',
        name: 'Citizen Satisfaction Forecaster',
        type: 'citizen_satisfaction',
        accuracy: 87.8,
        confidence: 83.4,
        timeframe: 'monthly',
        status: 'training',
        last_updated: new Date(),
        performance: {
          predictions_made: 567,
          correct_predictions: 498,
          accuracy_trend: 'declining'
        }
      },
      {
        id: '5',
        name: 'Workload Balancer',
        type: 'workload_forecast',
        accuracy: 90.2,
        confidence: 86.9,
        timeframe: 'weekly',
        status: 'active',
        last_updated: new Date(),
        performance: {
          predictions_made: 1456,
          correct_predictions: 1314,
          accuracy_trend: 'improving'
        }
      }
    ];

    setModels(mockModels);
  };

  const generatePredictions = () => {
    const mockPredictions: Prediction[] = [
      {
        id: '1',
        model_id: '1',
        target: 'Department Productivity',
        predicted_value: 87.4,
        confidence_interval: {
          lower: 82.1,
          upper: 92.7
        },
        actual_value: 85.2,
        accuracy: 97.7,
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        category: 'performance',
        impact: 'high'
      },
      {
        id: '2',
        model_id: '2',
        target: 'Resource Utilization',
        predicted_value: 78.9,
        confidence_interval: {
          lower: 74.2,
          upper: 83.6
        },
        actual_value: 76.5,
        accuracy: 96.8,
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        category: 'resource',
        impact: 'medium'
      },
      {
        id: '3',
        model_id: '3',
        target: 'Policy Implementation Success',
        predicted_value: 91.3,
        confidence_interval: {
          lower: 87.8,
          upper: 94.8
        },
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
        category: 'policy',
        impact: 'high'
      },
      {
        id: '4',
        model_id: '4',
        target: 'Citizen Satisfaction Index',
        predicted_value: 82.7,
        confidence_interval: {
          lower: 78.9,
          upper: 86.5
        },
        actual_value: 84.1,
        accuracy: 98.3,
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
        category: 'citizen_feedback',
        impact: 'high'
      },
      {
        id: '5',
        model_id: '5',
        target: 'Team Workload Distribution',
        predicted_value: 73.2,
        confidence_interval: {
          lower: 69.8,
          upper: 76.6
        },
        actual_value: 71.4,
        accuracy: 97.5,
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
        category: 'performance',
        impact: 'medium'
      }
    ];

    setPredictions(mockPredictions);
  };

  const generateScenarios = () => {
    const mockScenarios: ForecastScenario[] = [
      {
        id: '1',
        title: 'Digital Transformation Impact',
        description: 'Predict the impact of digital transformation initiatives on department performance',
        variables: ['Digital Adoption Rate', 'Training Investment', 'Technology Infrastructure', 'Change Management'],
        timeframe: 'Quarterly Forecast',
        predictions: [],
        confidence_score: 89.2,
        created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        status: 'active'
      },
      {
        id: '2',
        title: 'Resource Optimization Strategy',
        description: 'Forecast optimal resource allocation based on historical patterns and future demands',
        variables: ['Staff Skills', 'Workload Patterns', 'Budget Constraints', 'Service Demands'],
        timeframe: 'Monthly Prediction',
        predictions: [],
        confidence_score: 85.7,
        created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        status: 'active'
      },
      {
        id: '3',
        title: 'Policy Change Simulation',
        description: 'Simulate the impact of proposed policy changes on citizen satisfaction and efficiency',
        variables: ['Policy Parameters', 'Citizen Demographics', 'Economic Factors', 'Implementation Timeline'],
        timeframe: '6-Month Projection',
        predictions: [],
        confidence_score: 82.4,
        created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        status: 'completed'
      }
    ];

    setScenarios(mockScenarios);
  };

  const updatePredictions = () => {
    setPredictions(prev => prev.map(pred => ({
      ...pred,
      actual_value: pred.actual_value || Math.floor(Math.random() * 20) + 70,
      accuracy: pred.actual_value ? Math.abs(pred.predicted_value - pred.actual_value) / pred.predicted_value * 100 : 95
    })));
    
    setPredictionAccuracy(prev => Math.min(99, prev + (Math.random() - 0.5) * 2));
  };

  const runPrediction = (model: PredictionModel) => {
    setActiveModel(model);
    setIsPredicting(true);

    setTimeout(() => {
      const newPrediction: Prediction = {
        id: Date.now().toString(),
        model_id: model.id,
        target: 'Real-time Performance Metric',
        predicted_value: Math.floor(Math.random() * 30) + 70,
        confidence_interval: {
          lower: 65,
          upper: 95
        },
        timestamp: new Date(),
        category: model.type === 'productivity' ? 'performance' : 'resource',
        impact: 'high'
      };

      setPredictions(prev => [newPrediction, ...prev.slice(0, 9)]);
      setIsPredicting(false);
    }, 3000);
  };

  const getModelStatusColor = (status: PredictionModel['status']) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-500/20';
      case 'training': return 'text-blue-400 bg-blue-500/20';
      case 'predicting': return 'text-yellow-400 bg-yellow-500/20';
      case 'completed': return 'text-purple-400 bg-purple-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 95) return 'text-green-400';
    if (accuracy >= 90) return 'text-blue-400';
    if (accuracy >= 85) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getImpactColor = (impact: Prediction['impact']) => {
    switch (impact) {
      case 'high': return 'text-red-400 bg-red-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'low': return 'text-green-400 bg-green-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const accuracyTrendData = [
    { month: 'Jan', accuracy: 82.3, predictions: 145 },
    { month: 'Feb', accuracy: 84.7, predictions: 178 },
    { month: 'Mar', accuracy: 86.9, predictions: 203 },
    { month: 'Apr', accuracy: 88.2, predictions: 234 },
    { month: 'May', accuracy: 89.5, predictions: 267 },
    { month: 'Jun', accuracy: 91.1, predictions: 289 }
  ];

  const predictionAccuracyData = [
    { model: 'Productivity', current: 92.1, target: 95, improvement: 3.1 },
    { model: 'Resource Allocation', current: 89.3, target: 92, improvement: 3.0 },
    { model: 'Policy Impact', current: 94.5, target: 96, improvement: 1.6 },
    { model: 'Citizen Satisfaction', current: 87.8, target: 90, improvement: 2.5 },
    { model: 'Workload Forecast', current: 90.2, target: 93, improvement: 3.1 }
  ];

  const confidenceDistribution = [
    { range: '90-100%', count: 234, color: '#10b981' },
    { range: '80-89%', count: 456, color: '#3b82f6' },
    { range: '70-79%', count: 189, color: '#f59e0b' },
    { range: '60-69%', count: 78, color: '#ef4444' },
    { range: 'Below 60%', count: 23, color: '#6b7280' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl box-shadow-glow" style={{
            background: 'linear-gradient(135deg, #3b82f630, #8b5cf630)'
          }}>
            <Brain className="w-8 h-8 text-blue-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold gradient-text">Precognition Engine</h1>
            <p className="text-gray-300">Advanced Forecasting & Prediction</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 px-3 py-1 rounded-lg ${
            isPredicting ? 'bg-yellow-500/20 text-yellow-400' : 'bg-gray-500/20 text-gray-400'
          }`}>
            <Eye className="w-4 h-4" />
            <span className="font-semibold">{isPredicting ? 'Predicting' : 'Ready'}</span>
          </div>
          <button className="btn-secondary">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Overall Accuracy */}
      <div className="card p-6 border border-blue-500/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Target className="w-6 h-6 text-blue-400" />
            <div>
              <h2 className="text-xl font-semibold text-white">Overall Prediction Accuracy</h2>
              <p className="text-sm text-gray-400">Across all prediction models</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-blue-400">{predictionAccuracy.toFixed(1)}%</div>
            <p className="text-sm text-gray-400">Average Accuracy</p>
          </div>
        </div>
      </div>

      {/* Prediction Models */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <BarChart3 className="w-5 h-5 mr-2 text-blue-400" />
          Prediction Models
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {models.map((model) => (
            <motion.div
              key={model.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              className="card p-6 cursor-pointer hover:border-blue-500/50"
              onClick={() => runPrediction(model)}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-white">{model.name}</h3>
                  <p className="text-sm text-gray-400 capitalize">{model.type.replace('_', ' ')}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded ${getModelStatusColor(model.status)}`}>
                  {model.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-400">Accuracy</p>
                  <p className={`text-lg font-bold ${getAccuracyColor(model.accuracy)}`}>
                    {model.accuracy.toFixed(1)}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Confidence</p>
                  <p className="text-lg font-bold text-blue-400">{model.confidence.toFixed(1)}%</p>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-400">
                  <p>Predictions: {model.performance.predictions_made}</p>
                  <p>Correct: {model.performance.correct_predictions}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">Trend</p>
                  <p className={`text-sm font-semibold ${
                    model.performance.accuracy_trend === 'improving' ? 'text-green-400' :
                    model.performance.accuracy_trend === 'stable' ? 'text-yellow-400' :
                    'text-red-400'
                  }`}>
                    {model.performance.accuracy_trend}
                  </p>
                </div>
              </div>

              <button className="btn-primary w-full mt-4">
                <Play className="w-4 h-4 mr-2" />
                Run Prediction
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Predictions */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
          Recent Predictions
        </h2>
        <div className="space-y-3">
          {predictions.map((prediction) => (
            <motion.div
              key={prediction.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-white">{prediction.target}</h3>
                  <p className="text-sm text-gray-400 capitalize">{prediction.category}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded ${getImpactColor(prediction.impact)}`}>
                  {prediction.impact.toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-400">Predicted</p>
                  <p className="text-lg font-bold text-white">{prediction.predicted_value.toFixed(1)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Actual</p>
                  <p className="text-lg font-bold text-green-400">
                    {prediction.actual_value ? prediction.actual_value.toFixed(1) : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Accuracy</p>
                  <p className={`text-lg font-bold ${getAccuracyColor(prediction.accuracy || 0)}`}>
                    {prediction.accuracy ? prediction.accuracy.toFixed(1) + '%' : 'N/A'}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">Confidence Interval</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">Lower:</span>
                    <span className="text-sm font-bold text-blue-400">{prediction.confidence_interval.lower.toFixed(1)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">Upper:</span>
                    <span className="text-sm font-bold text-blue-400">{prediction.confidence_interval.upper.toFixed(1)}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-400">{prediction.timestamp.toLocaleString()}</p>
                <button className="btn-secondary text-sm">
                  <RefreshCw className="w-3 h-3 mr-1" />
                  Refresh
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Forecast Scenarios */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-purple-400" />
          Forecast Scenarios
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {scenarios.map((scenario) => (
            <motion.div
              key={scenario.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className="card p-6 cursor-pointer hover:border-purple-500/50"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white">{scenario.title}</h3>
                <span className={`px-2 py-1 text-xs rounded ${
                  scenario.status === 'active' ? 'bg-green-500/20 text-green-400' :
                  scenario.status === 'completed' ? 'bg-blue-500/20 text-blue-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  {scenario.status}
                </span>
              </div>

              <p className="text-sm text-gray-300 mb-4">{scenario.description}</p>

              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">Variables</p>
                <div className="flex flex-wrap gap-2">
                  {scenario.variables.map((variable, index) => (
                    <span key={index} className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded">
                      {variable}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-400">Timeframe</p>
                  <p className="text-sm font-bold text-white">{scenario.timeframe}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Confidence</p>
                  <p className="text-sm font-bold text-purple-400">{scenario.confidence_score.toFixed(1)}%</p>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-400">{scenario.created_at.toLocaleDateString()}</p>
                <button className="btn-primary">
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Analytics Dashboard */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Accuracy Trend */}
        <div className="card p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Prediction Accuracy Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={accuracyTrendData}>
              <defs>
                <linearGradient id="accuracyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
              <YAxis stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0b1220', border: '1px solid #3b82f650', borderRadius: 8 }}
                labelStyle={{ color: '#f1f5f9' }}
              />
              <Area type="monotone" dataKey="accuracy" stroke="#3b82f6" fill="url(#accuracyGrad)" />
              <Line type="monotone" dataKey="predictions" stroke="#8b5cf6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Model Performance */}
        <div className="card p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Model Performance Comparison</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={predictionAccuracyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="model" stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
              <YAxis stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0b1220', border: '1px solid #3b82f650', borderRadius: 8 }}
                labelStyle={{ color: '#f1f5f9' }}
              />
              <Bar dataKey="current" fill="#3b82f6" />
              <Bar dataKey="target" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Confidence Distribution */}
      <div className="card p-6">
        <h3 className="text-xl font-semibold text-white mb-6">Confidence Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={confidenceDistribution}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="range" stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
            <YAxis stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
            <Tooltip
              contentStyle={{ backgroundColor: '#0b1220', border: '1px solid #3b82f650', borderRadius: 8 }}
              labelStyle={{ color: '#f1f5f9' }}
            />
            <Bar dataKey="count" fill="#8b5cf6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PrecognitionEngine;
