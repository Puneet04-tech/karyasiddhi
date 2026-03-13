import React, { useState, useEffect, useRef } from 'react';
import { 
  Dna, Zap, TrendingUp, Activity, BarChart3, Target, Users, 
  Brain, Shield, Award, RefreshCw, Play, Pause, Settings,
  GitBranch, GitCommit, AlertTriangle, CheckCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, Treemap } from 'recharts';

interface GeneticAlgorithm {
  id: string;
  name: string;
  description: string;
  type: 'department_structure' | 'workflow_optimization' | 'resource_allocation' | 'policy_simulation' | 'succession_planning';
  generation: number;
  fitness_score: number;
  population_size: number;
  mutation_rate: number;
  crossover_rate: number;
  best_individuals: Individual[];
  parameters: {
    mutation_rate: number;
    crossover_rate: number;
    elitism_rate: number;
    tournament_size: number;
    convergence_criteria: string[];
  };
  status: 'idle' | 'running' | 'completed' | 'failed';
  results: {
    baseline_performance: number;
    optimized_performance: number;
    improvement_percentage: number;
    solution: string;
    confidence: number;
  };
  created_at: Date;
}

interface Individual {
  id: string;
  name: string;
  role: string;
  department: string;
  skills: {
    leadership: number;
    technical: number;
    communication: number;
    innovation: number;
    problem_solving: number;
    collaboration: number;
    adaptability: number;
  };
  fitness_score: number;
  genetic_code: string;
}

interface OptimizationSuggestion {
  id: string;
  category: 'structure' | 'workflow' | 'resource' | 'policy';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  implementation_difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  expected_improvement: number;
  cost_estimate: number;
  confidence: number;
  ai_confidence: number;
}

interface EvolutionHistory {
  generation: number;
  best_fitness: number;
  avg_fitness: number;
  optimization_applied: string;
  performance_change: number;
  timestamp: Date;
}

const DNAGovernance = () => {
  const [algorithms, setAlgorithms] = useState<GeneticAlgorithm[]>([]);
  const [activeAlgorithm, setActiveAlgorithm] = useState<GeneticAlgorithm | null>(null);
  const [isEvolving, setIsEvolving] = useState(false);
  const [evolutionHistory, setEvolutionHistory] = useState<EvolutionHistory[]>([]);
  const [suggestions, setSuggestions] = useState<OptimizationSuggestion[]>([]);
  const [bestSolution, setBestSolution] = useState<string | null>(null);

  useEffect(() => {
    generateMockAlgorithms();
    const interval = setInterval(updateAlgorithms, 20000);
    return () => clearInterval(interval);
  }, []);

  const generateMockAlgorithms = () => {
    const mockAlgorithms: GeneticAlgorithm[] = [
      {
        id: '1',
        name: 'Department Structure Optimization',
        description: 'Optimize organizational structure for maximum efficiency and collaboration',
        type: 'department_structure',
        generation: 15,
        fitness_score: 78.5,
        population_size: 50,
        mutation_rate: 0.08,
        crossover_rate: 0.7,
        best_individuals: [],
        parameters: {
          mutation_rate: 0.08,
          crossover_rate: 0.7,
          elitism_rate: 0.1,
          tournament_size: 10,
          convergence_criteria: ['performance_improvement', 'resource_efficiency', 'collaboration_score']
        },
        status: 'idle',
        results: {
          baseline_performance: 72.3,
          optimized_performance: 85.7,
          improvement_percentage: 18.6,
          solution: 'Reorganized department reporting lines for better communication flow',
          confidence: 94.2
        },
        created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      },
      {
        id: '2',
        name: 'Workflow Process Optimization',
        description: 'Optimize business processes and workflows for maximum productivity',
        type: 'workflow_optimization',
        generation: 23,
        fitness_score: 81.2,
        population_size: 100,
        mutation_rate: 0.12,
        crossover_rate: 0.8,
        best_individuals: [],
        parameters: {
          mutation_rate: 0.12,
          crossover_rate: 0.8,
          elitism_rate: 0.15,
          tournament_size: 20,
          convergence_criteria: ['time_efficiency', 'error_reduction', 'quality_improvement']
        },
        status: 'idle',
        results: {
          baseline_performance: 68.9,
          optimized_performance: 82.4,
          improvement_percentage: 19.6,
          solution: 'Automated document approval workflows with parallel processing',
          confidence: 91.8
        },
        created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
      },
      {
        id: '3',
        name: 'Resource Allocation Optimization',
        description: 'Optimize resource distribution across departments for balanced workload',
        type: 'resource_allocation',
        generation: 18,
        fitness_score: 76.8,
        population_size: 75,
        mutation_rate: 0.1,
        crossover_rate: 0.75,
        best_individuals: [],
        parameters: {
          mutation_rate: 0.1,
          crossover_rate: 0.75,
          elitism_rate: 0.2,
          tournament_size: 15,
          convergence_criteria: ['workload_balance', 'skill_utilization', 'cost_efficiency']
        },
        status: 'idle',
        results: {
          baseline_performance: 65.4,
          optimized_performance: 78.9,
          improvement_percentage: 20.6,
          solution: 'Dynamic resource allocation based on real-time demand and skill matching',
          confidence: 89.3
        },
        created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
      },
      {
        id: '4',
        name: 'Policy Impact Simulation',
        description: 'Simulate policy changes before implementation to predict outcomes',
        type: 'policy_simulation',
        generation: 12,
        fitness_score: 74.1,
        population_size: 40,
        mutation_rate: 0.15,
        crossover_rate: 0.85,
        best_individuals: [],
        parameters: {
          mutation_rate: 0.15,
          crossover_rate: 0.85,
          elitism_rate: 0.25,
          tournament_size: 8,
          convergence_criteria: ['policy_effectiveness', 'citizen_satisfaction', 'implementation_feasibility']
        },
        status: 'idle',
        results: {
          baseline_performance: 63.2,
          optimized_performance: 71.8,
          improvement_percentage: 13.6,
          solution: 'Digital service delivery model with automated approval routing',
          confidence: 87.5
        },
        created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      },
      {
        id: '5',
        name: 'Succession Planning',
        description: 'Plan leadership development and succession strategies for organizational continuity',
        type: 'succession_planning',
        generation: 20,
        fitness_score: 79.3,
        population_size: 30,
        mutation_rate: 0.05,
        crossover_rate: 0.9,
        best_individuals: [],
        parameters: {
          mutation_rate: 0.05,
          crossover_rate: 0.9,
          elitism_rate: 0.3,
          tournament_size: 12,
          convergence_criteria: ['leadership_potential', 'knowledge_transfer', 'experience_matching']
        },
        status: 'idle',
        results: {
          baseline_performance: 61.1,
          optimized_performance: 69.8,
          improvement_percentage: 14.2,
          solution: 'AI-powered mentorship matching and career path optimization',
          confidence: 92.1
        },
        created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      }
    ];

    setAlgorithms(mockAlgorithms);
  };

  const updateAlgorithms = () => {
    setAlgorithms(prev => prev.map(algo => ({
      ...algo,
      generation: algo.generation + 1,
      fitness_score: Math.max(50, Math.min(100, algo.fitness_score + (Math.random() - 0.5) * 5)),
      status: Math.random() > 0.8 ? 'running' : 'idle'
    })));
  };

  const startEvolution = (algorithm: GeneticAlgorithm) => {
    setActiveAlgorithm(algorithm);
    setIsEvolving(true);
    setBestSolution(null);

    // Simulate evolution process
    let generation = 0;
    const maxGenerations = 100;
    const targetFitness = 95;

    const evolutionInterval = setInterval(() => {
      generation++;

      // Simulate fitness improvement
      const currentFitness = Math.min(targetFitness, algorithm.fitness_score + (generation * 0.3));

      // Generate best individuals
      const newBestIndividuals = generateBestIndividuals(algorithm.population_size);

      // Check for convergence
      const hasConverged = currentFitness >= targetFitness || generation >= maxGenerations;

      if (hasConverged) {
        clearInterval(evolutionInterval);
        setIsEvolving(false);

        const optimizedAlgorithm = {
          ...algorithm,
          status: 'completed',
          results: {
            baseline_performance: algorithm.results.baseline_performance,
            optimized_performance: currentFitness,
            improvement_percentage: ((currentFitness - algorithm.results.baseline_performance) / algorithm.results.baseline_performance) * 100,
            solution: generateSolutionDescription(algorithm, currentFitness),
            confidence: Math.min(99, 85 + (generation * 0.1))
          },
          best_individuals: newBestIndividuals
        };

        setAlgorithms(prev => prev.map(a => a.id === algorithm.id ? optimizedAlgorithm : a));
        
        // Add to evolution history
        const historyEntry: EvolutionHistory = {
          generation: algorithm.generation,
          best_fitness: Math.max(...newBestIndividuals.map(ind => ind.fitness_score)),
          avg_fitness: currentFitness,
          optimization_applied: algorithm.type,
          performance_change: currentFitness - algorithm.results.baseline_performance,
          timestamp: new Date()
        };

        setEvolutionHistory(prev => [historyEntry, ...prev.slice(0, 9)]);
        setBestSolution(generateSolutionDescription(algorithm, currentFitness));
      }
    }, 100);

    setTimeout(() => {
      clearInterval(evolutionInterval);
      setIsEvolving(false);
      setActiveAlgorithm(null);
    }, 30000);
  };

  const generateBestIndividuals = (populationSize: number): Individual[] => {
    const individuals: Individual[] = [];
    
    for (let i = 0; i < populationSize; i++) {
      individuals.push({
        id: `ind_${i}`,
        name: `Employee ${i + 1}`,
        role: ['Manager', 'Specialist', 'Analyst', 'Coordinator', 'Team Lead'][Math.floor(Math.random() * 5)],
        department: ['IT', 'Revenue', 'Operations', 'HR', 'Finance'][Math.floor(Math.random() * 5)],
        skills: {
          leadership: Math.floor(Math.random() * 40) + 60,
          technical: Math.floor(Math.random() * 50) + 50,
          communication: Math.floor(Math.random() * 45) + 55,
          innovation: Math.floor(Math.random() * 35) + 65,
          problem_solving: Math.floor(Math.random() * 40) + 60,
          collaboration: Math.floor(Math.random() * 50) + 50,
          adaptability: Math.floor(Math.random() * 45) + 55
        },
        fitness_score: Math.floor(Math.random() * 30) + 70,
        genetic_code: generateGeneticCode()
      });
    }
    
    return individuals.sort((a, b) => b.fitness_score - a.fitness_score).slice(0, 5);
  };

  const generateGeneticCode = (): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    return code;
  };

  const generateSolutionDescription = (algorithm: GeneticAlgorithm, finalFitness: number): string => {
    const improvements = [
      'Reorganized reporting structure',
      'Implemented automated workflows',
      'Optimized resource allocation',
      'Enhanced cross-department collaboration',
      'AI-driven decision support'
    ];
    
    return improvements[Math.floor(Math.random() * improvements.length)];
  };

  const generateSuggestions = () => {
    const suggestions: OptimizationSuggestion[] = [
      {
        id: '1',
        category: 'structure',
        title: 'Flatten Organizational Hierarchy',
        description: 'Reduce management layers by implementing team-based structure',
        impact: 'high',
        implementation_difficulty: 'medium',
        expected_improvement: 12,
        cost_estimate: 50000,
        confidence: 85,
        ai_confidence: 92
      },
      {
        id: '2',
        category: 'workflow',
        title: 'Implement AI-Powered Decision Routing',
        description: 'Use AI to automatically route decisions to appropriate departments',
        impact: 'high',
        implementation_difficulty: 'hard',
        expected_improvement: 18,
        cost_estimate: 150000,
        confidence: 78,
        ai_confidence: 88
      },
      {
        id: '3',
        category: 'resource',
        title: 'Dynamic Skill-Based Task Assignment',
        description: 'Automatically assign tasks based on employee skills and current workload',
        impact: 'medium',
        implementation_difficulty: 'medium',
        expected_improvement: 15,
        cost_estimate: 75000,
        confidence: 83,
        ai_confidence: 85
      },
      {
        id: '4',
        category: 'policy',
        title: 'Real-Time Policy Impact Analysis',
        description: 'Use genetic algorithms to predict policy outcomes before implementation',
        impact: 'high',
        implementation_difficulty: 'expert',
        expected_improvement: 22,
        cost_estimate: 200000,
        confidence: 75,
        ai_confidence: 82
      }
    ];

    setSuggestions(suggestions);
  };

  const getAlgorithmStatusColor = (status: GeneticAlgorithm['status']) => {
    switch (status) {
      case 'idle': return 'text-gray-400 bg-gray-500/20';
      case 'running': return 'text-blue-400 bg-blue-500/20';
      case 'completed': return 'text-green-400 bg-green-500/20';
      case 'failed': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getFitnessColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 80) return 'text-blue-400';
    if (score >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const evolutionChartData = [
    { generation: 1, bestFitness: 65, avgFitness: 65, optimization: 'department_structure' },
    { generation: 10, bestFitness: 72, avgFitness: 68, optimization: 'workflow_optimization' },
    { generation: 20, bestFitness: 78, avgFitness: 71, optimization: 'resource_allocation' },
    { generation: 30, bestFitness: 82, avgFitness: 74, optimization: 'policy_simulation' },
    { generation: 40, bestFitness: 85, avgFitness: 76, optimization: 'succession_planning' },
    { generation: 50, bestFitness: 88, avgFitness: 82, optimization: 'succession_planning' }
  ];

  const populationData = algorithms.map(algo => ({
    name: algo.name,
    population: algo.population_size,
    fitness: algo.fitness_score,
    diversity: Math.floor(Math.random() * 30) + 70
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl box-shadow-glow" style={{
            background: 'linear-gradient(135deg, #10b98130, #3b82f630)'
          }}>
            <Dna className="w-8 h-8 text-purple-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold gradient-text">DNA of Governance</h1>
            <p className="text-gray-300">Genetic Algorithm Optimization</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 px-3 py-1 rounded-lg ${
            isEvolving ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-500/20 text-gray-400'
          }`}>
            <Zap className="w-4 h-4" />
            <span className="font-semibold">{isEvolving ? 'Evolving' : 'Ready'}</span>
          </div>
          <button className="btn-secondary">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Algorithm Library */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <Target className="w-5 h-5 mr-2 text-purple-400" />
          Optimization Algorithms
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {algorithms.map((algorithm) => (
            <motion.div
              key={algorithm.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className="card p-6 cursor-pointer hover:border-purple-500/50"
              onClick={() => setActiveAlgorithm(algorithm)}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-white">{algorithm.name}</h3>
                  <p className="text-sm text-gray-400">{algorithm.description}</p>
                </div>
                <div className={`w-3 h-3 rounded-full ${getAlgorithmStatusColor(algorithm.status)}`} />
                <span className="text-xs text-white capitalize">{algorithm.status}</span>
              </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-400">Generation</p>
                  <p className="text-lg font-bold text-white">{algorithm.generation}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Fitness Score</p>
                  <p className={`text-lg font-bold ${getFitnessColor(algorithm.fitness_score)}`}>
                    {algorithm.fitness_score.toFixed(1)}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-400">Population</p>
                  <p className="text-lg font-bold text-white">{algorithm.population_size}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Mutation Rate</p>
                  <p className="text-lg font-bold text-white">{(algorithm.parameters.mutation_rate * 100).toFixed(1)}%</p>
                </div>
              </div>
              </div>

              <div className="flex justify-between items-center">
                <button
                  onClick={() => startEvolution(algorithm)}
                  disabled={algorithm.status === 'running' || isEvolving}
                  className="btn-primary"
                >
                  {algorithm.status === 'running' ? (
                    <>
                      <Pause className="w-4 h-4 mr-2" />
                      Evolving...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Start Evolution
                    </>
                  )}
                </button>
                <button className="btn-secondary">
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
          ))}
        </div>
      </div>

      {/* Active Evolution Display */}
      <AnimatePresence>
        {activeAlgorithm && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="card p-6 border border-purple-500/50"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <Dna className="w-5 h-5 mr-2 text-purple-400 animate-spin" />
                Evolution in Progress: {activeAlgorithm.name}
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">Generation</span>
                <span className="text-lg font-bold text-white">{activeAlgorithm.generation}/100</span>
              </div>
              <button
                onClick={() => {
                  clearInterval(evolutionInterval);
                  setIsEvolving(false);
                  setActiveAlgorithm(null);
                }}
                className="btn-secondary"
              >
                <Pause className="w-4 h-4 mr-2" />
                Stop Evolution
              </button>
              </div>
            </div>

            <div className="mb-6">
              <div className="w-full bg-gray-700 rounded-full h-4">
                <div 
                  className="h-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500"
                  style={{ width: `${Math.min(100, (activeAlgorithm.generation / 100) * 100)}%` }}
                />
              </div>
              <p className="text-center text-sm text-gray-400 mt-2">
                {Math.floor((activeAlgorithm.generation / 100) * 100)}% Complete
              </p>
            </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-400">Target Fitness</p>
                <p className="text-lg font-bold text-green-400">95%</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Current Fitness</p>
                <p className={`text-lg font-bold ${getFitnessColor(activeAlgorithm.fitness_score)}`}>
                  {activeAlgorithm.fitness_score.toFixed(1)}%
                </p>
              </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      )}

      {/* Results Display */}
      {activeAlgorithm && activeAlgorithm.status === 'completed' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-6 border border-green-500/50"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white flex items-center">
              <Award className="w-5 h-5 mr-2 text-green-400" />
              Evolution Complete: {activeAlgorithm.name}
            </h2>
            <div className="text-2xl font-bold text-green-400">
              {activeAlgorithm.results.improvement_percentage.toFixed(1)}% Improvement
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-400">Baseline Performance</p>
              <p className="text-lg font-bold text-white">{activeAlgorithm.results.baseline_performance.toFixed(1)}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Optimized Performance</p>
                <p className="text-lg font-bold text-green-400">{activeAlgorithm.results.optimized_performance.toFixed(1)}%</p>
              </div>
            </div>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-400">Confidence</p>
                <p className="text-lg font-bold text-white">{activeAlgorithm.results.confidence.toFixed(1)}%</p>
              </div>
              <div>
                <button className="btn-primary">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  View Details
                </button>
                <button className="btn-secondary">
                  <GitBranch className="w-4 h-4 mr-2" />
                  Apply Solution
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-800/50 rounded-lg">
            <h3 className="font-semibold text-white mb-4">Optimization Solution</h3>
            <p className="text-gray-300">{activeAlgorithm.results.solution}</p>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold text-white mb-4">Best Individuals Found</h3>
            <div className="grid grid-cols-1 gap-2">
              {activeAlgorithm.results.best_individuals.slice(0, 3).map((individual, index) => (
                <div key={index} className="p-3 bg-gray-700 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <p className="text-sm text-gray-400">{individual.name}</p>
                      <p className="text-xs text-gray-400">{individual.role}</p>
                      <p className="text-xs text-gray-400">{individual.department}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-purple-400">{individual.fitness_score.toFixed(1)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
      </AnimatePresence>
      )}

      {/* Evolution History */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <Activity className="w-5 h-5 mr-2 text-purple-400" />
          Evolution History
        </h2>
        <div className="space-y-3">
          {evolutionHistory.slice(0, 5).map((history, index) => (
            <div key={index} className="p-4 bg-gray-800/50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="text-sm text-gray-400">Generation {history.generation}</p>
                  <p className="text-xs text-gray-400">{history.timestamp.toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-purple-400">{history.best_fitness.toFixed(1)}</p>
                  <p className="text-xs text-gray-400">Best Fitness</p>
                </div>
              </div>
              <div className="mt-3">
                <p className="text-sm text-gray-400">Optimization: {history.optimization_applied}</p>
                <p className="text-xs text-gray-400">Change: {history.performance_change.toFixed(1)}%</p>
                </div>
              </div>
            </div>
          </div>
        ))}
        </div>
      </div>

      {/* AI Suggestions */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <Brain className="w-5 h-5 mr-2 text-purple-400" />
          AI Optimization Suggestions
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {suggestions.slice(0, 4).map((suggestion, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className="card p-6 cursor-pointer hover:border-purple-500/50"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div>
                    <h3 className="font-semibold text-white">{suggestion.title}</h3>
                    <p className="text-sm text-gray-400 mb-2">{suggestion.description}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded ${
                    suggestion.impact === 'high' ? 'bg-red-500/20 text-red-400' :
                    suggestion.impact === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-green-500/20 text-green-400'
                  }`}>
                    {suggestion.impact.toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-purple-400">
                  +{suggestion.expected_improvement}%
                </div>
              </div>
              </div>
              <div className="mt-3">
                <p className="text-sm text-gray-400">Implementation: {suggestion.implementation_difficulty}</p>
                <p className="text-xs text-gray-400">Cost: ${suggestion.cost_estimate.toLocaleString()}</p>
              </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-400">AI Confidence</p>
                  <p className="text-xs text-gray-400">{suggestion.ai_confidence}%</p>
                </div>
              </div>
              </div>
              <button className="btn-primary w-full">
                Implement Suggestion
              </button>
            </div>
          </motion.div>
        ))}
        </div>
      </div>

      {/* Analytics Dashboard */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Population Fitness Distribution */}
        <div className="card p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Population Fitness Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={populationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
              <YAxis stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0b1220', border: '1px solid #6366f1', borderRadius: 8 }}
                labelStyle={{ color: '#f1f5f9' }}
              />
              <Bar dataKey="fitness" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Evolution Progress */}
        <div className="card p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Evolution Progress</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={evolutionChartData}>
              <defs>
                <linearGradient id="fitnessGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1" />
                </linearGradient>
                <linearGradient id="avgGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="generation" stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
              <YAxis stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0b1220', border: '1px solid #6366f1', borderRadius: 8 }}
                labelStyle={{ color: '#f1f5f9' }}
              />
              <Line type="monotone" dataKey="bestFitness" stroke="#8b5cf6" strokeWidth={3} />
              <Area type="monotone" dataKey="avgFitness" fill="url(#avgGrad)" />
              <Line type="monotone" dataKey="fitness" stroke="#f59e0b" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>

      {/* Best Solution Display */}
      {bestSolution && (
        <div className="card p-6 border border-green-500/50">
          <div className="flex items-center gap-3 mb-4">
            <Award className="w-8 h-8 text-green-400" />
            <div>
              <h3 className="text-xl font-semibold text-white">Best Solution Found</h3>
              <p className="text-sm text-gray-400 mb-2">Algorithm: {activeAlgorithm.name}</p>
            </div>
          </div>
          <div className="text-2xl font-bold text-green-400">{bestSolution}</div>
          </div>
          <div className="mt-4 p-4 bg-gray-800/50 rounded-lg">
            <p className="text-gray-300">{bestSolution}</p>
          </div>
          <div className="flex justify-between">
            <button className="btn-primary">
              <CheckCircle className="w-4 h-4 mr-2" />
              Implement Solution
            </button>
            <button className="btn-secondary">
              <GitCommit className="w-4 h-4 mr-2" />
              Save Configuration
            </button>
          </div>
        </div>
      </motion.div>
      )}
    </div>
  );
};

export default DNAGovernance;
