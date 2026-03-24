import React, { useState, useEffect, useRef } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useEnterpriseData } from '../../lib/useEnterpriseData';
import { 
  Monitor, Headphones, Award, Target, Zap, Play, Pause, RotateCw, 
  Settings, Volume2, Maximize2, Users, Clock, Star, TrendingUp,
  BookOpen, CheckCircle, AlertCircle, Lightbulb, Gamepad2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface TrainingModule {
  id: string;
  title: string;
  category: 'compliance' | 'technical' | 'leadership' | 'citizen_service' | 'emergency';
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  duration: number;
  participants: number;
  rating: number;
  isVR: boolean;
  isAR: boolean;
  description: string;
  learningObjectives: string[];
  prerequisites: string[];
}

interface SimulationSession {
  id: string;
  moduleId: string;
  startTime: Date;
  progress: number;
  score: number;
  performance: {
    accuracy: number;
    speed: number;
    decisionMaking: number;
    collaboration: number;
  };
  status: 'not_started' | 'in_progress' | 'completed' | 'failed';
  feedback: string[];
}

interface TrainingStats {
  totalSessions: number;
  completedModules: number;
  averageScore: number;
  totalTime: number;
  skillImprovement: number;
  certificationLevel: string;
  ranking: number;
}

const ARVRTraining = () => {
  const { user } = useAuthStore();
  const { data: arvrData } = useEnterpriseData('ar-vr-training', user?.id);

  const [selectedModule, setSelectedModule] = useState<TrainingModule | null>(null);
  const [trainingModules, setTrainingModules] = useState<TrainingModule[]>([]);
  const [activeSession, setActiveSession] = useState<SimulationSession | null>(null);
  const [isVRMode, setIsVRMode] = useState(false);
  const [isARMode, setIsARMode] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trainingStats, setTrainingStats] = useState<TrainingStats>({
    totalSessions: 47,
    completedModules: 12,
    averageScore: 85,
    totalTime: 234,
    skillImprovement: 23,
    certificationLevel: 'Advanced',
    ranking: 15
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (arvrData) {
      const data = arvrData
      
      const modules: TrainingModule[] = [
        {
          id: '1',
          title: 'VR Governance Protocol Training',
          category: 'compliance',
          difficulty: 'beginner',
          duration: 45,
          participants: Math.floor((data?.team_size || 5) * 20),
          rating: Math.round((data?.avg_kpi || 0.75) * 5),
          isVR: true,
          isAR: false,
          description: 'Learn governance protocols in VR environment',
          learningObjectives: ['Understand protocols', 'Apply best practices'],
          prerequisites: []
        },
        {
          id: '2',
          title: 'AR Performance Analysis',
          category: 'technical',
          difficulty: 'intermediate',
          duration: 60,
          participants: Math.floor((data?.team_size || 5) * 15),
          rating: Math.round((data?.performance_score || 0.75) * 5),
          isVR: false,
          isAR: true,
          description: 'Analyze performance metrics in AR',
          learningObjectives: ['Analyze data', 'Create reports'],
          prerequisites: ['Basics']
        }
      ];
      
      setTrainingModules(modules);
      if (modules.length > 0) setSelectedModule(modules[0]);
      
      const stats: TrainingStats = {
        totalSessions: Math.floor((data?.performance_score || 0.75) * 100),
        completedModules: Math.floor((data?.performance_score || 0.75) * 20),
        averageScore: Math.round((data?.avg_kpi || 0.75) * 100),
        totalTime: Math.floor((data?.performance_score || 0.75) * 300),
        skillImprovement: Math.round((data?.avg_kpi || 0.75) * 50),
        certificationLevel: (data?.performance_score || 0.75) > 0.8 ? 'Advanced' : 'Intermediate',
        ranking: Math.floor(Math.random() * 50) + 1
      };
      
      setTrainingStats(stats);
    }
  }, [arvrData]);

  const generateTrainingModules = () => {
    const modules: TrainingModule[] = [
      {
        id: '1',
        title: 'Emergency Response Protocol',
        category: 'emergency',
        difficulty: 'advanced',
        duration: 45,
        participants: 25,
        rating: 4.8,
        isVR: true,
        isAR: false,
        description: 'Immersive emergency response training with realistic scenarios',
        learningObjectives: [
          'Master emergency protocols',
          'Improve decision making under pressure',
          'Coordinate with multiple agencies',
          'Manage citizen safety'
        ],
        prerequisites: ['Basic Safety Training', 'Crisis Management Foundation']
      },
      {
        id: '2',
        title: 'Citizen Service Excellence',
        category: 'citizen_service',
        difficulty: 'intermediate',
        duration: 30,
        participants: 15,
        rating: 4.6,
        isVR: true,
        isAR: true,
        description: 'Advanced citizen interaction skills with AI-powered feedback',
        learningObjectives: [
          'Enhance communication skills',
          'Handle difficult situations',
          'Digital service delivery',
          'Empathy and compassion'
        ],
        prerequisites: ['Basic Communication Skills']
      },
      {
        id: '3',
        title: 'Leadership in Crisis',
        category: 'leadership',
        difficulty: 'expert',
        duration: 60,
        participants: 10,
        rating: 4.9,
        isVR: true,
        isAR: false,
        description: 'Executive leadership simulation during organizational crises',
        learningObjectives: [
          'Strategic decision making',
          'Team motivation',
          'Resource allocation',
          'Stakeholder management'
        ],
        prerequisites: ['Leadership Essentials', 'Management Experience']
      },
      {
        id: '4',
        title: 'Digital Document Processing',
        category: 'technical',
        difficulty: 'beginner',
        duration: 20,
        participants: 30,
        rating: 4.2,
        isVR: false,
        isAR: true,
        description: 'AR-enhanced document processing and verification',
        learningObjectives: [
          'Digital signature validation',
          'Document authentication',
          'Process optimization',
          'Error detection'
        ],
        prerequisites: ['Basic Computer Skills']
      },
      {
        id: '5',
        title: 'Compliance & Ethics',
        category: 'compliance',
        difficulty: 'intermediate',
        duration: 40,
        participants: 20,
        rating: 4.7,
        isVR: true,
        isAR: true,
        description: 'Interactive compliance scenarios with ethical decision making',
        learningObjectives: [
          'Government regulations',
          'Ethical guidelines',
          'Conflict of interest',
          'Transparency protocols'
        ],
        prerequisites: ['Government Orientation']
      }
    ];

    setTrainingModules(modules);
  };

  const updateTrainingStats = () => {
    setTrainingStats(prev => ({
      ...prev,
      totalSessions: prev.totalSessions + 1,
      skillImprovement: Math.min(100, prev.skillImprovement + Math.random() * 2)
    }));
  };

  const startTraining = (module: TrainingModule) => {
    setSelectedModule(module);
    const session: SimulationSession = {
      id: Date.now().toString(),
      moduleId: module.id,
      startTime: new Date(),
      progress: 0,
      score: 0,
      performance: {
        accuracy: 0,
        speed: 0,
        decisionMaking: 0,
        collaboration: 0
      },
      status: 'in_progress',
      feedback: []
    };
    setActiveSession(session);
    setIsPlaying(true);
    
    // Initialize VR/AR mode
    if (module.isVR) setIsVRMode(true);
    if (module.isAR) setIsARMode(true);
  };

  const pauseTraining = () => {
    setIsPlaying(false);
  };

  const resumeTraining = () => {
    setIsPlaying(true);
  };

  const completeTraining = () => {
    if (activeSession) {
      const completedSession = {
        ...activeSession,
        progress: 100,
        score: Math.floor(Math.random() * 30) + 70,
        status: 'completed' as const,
        performance: {
          accuracy: Math.floor(Math.random() * 20) + 80,
          speed: Math.floor(Math.random() * 25) + 75,
          decisionMaking: Math.floor(Math.random() * 30) + 70,
          collaboration: Math.floor(Math.random() * 25) + 75
        },
        feedback: [
          'Excellent decision making under pressure',
          'Great team coordination',
          'Consider alternative approaches for complex scenarios'
        ]
      };
      setActiveSession(completedSession);
      setIsPlaying(false);
    }
  };

  const getCategoryIcon = (category: TrainingModule['category']) => {
    switch (category) {
      case 'compliance': return Award;
      case 'technical': return Monitor;
      case 'leadership': return Users;
      case 'citizen_service': return Target;
      case 'emergency': return AlertCircle;
      default: return BookOpen;
    }
  };

  const getDifficultyColor = (difficulty: TrainingModule['difficulty']) => {
    switch (difficulty) {
      case 'expert': return 'text-red-400 bg-red-500/20';
      case 'advanced': return 'text-orange-400 bg-orange-500/20';
      case 'intermediate': return 'text-yellow-400 bg-yellow-500/20';
      case 'beginner': return 'text-green-400 bg-green-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const performanceData = [
    { metric: 'Accuracy', current: 85, target: 95, improvement: 12 },
    { metric: 'Speed', current: 78, target: 90, improvement: 15 },
    { metric: 'Decision Making', current: 82, target: 88, improvement: 7 },
    { metric: 'Collaboration', current: 88, target: 92, improvement: 5 }
  ];

  const skillRadar = [
    { skill: 'Technical', current: 75, target: 90, fullMark: 100 },
    { skill: 'Communication', current: 82, target: 95, fullMark: 100 },
    { skill: 'Leadership', current: 68, target: 85, fullMark: 100 },
    { skill: 'Problem Solving', current: 79, target: 90, fullMark: 100 },
    { skill: 'Adaptability', current: 85, target: 92, fullMark: 100 },
    { skill: 'Ethics', current: 91, target: 95, fullMark: 100 }
  ];

  const categoryDistribution = [
    { name: 'Technical', value: 35, color: '#3b82f6' },
    { name: 'Leadership', value: 25, color: '#10b981' },
    { name: 'Compliance', value: 20, color: '#f59e0b' },
    { name: 'Emergency', value: 15, color: '#ef4444' },
    { name: 'Citizen Service', value: 5, color: '#8b5cf6' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-cyan-500/30 to-blue-500/30 rounded-2xl box-shadow-glow">
            <Headphones className="w-8 h-8 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold gradient-text">AR/VR Training Simulations</h1>
            <p className="text-gray-400">Immersive Learning Experience</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 px-3 py-1 rounded-lg ${
            isVRMode ? 'bg-purple-500/20 text-purple-400' : 'bg-gray-500/20 text-gray-400'
          }`}>
            <Monitor className="w-4 h-4" />
            <span className="font-semibold">VR</span>
          </div>
          <div className={`flex items-center gap-2 px-3 py-1 rounded-lg ${
            isARMode ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
          }`}>
            <Gamepad2 className="w-4 h-4" />
            <span className="font-semibold">AR</span>
          </div>
        </div>
      </div>

      {/* Training Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-4 text-center"
        >
          <div className="text-2xl font-bold text-cyan-400">{trainingStats.totalSessions}</div>
          <p className="text-sm text-gray-400">Total Sessions</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card p-4 text-center"
        >
          <div className="text-2xl font-bold text-green-400">{trainingStats.completedModules}</div>
          <p className="text-sm text-gray-400">Completed</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card p-4 text-center"
        >
          <div className="text-2xl font-bold text-purple-400">{trainingStats.averageScore}%</div>
          <p className="text-sm text-gray-400">Avg Score</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card p-4 text-center"
        >
          <div className="text-2xl font-bold text-orange-400">{trainingStats.totalTime}h</div>
          <p className="text-sm text-gray-400">Training Time</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card p-4 text-center"
        >
          <div className="text-2xl font-bold text-blue-400">+{trainingStats.skillImprovement}%</div>
          <p className="text-sm text-gray-400">Skill Growth</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card p-4 text-center"
        >
          <div className="text-2xl font-bold text-yellow-400">#{trainingStats.ranking}</div>
          <p className="text-sm text-gray-400">Ranking</p>
        </motion.div>
      </div>

      {/* Training Modules Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <BookOpen className="w-5 h-5 mr-2 text-cyan-400" />
          Training Modules
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trainingModules.map((module) => {
            const Icon = getCategoryIcon(module.category);
            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                className="card p-6 cursor-pointer hover:border-cyan-500/50"
                onClick={() => startTraining(module)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-cyan-500/20 rounded-lg">
                      <Icon className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{module.title}</h3>
                      <p className="text-sm text-gray-400 capitalize">{module.category.replace('_', ' ')}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-sm text-white">{module.rating}</span>
                  </div>
                </div>

                <p className="text-sm text-gray-300 mb-4">{module.description}</p>

                <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {module.duration} min
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {module.participants} max
                  </span>
                  <span className={`px-2 py-1 text-xs rounded ${getDifficultyColor(module.difficulty)}`}>
                    {module.difficulty}
                  </span>
                </div>

                <div className="flex gap-2">
                  {module.isVR && (
                    <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded">
                      <Monitor className="w-3 h-3 inline mr-1" />
                      VR
                    </span>
                  )}
                  {module.isAR && (
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">
                      <Gamepad2 className="w-3 h-3 inline mr-1" />
                      AR
                    </span>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-gray-700">
                  <p className="text-xs text-gray-400 mb-2">Learning Objectives:</p>
                  <div className="space-y-1">
                    {module.learningObjectives.slice(0, 2).map((objective, index) => (
                      <div key={index} className="flex items-center gap-2 text-xs text-gray-300">
                        <CheckCircle className="w-3 h-3 text-green-400" />
                        {objective}
                      </div>
                    ))}
                    {module.learningObjectives.length > 2 && (
                      <div className="text-xs text-gray-400">
                        +{module.learningObjectives.length - 2} more objectives
                      </div>
                    )}
                  </div>
                </div>

                <button className="btn-primary w-full mt-4">
                  <Play className="w-4 h-4 mr-2" />
                  Start Training
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Active Training Session */}
      <AnimatePresence>
        {activeSession && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="card p-6 border border-cyan-500/50"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Active Training Session</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={isPlaying ? pauseTraining : resumeTraining}
                  className="p-2 bg-cyan-500/20 rounded-lg text-cyan-400"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button className="p-2 bg-gray-500/20 rounded-lg text-gray-400">
                  <Settings className="w-4 h-4" />
                </button>
                <button className="p-2 bg-gray-500/20 rounded-lg text-gray-400">
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Simulation View */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white mb-4">Simulation View</h3>
                <div className="relative bg-gray-800 rounded-lg overflow-hidden" style={{ height: '300px' }}>
                  {/* Placeholder for AR/VR simulation */}
                  <canvas
                    ref={canvasRef}
                    className="w-full h-full"
                    style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #2d5a87 100%)' }}
                  />
                  <div className="absolute top-4 left-4 bg-black/50 text-white p-2 rounded">
                    <div className="text-xs">VR Mode: {isVRMode ? 'Active' : 'Inactive'}</div>
                    <div className="text-xs">AR Mode: {isARMode ? 'Active' : 'Inactive'}</div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-black/50 text-white p-2 rounded">
                      <div className="text-sm mb-2">Session Progress</div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-cyan-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${activeSession.progress}%` }}
                        />
                      </div>
                      <div className="text-xs mt-1 text-center">{activeSession.progress}% Complete</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white mb-4">Performance Metrics</h3>
                <div className="space-y-3">
                  {Object.entries(activeSession.performance).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center">
                      <span className="text-sm text-gray-400 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-cyan-500 h-2 rounded-full"
                            style={{ width: `${value}%` }}
                          />
                        </div>
                        <span className="text-sm font-bold text-white">{value}%</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-700">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">Current Score</span>
                    <span className="text-lg font-bold text-cyan-400">{activeSession.score}</span>
                  </div>
                  <button
                    onClick={completeTraining}
                    className="btn-primary w-full"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Complete Training
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Performance Analytics */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Performance Trends */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Performance Trends</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={performanceData}>
              <defs>
                <linearGradient id="currentGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.1" />
                </linearGradient>
                <linearGradient id="targetGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#0f172a" />
              <XAxis dataKey="metric" stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
              <YAxis stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0b1220', border: '1px solid #111827', borderRadius: 8 }}
                labelStyle={{ color: '#f1f5f9' }}
              />
              <Line type="monotone" dataKey="current" stroke="#06b6d4" strokeWidth={3} />
              <Line type="monotone" dataKey="target" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Skills Radar */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Skills Development</h2>
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart data={skillRadar}>
              <PolarGrid stroke="#374151" />
              <PolarAngleAxis dataKey="skill" stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#374151" tick={{ fill: '#6b7280' }} />
              <Radar name="Current" dataKey="current" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.3} strokeWidth={2} />
              <Radar name="Target" dataKey="target" stroke="#10b981" fill="#10b981" fillOpacity={0.2} strokeWidth={2} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0b1220', border: '1px solid #111827', borderRadius: 8 }}
                labelStyle={{ color: '#f1f5f9' }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Distribution */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Training Categories</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryDistribution}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({ name, value }) => `${name}: ${value}%`}
            >
              {categoryDistribution.map((entry, index) => (
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
    </div>
  );
};

export default ARVRTraining;
