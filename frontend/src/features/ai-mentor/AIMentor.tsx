import React, { useState, useEffect } from 'react';
import { Brain, MessageCircle, Target, TrendingUp, Award, Lightbulb, Zap, Heart, BookOpen, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';
import { fetchAIMentorData } from '../../lib/featureDataApi';

interface AIMessage {
  id: string;
  type: 'insight' | 'recommendation' | 'warning' | 'achievement' | 'coaching';
  title: string;
  message: string;
  confidence: number;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  actionable?: boolean;
  category: 'performance' | 'career' | 'skills' | 'wellness' | 'collaboration';
  timestamp: Date;
}

interface PersonalInsight {
  currentProductivity: number;
  potentialProductivity: number;
  skillGaps: string[];
  careerPath: string[];
  burnoutRisk: number;
  teamHarmony: number;
  emotionalIntelligence: number;
}

const AIMentor = () => {
  const { user } = useAuthStore();
  const [mentorData, setMentorData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [insights, setInsights] = useState<PersonalInsight | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [chatMode, setChatMode] = useState(false);
  const [userMessage, setUserMessage] = useState('');

  // Fetch AI Mentor data from enterprise endpoint
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchAIMentorData(user?.id);
        setMentorData(data);
      } catch (error) {
        console.error('Error fetching mentor data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (user?.id) {
      loadData();
    }
  }, [user?.id]);

  // Generate insights from real enterprise API data
  useEffect(() => {
    if (mentorData) {
      const performanceInsights = mentorData.performance_insights || {};
      const newInsights: PersonalInsight = {
        currentProductivity: performanceInsights.decision_making || 78,
        potentialProductivity: (performanceInsights.decision_making || 78) + 14,
        skillGaps: mentorData.improvement_areas || ['Data Analysis', 'Strategic Planning', 'Public Speaking'],
        careerPath: ['Senior Officer', 'Department Head', 'Director'],
        burnoutRisk: 35,
        teamHarmony: performanceInsights.team_leadership || 85,
        emotionalIntelligence: performanceInsights.communication_effectiveness || 72
      };
      setInsights(newInsights);
      
      // Convert mentor data to messages
      const apiMessages: AIMessage[] = [];
      if (mentorData.recent_recommendations && Array.isArray(mentorData.recent_recommendations)) {
        mentorData.recent_recommendations.slice(0, 5).forEach((rec: string, idx: number) => {
          apiMessages.push({
            id: `rec-${idx}`,
            type: 'recommendation',
            title: 'AI Recommendation',
            message: rec,
            confidence: 85 + Math.random() * 10,
            priority: 'medium',
            actionable: true,
            category: 'career',
            timestamp: new Date()
          });
        });
      }
      setMessages(apiMessages);
    }
  }, [mentorData]);

  const generateMessageTitle = (): string => {
    const titles = [
      "Performance Optimization Detected",
      "Career Growth Opportunity",
      "Skill Development Alert",
      "Wellness Check-in",
      "Team Collaboration Insight",
      "Leadership Potential Identified",
      "Efficiency Improvement Suggestion",
      "Learning Recommendation"
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  };

  const generateMessageContent = (): string => {
    const contents = [
      "Based on your recent performance patterns, I've identified a 15% productivity improvement opportunity by optimizing your morning workflow.",
      "Your data analysis skills show exceptional promise. Consider enrolling in the Advanced Analytics certification program.",
      "I notice increased stress patterns in your work schedule. Let's discuss workload optimization strategies.",
      "Your collaboration metrics have improved by 23% this month. Keep up the excellent teamwork!",
      "AI predicts a high probability of success for you in the upcoming Department Head assessment.",
      "Your emotional intelligence scores indicate strong leadership potential. Here are some development exercises...",
      "I've analyzed your peak productivity hours. Schedule important tasks between 9-11 AM for optimal results.",
      "Your skill gap analysis suggests focusing on strategic communication for career advancement."
    ];
    return contents[Math.floor(Math.random() * contents.length)];
  };

  const getCategoryIcon = (category: AIMessage['category']) => {
    switch (category) {
      case 'performance': return <TrendingUp className="w-4 h-4" />;
      case 'career': return <Award className="w-4 h-4" />;
      case 'skills': return <BookOpen className="w-4 h-4" />;
      case 'wellness': return <Heart className="w-4 h-4" />;
      case 'collaboration': return <Users className="w-4 h-4" />;
      default: return <Lightbulb className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: AIMessage['priority']) => {
    switch (priority) {
      case 'urgent': return 'border-red-500/50 bg-red-500/10';
      case 'high': return 'border-orange-500/50 bg-orange-500/10';
      case 'medium': return 'border-yellow-500/50 bg-yellow-500/10';
      case 'low': return 'border-green-500/50 bg-green-500/10';
      default: return 'border-blue-500/50 bg-blue-500/10';
    }
  };

  const getTypeColor = (type: AIMessage['type']) => {
    switch (type) {
      case 'insight': return 'text-purple-400';
      case 'recommendation': return 'text-blue-400';
      case 'warning': return 'text-orange-400';
      case 'achievement': return 'text-green-400';
      case 'coaching': return 'text-pink-400';
      default: return 'text-gray-400';
    }
  };

  const handleSendMessage = () => {
    if (!userMessage.trim()) return;
    // Add user message logic here
    setUserMessage('');
  };

  const filteredMessages = messages.filter(msg => 
    selectedCategory === 'all' || msg.category === selectedCategory
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-2xl box-shadow-glow">
            <Brain className="w-8 h-8 text-purple-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold gradient-text">AI Mentor</h1>
            <p className="text-gray-400">Your personal performance coach</p>
          </div>
        </div>
        <button
          onClick={() => setChatMode(!chatMode)}
          className="btn-primary pulse-glow"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          {chatMode ? 'Dashboard' : 'Chat Mode'}
        </button>
      </div>

      {!chatMode ? (
        <>
          {/* Personal Insights Dashboard */}
          {insights && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Productivity Gap</h3>
                  <Zap className="w-5 h-5 text-yellow-400" />
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Current</span>
                      <span className="text-white font-bold">{insights.currentProductivity}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full"
                        style={{ width: `${insights.currentProductivity}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Potential</span>
                      <span className="text-green-400 font-bold">{insights.potentialProductivity}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                        style={{ width: `${insights.potentialProductivity}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-center pt-2">
                    <span className="text-2xl font-bold gradient-text">
                      +{insights.potentialProductivity - insights.currentProductivity}%
                    </span>
                    <p className="text-xs text-gray-400">Improvement Potential</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="card p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Wellness Metrics</h3>
                  <Heart className="w-5 h-5 text-red-400" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Burnout Risk</span>
                    <span className={`font-bold ${
                      insights.burnoutRisk > 70 ? 'text-red-400' : 
                      insights.burnoutRisk > 40 ? 'text-yellow-400' : 'text-green-400'
                    }`}>
                      {insights.burnoutRisk}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Team Harmony</span>
                    <span className="text-blue-400 font-bold">{insights.teamHarmony}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Emotional Intelligence</span>
                    <span className="text-purple-400 font-bold">{insights.emotionalIntelligence}%</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="card p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Career Path</h3>
                  <Target className="w-5 h-5 text-green-400" />
                </div>
                <div className="space-y-2">
                  {insights.careerPath.map((path, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        index === 0 ? 'bg-green-400' : 
                        index === 1 ? 'bg-yellow-400' : 'bg-gray-400'
                      }`} />
                      <span className="text-sm text-gray-300">{path}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t border-gray-700">
                  <p className="text-xs text-gray-400 mb-2">Skill Gaps to Address:</p>
                  <div className="flex flex-wrap gap-1">
                    {insights.skillGaps.map((skill, index) => (
                      <span key={index} className="px-2 py-1 bg-orange-500/20 text-orange-400 text-xs rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {/* Category Filter */}
          <div className="flex gap-2 flex-wrap">
            {['all', 'performance', 'career', 'skills', 'wellness', 'collaboration'].map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg capitalize transition-all ${
                  selectedCategory === category 
                    ? 'bg-primary-500 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* AI Messages */}
          <div className="space-y-4">
            <AnimatePresence>
              {filteredMessages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className={`card p-6 border ${getPriorityColor(message.priority)}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${getTypeColor(message.type)} bg-opacity-20`}>
                        {getCategoryIcon(message.category)}
                      </div>
                      <div>
                        <h3 className={`font-semibold text-white ${getTypeColor(message.type)}`}>
                          {message.title}
                        </h3>
                        <p className="text-xs text-gray-400 capitalize">
                          {message.category} • {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-1 bg-gray-600 rounded">
                        {message.confidence}% confidence
                      </span>
                      {message.actionable && (
                        <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded">
                          Actionable
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-300 mb-4">{message.message}</p>
                  {message.actionable && (
                    <div className="flex gap-2">
                      <button className="btn-primary text-sm">
                        <Lightbulb className="w-3 h-3 mr-1" />
                        Take Action
                      </button>
                      <button className="btn-secondary text-sm">
                        Learn More
                      </button>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="card p-4 border border-purple-500/50"
            >
              <div className="flex items-center gap-3">
                <Brain className="w-5 h-5 text-purple-400 animate-pulse" />
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="text-gray-400 text-sm">AI Mentor is analyzing...</span>
              </div>
            </motion.div>
          )}
        </>
      ) : (
        /* Chat Mode */
        <div className="h-[600px] flex flex-col">
          <div className="flex-1 space-y-4 overflow-y-auto mb-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${message.type === 'coaching' ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.type === 'coaching' ? 'bg-purple-500/30' : 'bg-blue-500/30'
                }`}>
                  {message.type === 'coaching' ? 
                    <Brain className="w-4 h-4 text-purple-400" /> :
                    <div className="w-2 h-2 bg-blue-400 rounded-full" />
                  }
                </div>
                <div className={`max-w-[70%] ${message.type === 'coaching' ? 'items-start' : 'items-end'}`}>
                  <div className={`card p-4 ${getPriorityColor(message.priority)}`}>
                    <h4 className={`font-semibold text-sm mb-1 ${getTypeColor(message.type)}`}>
                      {message.title}
                    </h4>
                    <p className="text-gray-300 text-sm">{message.message}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="flex gap-2">
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              placeholder="Ask your AI Mentor anything..."
              className="flex-1 input-field"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button className="btn-primary">
              <MessageCircle className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIMentor;
