import { useState, useEffect } from 'react';
import { Users, TrendingUp, Award, Target, ChevronDown, ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../lib/api';
import { useAuthStore } from '../store/authStore';

interface TeamMember {
  rank: number;
  userId: string;
  name: string;
  email: string;
  designation: string;
  department: string;
  performanceScore: number;
  completionRate: number;
  averageProgress: number;
  totalGoals: number;
  completedGoals: number;
}

const TeamRankings = () => {
  const { user } = useAuthStore();
  const [rankings, setRankings] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'rank' | 'completionRate' | 'averageProgress'>('rank');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const response = await api.get('/analytics/team-rankings');
        setRankings(response.data);
      } catch (error) {
        console.error('Failed to fetch team rankings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRankings();
  }, []);

  const handleSort = (field: typeof sortBy) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const sortedRankings = [...rankings].sort((a, b) => {
    const multiplier = sortOrder === 'asc' ? 1 : -1;
    return (a[sortBy] - b[sortBy]) * multiplier;
  });

  const getRankBadge = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return rank;
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-blue-400';
    if (score >= 40) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getPerformanceBg = (score: number) => {
    if (score >= 80) return 'bg-green-500/10 border-green-500/30';
    if (score >= 60) return 'bg-blue-500/10 border-blue-500/30';
    if (score >= 40) return 'bg-yellow-500/10 border-yellow-500/30';
    return 'bg-red-500/10 border-red-500/30';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Loading rankings...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center">
            <Users className="mr-3 text-primary-500" size={36} />
            Team Performance Rankings
          </h1>
          <p className="text-gray-400 mt-1">Compare performance across all team members</p>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <Users className="text-primary-500" size={24} />
            <div>
              <p className="text-sm text-gray-400">Total Members</p>
              <p className="text-2xl font-bold text-white">{rankings.length}</p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <Award className="text-yellow-500" size={24} />
            <div>
              <p className="text-sm text-gray-400">Top Performer</p>
              <p className="text-lg font-bold text-white truncate">{rankings[0]?.name || 'N/A'}</p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <TrendingUp className="text-green-500" size={24} />
            <div>
              <p className="text-sm text-gray-400">Avg Performance</p>
              <p className="text-2xl font-bold text-white">
                {Math.round(rankings.reduce((sum, r) => sum + r.performanceScore, 0) / rankings.length) || 0}
              </p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <Target className="text-blue-500" size={24} />
            <div>
              <p className="text-sm text-gray-400">Avg Completion</p>
              <p className="text-2xl font-bold text-white">
                {Math.round(rankings.reduce((sum, r) => sum + r.completionRate, 0) / rankings.length) || 0}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Rankings Table */}
      <div className="card p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-4 px-4 text-gray-400 font-semibold">
                  <button
                    onClick={() => handleSort('rank')}
                    className="flex items-center gap-2 hover:text-white transition-colors"
                  >
                    Rank
                    {sortBy === 'rank' && (sortOrder === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                  </button>
                </th>
                <th className="text-left py-4 px-4 text-gray-400 font-semibold">Employee</th>
                <th className="text-left py-4 px-4 text-gray-400 font-semibold">Department</th>
                <th className="text-center py-4 px-4 text-gray-400 font-semibold">
                  Performance Score
                </th>
                <th className="text-center py-4 px-4 text-gray-400 font-semibold">
                  <button
                    onClick={() => handleSort('completionRate')}
                    className="flex items-center gap-2 hover:text-white transition-colors mx-auto"
                  >
                    Completion Rate
                    {sortBy === 'completionRate' && (sortOrder === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                  </button>
                </th>
                <th className="text-center py-4 px-4 text-gray-400 font-semibold">
                  <button
                    onClick={() => handleSort('averageProgress')}
                    className="flex items-center gap-2 hover:text-white transition-colors mx-auto"
                  >
                    Avg Progress
                    {sortBy === 'averageProgress' && (sortOrder === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                  </button>
                </th>
                <th className="text-center py-4 px-4 text-gray-400 font-semibold">Goals</th>
              </tr>
            </thead>
            <tbody>
              {sortedRankings.map((member, index) => (
                <motion.tr
                  key={member.userId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`border-b border-slate-800 hover:bg-slate-800/50 transition-colors ${
                    member.userId === user?.id ? 'bg-primary-500/10' : ''
                  }`}
                >
                  <td className="py-4 px-4">
                    <div className="text-2xl font-bold">{getRankBadge(member.rank)}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <p className="text-white font-semibold">{member.name}</p>
                      <p className="text-sm text-gray-400">{member.designation}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-300">{member.department}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center">
                      <div className={`px-4 py-2 rounded-lg border ${getPerformanceBg(member.performanceScore)}`}>
                        <span className={`text-xl font-bold ${getPerformanceColor(member.performanceScore)}`}>
                          {member.performanceScore}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex flex-col items-center">
                      <span className="text-white font-semibold">{member.completionRate}%</span>
                      <div className="w-24 h-2 bg-slate-700 rounded-full mt-1 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all"
                          style={{ width: `${member.completionRate}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex flex-col items-center">
                      <span className="text-white font-semibold">{member.averageProgress}%</span>
                      <div className="w-24 h-2 bg-slate-700 rounded-full mt-1 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all"
                          style={{ width: `${member.averageProgress}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="text-white">
                      <span className="font-bold text-green-400">{member.completedGoals}</span>
                      <span className="text-gray-400"> / {member.totalGoals}</span>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeamRankings;
