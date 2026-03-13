import React, { useState, useEffect, useRef } from 'react';
import { 
  Building2, Users, Activity, TrendingUp, AlertTriangle, Settings, 
  Play, Pause, RotateCw, Zap, Eye, Target, BarChart3,
  Clock, MapPin, Cpu, Database, Shield, Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

interface DigitalTwin {
  id: string;
  name: string;
  type: 'department' | 'process' | 'workflow' | 'service' | 'infrastructure';
  status: 'active' | 'simulating' | 'analyzing' | 'optimizing';
  accuracy: number;
  lastUpdated: Date;
  efficiency: number;
  costSavings: number;
  performance: {
    productivity: number;
    quality: number;
    speed: number;
    satisfaction: number;
  };
  predictions: {
    nextWeek: number;
    nextMonth: number;
    nextQuarter: number;
  };
}

interface SimulationScenario {
  id: string;
  title: string;
  description: string;
  type: 'policy_change' | 'resource_allocation' | 'workflow_optimization' | 'crisis_simulation';
  parameters: {
    variables: string[];
    constraints: string[];
    objectives: string[];
  };
  results: {
    baseline: number;
    simulated: number;
    improvement: number;
    confidence: number;
  };
  status: 'ready' | 'running' | 'completed' | 'failed';
}

interface OptimizationSuggestion {
  id: string;
  category: 'process' | 'resource' | 'workflow' | 'technology';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  implementation: {
    cost: number;
    time: number;
    difficulty: 'easy' | 'medium' | 'hard';
  };
  expectedROI: number;
}

const DigitalTwinSimulation = () => {
  const [selectedTwin, setSelectedTwin] = useState<DigitalTwin | null>(null);
  const [digitalTwins, setDigitalTwins] = useState<DigitalTwin[]>([]);
  const [simulationScenarios, setSimulationScenarios] = useState<SimulationScenario[]>([]);
  const [optimizations, setOptimizations] = useState<OptimizationSuggestion[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationProgress, setSimulationProgress] = useState(0);
  const [activeScenario, setActiveScenario] = useState<SimulationScenario | null>(null);

  useEffect(() => {
    generateDigitalTwins();
    generateSimulationScenarios();
    generateOptimizations();
    const interval = setInterval(updateDigitalTwins, 25000);
    return () => clearInterval(interval);
  }, []);

  const generateDigitalTwins = () => {
    const twins: DigitalTwin[] = [
      {
        id: '1',
        name: 'Revenue Department Operations',
        type: 'department',
        status: 'active',
        accuracy: 94.2,
        lastUpdated: new Date(),
        efficiency: 87.5,
        costSavings: 234000,
        performance: {
          productivity: 82,
          quality: 91,
          speed: 78,
          satisfaction: 89
        },
        predictions: {
          nextWeek: 89,
          nextMonth: 91,
          nextQuarter: 93
        }
      },
      {
        id: '2',
        name: 'Citizen Service Workflow',
        type: 'workflow',
        status: 'simulating',
        accuracy: 91.8,
        lastUpdated: new Date(),
        efficiency: 79.3,
        costSavings: 156000,
        performance: {
          productivity: 75,
          quality: 88,
          speed: 82,
          satisfaction: 92
        },
        predictions: {
          nextWeek: 81,
          nextMonth: 85,
          nextQuarter: 88
        }
      },
      {
        id: '3',
        name: 'Infrastructure Management',
        type: 'infrastructure',
        status: 'analyzing',
        accuracy: 96.1,
        lastUpdated: new Date(),
        efficiency: 91.2,
        costSavings: 412000,
        performance: {
          productivity: 89,
          quality: 94,
          speed: 85,
          satisfaction: 87
        },
        predictions: {
          nextWeek: 92,
          nextMonth: 94,
          nextQuarter: 96
        }
      },
      {
        id: '4',
        name: 'Policy Implementation Process',
        type: 'process',
        status: 'optimizing',
        accuracy: 88.7,
        lastUpdated: new Date(),
        efficiency: 83.4,
        costSavings: 189000,
        performance: {
          productivity: 78,
          quality: 85,
          speed: 80,
          satisfaction: 83
        },
        predictions: {
          nextWeek: 85,
          nextMonth: 87,
          nextQuarter: 89
        }
      }
    ];

    setDigitalTwins(twins);
  };

  const generateSimulationScenarios = () => {
    const scenarios: SimulationScenario[] = [
      {
        id: '1',
        title: 'Digital Services Expansion',
        description: 'Simulate impact of expanding digital services to rural areas',
        type: 'policy_change',
        parameters: {
          variables: ['Service Coverage', 'Resource Allocation', 'Technology Investment'],
          constraints: ['Budget Limits', 'Infrastructure Capacity'],
          objectives: ['Maximize Reach', 'Minimize Costs', 'Ensure Quality']
        },
        results: {
          baseline: 65,
          simulated: 82,
          improvement: 26.2,
          confidence: 87
        },
        status: 'ready'
      },
      {
        id: '2',
        title: 'Staff Reallocation Strategy',
        description: 'Optimize staff distribution across departments',
        type: 'resource_allocation',
        parameters: {
          variables: ['Staff Skills', 'Workload Distribution', 'Service Demand'],
          constraints: ['Union Regulations', 'Minimum Staffing Levels'],
          objectives: ['Balance Workload', 'Improve Efficiency', 'Reduce Costs']
        },
        results: {
          baseline: 71,
          simulated: 86,
          improvement: 21.1,
          confidence: 92
        },
        status: 'ready'
      },
      {
        id: '3',
        title: 'Emergency Response Protocol',
        description: 'Test emergency response under various crisis scenarios',
        type: 'crisis_simulation',
        parameters: {
          variables: ['Response Time', 'Resource Deployment', 'Coordination Efficiency'],
          constraints: ['Available Resources', 'Geographic Limitations'],
          objectives: ['Minimize Response Time', 'Maximize Coverage', 'Ensure Safety']
        },
        results: {
          baseline: 58,
          simulated: 79,
          improvement: 36.2,
          confidence: 78
        },
        status: 'ready'
      }
    ];

    setSimulationScenarios(scenarios);
  };

  const generateOptimizations = () => {
    const suggestions: OptimizationSuggestion[] = [
      {
        id: '1',
        category: 'process',
        title: 'Automate Document Processing',
        description: 'Implement AI-powered document processing and validation',
        impact: 'high',
        implementation: {
          cost: 250000,
          time: 6,
          difficulty: 'medium'
        },
        expectedROI: 185
      },
      {
        id: '2',
        category: 'resource',
        title: 'Optimize Meeting Schedules',
        description: 'AI-driven meeting scheduling and room allocation',
        impact: 'medium',
        implementation: {
          cost: 75000,
          time: 3,
          difficulty: 'easy'
        },
        expectedROI: 142
      },
      {
        id: '3',
        category: 'workflow',
        title: 'Implement Digital Signatures',
        description: 'Replace physical signatures with blockchain-based digital signatures',
        impact: 'high',
        implementation: {
          cost: 180000,
          time: 4,
          difficulty: 'medium'
        },
        expectedROI: 220
      },
      {
        id: '4',
        category: 'technology',
        title: 'Upgrade Network Infrastructure',
        description: 'Deploy 5G network for improved connectivity',
        impact: 'high',
        implementation: {
          cost: 450000,
          time: 8,
          difficulty: 'hard'
        },
        expectedROI: 167
      }
    ];

    setOptimizations(suggestions);
  };

  const updateDigitalTwins = () => {
    setDigitalTwins(prev => prev.map(twin => ({
      ...twin,
      performance: {
        productivity: Math.max(0, Math.min(100, twin.performance.productivity + (Math.random() - 0.5) * 5)),
        quality: Math.max(0, Math.min(100, twin.performance.quality + (Math.random() - 0.5) * 3)),
        speed: Math.max(0, Math.min(100, twin.performance.speed + (Math.random() - 0.5) * 4)),
        satisfaction: Math.max(0, Math.min(100, twin.performance.satisfaction + (Math.random() - 0.5) * 2))
      },
      costSavings: twin.costSavings + Math.floor(Math.random() * 5000) - 2500
    })));
  };

  const runSimulation = (scenario: SimulationScenario) => {
    setActiveScenario(scenario);
    setIsSimulating(true);
    setSimulationProgress(0);

    const interval = setInterval(() => {
      setSimulationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSimulating(false);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const getTwinIcon = (type: DigitalTwin['type']) => {
    switch (type) {
      case 'department': return Building2;
      case 'process': return Activity;
      case 'workflow': return Target;
      case 'service': return Users;
      case 'infrastructure': return Database;
      default: return Globe;
    }
  };

  const getStatusColor = (status: DigitalTwin['status']) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-500/20';
      case 'simulating': return 'text-blue-400 bg-blue-500/20';
      case 'analyzing': return 'text-yellow-400 bg-yellow-500/20';
      case 'optimizing': return 'text-purple-400 bg-purple-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getImpactColor = (impact: OptimizationSuggestion['impact']) => {
    switch (impact) {
      case 'high': return 'text-red-400 bg-red-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'low': return 'text-green-400 bg-green-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const performanceTrend = [
    { time: 'Jan', efficiency: 75, quality: 82, productivity: 78 },
    { time: 'Feb', efficiency: 78, quality: 84, productivity: 81 },
    { time: 'Mar', efficiency: 82, quality: 86, productivity: 85 },
    { time: 'Apr', efficiency: 85, quality: 88, productivity: 87 },
    { time: 'May', efficiency: 87, quality: 91, productivity: 89 },
    { time: 'Jun', efficiency: 91, quality: 94, productivity: 92 }
  ];

  const predictionData = [
    { scenario: 'Current', accuracy: 88, efficiency: 82, cost: 100 },
    { scenario: 'Optimized', accuracy: 94, efficiency: 91, cost: 85 },
    { scenario: 'AI-Enhanced', accuracy: 97, efficiency: 95, cost: 78 }
  ];

  const resourceUtilization = [
    { resource: 'Staff', current: 78, optimal: 85, efficiency: 92 },
    { resource: 'Infrastructure', current: 65, optimal: 80, efficiency: 81 },
    { resource: 'Technology', current: 82, optimal: 90, efficiency: 91 },
    { resource: 'Budget', current: 71, optimal: 88, efficiency: 81 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 rounded-2xl box-shadow-glow">
            <Cpu className="w-8 h-8 text-blue-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold gradient-text">Digital Twin Simulation</h1>
            <p className="text-gray-400">Government Office Virtual Replicas</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 px-3 py-1 rounded-lg ${
            isSimulating ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-500/20 text-gray-400'
          }`}>
            <Activity className="w-4 h-4" />
            <span className="font-semibold">{isSimulating ? 'Simulating' : 'Ready'}</span>
          </div>
        </div>
      </div>

      {/* Digital Twins Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <Building2 className="w-5 h-5 mr-2 text-blue-400" />
          Active Digital Twins
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {digitalTwins.map((twin) => {
            const Icon = getTwinIcon(twin.type);
            return (
              <motion.div
                key={twin.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02 }}
                className="card p-6 cursor-pointer hover:border-blue-500/50"
                onClick={() => setSelectedTwin(twin)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <Icon className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{twin.name}</h3>
                      <p className="text-sm text-gray-400 capitalize">{twin.type}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded ${getStatusColor(twin.status)}`}>
                    {twin.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Accuracy</p>
                    <p className="text-lg font-bold text-green-400">{twin.accuracy}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Efficiency</p>
                    <p className="text-lg font-bold text-blue-400">{twin.efficiency}%</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-400 mb-2">Performance Metrics</p>
                  <div className="space-y-2">
                    {Object.entries(twin.performance).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center">
                        <span className="text-sm text-gray-300 capitalize">{key}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: `${value}%` }}
                            />
                          </div>
                          <span className="text-sm font-bold text-white">{value}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-700">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">Cost Savings</span>
                    <span className="text-lg font-bold text-green-400">₹{twin.costSavings.toLocaleString()}</span>
                  </div>
                  <div className="text-xs text-gray-400">
                    Last updated: {twin.lastUpdated.toLocaleString()}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Simulation Scenarios */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <Target className="w-5 h-5 mr-2 text-purple-400" />
          Simulation Scenarios
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {simulationScenarios.map((scenario) => (
            <motion.div
              key={scenario.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white">{scenario.title}</h3>
                <span className={`px-2 py-1 text-xs rounded ${
                  scenario.status === 'ready' ? 'bg-green-500/20 text-green-400' :
                  scenario.status === 'running' ? 'bg-blue-500/20 text-blue-400' :
                  scenario.status === 'completed' ? 'bg-purple-500/20 text-purple-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  {scenario.status}
                </span>
              </div>

              <p className="text-sm text-gray-300 mb-4">{scenario.description}</p>

              <div className="space-y-3 mb-4">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Type</p>
                  <p className="text-sm text-white capitalize">{scenario.type.replace('_', ' ')}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Expected Improvement</p>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-green-400">+{scenario.results.improvement}%</span>
                    <span className="text-xs text-gray-400">({scenario.results.confidence}% confidence)</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => runSimulation(scenario)}
                disabled={scenario.status === 'running'}
                className="btn-primary w-full"
              >
                {scenario.status === 'running' ? 'Simulating...' : 'Run Simulation'}
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Active Simulation Progress */}
      <AnimatePresence>
        {isSimulating && activeScenario && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="card p-6 border border-purple-500/50"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Simulation in Progress</h2>
              <button className="btn-secondary">
                <RotateCw className="w-4 h-4 mr-2" />
                Reset
              </button>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">{activeScenario.title}</h3>
              <div className="w-full bg-gray-700 rounded-full h-4">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${simulationProgress}%` }}
                />
              </div>
              <div className="text-center mt-2 text-sm text-gray-400">
                {simulationProgress}% Complete
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <p className="text-sm text-gray-400 mb-2">Baseline Performance</p>
                <p className="text-2xl font-bold text-white">{activeScenario.results.baseline}%</p>
              </div>
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <p className="text-sm text-gray-400 mb-2">Simulated Performance</p>
                <p className="text-2xl font-bold text-green-400">{activeScenario.results.simulated}%</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Analytics Dashboard */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Performance Trends */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Performance Trends</h2>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={performanceTrend}>
              <defs>
                <linearGradient id="efficiencyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
                </linearGradient>
                <linearGradient id="qualityGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#0f172a" />
              <XAxis dataKey="time" stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
              <YAxis stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0b1220', border: '1px solid #111827', borderRadius: 8 }}
                labelStyle={{ color: '#f1f5f9' }}
              />
              <Area type="monotone" dataKey="efficiency" stroke="#3b82f6" fill="url(#efficiencyGrad)" />
              <Area type="monotone" dataKey="quality" stroke="#10b981" fill="url(#qualityGrad)" />
              <Line type="monotone" dataKey="productivity" stroke="#f59e0b" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Resource Utilization */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Resource Utilization</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={resourceUtilization}>
              <CartesianGrid strokeDasharray="3 3" stroke="#0f172a" />
              <XAxis dataKey="resource" stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
              <YAxis stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0b1220', border: '1px solid #111827', borderRadius: 8 }}
                labelStyle={{ color: '#f1f5f9' }}
              />
              <Bar dataKey="current" fill="#3b82f6" />
              <Bar dataKey="optimal" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Optimization Suggestions */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <Zap className="w-5 h-5 mr-2 text-yellow-400" />
          AI Optimization Suggestions
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {optimizations.map((suggestion) => (
            <motion.div
              key={suggestion.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              className="card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white">{suggestion.title}</h3>
                <span className={`px-2 py-1 text-xs rounded ${getImpactColor(suggestion.impact)}`}>
                  {suggestion.impact} impact
                </span>
              </div>

              <p className="text-sm text-gray-300 mb-4">{suggestion.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <p className="text-gray-400 mb-1">Implementation Cost</p>
                  <p className="font-bold text-white">₹{suggestion.implementation.cost.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Expected ROI</p>
                  <p className="font-bold text-green-400">{suggestion.expectedROI}%</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Time Required</p>
                  <p className="font-bold text-blue-400">{suggestion.implementation.time} months</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Difficulty</p>
                  <p className="font-bold text-orange-400 capitalize">{suggestion.implementation.difficulty}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="btn-secondary flex-1">
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </button>
                <button className="btn-primary flex-1">
                  <Play className="w-4 h-4 mr-2" />
                  Implement
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DigitalTwinSimulation;
