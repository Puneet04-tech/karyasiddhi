import React, { useState, useEffect } from 'react';
import {
  Trophy, Star, Zap, Target, Award, Users, Activity, TrendingUp,
  Medal, Flame, Crown, Gift, Lock, Unlock, RefreshCw, BarChart3,
  Calendar, Clock, CheckCircle, AlertCircle, Settings, Play, Pause, User as UserIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { useAuthStore } from '../../store/authStore';
import { useRealTimeAnalytics, useRealTimeAllUsers } from '../../lib/useRealTimeData';

interface PlayerProfile {
  id: string;
  name: string;
  level: number;
  experience: number;
  total_points: number;
  rank: number;
  department: string;
  avatar_color: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  points: number;
  xp_value: number;
  category: 'performance' | 'leadership' | 'innovation' | 'collaboration' | 'milestone';
  progress: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlocked: boolean;
  unlocked_at?: Date;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  reward_points: number;
  reward_xp: number;
  status: 'available' | 'active' | 'completed';
  ends_at: Date;
  participants: number;
  progress: number;
}

interface Leaderboard {
  rank: number;
  user_name: string;
  department: string;
  total_points: number;
  level: number;
  badges_earned: number;
}

interface GamificationMetric {
  name: string;
  current: number;
  target: number;
  icon: React.ReactNode;
}

const EnhancedGamification: React.FC = () => {
  const { user } = useAuthStore();
  const { data: analyticsData, loading: analyticsLoading } = useRealTimeAnalytics(user?.id);
  const { data: allUsersData, loading: usersLoading } = useRealTimeAllUsers();

  const [playerProfile, setPlayerProfile] = useState<PlayerProfile>({
    id: user?.id || '1',
    name: user?.name || 'Employee',
    level: 12,
    experience: 2450,
    total_points: 15680,
    rank: 3,
    department: user?.department || 'IT',
    avatar_color: 'from-blue-500 to-purple-500'
  });

  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [leaderboard, setLeaderboard] = useState<Leaderboard[]>([]);
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);
  const [streak, setStreak] = useState(7);

  // Transform analytics data to player profile
  useEffect(() => {
    if (analyticsData) {
      const data = Array.isArray(analyticsData) ? analyticsData[0] : analyticsData;
      
      // Calculate player stats based on analytics
      const level = Math.floor((data?.performance_score || 0) * 20);
      const experience = Math.floor((data?.performance_score || 0) * 5000);
      
      setPlayerProfile(prev => ({
        ...prev,
        level: Math.max(1, level),
        experience: experience % 3000,
        total_points: Math.round((data?.performance_score || 0) * 25000),
        rank: Math.floor(Math.random() * 20) + 1
      }));

      // Generate achievements based on user data
      const mockAchievements: Achievement[] = [
        {
          id: '1',
          title: 'Quick Starter',
          description: 'Complete first 5 tasks',
          points: 100,
          xp_value: 50,
          category: 'milestone',
          progress: 100,
          rarity: 'common',
          unlocked: true,
          unlocked_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        },
        {
          id: '2',
          title: 'Rising Star',
          description: `Reach level ${level}`,
          points: 500,
          xp_value: 250,
          category: 'performance',
          progress: 100,
          rarity: 'rare',
          unlocked: level >= 10,
          unlocked_at: level >= 10 ? new Date(Date.now() - 15 * 24 * 60 * 60 * 1000) : undefined
        },
        {
          id: '3',
          title: 'Performance Master',
          description: `Maintain ${Math.round((data?.avg_kpi || 0) * 100)}% KPI`,
          points: 750,
          xp_value: 400,
          category: 'performance',
          progress: Math.round((data?.avg_kpi || 0) * 100),
          rarity: 'epic',
          unlocked: (data?.avg_kpi || 0) > 0.85
        },
        {
          id: '4',
          title: 'Team Player',
          description: `Lead team of ${data?.team_size || 0} members`,
          points: 600,
          xp_value: 350,
          category: 'collaboration',
          progress: Math.round(((data?.team_size || 0) / 20) * 100),
          rarity: 'epic',
          unlocked: (data?.team_size || 0) > 5
        }
      ];

      setAchievements(mockAchievements);

      // Generate challenges
      const mockChallenges: Challenge[] = [
        {
          id: '1',
          title: 'Performance Challenge',
          description: `Maintain ${Math.round((data?.avg_kpi || 0) * 100)}% KPI targets`,
          difficulty: 'medium',
          reward_points: 250,
          reward_xp: 150,
          status: 'active',
          ends_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          participants: Math.floor(Math.random() * 50) + 10,
          progress: Math.round((data?.avg_kpi || 0) * 100)
        },
        {
          id: '2',
          title: 'Team Excellence Sprint',
          description: `Lead your team to ${Math.round((data?.avg_kpi || 0) * 100)}% performance`,
          difficulty: 'hard',
          reward_points: 500,
          reward_xp: 300,
          status: 'active',
          ends_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
          participants: Math.floor(Math.random() * 30) + 5,
          progress: Math.round((data?.avg_kpi || 0) * 100)
        }
      ];

      setChallenges(mockChallenges);
    }
  }, [analyticsData]);

  // Transform all users data to leaderboard
  useEffect(() => {
    if (allUsersData && Array.isArray(allUsersData)) {
      const leaderboardData = allUsersData
        .map((u: any, index: number) => ({
          rank: index + 1,
          user_name: u.name || u.user_name || `User ${u.id}`,
          department: u.department || 'Operations',
          total_points: Math.round((u.performance_score || 0) * 25000),
          level: Math.floor((u.performance_score || 0) * 20),
          badges_earned: Math.floor(Math.random() * 15) + 5
        }))
        .sort((a: any, b: any) => b.total_points - a.total_points)
        .slice(0, 10);
      
      setLeaderboard(leaderboardData);
    }
  }, [allUsersData]);

  const experienceData = [
    { date: 'Mon', xp: 120, tasks: 5, achievements: 1 },
    { date: 'Tue', xp: 180, tasks: 7, achievements: 2 },
    { date: 'Wed', xp: 150, tasks: 6, achievements: 1 },
    { date: 'Thu', xp: 200, tasks: 8, achievements: 2 },
    { date: 'Fri', xp: 160, tasks: 7, achievements: 1 },
    { date: 'Sat', xp: 90, tasks: 4, achievements: 0 },
    { date: 'Sun', xp: 140, tasks: 5, achievements: 1 }
  ];

  const skillsData = [
    { skill: 'Leadership', value: 85 },
    { skill: 'Technical', value: 92 },
    { skill: 'Innovation', value: 78 },
    { skill: 'Communication', value: 88 },
    { skill: 'Teamwork', value: 90 },
    { skill: 'Problem Solving', value: 84 }
  ];

  const categoryData = [
    { name: 'Performance', value: 40, color: '#3b82f6' },
    { name: 'Leadership', value: 25, color: '#8b5cf6' },
    { name: 'Innovation', value: 20, color: '#f59e0b' },
    { name: 'Collaboration', value: 15, color: '#10b981' }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-500/20 text-gray-400';
      case 'rare': return 'bg-blue-500/20 text-blue-400';
      case 'epic': return 'bg-purple-500/20 text-purple-400';
      case 'legendary': return 'bg-yellow-500/20 text-yellow-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'hard': return 'text-orange-400';
      case 'expert': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20">
            <Trophy className="w-8 h-8 text-yellow-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold gradient-text">Enhanced Gamification</h1>
            <p className="text-gray-400">Points, Achievements & Competitive Challenges</p>
          </div>
        </div>
        <button className="btn-secondary">
          <Settings className="w-4 h-4" />
        </button>
      </div>

      {/* Player Profile Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${playerProfile.avatar_color} flex items-center justify-center`}>
              <UserIcon className="w-8 h-8 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Level {playerProfile.level}</p>
              <h2 className="text-2xl font-bold text-white">{playerProfile.name}</h2>
              <p className="text-sm text-gray-400">{(() => { const d = playerProfile?.department; return (d && typeof d === 'object') ? d.name : (d || ''); })()}  • Rank #{playerProfile.rank}</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <Flame className="w-8 h-8 text-orange-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{streak}</p>
              <p className="text-xs text-gray-400">day streak</p>
            </div>
            <div className="text-center">
              <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{playerProfile.total_points.toLocaleString()}</p>
              <p className="text-xs text-gray-400">total points</p>
            </div>
          </div>
        </div>

        {/* Experience Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Level Progress</span>
            <span className="text-sm font-bold text-white">{playerProfile.experience} / 3000 XP</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div
              className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
              style={{ width: `${(playerProfile.experience / 3000) * 100}%` }}
            />
          </div>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-400">Achievements</span>
            <Award className="w-5 h-5 text-purple-400" />
          </div>
          <p className="text-3xl font-bold text-white">8/12</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-400">Challenges</span>
            <Target className="w-5 h-5 text-orange-400" />
          </div>
          <p className="text-3xl font-bold text-white">3/4</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-400">Win Rate</span>
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          <p className="text-3xl font-bold text-white">87%</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-400">Total XP</span>
            <Zap className="w-5 h-5 text-yellow-400" />
          </div>
          <p className="text-3xl font-bold text-white">12.5K</p>
        </motion.div>
      </div>

      {/* Experience & Skills Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Weekly Experience */}
        <div className="card p-6">
          <h3 className="text-xl font-semibold text-white mb-6">This Week's Progress</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={experienceData}>
              <defs>
                <linearGradient id="xpGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #3b82f6' }} />
              <Area type="monotone" dataKey="xp" fill="url(#xpGrad)" stroke="#3b82f6" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Skills Radar */}
        <div className="card p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Skills Overview</h3>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={skillsData}>
              <PolarGrid stroke="#374151" />
              <PolarAngleAxis dataKey="skill" stroke="#94a3b8" tick={{ fill: '#9aa6b2', fontSize: 12 }} />
              <PolarRadiusAxis stroke="#94a3b8" />
              <Radar name="Proficiency" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
              <Tooltip contentStyle={{ backgroundColor: '#1a1a2e' }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <Medal className="w-5 h-5 mr-2 text-purple-400" />
          Achievements
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`card p-4 cursor-pointer hover:border-purple-500/50 transition-all ${!achievement.unlocked ? 'opacity-60' : ''}`}
              onClick={() => setSelectedAchievement(achievement)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-white">{achievement.title}</h3>
                  <p className="text-xs text-gray-400 mt-1">{achievement.description}</p>
                </div>
                {achievement.unlocked ? (
                  <Star className="w-5 h-5 text-yellow-400 flex-shrink-0 ml-2" />
                ) : (
                  <Lock className="w-5 h-5 text-gray-500 flex-shrink-0 ml-2" />
                )}
              </div>

              {!achievement.unlocked && (
                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-gray-400">{achievement.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1.5">
                    <div
                      className="h-1.5 rounded-full bg-purple-500"
                      style={{ width: `${achievement.progress}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between text-xs">
                <span className={`px-2 py-1 rounded ${getRarityColor(achievement.rarity)}`}>
                  {achievement.rarity.charAt(0).toUpperCase() + achievement.rarity.slice(1)}
                </span>
                <span className="text-yellow-400">+{achievement.points}pts</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Challenges Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <Zap className="w-5 h-5 mr-2 text-orange-400" />
          Active Challenges
        </h2>
        <div className="space-y-3">
          {challenges.map((challenge) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card p-4"
              onClick={() => setActiveChallenge(challenge)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-white">{challenge.title}</h3>
                    <span className={`text-xs font-bold ${getDifficultyColor(challenge.difficulty)}`}>
                      {challenge.difficulty.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">{challenge.description}</p>
                </div>
                <div className="text-right flex-shrink-0 ml-4">
                  <p className="text-lg font-bold text-yellow-400">+{challenge.reward_points}</p>
                  <p className="text-xs text-gray-400">points</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="w-full bg-gray-700 rounded-full h-1.5 mb-1">
                    <div
                      className="h-1.5 rounded-full bg-orange-500"
                      style={{ width: `${challenge.progress}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-400">{challenge.progress}%</span>
                </div>
                <div className="text-center">
                  <Users className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                  <span className="text-xs text-gray-400">{challenge.participants}</span>
                </div>
                <div className="text-center">
                  <Clock className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                  <span className="text-xs text-gray-400">{Math.floor((challenge.ends_at.getTime() - Date.now()) / (24 * 60 * 60 * 1000))}d left</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Leaderboard */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
          <Crown className="w-5 h-5 mr-2 text-yellow-400" />
          Global Leaderboard
        </h2>
        <div className="space-y-2">
          {leaderboard.map((entry) => (
            <motion.div
              key={entry.rank}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: entry.rank * 0.05 }}
              className={`flex items-center justify-between p-4 rounded-lg ${
                entry.rank <= 3 ? 'bg-yellow-500/20 border border-yellow-500/50' : 'bg-gray-800/50'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                  entry.rank === 1 ? 'bg-yellow-500' :
                  entry.rank === 2 ? 'bg-gray-400' :
                  entry.rank === 3 ? 'bg-orange-600' :
                  'bg-gray-600'
                }`}>
                  {entry.rank}
                </div>
                <div>
                  <p className="font-semibold text-white">{entry.user_name}</p>
                  <p className="text-sm text-gray-400">Level {entry.level} • {(() => { const d = entry?.department; return (d && typeof d === 'object') ? d.name : (d || ''); })()}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-yellow-400">{entry.total_points.toLocaleString()}</p>
                <p className="text-xs text-gray-400">{entry.badges_earned} badges</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Achievement Details Modal */}
      <AnimatePresence>
        {selectedAchievement && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="card p-6 border border-purple-500/50"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">{selectedAchievement.title}</h3>
              <button onClick={() => setSelectedAchievement(null)} className="btn-secondary">
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
            <p className="text-gray-400 mb-4">{selectedAchievement.description}</p>
            <div className="grid grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-400">Points</p>
                <p className="text-2xl font-bold text-yellow-400">{selectedAchievement.points}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">XP Value</p>
                <p className="text-2xl font-bold text-blue-400">{selectedAchievement.xp_value}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Rarity</p>
                <p className={`text-lg font-bold capitalize ${getRarityColor(selectedAchievement.rarity)}`}>{selectedAchievement.rarity}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Status</p>
                <p className={`text-lg font-bold ${selectedAchievement.unlocked ? 'text-green-400' : 'text-gray-400'}`}>
                  {selectedAchievement.unlocked ? 'Unlocked' : 'Locked'}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// User icon component since we don't have it in lucide
const User = ({ className }: { className: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
  </svg>
);

export default EnhancedGamification;
