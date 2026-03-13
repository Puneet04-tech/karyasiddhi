import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, Brain, Palette, Sun, Moon, Cloud, Zap, Eye, Settings,
  Smile, Frown, Meh, TrendingUp, Activity, BarChart3,
  Lightbulb, Music, Volume2, Thermometer, Wind
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface EmotionalState {
  mood: 'calm' | 'focused' | 'stressed' | 'creative' | 'collaborative' | 'analytical';
  energy: number;
  stress: number;
  focus: number;
  creativity: number;
  cognitive_load: number;
  time_of_day: 'morning' | 'afternoon' | 'evening' | 'night';
  environment_noise: number;
  screen_brightness: number;
}

interface UIAdaptation {
  color_scheme: 'energetic' | 'calm' | 'focused' | 'creative' | 'night_mode';
  complexity: 'minimal' | 'balanced' | 'detailed' | 'comprehensive';
  animation_speed: 'slow' | 'normal' | 'fast' | 'dynamic';
  font_size: 'small' | 'medium' | 'large' | 'adaptive';
  layout_density: 'spacious' | 'comfortable' | 'compact' | 'dynamic';
  sound_enabled: boolean;
  ambient_sound: 'nature' | 'focus' | 'creative' | 'energetic' | 'none';
}

interface PersonalizationProfile {
  name: string;
  preferences: {
    productivity_peak_hours: number[];
    stress_triggers: string[];
    focus_enhancers: string[];
    color_preferences: string[];
    interaction_style: 'visual' | 'auditory' | 'kinesthetic';
  };
  adaptations_history: {
    timestamp: Date;
    mood: EmotionalState['mood'];
    adaptations: UIAdaptation;
    effectiveness: number;
  }[];
}

const MoodAdaptiveUI = () => {
  const [emotionalState, setEmotionalState] = useState<EmotionalState>({
    mood: 'focused',
    energy: 75,
    stress: 35,
    focus: 82,
    creativity: 68,
    cognitive_load: 45,
    time_of_day: 'afternoon',
    environment_noise: 25,
    screen_brightness: 70
  });

  const [uiAdaptation, setUIAdaptation] = useState<UIAdaptation>({
    color_scheme: 'focused',
    complexity: 'balanced',
    animation_speed: 'normal',
    font_size: 'medium',
    layout_density: 'comfortable',
    sound_enabled: true,
    ambient_sound: 'focus'
  });

  const [personalizationProfile, setPersonalizationProfile] = useState<PersonalizationProfile>({
    name: 'Adaptive Profile',
    preferences: {
      productivity_peak_hours: [9, 10, 11, 14, 15],
      stress_triggers: ['high workload', 'tight deadlines', 'complex tasks'],
      focus_enhancers: ['classical music', 'minimal distractions', 'natural lighting'],
      color_preferences: ['#3b82f6', '#10b981', '#f59e0b'],
      interaction_style: 'visual'
    },
    adaptations_history: []
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [adaptationSuggestions, setAdaptationSuggestions] = useState<string[]>([]);

  useEffect(() => {
    analyzeUserState();
    const interval = setInterval(analyzeUserState, 10000);
    return () => clearInterval(interval);
  }, []);

  const analyzeUserState = () => {
    setIsAnalyzing(true);

    // Simulate emotional state analysis
    const newEmotionalState: EmotionalState = {
      mood: detectMood(),
      energy: Math.max(0, Math.min(100, emotionalState.energy + (Math.random() - 0.5) * 10)),
      stress: Math.max(0, Math.min(100, emotionalState.stress + (Math.random() - 0.5) * 8)),
      focus: Math.max(0, Math.min(100, emotionalState.focus + (Math.random() - 0.5) * 5)),
      creativity: Math.max(0, Math.min(100, emotionalState.creativity + (Math.random() - 0.5) * 7)),
      cognitive_load: Math.max(0, Math.min(100, emotionalState.cognitive_load + (Math.random() - 0.5) * 6)),
      time_of_day: detectTimeOfDay(),
      environment_noise: Math.max(0, Math.min(100, emotionalState.environment_noise + (Math.random() - 0.5) * 5)),
      screen_brightness: Math.max(0, Math.min(100, emotionalState.screen_brightness + (Math.random() - 0.5) * 3))
    };

    setEmotionalState(newEmotionalState);
    adaptUI(newEmotionalState);
    
    setTimeout(() => setIsAnalyzing(false), 2000);
  };

  const detectMood = (): EmotionalState['mood'] => {
    const moods: EmotionalState['mood'][] = ['calm', 'focused', 'stressed', 'creative', 'collaborative', 'analytical'];
    return moods[Math.floor(Math.random() * moods.length)];
  };

  const detectTimeOfDay = (): EmotionalState['time_of_day'] => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 17) return 'afternoon';
    if (hour >= 17 && hour < 21) return 'evening';
    return 'night';
  };

  const adaptUI = (state: EmotionalState) => {
    const newAdaptation: UIAdaptation = {
      color_scheme: determineColorScheme(state),
      complexity: determineComplexity(state),
      animation_speed: determineAnimationSpeed(state),
      font_size: determineFontSize(state),
      layout_density: determineLayoutDensity(state),
      sound_enabled: determineSoundEnabled(state),
      ambient_sound: determineAmbientSound(state)
    };

    setUIAdaptation(newAdaptation);
    generateAdaptationSuggestions(state, newAdaptation);
  };

  const determineColorScheme = (state: EmotionalState): UIAdaptation['color_scheme'] => {
    if (state.stress > 70) return 'calm';
    if (state.focus > 80) return 'focused';
    if (state.creativity > 80) return 'creative';
    if (state.energy > 80) return 'energetic';
    if (state.time_of_day === 'night') return 'night_mode';
    return 'focused';
  };

  const determineComplexity = (state: EmotionalState): UIAdaptation['complexity'] => {
    if (state.cognitive_load > 80) return 'minimal';
    if (state.cognitive_load > 60) return 'balanced';
    if (state.focus > 85) return 'detailed';
    return 'balanced';
  };

  const determineAnimationSpeed = (state: EmotionalState): UIAdaptation['animation_speed'] => {
    if (state.stress > 70) return 'slow';
    if (state.energy > 80) return 'fast';
    if (state.creativity > 80) return 'dynamic';
    return 'normal';
  };

  const determineFontSize = (state: EmotionalState): UIAdaptation['font_size'] => {
    if (state.cognitive_load > 80) return 'large';
    if (state.focus > 85) return 'small';
    return 'medium';
  };

  const determineLayoutDensity = (state: EmotionalState): UIAdaptation['layout_density'] => {
    if (state.stress > 70) return 'spacious';
    if (state.cognitive_load > 80) return 'compact';
    return 'comfortable';
  };

  const determineSoundEnabled = (state: EmotionalState): boolean => {
    return state.focus > 60 && state.stress < 50;
  };

  const determineAmbientSound = (state: EmotionalState): UIAdaptation['ambient_sound'] => {
    if (state.focus > 80) return 'focus';
    if (state.creativity > 80) return 'creative';
    if (state.energy > 80) return 'energetic';
    if (state.stress > 60) return 'nature';
    return 'focus';
  };

  const generateAdaptationSuggestions = (state: EmotionalState, adaptation: UIAdaptation) => {
    const suggestions = [];

    if (state.stress > 70) {
      suggestions.push('Consider taking a short break to reduce stress levels');
      suggestions.push('Switch to calm color scheme for better focus');
    }

    if (state.cognitive_load > 80) {
      suggestions.push('Simplifying UI complexity to reduce cognitive load');
      suggestions.push('Enable larger fonts for better readability');
    }

    if (state.focus < 50) {
      suggestions.push('Try focus-enhancing ambient sounds');
      suggestions.push('Minimize UI distractions');
    }

    if (state.creativity > 80) {
      suggestions.push('Switch to creative color scheme for inspiration');
      suggestions.push('Enable dynamic animations for creative flow');
    }

    setAdaptationSuggestions(suggestions);
  };

  const getMoodIcon = (mood: EmotionalState['mood']) => {
    switch (mood) {
      case 'calm': return Smile;
      case 'focused': return Brain;
      case 'stressed': return Frown;
      case 'creative': return Lightbulb;
      case 'collaborative': return Heart;
      case 'analytical': return BarChart3;
      default: return Meh;
    }
  };

  const getColorSchemeColors = (scheme: UIAdaptation['color_scheme']) => {
    switch (scheme) {
      case 'energetic': return { primary: '#f59e0b', secondary: '#ef4444', accent: '#10b981' };
      case 'calm': return { primary: '#10b981', secondary: '#06b6d4', accent: '#3b82f6' };
      case 'focused': return { primary: '#3b82f6', secondary: '#8b5cf6', accent: '#06b6d4' };
      case 'creative': return { primary: '#8b5cf6', secondary: '#ec4899', accent: '#f59e0b' };
      case 'night_mode': return { primary: '#1f2937', secondary: '#374151', accent: '#6366f1' };
      default: return { primary: '#3b82f6', secondary: '#8b5cf6', accent: '#06b6d4' };
    }
  };

  const emotionalTrend = [
    { time: '9AM', mood: 75, stress: 30, focus: 85, creativity: 70 },
    { time: '11AM', mood: 82, stress: 35, focus: 90, creativity: 75 },
    { time: '1PM', mood: 78, stress: 45, focus: 75, creativity: 80 },
    { time: '3PM', mood: 70, stress: 55, focus: 70, creativity: 85 },
    { time: '5PM', mood: 65, stress: 60, focus: 60, creativity: 78 }
  ];

  const performanceMetrics = [
    { metric: 'Productivity', current: 78, optimized: 92, improvement: 18 },
    { metric: 'Focus', current: 82, optimized: 95, improvement: 16 },
    { metric: 'Creativity', current: 68, optimized: 85, improvement: 25 },
    { metric: 'Wellness', current: 74, optimized: 88, improvement: 19 }
  ];

  const colors = getColorSchemeColors(uiAdaptation.color_scheme);

  return (
    <div className="space-y-6" style={{
      backgroundColor: colors.primary === '#1f2937' ? '#111827' : colors.primary + '10',
      color: '#ffffff'
    }}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl box-shadow-glow" style={{
            background: `linear-gradient(135deg, ${colors.primary}30, ${colors.secondary}30)`
          }}>
            <Palette className="w-8 h-8" style={{ color: colors.primary }} />
          </div>
          <div>
            <h1 className="text-3xl font-bold gradient-text">Mood-Adaptive UI</h1>
            <p className="text-gray-300">Emotional Interface Design</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 px-3 py-1 rounded-lg ${
            isAnalyzing ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-500/20 text-gray-400'
          }`}>
            <Brain className="w-4 h-4" />
            <span className="font-semibold">{isAnalyzing ? 'Analyzing' : 'Adaptive'}</span>
          </div>
          <button className="btn-secondary">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Emotional State Display */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-4"
          style={{ backgroundColor: colors.primary + '20', borderColor: colors.primary + '50' }}
        >
          <div className="flex items-center gap-3 mb-3">
            {React.createElement(getMoodIcon(emotionalState.mood), { 
              className: "w-5 h-5", 
              style: { color: colors.primary } 
            })}
            <div>
              <p className="text-sm text-gray-300">Current Mood</p>
              <p className="text-lg font-bold capitalize" style={{ color: colors.primary }}>
                {emotionalState.mood}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card p-4"
          style={{ backgroundColor: colors.primary + '20', borderColor: colors.primary + '50' }}
        >
          <div className="flex items-center gap-3">
            <Zap className="w-5 h-5" style={{ color: colors.secondary }} />
            <div>
              <p className="text-sm text-gray-300">Energy Level</p>
              <p className="text-lg font-bold" style={{ color: colors.secondary }}>
                {emotionalState.energy}%
              </p>
            </div>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
            <div 
              className="h-2 rounded-full transition-all duration-500"
              style={{ 
                width: `${emotionalState.energy}%`,
                backgroundColor: colors.secondary
              }}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card p-4"
          style={{ backgroundColor: colors.primary + '20', borderColor: colors.primary + '50' }}
        >
          <div className="flex items-center gap-3">
            <Activity className="w-5 h-5" style={{ color: colors.accent }} />
            <div>
              <p className="text-sm text-gray-300">Focus Level</p>
              <p className="text-lg font-bold" style={{ color: colors.accent }}>
                {emotionalState.focus}%
              </p>
            </div>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
            <div 
              className="h-2 rounded-full transition-all duration-500"
              style={{ 
                width: `${emotionalState.focus}%`,
                backgroundColor: colors.accent
              }}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card p-4"
          style={{ backgroundColor: colors.primary + '20', borderColor: colors.primary + '50' }}
        >
          <div className="flex items-center gap-3">
            <Thermometer className="w-5 h-5" style={{ color: '#ef4444' }} />
            <div>
              <p className="text-sm text-gray-300">Stress Level</p>
              <p className="text-lg font-bold" style={{ color: emotionalState.stress > 60 ? '#ef4444' : '#10b981' }}>
                {emotionalState.stress}%
              </p>
            </div>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
            <div 
              className="h-2 rounded-full transition-all duration-500"
              style={{ 
                width: `${emotionalState.stress}%`,
                backgroundColor: emotionalState.stress > 60 ? '#ef4444' : '#10b981'
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* UI Adaptations Display */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <Eye className="w-5 h-5 mr-2" style={{ color: colors.primary }} />
          Current UI Adaptations
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card p-6"
            style={{ backgroundColor: colors.primary + '20', borderColor: colors.primary + '50' }}
          >
            <h3 className="font-semibold text-white mb-4">Color Scheme</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded" style={{ backgroundColor: colors.primary }} />
                <span className="text-sm text-gray-300">Primary</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded" style={{ backgroundColor: colors.secondary }} />
                <span className="text-sm text-gray-300">Secondary</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded" style={{ backgroundColor: colors.accent }} />
                <span className="text-sm text-gray-300">Accent</span>
              </div>
            </div>
            <p className="text-sm capitalize text-gray-400 mt-3">
              Current: {uiAdaptation.color_scheme.replace('_', ' ')}
            </p>
          </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="card p-6"
            style={{ backgroundColor: colors.primary + '20', borderColor: colors.primary + '50' }}
          >
            <h3 className="font-semibold text-white mb-4">Interface Complexity</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Layout</span>
                <span className="text-white capitalize">{uiAdaptation.complexity}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Animations</span>
                <span className="text-white capitalize">{uiAdaptation.animation_speed}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Font Size</span>
                <span className="text-white capitalize">{uiAdaptation.font_size}</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="card p-6"
            style={{ backgroundColor: colors.primary + '20', borderColor: colors.primary + '50' }}
          >
            <h3 className="font-semibold text-white mb-4">Ambient Settings</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Sound</span>
                <span className="text-white">{uiAdaptation.sound_enabled ? 'Enabled' : 'Disabled'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Ambient</span>
                <span className="text-white capitalize">{uiAdaptation.ambient_sound.replace('_', ' ')}</span>
              </div>
            </div>
            {uiAdaptation.sound_enabled && (
              <div className="flex items-center gap-2 mt-3">
                <Volume2 className="w-4 h-4" style={{ color: colors.accent }} />
                <Music className="w-4 h-4" style={{ color: colors.accent }} />
                <Wind className="w-4 h-4" style={{ color: colors.accent }} />
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Emotional Trends */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card p-6" style={{ backgroundColor: colors.primary + '20', borderColor: colors.primary + '50' }}>
          <h2 className="text-xl font-semibold text-white mb-6">Emotional Trends</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={emotionalTrend}>
              <defs>
                <linearGradient id="moodGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={colors.primary} stopOpacity="0.8" />
                  <stop offset="100%" stopColor={colors.primary} stopOpacity="0.1" />
                </linearGradient>
                <linearGradient id="stressGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="time" stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
              <YAxis stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1f2937', border: `1px solid ${colors.primary}50`, borderRadius: 8 }}
                labelStyle={{ color: '#f1f5f9' }}
              />
              <Area type="monotone" dataKey="mood" stroke={colors.primary} fill="url(#moodGrad)" />
              <Area type="monotone" dataKey="stress" stroke="#ef4444" fill="url(#stressGrad)" />
              <Line type="monotone" dataKey="focus" stroke={colors.accent} strokeWidth={2} />
              <Line type="monotone" dataKey="creativity" stroke={colors.secondary} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-6" style={{ backgroundColor: colors.primary + '20', borderColor: colors.primary + '50' }}>
          <h2 className="text-xl font-semibold text-white mb-6">Performance Impact</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={performanceMetrics}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="metric" stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
              <YAxis stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1f2937', border: `1px solid ${colors.primary}50`, borderRadius: 8 }}
                labelStyle={{ color: '#f1f5f9' }}
              />
              <Bar dataKey="current" fill={colors.primary} />
              <Bar dataKey="optimized" fill={colors.accent} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Adaptation Suggestions */}
      <AnimatePresence>
        {adaptationSuggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="card p-6 border border-blue-500/50"
            style={{ backgroundColor: colors.primary + '20' }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Lightbulb className="w-5 h-5" style={{ color: colors.accent }} />
              <h2 className="text-xl font-semibold text-white">AI Adaptation Suggestions</h2>
            </div>
            <div className="space-y-3">
              {adaptationSuggestions.map((suggestion, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3 p-3 rounded-lg"
                  style={{ backgroundColor: colors.primary + '10' }}
                >
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.accent }} />
                  <p className="text-sm text-gray-300">{suggestion}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Personalization Profile */}
      <div className="card p-6" style={{ backgroundColor: colors.primary + '20', borderColor: colors.primary + '50' }}>
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
          <Heart className="w-5 h-5 mr-2" style={{ color: colors.primary }} />
          Personalization Profile
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-white mb-4">Your Preferences</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-400 mb-2">Peak Productivity Hours</p>
                <div className="flex flex-wrap gap-1">
                  {personalizationProfile.preferences.productivity_peak_hours.map((hour, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">
                      {hour}:00
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-2">Focus Enhancers</p>
                <div className="flex flex-wrap gap-1">
                  {personalizationProfile.preferences.focus_enhancers.map((enhancer, index) => (
                    <span key={index} className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">
                      {enhancer}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Adaptation History</h3>
            <div className="space-y-2">
              {personalizationProfile.adaptations_history.slice(0, 3).map((adaptation, index) => (
                <div key={index} className="p-3 rounded-lg" style={{ backgroundColor: colors.primary + '10' }}>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-300 capitalize">{adaptation.mood} mood</p>
                      <p className="text-xs text-gray-400">{adaptation.timestamp.toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold" style={{ color: colors.accent }}>
                        {adaptation.effectiveness}%
                      </p>
                      <p className="text-xs text-gray-400">effective</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodAdaptiveUI;
