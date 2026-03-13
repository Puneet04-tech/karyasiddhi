import React, { useState, useEffect, useRef } from 'react';
import { 
  Trophy, Star, Zap, Target, Users, TrendingUp, Award,
  Crown, Medal, Flame, Rocket, Shield, Clock, BarChart3,
  Settings, RefreshCw, Play, Pause, CheckCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';

interface GamificationChallenge {
  id: string;
  title: string;
  description: string;
  type: 'productivity' | 'collaboration' | 'innovation' | 'learning' | 'leadership';
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  points: number;
  xp_reward: number;
  badge_reward: string;
  status: 'available' | 'active' | 'completed' | 'expired';
  participants: number;
  completion_rate: number;
  time_limit: number;
  created_at: Date;
  ends_at: Date;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  category: 'milestone' | 'skill' | 'collaboration' | 'innovation' | 'leadership';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  points: number;
  xp_value: number;
  icon: string;
  unlocked_at?: Date;
  progress: number;
  requirements: string[];
}

interface LeaderboardEntry {
  id: string;
  user_name: string;
  department: string;
  total_points: number;
  rank: number;
  weekly_change: number;
  achievements_count: number;
  streak_days: number;
  last_active: Date;
}

interface Competition {
  id: string;
  title: string;
  description: string;
  type: 'individual' | 'team' | 'department';
  prize_pool: number;
  participants: number;
  status: 'upcoming' | 'active' | 'completed';
  start_date: Date;
  end_date: Date;
  rules: string[];
  current_leader?: string;
}

const EnhancedGamification = () => {
  const [challenges, setChallenges] = useState<GamificationChallenge[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [userStats, setUserStats] = useState({
    total_points: 15420,
    current_level: 42,
    xp_to_next: 2800,
    total_achievements: 87,
    current_streak: 15,
    weekly_rank: 3
  });
  const [activeChallenge, setActiveChallenge] = useState<GamificationChallenge | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    generateChallenges();
    generateAchievements();
    generateLeaderboard();
    generateCompetitions();
    const interval = setInterval(updateGamificationData, 20000);
    return () => clearInterval(interval);
  }, []);

  const generateChallenges = () => {
    const mockChallenges: GamificationChallenge[] = [
      {
        id: '1',
        title: 'Productivity Master',
        description: 'Complete 100 tasks with 95% efficiency rate',
        type: 'productivity',
        difficulty: 'hard',
        points: 500,
        xp_reward: 1500,
        badge_reward: 'Productivity Champion',
        status: 'available',
        participants: 234,
        completion_rate: 67.3,
        time_limit: 7 * 24 * 60 * 60 * 1000,
        created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        ends_at: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
      },
      {
        id: '2',
        title: 'Collaboration Hero',
        description: 'Mentor 5 junior employees and achieve 90% satisfaction',
        type: 'collaboration',
        difficulty: 'medium',
        points: 300,
        xp_reward: 800,
        badge_reward: 'Mentor Excellence',
        status: 'active',
        participants: 156,
        completion_rate: 72.8,
        time_limit: 5 * 24 * 60 * 60 * 1000,
        created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        ends_at: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000)
      },
      {
        id: '3',
        title: 'Innovation Sprint',
        description: 'Submit 3 innovative ideas with implementation plans',
        type: 'innovation',
        difficulty: 'expert',
        points: 750,
        xp_reward: 2000,
        badge_reward: 'Innovation Pioneer',
        status: 'available',
        participants: 89,
        completion_rate: 45.2,
        time_limit: 10 * 24 * 60 * 60 * 1000,
        created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        ends_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      },
      {
        id: '4',
        title: 'Learning Marathon',
        description: 'Complete 10 advanced training modules with 85% scores',
        type: 'learning',
        difficulty: 'medium',
        points: 400,
        xp_reward: 1200,
        badge_reward: 'Learning Champion',
        status: 'completed',
        participants: 312,
        completion_rate: 81.5,
        time_limit: 14 * 24 * 60 * 60 * 1000,
        created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        ends_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      },
      {
        id: '5',
        title: 'Leadership Excellence',
        description: 'Lead 2 successful cross-department projects',
        type: 'leadership',
        difficulty: 'hard',
        points: 600,
        xp_reward: 1800,
        badge_reward: 'Leadership Master',
        status: 'available',
        participants: 67,
        completion_rate: 58.9,
        time_limit: 21 * 24 * 60 * 60 * 1000,
        created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        ends_at: new Date(Date.now() + 16 * 24 * 60 * 60 * 1000)
      }
    ];

    setChallenges(mockChallenges);
  };

  const generateAchievements = () => {
    const mockAchievements: Achievement[] = [
      {
        id: '1',
        title: 'Productivity Champion',
        description: 'Achieved 95% productivity for 30 consecutive days',
        category: 'milestone',
        rarity: 'legendary',
        points: 1000,
        xp_value: 3000,
        icon: 'trophy',
        unlocked_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
        progress: 100,
        requirements: ['95% productivity', '30 day streak', 'no missed deadlines']
      },
      {
        id: '2',
        title: 'Collaboration Master',
        description: 'Successfully mentored 10 employees',
        category: 'collaboration',
        rarity: 'epic',
        points: 750,
        xp_value: 2000,
        icon: 'users',
        unlocked_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        progress: 100,
        requirements: ['10 mentorships', '90% satisfaction', 'positive feedback']
      },
      {
        id: '3',
        title: 'Innovation Pioneer',
        description: 'Submitted 5 approved innovative solutions',
        category: 'innovation',
        rarity: 'rare',
        points: 500,
        xp_value: 1500,
        icon: 'lightbulb',
        unlocked_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        progress: 100,
        requirements: ['5 innovations', 'implementation plans', 'approval process']
      },
      {
        id: '4',
        title: 'Learning Enthusiast',
        description: 'Completed 25 training modules',
        category: 'skill',
        rarity: 'common',
        points: 250,
        xp_value: 750,
        icon: 'book',
        unlocked_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        progress: 100,
        requirements: ['25 modules', '80% average score', 'certification']
      },
      {
        id: '5',
        title: 'Leadership Excellence',
        description: 'Led 5 successful projects',
        category: 'leadership',
        rarity: 'epic',
        points: 800,
        xp_value: 2500,
        icon: 'crown',
        unlocked_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
        progress: 100,
        requirements: ['5 projects', 'team leadership', 'success metrics']
      },
      {
        id: '6',
        title: 'Streak Master',
        description: 'Maintain 30-day productivity streak',
        category: 'milestone',
        rarity: 'rare',
        points: 600,
        xp_value: 1800,
        icon: 'flame',
        progress: 50,
        requirements: ['30 day streak', 'daily activity', 'consistency']
      }
    ];

    setAchievements(mockAchievements);
  };

  const generateLeaderboard = () => {
    const mockLeaderboard: LeaderboardEntry[] = [
      {
        id: '1',
        user_name: 'Priya Sharma',
        department: 'Digital Services',
        total_points: 28450,
        rank: 1,
        weekly_change: 1250,
        achievements_count: 124,
        streak_days: 45,
        last_active: new Date(Date.now() - 2 * 60 * 60 * 1000)
      },
      {
        id: '2',
        user_name: 'Rahul Kumar',
        department: 'Revenue Department',
        total_points: 26320,
        rank: 2,
        weekly_change: 890,
        achievements_count: 118,
        streak_days: 32,
        last_active: new Date(Date.now() - 1 * 60 * 60 * 1000)
      },
      {
        id: '3',
        user_name: 'Amit Singh',
        department: 'Policy Management',
        total_points: 25100,
        rank: 3,
        weekly_change: 450,
        achievements_count: 109,
        streak_days: 28,
        last_active: new Date(Date.now() - 30 * 60 * 1000)
      },
      {
        id: '4',
        user_name: 'Sunita Patel',
        department: 'Citizen Services',
        total_points: 23890,
        rank: 4,
        weekly_change: -120,
        achievements_count: 97,
        streak_days: 21,
        last_active: new Date(Date.now() - 3 * 60 * 60 * 1000)
      },
      {
        id: '5',
        user_name: 'Vikram Reddy',
        department: 'Resource Management',
        total_points: 22450,
        rank: 5,
        weekly_change: 340,
        achievements_count: 92,
        streak_days: 18,
        last_active: new Date(Date.now() - 4 * 60 * 60 * 1000)
      }
    ];

    setLeaderboard(mockLeaderboard);
  };

  const generateCompetitions = () => {
    const mockCompetitions: Competition[] = [
      {
        id: '1',
        title: 'Q1 Productivity Championship',
        description: 'Highest productivity improvement across all departments',
        type: 'department',
        prize_pool: 50000,
        participants: 234,
        status: 'active',
        start_date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
        end_date: new Date(Date.now() + 75 * 24 * 60 * 60 * 1000),
        rules: ['Productivity measured by task completion rate', 'Minimum 100 tasks required', 'Quality standards must be maintained'],
        current_leader: 'Digital Services'
      },
      {
        id: '2',
        title: 'Innovation Sprint Challenge',
        description: 'Most innovative solutions submitted and implemented',
        type: 'individual',
        prize_pool: 25000,
        participants: 89,
        status: 'active',
        start_date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        end_date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
        rules: ['Original ideas only', 'Implementation plan required', 'Peer review process'],
        current_leader: 'Priya Sharma'
      },
      {
        id: '3',
        title: 'Collaboration Excellence Award',
        description: 'Best cross-department collaboration project',
        type: 'team',
        prize_pool: 30000,
        participants: 156,
        status: 'upcoming',
        start_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        rules: ['Minimum 3 departments involved', 'Measurable impact required', 'Executive approval needed']
      }
    ];

    setCompetitions(mockCompetitions);
  };

  const updateGamificationData = () => {
    setUserStats(prev => ({
      ...prev,
      total_points: prev.total_points + Math.floor(Math.random() * 100),
      weekly_rank: Math.max(1, prev.weekly_rank + Math.floor(Math.random() * 3) - 1)
    }));

    setChallenges(prev => prev.map(challenge => ({
      ...challenge,
      participants: challenge.participants + Math.floor(Math.random() * 10) - 5,
      completion_rate: Math.max(0, Math.min(100, challenge.completion_rate + (Math.random() - 0.5) * 5))
    })));
  };

  const startChallenge = (challenge: GamificationChallenge) => {
    setActiveChallenge(challenge);
    setIsPlaying(true);

    setTimeout(() => {
      setChallenges(prev => prev.map(c => 
        c.id === challenge.id 
          ? { ...c, status: 'active' as const }
          : c
      ));
    }, 1000);
  };

  const getChallengeStatusColor = (status: GamificationChallenge['status']) => {
    switch (status) {
      case 'available': return 'text-green-400 bg-green-500/20';
      case 'active': return 'text-blue-400 bg-blue-500/20';
      case 'completed': return 'text-purple-400 bg-purple-500/20';
      case 'expired': return 'text-gray-400 bg-gray-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getDifficultyColor = (difficulty: GamificationChallenge['difficulty']) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'hard': return 'text-orange-400';
      case 'expert': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getRarityColor = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'common': return 'text-gray-400 bg-gray-500/20';
      case 'rare': return 'text-blue-400 bg-blue-500/20';
      case 'epic': return 'text-purple-400 bg-purple-500/20';
      case 'legendary': return 'text-yellow-400 bg-yellow-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getCompetitionStatusColor = (status: Competition['status']) => {
    switch (status) {
      case 'upcoming': return 'text-yellow-400 bg-yellow-500/20';
      case 'active': return 'text-green-400 bg-green-500/20';
      case 'completed': return 'text-blue-400 bg-blue-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const progressData = [
    { month: 'Jan', points: 12000, achievements: 12, rank: 8 },
    { month: 'Feb', points: 13500, achievements: 15, rank: 6 },
    { month: 'Mar', points: 14200, achievements: 18, rank: 5 },
    { month: 'Apr', points: 14800, achievements: 22, rank: 4 },
    { month: 'May', points: 15200, achievements: 25, rank: 3 },
    { month: 'Jun', points: 15420, achievements: 28, rank: 3 }
  ];

  const achievementDistribution = [
    { category: 'Milestone', count: 23, color: '#f59e0b' },
    { category: 'Skill', count: 31, color: '#3b82f6' },
    { category: 'Collaboration', count: 18, color: '#10b981' },
    { category: 'Innovation', count: 12, color: '#8b5cf6' },
    { category: 'Leadership', count: 8, color: '#ef4444' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl box-shadow-glow" style={{
            background: 'linear-gradient(135deg, #f59e0b30, #ef444430)'
          }}>
            <Trophy className="w-8 h-8 text-yellow-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold gradient-text">Enhanced Gamification</h1>
            <p className="text-gray-300">Advanced Achievement & Competition System</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 px-3 py-1 rounded-lg ${
            isPlaying ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
          }`}>
            <Play className="w-4 h-4" />
            <span className="font-semibold">{isPlaying ? 'Playing' : 'Ready'}</span>
          </div>
          <button className="btn-secondary">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* User Stats Overview */}
      <div className="card p-6 border border-yellow-500/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Trophy className="w-6 h-6 text-yellow-400" />
            <div>
              <h2 className="text-xl font-semibold text-white">Your Gamification Stats</h2>
              <p className="text-sm text-gray-400">Level {userStats.current_level} Performance Champion</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-yellow-400">{userStats.total_points.toLocaleString()}</div>
            <p className="text-sm text-gray-400">Total Points</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card p-4">
          <div className="flex items-center gap-3 mb-2">
            <Star className="w-5 h-5 text-yellow-400" />
            <p className="text-sm text-gray-400">Current Level</p>
          </div>
          <p className="text-2xl font-bold text-white">{userStats.current_level}</p>
          <p className="text-xs text-gray-400">{userStats.xp_to_next} XP to next</p>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3 mb-2">
            <Award className="w-5 h-5 text-purple-400" />
            <p className="text-sm text-gray-400">Achievements</p>
          </div>
          <p className="text-2xl font-bold text-white">{userStats.total_achievements}</p>
          <p className="text-xs text-gray-400">Total unlocked</p>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3 mb-2">
            <Flame className="w-5 h-5 text-orange-400" />
            <p className="text-sm text-gray-400">Current Streak</p>
          </div>
          <p className="text-2xl font-bold text-white">{userStats.current_streak}</p>
          <p className="text-xs text-gray-400">Days active</p>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3 mb-2">
            <Crown className="w-5 h-5 text-blue-400" />
            <p className="text-sm text-gray-400">Weekly Rank</p>
          </div>
          <p className="text-2xl font-bold text-white">#{userStats.weekly_rank}</p>
          <p className="text-xs text-gray-400">Out of 500</p>
        </div>
      </div>

      {/* Active Challenges */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <Target className="w-5 h-5 mr-2 text-yellow-400" />
          Active Challenges
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {challenges.map((challenge) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              className="card p-6 cursor-pointer hover:border-yellow-500/50"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-white">{challenge.title}</h3>
                  <p className="text-sm text-gray-400 capitalize">{challenge.type}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded ${getChallengeStatusColor(challenge.status)}`}>
                  {challenge.status}
                </span>
              </div>

              <p className="text-sm text-gray-300 mb-4">{challenge.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-400">Difficulty</p>
                  <p className={`text-lg font-bold ${getDifficultyColor(challenge.difficulty)}`}>
                    {challenge.difficulty.toUpperCase()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Reward</p>
                  <p className="text-lg font-bold text-yellow-400">{challenge.points} pts</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-400">Participants</p>
                  <p className="text-lg font-bold text-white">{challenge.participants}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Completion Rate</p>
                  <p className="text-lg font-bold text-green-400">{challenge.completion_rate.toFixed(1)}%</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">Time Remaining</p>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500"
                    style={{ 
                      width: `${Math.max(0, (new Date(challenge.ends_at).getTime() - Date.now()) / (challenge.time_limit) * 100)}%` 
                    }}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-400">
                  <p>Ends: {challenge.ends_at.toLocaleDateString()}</p>
                </div>
                <button
                  onClick={() => startChallenge(challenge)}
                  disabled={challenge.status !== 'available'}
                  className="btn-primary"
                >
                  {challenge.status === 'active' ? (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Continue
                    </>
                  ) : (
                    <>
                      <Rocket className="w-4 h-4 mr-2" />
                      Start Challenge
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <Medal className="w-5 h-5 mr-2 text-purple-400" />
          Achievements
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {achievements.map((achievement) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              className="card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-white">{achievement.title}</h3>
                  <p className="text-sm text-gray-400 capitalize">{achievement.category}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded ${getRarityColor(achievement.rarity)}`}>
                  {achievement.rarity.toUpperCase()}
                </span>
              </div>

              <p className="text-sm text-gray-300 mb-4">{achievement.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-400">Points</p>
                  <p className="text-lg font-bold text-yellow-400">{achievement.points}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">XP Value</p>
                  <p className="text-lg font-bold text-purple-400">{achievement.xp_value}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">Progress</p>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                    style={{ width: `${achievement.progress}%` }}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-400">
                  {achievement.unlocked_at ? (
                    <p>Unlocked: {achievement.unlocked_at.toLocaleDateString()}</p>
                  ) : (
                    <p>Locked - Complete requirements</p>
                  )}
                </div>
                {achievement.unlocked_at && (
                  <div className="flex items-center gap-2 text-green-400">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-semibold">UNLOCKED</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leaderboard */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <BarChart3 className="w-5 h-5 mr-2 text-blue-400" />
          Global Leaderboard
        </h2>
        <div className="card p-6">
          <div className="space-y-3">
            {leaderboard.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
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
                    <p className="text-sm text-gray-400">{entry.department}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-yellow-400">{entry.total_points.toLocaleString()}</p>
                  <p className="text-sm text-gray-400">points</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Competitions */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <Shield className="w-5 h-5 mr-2 text-green-400" />
          Active Competitions
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {competitions.map((competition) => (
            <motion.div
              key={competition.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className="card p-6 cursor-pointer hover:border-green-500/50"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-white">{competition.title}</h3>
                  <p className="text-sm text-gray-400 capitalize">{competition.type}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded ${getCompetitionStatusColor(competition.status)}`}>
                  {competition.status}
                </span>
              </div>

              <p className="text-sm text-gray-300 mb-4">{competition.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-400">Prize Pool</p>
                  <p className="text-lg font-bold text-green-400">₹{competition.prize_pool.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Participants</p>
                  <p className="text-lg font-bold text-white">{competition.participants}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">Timeline</p>
                <div className="flex justify-between text-sm">
                  <span>Start: {competition.start_date.toLocaleDateString()}</span>
                  <span>End: {competition.end_date.toLocaleDateString()}</span>
                </div>
              </div>

              {competition.current_leader && (
                <div className="mb-4 p-3 bg-blue-500/20 rounded-lg">
                  <p className="text-sm text-blue-400">Current Leader: {competition.current_leader}</p>
                </div>
              )}

              <div className="flex justify-between items-center">
                <button className="btn-secondary text-sm">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Details
                </button>
                <button className="btn-primary">
                  <Rocket className="w-4 h-4 mr-2" />
                  Join Competition
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Analytics Dashboard */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Progress Over Time */}
        <div className="card p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Progress Over Time</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={progressData}>
              <defs>
                <linearGradient id="pointsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.1" />
                </linearGradient>
                <linearGradient id="rankGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
              <YAxis stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0b1220', border: '1px solid #f59e0b50', borderRadius: 8 }}
                labelStyle={{ color: '#f1f5f9' }}
              />
              <Area type="monotone" dataKey="points" stroke="#f59e0b" fill="url(#pointsGrad)" />
              <Line type="monotone" dataKey="rank" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Achievement Distribution */}
        <div className="card p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Achievement Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={achievementDistribution}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
                label={({ category, count }) => `${category}: ${count}`}
              >
                {achievementDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#0b1220', border: '1px solid #f59e0b50', borderRadius: 8 }}
                labelStyle={{ color: '#f1f5f9' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default EnhancedGamification;
