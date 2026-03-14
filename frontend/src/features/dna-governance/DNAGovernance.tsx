import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useRealTimeAnalytics } from '../../lib/useRealTimeData';
import {
  Dna, Microscope, GitBranch, Activity, Target, TrendingUp,
  BarChart3, LineChart, Settings, RefreshCw, Copy, Zap,
  Layers, Users, Clock, CheckCircle, AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LineChart as LineChartComp, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';

interface DNATrait {
  id: string;
  name: string;
  value: number;
  dominant: boolean;
  expression: number;
  category: 'leadership' | 'innovation' | 'efficiency' | 'collaboration' | 'adaptability';
}

interface GeneticStrand {
  id: string;
  generation: number;
  traits: DNATrait[];
  fitness: number;
  timestamp: Date;
}

interface EvolutionMetric {
  generation: number;
  fitness: number;
  dominant_traits: number;
  mutation_rate: number;
}

const DNAGovernance: React.FC = () => {
  const { user } = useAuthStore();
  const { data: analyticsData } = useRealTimeAnalytics(user?.id);

  const [strands, setStrands] = useState<GeneticStrand[]>([]);
  const [selectedStrand, setSelectedStrand] = useState<GeneticStrand | null>(null);
  const [evolutionData, setEvolutionData] = useState<EvolutionMetric[]>([]);
  const [generation, setGeneration] = useState(1);
  const [populationHealth, setPopulationHealth] = useState(82.5);

  useEffect(() => {
    if (analyticsData) {
      const data = Array.isArray(analyticsData) ? analyticsData[0] : analyticsData;
      
      const categories: Array<'leadership' | 'innovation' | 'efficiency' | 'collaboration' | 'adaptability'> = 
        ['leadership', 'innovation', 'efficiency', 'collaboration', 'adaptability'];
      const traitNames: Record<string, string[]> = {
        leadership: ['Decision Making', 'Influence', 'Vision'],
        innovation: ['Creativity', 'Risk Taking', 'Adaptability'],
        efficiency: ['Process Optimization', 'Resource Management', 'Time Management'],
        collaboration: ['Teamwork', 'Communication', 'Empathy'],
        adaptability: ['Flexibility', 'Learning', 'Resilience']
      };

      const mockStrands: GeneticStrand[] = Array.from({ length: 5 }, (_, i) => {
        const traits: DNATrait[] = categories.flatMap((cat, idx) => 
          traitNames[cat].map((name, jdx) => ({
            id: `${i}-${idx}-${jdx}`,
            name,
            value: Math.round((data?.performance_score || 0.8) * 100),
            dominant: (data?.performance_score || 0.8) > 0.75,
            expression: Math.round(((data?.performance_score || 0.8) + (data?.avg_kpi || 0.75)) / 2 * 100),
            category: cat
          }))
        );
        return {
          id: (i + 1).toString(),
          generation: i + 1,
          traits,
          fitness: Math.round((data?.performance_score || 0.8) * 100),
          timestamp: new Date(Date.now() - i * 24 * 60 * 60 * 1000)
        };
      });
      
      setStrands(mockStrands);
      if (mockStrands.length > 0) setSelectedStrand(mockStrands[0]);
      
      const mockEvolutionData: EvolutionMetric[] = Array.from({ length: 10 }, (_, i) => ({
        generation: i + 1,
        fitness: Math.round(60 + (data?.performance_score || 0.8) * 40),
        dominant_traits: 8 + Math.floor(i * 0.5),
        mutation_rate: 5 - (i * 0.4)
      }));
      
      setEvolutionData(mockEvolutionData);
      setPopulationHealth(Math.round((data?.performance_score || 0.8) * 100));
    }
  }, [analyticsData]);

  const generateInitialPopulation = () => {
    const categories: Array<'leadership' | 'innovation' | 'efficiency' | 'collaboration' | 'adaptability'> = 
      ['leadership', 'innovation', 'efficiency', 'collaboration', 'adaptability'];
    const traitNames: Record<string, string[]> = {
      leadership: ['Decision Making', 'Influence', 'Vision'],
      innovation: ['Creativity', 'Risk Taking', 'Adaptability'],
      efficiency: ['Process Optimization', 'Resource Management', 'Time Management'],
      collaboration: ['Teamwork', 'Communication', 'Empathy'],
      adaptability: ['Flexibility', 'Learning', 'Resilience']
    };

    const mockStrands: GeneticStrand[] = Array.from({ length: 5 }, (_, i) => {
      const traits: DNATrait[] = categories.flatMap((cat, idx) => 
        traitNames[cat].map((name, jdx) => ({
          id: `${i}-${idx}-${jdx}`,
          name,
          value: Math.floor(Math.random() * 100),
          dominant: Math.random() > 0.5,
          expression: Math.floor(Math.random() * 100) + 50,
          category: cat
        }))
      );
      return {
        id: (i + 1).toString(),
        generation: i + 1,
        traits,
        fitness: Math.floor(Math.random() * 30) + 70,
        timestamp: new Date(Date.now() - i * 24 * 60 * 60 * 1000)
      };
    });
    setStrands(mockStrands);
    if (mockStrands.length > 0) setSelectedStrand(mockStrands[0]);
  };

  const generateEvolutionData = () => {
    const data: EvolutionMetric[] = Array.from({ length: 10 }, (_, i) => ({
      generation: i + 1,
      fitness: 60 + i * 3 + Math.random() * 5,
      dominant_traits: 8 + Math.floor(i * 0.5),
      mutation_rate: 5 - (i * 0.4)
    }));
    setEvolutionData(data);
  };

  const traitRadarData = selectedStrand
    ? [
        { trait: 'Leadership', value: selectedStrand.traits.filter(t => t.category === 'leadership')[0]?.expression || 0 },
        { trait: 'Innovation', value: selectedStrand.traits.filter(t => t.category === 'innovation')[0]?.expression || 0 },
        { trait: 'Efficiency', value: selectedStrand.traits.filter(t => t.category === 'efficiency')[0]?.expression || 0 },
        { trait: 'Collaboration', value: selectedStrand.traits.filter(t => t.category === 'collaboration')[0]?.expression || 0 },
        { trait: 'Adaptability', value: selectedStrand.traits.filter(t => t.category === 'adaptability')[0]?.expression || 0 }
      ]
    : [];

  const categoryColor = (category: string) => {
    const colors: Record<string, string> = {
      leadership: '#3b82f6',
      innovation: '#f59e0b',
      efficiency: '#10b981',
      collaboration: '#8b5cf6',
      adaptability: '#ef4444'
    };
    return colors[category] || '#6b7280';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-purple-500/20">
            <Dna className="w-8 h-8 text-purple-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold gradient-text">DNA Governance</h1>
            <p className="text-gray-400">Genetic Algorithm Optimization for Organizational Traits</p>
          </div>
        </div>
        <button className="btn-secondary">
          <Settings className="w-4 h-4" />
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Current Generation</span>
            <Microscope className="w-5 h-5 text-purple-400" />
          </div>
          <p className="text-3xl font-bold text-white">{generation}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Population Health</span>
            <Activity className="w-5 h-5 text-green-400" />
          </div>
          <p className="text-3xl font-bold text-white">{populationHealth.toFixed(1)}%</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Avg Fitness</span>
            <TrendingUp className="w-5 h-5 text-blue-400" />
          </div>
          <p className="text-3xl font-bold text-white">{(strands.reduce((sum, s) => sum + s.fitness, 0) / strands.length).toFixed(1)}</p>
        </motion.div>
      </div>

      {/* Evolution Progress */}
      <div className="card p-6">
        <h3 className="text-xl font-semibold text-white mb-6">Fitness Evolution Across Generations</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChartComp data={evolutionData}>
            <defs>
              <linearGradient id="fitnessGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="generation" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #8b5cf6' }} />
            <Line type="monotone" dataKey="fitness" stroke="#8b5cf6" strokeWidth={2} fill="url(#fitnessGrad)" />
          </LineChartComp>
        </ResponsiveContainer>
      </div>

      {/* Population Strands */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <Dna className="w-5 h-5 mr-2 text-purple-400" />
          Genetic Population
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-3">
          {strands.map((strand) => (
            <motion.div
              key={strand.id}
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedStrand(strand)}
              className={`card p-4 cursor-pointer transition-all ${
                selectedStrand?.id === strand.id ? 'border-purple-500/75' : 'hover:border-purple-500/50'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm text-gray-400">Gen {strand.generation}</p>
                  <p className="text-lg font-bold text-white">DNA-{strand.id}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <Dna className="w-5 h-5 text-purple-400" />
                </div>
              </div>
              <p className="text-2xl font-bold text-purple-400 mb-2">{strand.fitness}</p>
              <div className="w-full bg-gray-700 rounded-full h-1.5">
                <div
                  className="h-1.5 rounded-full bg-purple-500"
                  style={{ width: `${strand.fitness}%` }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Selected Strand Details */}
      <AnimatePresence>
        {selectedStrand && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="space-y-6"
          >
            {/* Trait Radar */}
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-white mb-6">Trait Expression (Gen {selectedStrand.generation})</h3>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={traitRadarData}>
                  <PolarGrid stroke="#374151" />
                  <PolarAngleAxis dataKey="trait" stroke="#94a3b8" />
                  <PolarRadiusAxis stroke="#94a3b8" />
                  <Radar name="Expression" dataKey="value" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Traits by Category */}
            <div className="grid lg:grid-cols-2 gap-6">
              {(['leadership', 'innovation', 'efficiency', 'collaboration', 'adaptability'] as const).map((category) => (
                <div key={category} className="card p-4">
                  <h4 className="font-semibold text-white mb-4 capitalize">{category}</h4>
                  <div className="space-y-3">
                    {selectedStrand.traits
                      .filter(t => t.category === category)
                      .map(trait => (
                        <div key={trait.id}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-gray-400">{trait.name}</span>
                            <span className={trait.dominant ? 'text-yellow-400 font-bold' : 'text-gray-500'}>
                              {trait.dominant ? 'Dominant' : 'Recessive'}
                            </span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div
                              className="h-2 rounded-full"
                              style={{ width: `${trait.value}%`, backgroundColor: categoryColor(category) }}
                            />
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DNAGovernance;
