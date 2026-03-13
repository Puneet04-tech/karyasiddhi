import React, { useState, useEffect } from 'react';
import { Trophy, Star, Zap, Shield, Award, TrendingUp, Users, Clock, CheckCircle, AlertCircle, Coins, Crown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, AreaChart, Area } from 'recharts';

interface KarmaTransaction {
  id: string;
  type: 'earned' | 'spent' | 'bonus' | 'penalty';
  category: 'performance' | 'collaboration' | 'innovation' | 'leadership' | 'mentoring' | 'integrity';
  amount: number;
  description: string;
  from?: string;
  to?: string;
  timestamp: Date;
  blockchainHash: string;
  verified: boolean;
}

interface ReputationMetrics {
  totalKarma: number;
  reputationScore: number;
  trustLevel: number;
  influenceIndex: number;
  collaborationScore: number;
  innovationIndex: number;
  leadershipRating: number;
  integrityScore: number;
}

interface SmartContract {
  id: string;
  title: string;
  description: string;
  karmaReward: number;
  requirements: string[];
  progress: number;
  status: 'active' | 'completed' | 'expired';
  participants: string[];
  deadline: Date;
}

const BlockchainKarma = () => {
  const [metrics, setMetrics] = useState<ReputationMetrics>({
    totalKarma: 2847,
    reputationScore: 89,
    trustLevel: 92,
    influenceIndex: 76,
    collaborationScore: 85,
    innovationIndex: 71,
    leadershipRating: 68,
    integrityScore: 95
  });

  const [transactions, setTransactions] = useState<KarmaTransaction[]>([]);
  const [smartContracts, setSmartContracts] = useState<SmartContract[]>([]);
  const [isMining, setIsMining] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'transactions' | 'contracts' | 'leaderboard'>('overview');

  useEffect(() => {
    generateTransactions();
    generateSmartContracts();
    const interval = setInterval(mineNewKarma, 60000); // Every minute
    return () => clearInterval(interval);
  }, []);

  const generateTransactions = () => {
    const mockTransactions: KarmaTransaction[] = [
      {
        id: '1',
        type: 'earned',
        category: 'performance',
        amount: 50,
        description: 'Exceeded quarterly KPI targets by 15%',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        blockchainHash: '0x7f8a9b2c...',
        verified: true
      },
      {
        id: '2',
        type: 'bonus',
        category: 'collaboration',
        amount: 25,
        description: 'Mentored junior team member - successful skill transfer',
        from: 'System',
        to: 'You',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        blockchainHash: '0x9c2d8e1f...',
        verified: true
      },
      {
        id: '3',
        type: 'spent',
        category: 'leadership',
        amount: -100,
        description: 'Redeemed for advanced leadership training program',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
        blockchainHash: '0x3e7a9b1c...',
        verified: true
      },
      {
        id: '4',
        type: 'earned',
        category: 'innovation',
        amount: 75,
        description: 'Submitted innovative process improvement - approved for implementation',
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
        blockchainHash: '0x8b1c9d2e...',
        verified: true
      },
      {
        id: '5',
        type: 'penalty',
        category: 'integrity',
        amount: -30,
        description: 'Late project delivery - missed deadline by 3 days',
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
        blockchainHash: '0x2d8e1f9a...',
        verified: true
      }
    ];
    
    setTransactions(mockTransactions);
  };

  const generateSmartContracts = () => {
    const mockContracts: SmartContract[] = [
      {
        id: '1',
        title: 'Performance Excellence',
        description: 'Achieve 95%+ on all KPIs for 3 consecutive months',
        karmaReward: 500,
        requirements: ['KPI > 95%', '3 months consistency', 'Peer validation'],
        progress: 67,
        status: 'active',
        participants: ['You', 'Team Alpha'],
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      },
      {
        id: '2',
        title: 'Innovation Champion',
        description: 'Submit and implement 3 innovative solutions',
        karmaReward: 750,
        requirements: ['3 innovations', 'Implementation complete', 'Measurable impact'],
        progress: 33,
        status: 'active',
        participants: ['You'],
        deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)
      },
      {
        id: '3',
        title: 'Mentorship Master',
        description: 'Successfully mentor 5 junior employees',
        karmaReward: 300,
        requirements: ['5 mentees', 'Skill improvement', 'Feedback rating > 4.5'],
        progress: 80,
        status: 'active',
        participants: ['You', 'Mentee Group'],
        deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000)
      }
    ];
    
    setSmartContracts(mockContracts);
  };

  const mineNewKarma = async () => {
    setIsMining(true);
    
    // Simulate blockchain mining
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Add random karma transaction
    const categories: KarmaTransaction['category'][] = ['performance', 'collaboration', 'innovation', 'leadership', 'mentoring', 'integrity'];
    const types: KarmaTransaction['type'][] = ['earned', 'bonus'];
    
    const newTransaction: KarmaTransaction = {
      id: Date.now().toString(),
      type: types[Math.floor(Math.random() * types.length)],
      category: categories[Math.floor(Math.random() * categories.length)],
      amount: Math.floor(Math.random() * 50) + 10,
      description: 'Real-time achievement detected by AI',
      timestamp: new Date(),
      blockchainHash: `0x${Math.random().toString(16).substr(2, 8)}...`,
      verified: true
    };
    
    setTransactions(prev => [newTransaction, ...prev]);
    setMetrics(prev => ({
      ...prev,
      totalKarma: prev.totalKarma + newTransaction.amount
    }));
    
    setIsMining(false);
  };

  const getTrustLevel = (score: number) => {
    if (score >= 90) return { level: 'Platinum', color: 'text-purple-400', icon: Crown };
    if (score >= 75) return { level: 'Gold', color: 'text-yellow-400', icon: Star };
    if (score >= 60) return { level: 'Silver', color: 'text-gray-400', icon: Shield };
    return { level: 'Bronze', color: 'text-orange-400', icon: Trophy };
  };

  const radarData = [
    { metric: 'Trust', value: metrics.trustLevel, fullMark: 100 },
    { metric: 'Influence', value: metrics.influenceIndex, fullMark: 100 },
    { metric: 'Collaboration', value: metrics.collaborationScore, fullMark: 100 },
    { metric: 'Innovation', value: metrics.innovationIndex, fullMark: 100 },
    { metric: 'Leadership', value: metrics.leadershipRating, fullMark: 100 },
    { metric: 'Integrity', value: metrics.integrityScore, fullMark: 100 }
  ];

  const transactionHistory = transactions.slice(0, 10).map(tx => ({
    time: tx.timestamp.toLocaleTimeString(),
    amount: tx.amount,
    type: tx.type
  }));

  const trustLevel = getTrustLevel(metrics.trustLevel);
  const TrustIcon = trustLevel.icon;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-yellow-500/30 to-orange-500/30 rounded-2xl box-shadow-glow">
            <Coins className="w-8 h-8 text-yellow-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold gradient-text">Blockchain Karma</h1>
            <p className="text-gray-400">Immutable Reputation System</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isMining && (
            <div className="flex items-center gap-2 text-orange-400">
              <Zap className="w-4 h-4 animate-pulse" />
              <span className="text-sm">Mining...</span>
            </div>
          )}
          <div className={`px-3 py-1 rounded-lg flex items-center gap-2 ${trustLevel.color} bg-opacity-20`}>
            <TrustIcon className="w-4 h-4" />
            <span className="font-semibold">{trustLevel.level} Level</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 border-b border-gray-700">
        {(['overview', 'transactions', 'contracts', 'leaderboard'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`px-4 py-2 capitalize transition-all ${
              selectedTab === tab 
                ? 'border-b-2 border-primary-500 text-primary-400' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {selectedTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card p-4 text-center"
            >
              <Coins className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-3xl font-bold gradient-text">{metrics.totalKarma.toLocaleString()}</div>
              <p className="text-sm text-gray-400">Total Karma</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card p-4 text-center"
            >
              <Trophy className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <div className="text-3xl font-bold text-purple-400">{metrics.reputationScore}</div>
              <p className="text-sm text-gray-400">Reputation Score</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card p-4 text-center"
            >
              <Shield className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-3xl font-bold text-green-400">{metrics.trustLevel}%</div>
              <p className="text-sm text-gray-400">Trust Level</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="card p-4 text-center"
            >
              <TrendingUp className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <div className="text-3xl font-bold text-blue-400">{metrics.influenceIndex}</div>
              <p className="text-sm text-gray-400">Influence Index</p>
            </motion.div>
          </div>

          {/* Reputation Radar */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="card p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Reputation Radar</h2>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#374151" />
                  <PolarAngleAxis dataKey="metric" stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#374151" tick={{ fill: '#6b7280' }} />
                  <Radar
                    name="Your Score"
                    dataKey="value"
                    stroke="#f59e0b"
                    fill="#f59e0b"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0b1220', border: '1px solid #111827', borderRadius: 8 }}
                    labelStyle={{ color: '#f1f5f9' }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="card p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Karma Flow</h2>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={transactionHistory}>
                  <defs>
                    <linearGradient id="karmaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#0f172a" />
                  <XAxis dataKey="time" stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
                  <YAxis stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0b1220', border: '1px solid #111827', borderRadius: 8 }}
                    labelStyle={{ color: '#f1f5f9' }}
                  />
                  <Area type="monotone" dataKey="amount" stroke="#f59e0b" fill="url(#karmaGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Active Smart Contracts */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white flex items-center">
              <Award className="w-5 h-5 mr-2 text-yellow-400" />
              Active Smart Contracts
            </h2>
            {smartContracts.map((contract) => (
              <motion.div
                key={contract.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="card p-6 border border-yellow-500/50"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-white mb-1">{contract.title}</h3>
                    <p className="text-sm text-gray-400 mb-2">{contract.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <Coins className="w-3 h-3 text-yellow-400" />
                        {contract.karmaReward} Karma
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {contract.deadline.toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {contract.participants.length} participants
                      </span>
                    </div>
                  </div>
                  <div className={`px-2 py-1 text-xs rounded ${
                    contract.status === 'active' ? 'bg-green-500/20 text-green-400' :
                    contract.status === 'completed' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {contract.status}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-white font-semibold">{contract.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${contract.progress}%` }}
                    />
                  </div>
                </div>
                
                <div className="mt-4">
                  <p className="text-xs text-gray-400 mb-2">Requirements:</p>
                  <div className="flex flex-wrap gap-1">
                    {contract.requirements.map((req, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                        {req}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {selectedTab === 'transactions' && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Blockchain Transactions</h2>
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="card p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.type === 'earned' ? 'bg-green-500/20' :
                    transaction.type === 'bonus' ? 'bg-blue-500/20' :
                    transaction.type === 'spent' ? 'bg-red-500/20' :
                    'bg-orange-500/20'
                  }`}>
                    {transaction.type === 'earned' ? <TrendingUp className="w-5 h-5 text-green-400" /> :
                     transaction.type === 'bonus' ? <Star className="w-5 h-5 text-blue-400" /> :
                     transaction.type === 'spent' ? <CheckCircle className="w-5 h-5 text-red-400" /> :
                     <AlertCircle className="w-5 h-5 text-orange-400" />}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{transaction.description}</p>
                    <p className="text-sm text-gray-400">
                      {transaction.category} • {transaction.timestamp.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500">Hash: {transaction.blockchainHash}</span>
                      {transaction.verified && (
                        <CheckCircle className="w-3 h-3 text-green-400" />
                      )}
                    </div>
                  </div>
                </div>
                <div className={`text-lg font-bold ${
                  transaction.amount > 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {transaction.amount > 0 ? '+' : ''}{transaction.amount}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {selectedTab === 'contracts' && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Smart Contracts Marketplace</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {smartContracts.map((contract) => (
              <motion.div
                key={contract.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="card p-6"
              >
                <h3 className="font-semibold text-white mb-2">{contract.title}</h3>
                <p className="text-sm text-gray-400 mb-4">{contract.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-yellow-400">{contract.karmaReward} Karma</span>
                  <button className="btn-primary">Participate</button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {selectedTab === 'leaderboard' && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Global Karma Leaderboard</h2>
          <div className="card p-6">
            <div className="space-y-3">
              {[
                { rank: 1, name: 'Arun Singh', karma: 5234, level: 'Platinum' },
                { rank: 2, name: 'Priya Sharma', karma: 4892, level: 'Platinum' },
                { rank: 3, name: 'Rajesh Kumar', karma: 4321, level: 'Gold' },
                { rank: 4, name: 'You', karma: metrics.totalKarma, level: trustLevel.level },
                { rank: 5, name: 'Amit Patel', karma: 3876, level: 'Gold' },
              ].map((person) => (
                <motion.div
                  key={person.rank}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    person.name === 'You' ? 'bg-primary-500/20 border border-primary-500/50' : 'bg-gray-800/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      person.rank === 1 ? 'bg-yellow-500/20 text-yellow-500' :
                      person.rank === 2 ? 'bg-gray-400/20 text-gray-400' :
                      person.rank === 3 ? 'bg-orange-500/20 text-orange-500' :
                      'bg-primary-500/20 text-primary-400'
                    }`}>
                      {person.rank}
                    </div>
                    <div>
                      <p className="font-semibold text-white">{person.name}</p>
                      <p className="text-sm text-gray-400">{person.level}</p>
                    </div>
                  </div>
                  <div className="text-lg font-bold text-yellow-400">{person.karma}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlockchainKarma;
