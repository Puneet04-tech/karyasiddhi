import React, { useState, useEffect } from 'react';
import { Trophy, Star, Target, Zap, Award, Medal, Crown, Flame, Rocket, Gem, Coins, Gift, Heart, Users, TrendingUp, Gamepad2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { useAuthStore } from '../../store/authStore';
import { useRealTimeAnalytics, useRealTimeTeamRankings } from '../../lib/useRealTimeData';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'productivity' | 'collaboration' | 'innovation' | 'leadership' | 'milestone';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  points: number;
  unlocked: boolean;
  unlockedAt?: Date;
  progress: number;
  maxProgress: number;
}

interface Quest {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly' | 'special';
  difficulty: 'easy' | 'medium' | 'hard' | 'extreme';
  rewards: {
    xp: number;
    coins: number;
    badges: string[];
  };
  tasks: {
    id: string;
    description: string;
    completed: boolean;
    progress: number;
    target: number;
  }[];
  deadline: Date;
  active: boolean;
}

interface LeaderboardEntry {
  rank: number;
  name: string;
  department: string;
  level: number;
  xp: number;
  coins: number;
  achievements: number;
  streak: number;
  avatar: string;
}

interface Competition {
  id: string;
  title: string;
  description: string;
  type: 'individual' | 'team' | 'department';
  startDate: Date;
  endDate: Date;
  participants: number;
  prizePool: number;
  rules: string[];
  leaderboard: LeaderboardEntry[];
  status: 'upcoming' | 'active' | 'completed';
}

const CarnivalOfProductivity = () => {
  const { user } = useAuthStore();
  const { data: analyticsData, loading: analyticsLoading } = useRealTimeAnalytics(user?.id);
  const { data: rankingsData, loading: rankingsLoading } = useRealTimeTeamRankings();

  const [userStats, setUserStats] = useState({
    level: 28,
    xp: 15420,
    coins: 2847,
    streak: 15,
    totalAchievements: 47,
    rank: 12,
    powerUps: 3
  });

  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [activeQuests, setActiveQuests] = useState<Quest[]>([]);
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'quests' | 'achievements' | 'competitions' | 'leaderboard'>('overview');

  // Transform analytics data to game stats
  useEffect(() => {
    if (analyticsData) {
      const data = Array.isArray(analyticsData) ? analyticsData[0] : analyticsData;
      
      // Calculate game stats based on analytics
      const level = Math.floor((data?.performance_score || 0) * 50);
      const xp = Math.floor((data?.performance_score || 0) * 30000);
      
      setUserStats({
        level: Math.max(1, level),
        xp: xp,
        coins: Math.round((data?.avg_kpi || 0) * 5000),
        streak: Math.floor((data?.performance_score || 0) * 50),
        totalAchievements: Math.floor((data?.performance_score || 0) * 100),
        rank: Math.floor(Math.random() * 20) + 1,
        powerUps: 3
      });

      // Generate achievements from analytics
      const mockAchievements: Achievement[] = [
        {
          id: '1',
          title: 'Performance Star',
          description: `Achieving ${Math.round((data?.performance_score || 0) * 100)}% performance`,
          icon: '⭐',
          category: 'productivity',
          rarity: (data?.performance_score || 0) > 0.8 ? 'epic' : 'rare',
          points: 500,
          unlocked: (data?.performance_score || 0) > 0.6,
          progress: Math.round((data?.performance_score || 0) * 100),
          maxProgress: 100
        },
        {
          id: '2',
          title: 'Team Collaborator',
          description: `Leading team of ${data?.team_size || 0} members`,
          icon: '🤝',
          category: 'collaboration',
          rarity: (data?.team_size || 0) > 10 ? 'epic' : 'rare',
          points: 1000,
          unlocked: (data?.team_size || 0) > 5,
          progress: Math.min(data?.team_size || 0, 50),
          maxProgress: 50
        },
        {
          id: '3',
          title: 'KPI Master',
          description: `Maintaining ${Math.round((data?.avg_kpi || 0) * 100)}% KPI success`,
          icon: '📊',
          category: 'productivity',
          rarity: (data?.avg_kpi || 0) > 0.9 ? 'legendary' : 'epic',
          points: 2000,
          unlocked: (data?.avg_kpi || 0) > 0.85,
          progress: Math.round((data?.avg_kpi || 0) * 100),
          maxProgress: 100
        }
      ];

      // Generate quests
      const mockQuests: Quest[] = [
        {
          id: '1',
          title: 'Daily Excellence Quest',
          description: 'Maintain performance through today',
          type: 'daily',
          difficulty: 'easy',
          rewards: { xp: 100, coins: 50, badges: ['Daily Warrior'] },
          tasks: [
            { id: '1', description: 'Complete daily tasks', completed: true, progress: 5, target: 5 },
            { id: '2', description: 'Maintain performance', completed: (data?.performance_score || 0) > 0.85, progress: Math.round((data?.performance_score || 0) * 100), target: 90 },
            { id: '3', description: 'Help team members', completed: (data?.team_size || 0) > 0, progress: data?.team_size || 0, target: 2 }
          ],
          deadline: new Date(Date.now() + 4 * 60 * 60 * 1000),
          active: true
        },
        {
          id: '2',
          title: 'Weekly Leadership Challenge',
          description: 'Excel in team performance metrics',
          type: 'weekly',
          difficulty: 'medium',
          rewards: { xp: 500, coins: 200, badges: ['Team Leader'] },
          tasks: [
            { id: '1', description: 'Lead team success', completed: (data?.avg_kpi || 0) > 0.8, progress: Math.round((data?.avg_kpi || 0) * 100), target: 85 },
            { id: '2', description: 'Mentor team members', completed: true, progress: data?.team_size || 0, target: 3 },
            { id: '3', description: 'Share best practices', completed: true, progress: 2, target: 2 }
          ],
          deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          active: true
        }
      ];

      setAchievements(mockAchievements);
      setActiveQuests(mockQuests);

      // Generate competitions
      const mockCompetitions: Competition[] = [
        {
          id: '1',
          title: 'Performance Olympics Hall',
          description: 'Compete with colleagues on overall performance',
          type: 'individual',
          startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
          participants: Math.floor(Math.random() * 1000) + 100,
          prizePool: 100000,
          rules: [
            'Maintain high performance',
            'Complete daily objectives',
            'Help team members',
            'Improve processes'
          ],
          leaderboard: [],
          status: 'active'
        },
        {
          id: '2',
          title: 'Department Excellence Hall',
          description: 'Compete with other departments',
          type: 'department',
          startDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
          endDate: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000),
          participants: Math.floor(Math.random() * 5000) + 1000,
          prizePool: 50000,
          rules: [
            'Department collaboration',
            'Performance improvement',
            'Resource efficiency',
            'Innovation in processes'
          ],
          leaderboard: [],
          status: 'upcoming'
        }
      ];

      setCompetitions(mockCompetitions);
    }
  }, [analyticsData]);

  // Transform rankings data to leaderboard
  useEffect(() => {
    if (rankingsData && Array.isArray(rankingsData)) {
      const leaderboardData = rankingsData.slice(0, 10).map((person: any, index: number) => ({
        rank: index + 1,
        name: person.name || person.user_name || `User ${person.id}`,
        department: person.department || 'Operations',
        level: Math.floor((person.performance_score || 0) * 50),
        xp: Math.floor((person.performance_score || 0) * 30000),
        coins: Math.round((person.avg_kpi || 0) * 5000),
        achievements: Math.floor((person.performance_score || 0) * 100),
        streak: Math.floor((person.performance_score || 0) * 50),
        avatar: index === 0 ? '👑' : index === 1 ? '🏅' : index === 2 ? '🥉' : '🌟'
      }));
      
      setLeaderboard(leaderboardData);
    }
  }, [rankingsData]);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'border-yellow-500 bg-yellow-500/10 text-yellow-400';
      case 'epic': return 'border-purple-500 bg-purple-500/10 text-purple-400';
      case 'rare': return 'border-blue-500 bg-blue-500/10 text-blue-400';
      case 'common': return 'border-gray-500 bg-gray-500/10 text-gray-400';
      default: return 'border-green-500 bg-green-500/10 text-green-400';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'extreme': return 'text-red-400 bg-red-500/20';
      case 'hard': return 'text-orange-400 bg-orange-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'easy': return 'text-green-400 bg-green-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const xpProgress = (userStats.xp % 1000) / 10;
  const unlockedAchievements = achievements.filter(a => a.unlocked).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-yellow-500/30 to-orange-500/30 rounded-2xl box-shadow-glow">
            <Gamepad2 className="w-8 h-8 text-yellow-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold gradient-text">Carnival of Productivity</h1>
            <p className="text-gray-400">Gamification 2.0 - Level Up Your Performance!</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg">
            <Flame className="w-4 h-4 text-orange-400" />
            <span className="font-bold text-orange-400">{userStats.streak} Day Streak!</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-primary-500/20 rounded-lg">
            <Zap className="w-4 h-4 text-primary-400" />
            <span className="font-bold text-primary-400">Level {userStats.level}</span>
          </div>
        </div>
      </div>

      {/* User Stats Bar */}
      <div className="card p-6 border border-yellow-500/50">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Rocket className="w-5 h-5 text-yellow-400" />
              <span className="text-2xl font-bold gradient-text">{userStats.level}</span>
            </div>
            <p className="text-sm text-gray-400">Level</p>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
              <div 
                className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${xpProgress}%` }}
              />
            </div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Star className="w-5 h-5 text-purple-400" />
              <span className="text-2xl font-bold text-purple-400">{userStats.xp.toLocaleString()}</span>
            </div>
            <p className="text-sm text-gray-400">Experience Points</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Coins className="w-5 h-5 text-yellow-400" />
              <span className="text-2xl font-bold text-yellow-400">{userStats.coins.toLocaleString()}</span>
            </div>
            <p className="text-sm text-gray-400">Karma Coins</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Trophy className="w-5 h-5 text-green-400" />
              <span className="text-2xl font-bold text-green-400">{unlockedAchievements}</span>
            </div>
            <p className="text-sm text-gray-400">Achievements</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Crown className="w-5 h-5 text-orange-400" />
              <span className="text-2xl font-bold text-orange-400">#{userStats.rank}</span>
            </div>
            <p className="text-sm text-gray-400">Global Rank</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 border-b border-gray-700">
        {(['overview', 'quests', 'achievements', 'competitions', 'leaderboard'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`px-4 py-2 capitalize transition-all flex items-center gap-2 ${
              selectedTab === tab 
                ? 'border-b-2 border-primary-500 text-primary-400' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab === 'quests' && <Target className="w-4 h-4" />}
            {tab === 'achievements' && <Trophy className="w-4 h-4" />}
            {tab === 'competitions' && <Award className="w-4 h-4" />}
            {tab === 'leaderboard' && <Crown className="w-4 h-4" />}
            {tab}
          </button>
        ))}
      </div>

      {selectedTab === 'overview' && (
        <div className="space-y-6">
          {/* Active Quests Preview */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="card p-6">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2 text-blue-400" />
                Active Quests
              </h2>
              <div className="space-y-3">
                {activeQuests.slice(0, 2).map((quest) => (
                  <div key={quest.id} className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-white">{quest.title}</h3>
                      <span className={`px-2 py-1 text-xs rounded ${getDifficultyColor(quest.difficulty)}`}>
                        {quest.difficulty}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 mb-3">{quest.description}</p>
                    <div className="space-y-2">
                      {quest.tasks.map((task) => (
                        <div key={task.id} className="flex items-center justify-between text-sm">
                          <span className="text-gray-300">{task.description}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-gray-700 rounded-full h-2">
                              <div 
                                className="bg-blue-500 h-2 rounded-full"
                                style={{ width: `${(task.progress / task.target) * 100}%` }}
                              />
                            </div>
                            <span className="text-gray-400">{task.progress}/{task.target}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-700">
                      <span className="text-xs text-gray-400">
                        {quest.deadline.toLocaleDateString()} • {quest.type}
                      </span>
                      <div className="flex items-center gap-2 text-xs">
                        <Star className="w-3 h-3 text-yellow-400" />
                        <span className="text-yellow-400">{quest.rewards.xp} XP</span>
                        <Coins className="w-3 h-3 text-yellow-400" />
                        <span className="text-yellow-400">{quest.rewards.coins}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Achievements */}
            <div className="card p-6">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
                Recent Achievements
              </h2>
              <div className="space-y-3">
                {achievements.filter(a => a.unlocked).slice(0, 3).map((achievement) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`p-4 rounded-lg border ${getRarityColor(achievement.rarity)}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{achievement.title}</h3>
                        <p className="text-sm opacity-80">{achievement.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">+{achievement.points}</div>
                        <div className="text-xs opacity-60">points</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Active Competitions */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Award className="w-5 h-5 mr-2 text-orange-400" />
              Active Competitions
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {competitions.filter(c => c.status === 'active').map((competition) => (
                <div key={competition.id} className="p-4 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-lg border border-orange-500/50">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white">{competition.title}</h3>
                    <span className="px-2 py-1 text-xs bg-orange-500/20 text-orange-400 rounded">
                      {competition.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">{competition.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4 text-gray-400">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {competition.participants.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Gift className="w-3 h-3" />
                        {competition.prizePool.toLocaleString()} coins
                      </span>
                    </div>
                    <button className="btn-primary text-sm">Join Competition</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedTab === 'quests' && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">All Active Quests</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {activeQuests.map((quest) => (
              <div key={quest.id} className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-white">{quest.title}</h3>
                    <p className="text-sm text-gray-400">{quest.description}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded ${getDifficultyColor(quest.difficulty)}`}>
                    {quest.difficulty}
                  </span>
                </div>
                
                <div className="space-y-3 mb-4">
                  {quest.tasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full ${
                          task.completed ? 'bg-green-500' : 'bg-gray-600'
                        }`} />
                        <span className="text-sm text-gray-300">{task.description}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${(task.progress / task.target) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-400">{task.progress}/{task.target}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>{quest.type}</span>
                    <span>{quest.deadline.toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-yellow-400">
                        <Star className="w-3 h-3" />
                        {quest.rewards.xp} XP
                      </div>
                      <div className="flex items-center gap-1 text-yellow-400">
                        <Coins className="w-3 h-3" />
                        {quest.rewards.coins}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedTab === 'achievements' && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Achievement Collection</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                className={`card p-6 cursor-pointer ${achievement.unlocked ? '' : 'opacity-50'}`}
              >
                <div className="text-center">
                  <div className="text-4xl mb-3">{achievement.icon}</div>
                  <h3 className="font-semibold text-white mb-2">{achievement.title}</h3>
                  <p className="text-sm text-gray-400 mb-4">{achievement.description}</p>
                  <div className={`px-2 py-1 text-xs rounded mb-3 ${getRarityColor(achievement.rarity)}`}>
                    {achievement.rarity}
                  </div>
                  {achievement.unlocked ? (
                    <div className="space-y-2">
                      <div className="text-green-400 font-bold">+{achievement.points} points</div>
                      <div className="text-xs text-gray-400">
                        Unlocked: {achievement.unlockedAt?.toLocaleDateString()}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                        />
                      </div>
                      <div className="text-xs text-gray-400">
                        Progress: {achievement.progress}/{achievement.maxProgress}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {selectedTab === 'competitions' && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Competitions & Events</h2>
          <div className="space-y-4">
            {competitions.map((competition) => (
              <div key={competition.id} className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-white text-lg">{competition.title}</h3>
                    <p className="text-gray-400">{competition.description}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-lg ${
                    competition.status === 'active' ? 'bg-green-500/20 text-green-400' :
                    competition.status === 'upcoming' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {competition.status}
                  </span>
                </div>

                <div className="grid md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{competition.participants.toLocaleString()}</div>
                    <p className="text-sm text-gray-400">Participants</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">{competition.prizePool.toLocaleString()}</div>
                    <p className="text-sm text-gray-400">Prize Pool (Coins)</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">{competition.type}</div>
                    <p className="text-sm text-gray-400">Competition Type</p>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-400">
                      {competition.startDate.toLocaleDateString()}
                    </div>
                    <p className="text-sm text-gray-400">Start Date</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-400 mb-2">Rules:</p>
                  <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                    {competition.rules.map((rule, index) => (
                      <li key={index}>{rule}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-between">
                  <div className="text-sm text-gray-400">
                    Ends: {competition.endDate.toLocaleDateString()}
                  </div>
                  <button className="btn-primary">
                    {competition.status === 'active' ? 'View Leaderboard' : 'Register Now'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedTab === 'leaderboard' && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Global Leaderboard</h2>
          <div className="card p-6">
            <div className="space-y-3">
              {leaderboard.map((entry) => (
                <motion.div
                  key={entry.rank}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex items-center justify-between p-4 rounded-lg ${
                    entry.name === 'You' ? 'bg-primary-500/20 border border-primary-500/50' : 'bg-gray-800/50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                      entry.rank === 1 ? 'bg-yellow-500/20 text-yellow-500' :
                      entry.rank === 2 ? 'bg-gray-400/20 text-gray-400' :
                      entry.rank === 3 ? 'bg-orange-500/20 text-orange-500' :
                      entry.name === 'You' ? 'bg-primary-500/20 text-primary-400' :
                      'bg-gray-600/20 text-gray-400'
                    }`}>
                      {entry.rank}
                    </div>
                    <div className="text-2xl">{entry.avatar}</div>
                    <div>
                      <p className="font-semibold text-white">{entry.name}</p>
                      <p className="text-sm text-gray-400">{entry?.department ? (typeof entry.department === 'object' ? entry.department.name : entry.department) : ''} • Level {entry.level}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-right">
                    <div>
                      <div className="text-lg font-bold text-purple-400">{entry.xp.toLocaleString()}</div>
                      <p className="text-xs text-gray-400">XP</p>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-yellow-400">{entry.coins.toLocaleString()}</div>
                      <p className="text-xs text-gray-400">Coins</p>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-green-400">{entry.achievements}</div>
                      <p className="text-xs text-gray-400">Achievements</p>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-orange-400">{entry.streak}</div>
                      <p className="text-xs text-gray-400">Streak</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarnivalOfProductivity;
