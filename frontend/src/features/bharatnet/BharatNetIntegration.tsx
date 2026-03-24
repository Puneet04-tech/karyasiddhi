import React, { useState, useEffect } from 'react';
import { MessageSquare, Star, ThumbsUp, ThumbsDown, Users, TrendingUp, AlertCircle, CheckCircle, Phone, MessageCircle, Send, Globe, MapPin, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useAuthStore } from '../../store/authStore';
import { useRealTimeAnalytics, useRealTimeAllUsers } from '../../lib/useRealTimeData';

interface CitizenFeedback {
  id: string;
  citizenId: string;
  citizenName: string;
  department: string;
  officer: string;
  service: string;
  rating: number;
  sentiment: 'positive' | 'neutral' | 'negative';
  message: string;
  category: 'service_quality' | 'response_time' | 'staff_behavior' | 'infrastructure' | 'process_efficiency';
  timestamp: Date;
  location: string;
  resolved: boolean;
  response?: string;
}

interface ServiceMetrics {
  serviceName: string;
  totalFeedback: number;
  averageRating: number;
  responseTime: number;
  satisfactionRate: number;
  issuesResolved: number;
}

interface RealTimeAlert {
  id: string;
  type: 'negative_spike' | 'service_failure' | 'citizen_complaint' | 'praise_spike';
  severity: 'low' | 'medium' | 'high' | 'critical';
  department: string;
  message: string;
  citizenCount: number;
  timestamp: Date;
}

const BharatNetIntegration = () => {
  const { user } = useAuthStore();
  const { data: analyticsData, loading: analyticsLoading } = useRealTimeAnalytics(user?.id);
  const { data: allUsersData } = useRealTimeAllUsers();

  const [feedback, setFeedback] = useState<CitizenFeedback[]>([]);
  const [serviceMetrics, setServiceMetrics] = useState<ServiceMetrics[]>([]);
  const [realTimeAlerts, setRealTimeAlerts] = useState<RealTimeAlert[]>([]);
  const [isConnected, setIsConnected] = useState(true);
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');

  // Transform analytics and user data to BharatNet feedback
  useEffect(() => {
    if (analyticsData && allUsersData) {
      const analyticsArray = Array.isArray(analyticsData) ? analyticsData : [analyticsData];
      const data = analyticsArray[0];
      
      // Create feedback from user data
      const mockFeedback: CitizenFeedback[] = (Array.isArray(allUsersData) ? allUsersData : [allUsersData])
        .slice(0, 5)
        .map((user: any, index: number) => ({
          id: user.id || `${index}`,
          citizenId: `CIT${String(index + 1).padStart(3, '0')}`,
          citizenName: user.name || `Citizen ${index + 1}`,
          department: user.department || 'General',
          officer: user.name || 'Officer',
          service: ['Land Registration', 'Water Connection', 'Driving License', 'Tax Payment', 'Birth Certificate'][index % 5],
          rating: Math.min(5, Math.floor((user.performance_score || 0.7) * 6)),
          sentiment: (user.performance_score || 0.7) > 0.75 ? 'positive' : 'neutral' as const,
          message: `${(user.performance_score || 0.7) > 0.75 ? 'Excellent' : 'Good'} service experience with this department`,
          category: 'service_quality' as const,
          timestamp: new Date(),
          location: user.department || 'Regional Office',
          resolved: true,
          response: 'Thank you for your feedback!'
        }));

      // Create service metrics from analytics
      const mockMetrics: ServiceMetrics[] = [
        {
          serviceName: 'Performance Services',
          totalFeedback: Math.floor(Math.random() * 500) + 200,
          averageRating: Math.round((data?.performance_score || 0.7) * 4.5 * 10) / 10,
          responseTime: Math.floor(Math.random() * 100) + 24,
          satisfactionRate: Math.round((data?.avg_kpi || 0.75) * 100),
          issuesResolved: Math.floor(Math.random() * 300) + 100
        },
        {
          serviceName: 'Team Services',
          totalFeedback: Math.floor(Math.random() * 300) + 100,
          averageRating: Math.round((data?.avg_kpi || 0.75) * 4.5 * 10) / 10,
          responseTime: Math.floor(Math.random() * 80) + 32,
          satisfactionRate: Math.round((data?.performance_score || 0.7) * 95),
          issuesResolved: Math.floor(Math.random() * 200) + 80
        }
      ];

      setFeedback(mockFeedback);
      setServiceMetrics(mockMetrics);

      // Generate alerts based on performance
      const performanceThreshold = 0.7;
      if ((data?.performance_score || 0.7) < performanceThreshold) {
        const alertMessage: RealTimeAlert = {
          id: Date.now().toString(),
          type: 'service_failure',
          severity: 'high',
          department: user?.department || 'Operations',
          message: 'Service performance below threshold',
          citizenCount: Math.floor(Math.random() * 50) + 10,
          timestamp: new Date()
        };
        setRealTimeAlerts(prev => [alertMessage, ...prev].slice(0, 10));
      }
    }
  }, [analyticsData, allUsersData]);

  const connectToBharatNet = async () => {
    setIsConnecting(true);
    
    // Simulate BharatNet connection
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsConnected(true);
    setIsConnecting(false);
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-400 bg-green-500/20';
      case 'negative': return 'text-red-400 bg-red-500/20';
      case 'neutral': return 'text-yellow-400 bg-yellow-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'border-red-500 bg-red-500/10';
      case 'high': return 'border-orange-500 bg-orange-500/10';
      case 'medium': return 'border-yellow-500 bg-yellow-500/10';
      case 'low': return 'border-blue-500 bg-blue-500/10';
      default: return 'border-gray-500 bg-gray-500/10';
    }
  };

  const ratingDistribution = [
    { rating: '5 Star', count: feedback.filter(f => f.rating === 5).length, color: '#10b981' },
    { rating: '4 Star', count: feedback.filter(f => f.rating === 4).length, color: '#3b82f6' },
    { rating: '3 Star', count: feedback.filter(f => f.rating === 3).length, color: '#f59e0b' },
    { rating: '2 Star', count: feedback.filter(f => f.rating === 2).length, color: '#f97316' },
    { rating: '1 Star', count: feedback.filter(f => f.rating === 1).length, color: '#ef4444' }
  ];

  const sentimentTrend = [
    { time: '00:00', positive: 45, negative: 12, neutral: 23 },
    { time: '04:00', positive: 38, negative: 15, neutral: 27 },
    { time: '08:00', positive: 52, negative: 18, neutral: 30 },
    { time: '12:00', positive: 68, negative: 22, neutral: 35 },
    { time: '16:00', positive: 71, negative: 25, neutral: 32 },
    { time: '20:00', positive: 48, negative: 20, neutral: 28 }
  ];


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-blue-500/30 to-green-500/30 rounded-2xl box-shadow-glow">
            <Globe className="w-8 h-8 text-blue-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold gradient-text">BharatNet Integration</h1>
            <p className="text-gray-400">Real-time Citizen Feedback Loop</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 px-3 py-1 rounded-lg ${
            isConnected ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
          }`}>
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'} animate-pulse`} />
            {isConnected ? 'Connected' : 'Disconnected'}
          </div>
          {!isConnected && (
            <button
              onClick={connectToBharatNet}
              disabled={isConnecting}
              className="btn-primary"
            >
              {isConnecting ? 'Connecting...' : 'Connect to BharatNet'}
            </button>
          )}
        </div>
      </div>

      {/* Real-time Alerts */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white flex items-center">
            <AlertCircle className="w-5 h-5 mr-2 text-orange-400" />
            Real-time Alerts
          </h2>
          <span className="text-sm text-gray-400">{realTimeAlerts.length} active alerts</span>
        </div>
        
        <AnimatePresence>
          {realTimeAlerts.slice(0, 3).map((alert) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className={`card p-4 border ${getAlertColor(alert.severity)}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    alert.severity === 'critical' ? 'bg-red-500' :
                    alert.severity === 'high' ? 'bg-orange-500' :
                    alert.severity === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                  } animate-pulse`} />
                  <div>
                    <p className="font-semibold text-white capitalize">{alert.type.replace('_', ' ')}</p>
                    <p className="text-sm text-gray-400">
                      {alert?.department ? (typeof alert.department === 'object' ? alert.department.name : alert.department) : ''} • {alert.timestamp.toLocaleTimeString()} • {alert.citizenCount} citizens
                    </p>
                  </div>
                </div>
                <button className="btn-secondary text-sm">View Details</button>
              </div>
              <p className="text-gray-300 mt-2">{alert.message}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Service Metrics Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {serviceMetrics.slice(0, 4).map((metric, index) => (
          <motion.div
            key={metric.serviceName}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card p-4"
          >
            <h3 className="font-semibold text-white mb-2 text-sm">{metric.serviceName}</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Rating</span>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-400" />
                  <span className="text-sm font-bold text-white">{metric.averageRating}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Satisfaction</span>
                <span className="text-sm font-bold text-green-400">{metric.satisfactionRate}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Response Time</span>
                <span className="text-sm font-bold text-blue-400">{metric.responseTime}h</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Analytics Dashboard */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Rating Distribution */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
            <Star className="w-5 h-5 mr-2 text-yellow-400" />
            Rating Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={ratingDistribution}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="count"
                label={({ rating, count }) => `${rating}: ${count}`}
              >
                {ratingDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#0b1220', border: '1px solid #111827', borderRadius: 8 }}
                labelStyle={{ color: '#f1f5f9' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Sentiment Trend */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-blue-400" />
            Sentiment Trend (24h)
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={sentimentTrend}>
              <defs>
                <linearGradient id="positiveGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.1" />
                </linearGradient>
                <linearGradient id="negativeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#0f172a" />
              <XAxis dataKey="time" stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
              <YAxis stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0b1220', border: '1px solid #111827', borderRadius: 8 }}
                labelStyle={{ color: '#f1f5f9' }}
              />
              <Area type="monotone" dataKey="positive" stroke="#10b981" fill="url(#positiveGrad)" />
              <Area type="monotone" dataKey="negative" stroke="#ef4444" fill="url(#negativeGrad)" />
              <Line type="monotone" dataKey="neutral" stroke="#f59e0b" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Feedback */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white flex items-center">
            <MessageSquare className="w-5 h-5 mr-2 text-blue-400" />
            Recent Citizen Feedback
          </h2>
          <div className="flex gap-2">
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="input-field text-sm"
            >
              <option value="all">All Departments</option>
              <option value="revenue">Revenue</option>
              <option value="municipal">Municipal</option>
              <option value="transport">Transport</option>
            </select>
            <select
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="input-field text-sm"
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
          </div>
        </div>

        <div className="space-y-3">
          {feedback.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="card p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/30 to-green-500/30 flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{item.citizenName}</h3>
                    <p className="text-sm text-gray-400">
                      {item.service} • {item?.department ? (typeof item.department === 'object' ? item.department.name : item.department) : ''} • {item.location}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < item.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                      <span className={`px-2 py-1 text-xs rounded ${getSentimentColor(item.sentiment)}`}>
                        {item.sentiment}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">{item.timestamp.toLocaleString()}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {item.resolved ? (
                      <>
                        <CheckCircle className="w-3 h-3 text-green-400" />
                        <span className="text-xs text-green-400">Resolved</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-3 h-3 text-orange-400" />
                        <span className="text-xs text-orange-400">Pending</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <p className="text-gray-300 mb-4">{item.message}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    Officer: {item.officer}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3 h-3" />
                    {item.category.replace('_', ' ')}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button className="btn-secondary text-sm">
                    <ThumbsUp className="w-3 h-3 mr-1" />
                    Helpful
                  </button>
                  <button className="btn-secondary text-sm">
                    <Send className="w-3 h-3 mr-1" />
                    Respond
                  </button>
                </div>
              </div>

              {item.response && (
                <div className="mt-4 p-3 bg-gray-800/50 rounded-lg border-l-4 border-blue-500">
                  <p className="text-sm text-gray-400 mb-1">Official Response:</p>
                  <p className="text-sm text-gray-300">{item.response}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Integration Stats */}
      <div className="card p-6 border border-green-500/50">
        <div className="flex items-center gap-3 mb-4">
          <Heart className="w-6 h-6 text-green-400 animate-pulse" />
          <h2 className="text-xl font-semibold text-white">BharatNet Integration Impact</h2>
        </div>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">15,234</div>
            <p className="text-sm text-gray-400">Citizens Connected</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">89%</div>
            <p className="text-sm text-gray-400">Satisfaction Rate</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">4.2</div>
            <p className="text-sm text-gray-400">Average Rating</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">92%</div>
            <p className="text-sm text-gray-400">Issues Resolved</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BharatNetIntegration;
