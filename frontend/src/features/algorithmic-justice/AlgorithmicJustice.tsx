import React, { useState, useEffect, useRef } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useRealTimeAnalytics } from '../../lib/useRealTimeData';
import { 
  Scale, AlertTriangle, CheckCircle, TrendingUp, BarChart3,
  Activity, Target, Users, Shield, Eye, Brain, Settings,
  RefreshCw, FileText, Clock, Zap, Award, Gavel,
  AlertCircle, TrendingDown, ArrowUp, ArrowDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

interface FairnessMetric {
  id: string;
  name: string;
  category: 'demographic' | 'performance' | 'opportunity' | 'outcome' | 'process';
  current_score: number;
  target_score: number;
  trend: 'improving' | 'stable' | 'declining';
  impact_level: 'high' | 'medium' | 'low';
  last_assessed: Date;
  recommendations: string[];
  historical_data: {
    date: Date;
    score: number;
  }[];
}

interface AlgorithmAudit {
  id: string;
  algorithm_name: string;
  type: 'hiring' | 'promotion' | 'performance' | 'resource' | 'decision';
  fairness_score: number;
  bias_detected: {
    gender_bias: number;
    age_bias: number;
    ethnicity_bias: number;
    socioeconomic_bias: number;
  };
  compliance_score: number;
  risk_level: 'low' | 'medium' | 'high' | 'critical';
  audit_date: Date;
  findings: string[];
  recommendations: string[];
  next_audit_date: Date;
}

interface JusticeInsight {
  id: string;
  title: string;
  description: string;
  type: 'bias_alert' | 'fairness_improvement' | 'compliance_issue' | 'opportunity';
  severity: 'low' | 'medium' | 'high' | 'critical';
  confidence: number;
  affected_algorithms: string[];
  suggested_actions: string[];
  potential_impact: number;
  created_at: Date;
}

interface ComplianceReport {
  id: string;
  report_type: 'monthly' | 'quarterly' | 'annual' | 'ad_hoc';
  period_start: Date;
  period_end: Date;
  overall_fairness_score: number;
  compliance_status: 'compliant' | 'partial' | 'non_compliant';
  key_findings: string[];
  corrective_actions: string[];
  generated_at: Date;
}

const AlgorithmicJustice = () => {
  const { user } = useAuthStore();
  const { data: analyticsData } = useRealTimeAnalytics(user?.id);

  const [fairnessMetrics, setFairnessMetrics] = useState<FairnessMetric[]>([]);
  const [audits, setAudits] = useState<AlgorithmAudit[]>([]);
  const [insights, setInsights] = useState<JusticeInsight[]>([]);
  const [reports, setReports] = useState<ComplianceReport[]>([]);
  const [isAuditing, setIsAuditing] = useState(false);
  const [overallFairness, setOverallFairness] = useState(91.3);
  const [activeAudit, setActiveAudit] = useState<string | null>(null);

  useEffect(() => {
    if (analyticsData) {
      const data = Array.isArray(analyticsData) ? analyticsData[0] : analyticsData;
      
      const mockMetrics: FairnessMetric[] = [
        {
          id: '1',
          name: 'Demographic Parity',
          category: 'demographic',
          current_score: Math.round((data?.performance_score || 0.91) * 100),
          target_score: 95,
          trend: (data?.performance_score || 0.91) > 0.85 ? 'improving' : 'stable',
          impact_level: 'high',
          last_assessed: new Date(),
          recommendations: ['Monitor outliers', 'Adjust thresholds'],
          historical_data: []
        }
      ];
      
      setFairnessMetrics(mockMetrics);
      
      const mockAudits: AlgorithmAudit[] = [
        {
          id: '1',
          algorithm_name: 'Performance Prediction',
          type: 'performance',
          fairness_score: Math.round((data?.avg_kpi || 0.88) * 100),
          bias_detected: {
            gender_bias: 100 - Math.round((data?.avg_kpi || 0.88) * 100),
            age_bias: 100 - Math.round((data?.performance_score || 0.91) * 100),
            ethnicity_bias: 5,
            socioeconomic_bias: 3
          },
          compliance_score: 94,
          risk_level: 'low',
          audit_date: new Date(),
          findings: ['All fairness criteria met'],
          recommendations: [],
          next_audit_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        }
      ];
      
      setAudits(mockAudits);
      
      const mockInsights: JusticeInsight[] = [
        {
          id: '1',
          title: 'High Fairness Score',
          description: 'All algorithms operating within fairness guidelines',
          type: 'fairness_improvement',
          severity: 'low',
          confidence: 96,
          affected_algorithms: ['PA001', 'PA002'],
          suggested_actions: ['Continue monitoring', 'Update quarterly'],
          potential_impact: 95,
          created_at: new Date()
        }
      ];
      
      setInsights(mockInsights);
      setOverallFairness(Math.round((data?.avg_kpi || 0.91) * 100));
    }
  }, [analyticsData]);

  const startAudit = async (algorithmId: string) => {
    const mockMetrics: FairnessMetric[] = [
      {
        id: '1',
        name: 'Gender Equality',
        category: 'demographic',
        current_score: 94.2,
        target_score: 98,
        trend: 'improving',
        impact_level: 'high',
        last_assessed: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        recommendations: [
          'Continue current gender-balanced hiring practices',
          'Monitor promotion rates across all levels',
          'Ensure equal pay for equal work'
        ],
        historical_data: [
          { date: new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000), score: 89.7 },
          { date: new Date(Date.now() - 5 * 30 * 24 * 60 * 60 * 1000), score: 91.2 },
          { date: new Date(Date.now() - 4 * 30 * 24 * 60 * 60 * 1000), score: 92.8 },
          { date: new Date(Date.now() - 3 * 30 * 24 * 60 * 60 * 1000), score: 93.4 },
          { date: new Date(Date.now() - 2 * 30 * 24 * 60 * 60 * 1000), score: 93.8 },
          { date: new Date(Date.now() - 1 * 30 * 24 * 60 * 60 * 1000), score: 94.2 }
        ]
      },
      {
        id: '2',
        name: 'Age Diversity',
        category: 'demographic',
        current_score: 87.6,
        target_score: 92,
        trend: 'stable',
        impact_level: 'medium',
        last_assessed: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        recommendations: [
          'Implement age-inclusive recruitment strategies',
          'Review retirement and succession planning',
          'Promote intergenerational collaboration'
        ],
        historical_data: [
          { date: new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000), score: 85.3 },
          { date: new Date(Date.now() - 5 * 30 * 24 * 60 * 60 * 1000), score: 86.7 },
          { date: new Date(Date.now() - 4 * 30 * 24 * 60 * 60 * 1000), score: 87.2 },
          { date: new Date(Date.now() - 3 * 30 * 24 * 60 * 60 * 1000), score: 87.4 },
          { date: new Date(Date.now() - 2 * 30 * 24 * 60 * 60 * 1000), score: 87.5 },
          { date: new Date(Date.now() - 1 * 30 * 24 * 60 * 60 * 1000), score: 87.6 }
        ]
      },
      {
        id: '3',
        name: 'Performance Evaluation',
        category: 'performance',
        current_score: 92.8,
        target_score: 95,
        trend: 'improving',
        impact_level: 'high',
        last_assessed: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        recommendations: [
          'Standardize performance criteria across departments',
          'Implement regular calibration sessions',
          'Use multiple raters for critical evaluations'
        ],
        historical_data: [
          { date: new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000), score: 88.9 },
          { date: new Date(Date.now() - 5 * 30 * 24 * 60 * 60 * 1000), score: 90.2 },
          { date: new Date(Date.now() - 4 * 30 * 24 * 60 * 60 * 1000), score: 91.3 },
          { date: new Date(Date.now() - 3 * 30 * 24 * 60 * 60 * 1000), score: 91.8 },
          { date: new Date(Date.now() - 2 * 30 * 24 * 60 * 60 * 1000), score: 92.4 },
          { date: new Date(Date.now() - 1 * 30 * 24 * 60 * 60 * 1000), score: 92.8 }
        ]
      },
      {
        id: '4',
        name: 'Opportunity Access',
        category: 'opportunity',
        current_score: 89.3,
        target_score: 94,
        trend: 'improving',
        impact_level: 'high',
        last_assessed: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
        recommendations: [
          'Ensure transparent opportunity posting',
          'Implement blind screening processes',
          'Monitor application-to-hire ratios'
        ],
        historical_data: [
          { date: new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000), score: 84.7 },
          { date: new Date(Date.now() - 5 * 30 * 24 * 60 * 60 * 1000), score: 86.2 },
          { date: new Date(Date.now() - 4 * 30 * 24 * 60 * 60 * 1000), score: 87.8 },
          { date: new Date(Date.now() - 3 * 30 * 24 * 60 * 60 * 1000), score: 88.4 },
          { date: new Date(Date.now() - 2 * 30 * 24 * 60 * 60 * 1000), score: 88.9 },
          { date: new Date(Date.now() - 1 * 30 * 24 * 60 * 60 * 1000), score: 89.3 }
        ]
      },
      {
        id: '5',
        name: 'Outcome Equity',
        category: 'outcome',
        current_score: 86.7,
        target_score: 91,
        trend: 'stable',
        impact_level: 'medium',
        last_assessed: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        recommendations: [
          'Analyze promotion outcomes by demographic',
          'Review compensation equity regularly',
          'Monitor career progression patterns'
        ],
        historical_data: [
          { date: new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000), score: 84.2 },
          { date: new Date(Date.now() - 5 * 30 * 24 * 60 * 60 * 1000), score: 85.3 },
          { date: new Date(Date.now() - 4 * 30 * 24 * 60 * 60 * 1000), score: 85.9 },
          { date: new Date(Date.now() - 3 * 30 * 24 * 60 * 60 * 1000), score: 86.2 },
          { date: new Date(Date.now() - 2 * 30 * 24 * 60 * 60 * 1000), score: 86.5 },
          { date: new Date(Date.now() - 1 * 30 * 24 * 60 * 60 * 1000), score: 86.7 }
        ]
      }
    ];

    setFairnessMetrics(mockMetrics);
  };

  const generateAudits = () => {
    const mockAudits: AlgorithmAudit[] = [
      {
        id: '1',
        algorithm_name: 'Hiring Recommendation System',
        type: 'hiring',
        fairness_score: 93.4,
        bias_detected: {
          gender_bias: 2.1,
          age_bias: 3.7,
          ethnicity_bias: 1.8,
          socioeconomic_bias: 2.9
        },
        compliance_score: 96.2,
        risk_level: 'low',
        audit_date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        findings: [
          'Minor gender bias detected in technical roles',
          'Age-related bias in entry-level positions',
          'Overall system performing within acceptable limits'
        ],
        recommendations: [
          'Adjust weighting for gender-neutral criteria',
          'Review age-related filtering parameters',
          'Implement continuous monitoring dashboard'
        ],
        next_audit_date: new Date(Date.now() + 23 * 24 * 60 * 60 * 1000)
      },
      {
        id: '2',
        algorithm_name: 'Performance Evaluation AI',
        type: 'performance',
        fairness_score: 87.9,
        bias_detected: {
          gender_bias: 4.2,
          age_bias: 2.8,
          ethnicity_bias: 3.1,
          socioeconomic_bias: 5.3
        },
        compliance_score: 89.7,
        risk_level: 'medium',
        audit_date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
        findings: [
          'Potential socioeconomic bias in scoring',
          'Gender differences in subjective metrics',
          'Need for calibration across departments'
        ],
        recommendations: [
          'Implement socioeconomic neutral scoring',
          'Standardize objective performance metrics',
          'Regular cross-department calibration'
        ],
        next_audit_date: new Date(Date.now() + 16 * 24 * 60 * 60 * 1000)
      },
      {
        id: '3',
        algorithm_name: 'Promotion Prediction Model',
        type: 'promotion',
        fairness_score: 91.2,
        bias_detected: {
          gender_bias: 3.4,
          age_bias: 4.1,
          ethnicity_bias: 2.7,
          socioeconomic_bias: 3.8
        },
        compliance_score: 92.8,
        risk_level: 'low',
        audit_date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
        findings: [
          'Age bias in senior-level promotions',
          'Slight gender imbalance in leadership tracks',
          'Overall fairness within acceptable range'
        ],
        recommendations: [
          'Review age-related promotion criteria',
          'Ensure gender balance in leadership pipelines',
          'Implement mentorship programs for underrepresented groups'
        ],
        next_audit_date: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000)
      }
    ];

    setAudits(mockAudits);
  };

  const generateInsights = () => {
    const mockInsights: JusticeInsight[] = [
      {
        id: '1',
        title: 'Gender Bias Alert',
        description: 'Hiring algorithm showing slight gender preference in technical roles',
        type: 'bias_alert',
        severity: 'medium',
        confidence: 87.3,
        affected_algorithms: ['Hiring Recommendation System'],
        suggested_actions: [
          'Review and adjust algorithm parameters',
          'Implement blind screening for technical roles',
          'Monitor gender ratios in hiring outcomes'
        ],
        potential_impact: -12.4,
        created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      },
      {
        id: '2',
        title: 'Fairness Improvement Opportunity',
        description: 'Performance evaluation system showing improved equity across departments',
        type: 'fairness_improvement',
        severity: 'low',
        confidence: 92.1,
        affected_algorithms: ['Performance Evaluation AI'],
        suggested_actions: [
          'Document best practices',
          'Share successful approaches across departments',
          'Continue current monitoring approach'
        ],
        potential_impact: 8.7,
        created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000)
      },
      {
        id: '3',
        title: 'Compliance Issue Detected',
        description: 'Promotion algorithm may not meet new regulatory requirements',
        type: 'compliance_issue',
        severity: 'high',
        confidence: 84.6,
        affected_algorithms: ['Promotion Prediction Model'],
        suggested_actions: [
          'Immediate compliance review',
          'Update algorithm to meet new standards',
          'Document remediation steps'
        ],
        potential_impact: -18.9,
        created_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000)
      },
      {
        id: '4',
        title: 'Algorithmic Opportunity',
        description: 'Opportunity to improve fairness through ensemble methods',
        type: 'opportunity',
        severity: 'low',
        confidence: 89.4,
        affected_algorithms: ['All Decision Systems'],
        suggested_actions: [
          'Research ensemble implementation',
          'Pilot combined approach',
          'Measure fairness improvements'
        ],
        potential_impact: 15.2,
        created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      }
    ];

    setInsights(mockInsights);
  };

  const generateReports = () => {
    const mockReports: ComplianceReport[] = [
      {
        id: '1',
        report_type: 'monthly',
        period_start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        period_end: new Date(),
        overall_fairness_score: 91.3,
        compliance_status: 'compliant',
        key_findings: [
          'Overall fairness improved by 2.3%',
          'Gender equality metrics on target',
          'Performance evaluation system optimized'
        ],
        corrective_actions: [
          'Continue monitoring hiring algorithms',
          'Address minor age bias in promotions',
          'Implement regular calibration sessions'
        ],
        generated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      },
      {
        id: '2',
        report_type: 'quarterly',
        period_start: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
        period_end: new Date(),
        overall_fairness_score: 89.7,
        compliance_status: 'partial',
        key_findings: [
          'Consistent improvement across all metrics',
          'Need for better socioeconomic equity',
          'Algorithm transparency improvements needed'
        ],
        corrective_actions: [
          'Develop socioeconomic equity framework',
          'Enhance algorithm explainability',
          'Implement stakeholder feedback mechanisms'
        ],
        generated_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)
      }
    ];

    setReports(mockReports);
  };

  const updateFairnessData = () => {
    setFairnessMetrics(prev => prev.map(metric => ({
      ...metric,
      current_score: Math.max(0, Math.min(100, metric.current_score + (Math.random() - 0.5) * 2))
    })));

    setOverallFairness(prev => Math.min(99.9, prev + (Math.random() - 0.5) * 1));
  };

  const runComprehensiveAudit = () => {
    setIsAuditing(true);
    setActiveAudit('comprehensive');

    setTimeout(() => {
      const newInsight: JusticeInsight = {
        id: Date.now().toString(),
        title: 'Comprehensive Audit Results',
        description: 'AI-powered audit reveals areas for fairness improvement',
        type: 'fairness_improvement',
        severity: 'medium',
        confidence: 91.7,
        affected_algorithms: ['All Decision Systems'],
        suggested_actions: [
          'Implement recommended algorithm adjustments',
          'Enhance monitoring and reporting',
          'Schedule follow-up audits'
        ],
        potential_impact: 12.3,
        created_at: new Date()
      };

      setInsights(prev => [newInsight, ...prev.slice(0, 9)]);
      setIsAuditing(false);
      setActiveAudit(null);
    }, 3000);
  };

  const getTrendColor = (trend: FairnessMetric['trend']) => {
    switch (trend) {
      case 'improving': return 'text-green-400';
      case 'stable': return 'text-yellow-400';
      case 'declining': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getRiskColor = (risk: AlgorithmAudit['risk_level']) => {
    switch (risk) {
      case 'critical': return 'text-red-400';
      case 'high': return 'text-orange-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getSeverityColor = (severity: JusticeInsight['severity']) => {
    switch (severity) {
      case 'critical': return 'text-red-400';
      case 'high': return 'text-orange-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getComplianceColor = (status: ComplianceReport['compliance_status']) => {
    switch (status) {
      case 'compliant': return 'text-green-400 bg-green-500/20';
      case 'partial': return 'text-yellow-400 bg-yellow-500/20';
      case 'non_compliant': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const fairnessTrendData = [
    { month: 'Jan', overall: 87.2, demographic: 89.3, performance: 85.7, opportunity: 88.9 },
    { month: 'Feb', overall: 88.6, demographic: 90.1, performance: 87.2, opportunity: 89.4 },
    { month: 'Mar', overall: 89.3, demographic: 91.2, performance: 88.1, opportunity: 90.2 },
    { month: 'Apr', overall: 90.1, demographic: 92.4, performance: 89.3, opportunity: 91.1 },
    { month: 'May', overall: 90.8, demographic: 93.1, performance: 90.2, opportunity: 91.8 },
    { month: 'Jun', overall: 91.3, demographic: 93.8, performance: 91.1, opportunity: 92.4 }
  ];

  const biasRadarData = [
    { category: 'Gender', current: 94.2, target: 98 },
    { category: 'Age', current: 87.6, target: 92 },
    { category: 'Ethnicity', current: 91.8, target: 95 },
    { category: 'Socioeconomic', current: 86.3, target: 90 },
    { category: 'Disability', current: 89.7, target: 93 },
    { category: 'Geography', current: 92.4, target: 96 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl box-shadow-glow" style={{
            background: 'linear-gradient(135deg, #3b82f630, #10b98130)'
          }}>
            <Scale className="w-8 h-8 text-blue-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold gradient-text">Algorithmic Justice</h1>
            <p className="text-gray-300">Fairness Auditing</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 px-3 py-1 rounded-lg ${
            isAuditing ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-500/20 text-gray-400'
          }`}>
            <Gavel className="w-4 h-4" />
            <span className="font-semibold">{isAuditing ? 'Auditing' : 'Monitoring'}</span>
          </div>
          <button className="btn-secondary">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Overall Fairness Score */}
      <div className="card p-6 border border-green-500/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Scale className="w-6 h-6 text-green-400" />
            <div>
              <h2 className="text-xl font-semibold text-white">Overall Fairness Score</h2>
              <p className="text-sm text-gray-400">Algorithmic fairness and compliance</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-green-400">{overallFairness.toFixed(1)}%</div>
            <p className="text-sm text-gray-400">Fairness Score</p>
          </div>
        </div>
      </div>

      {/* Fairness Metrics */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <Scale className="w-5 h-5 mr-2 text-blue-400" />
          Fairness Metrics
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {fairnessMetrics.map((metric) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              className="card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white">{metric.name}</h3>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-semibold ${getTrendColor(metric.trend)}`}>
                    {metric.trend.toUpperCase()}
                  </span>
                  {metric.trend === 'improving' && <ArrowUp className="w-4 h-4 text-green-400" />}
                  {metric.trend === 'declining' && <ArrowDown className="w-4 h-4 text-red-400" />}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-400">Current Score</p>
                  <p className="text-2xl font-bold text-blue-400">{metric.current_score.toFixed(1)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Target Score</p>
                  <p className="text-2xl font-bold text-green-400">{metric.target_score}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">Progress</p>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-green-500"
                    style={{ width: `${(metric.current_score / metric.target_score) * 100}%` }}
                  />
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">Impact Level</p>
                <span className={`px-2 py-1 text-xs rounded ${
                  metric.impact_level === 'high' ? 'bg-red-500/20 text-red-400' :
                  metric.impact_level === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-green-500/20 text-green-400'
                }`}>
                  {metric.impact_level.toUpperCase()}
                </span>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">Recommendations</p>
                <div className="space-y-1">
                  {metric.recommendations.slice(0, 2).map((rec, index) => (
                    <div key={index} className="flex items-start gap-2 text-xs text-gray-300">
                      <CheckCircle className="w-3 h-3 text-green-400 mt-0.5" />
                      <span>{rec}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-400">Last assessed: {metric.last_assessed.toLocaleDateString()}</p>
                <button className="btn-secondary text-sm">
                  <Eye className="w-3 h-3 mr-1" />
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Algorithm Audits */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <Shield className="w-5 h-5 mr-2 text-purple-400" />
          Algorithm Audits
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {audits.map((audit) => (
            <motion.div
              key={audit.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className="card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-white">{audit.algorithm_name}</h3>
                  <p className="text-sm text-gray-400 capitalize">{audit.type}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded ${
                  audit.risk_level === 'critical' ? 'bg-red-500/20 text-red-400' :
                  audit.risk_level === 'high' ? 'bg-orange-500/20 text-orange-400' :
                  audit.risk_level === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-green-500/20 text-green-400'
                }`}>
                  {audit.risk_level.toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-400">Fairness Score</p>
                  <p className="text-lg font-bold text-blue-400">{audit.fairness_score.toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Compliance Score</p>
                  <p className="text-lg font-bold text-green-400">{audit.compliance_score.toFixed(1)}%</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">Bias Detection</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Gender Bias</span>
                    <span className={`${audit.bias_detected.gender_bias > 5 ? 'text-red-400' : 'text-green-400'}`}>
                      {audit.bias_detected.gender_bias}%
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Age Bias</span>
                    <span className={`${audit.bias_detected.age_bias > 5 ? 'text-red-400' : 'text-green-400'}`}>
                      {audit.bias_detected.age_bias}%
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Ethnicity Bias</span>
                    <span className={`${audit.bias_detected.ethnicity_bias > 5 ? 'text-red-400' : 'text-green-400'}`}>
                      {audit.bias_detected.ethnicity_bias}%
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Socioeconomic Bias</span>
                    <span className={`${audit.bias_detected.socioeconomic_bias > 5 ? 'text-red-400' : 'text-green-400'}`}>
                      {audit.bias_detected.socioeconomic_bias}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">Key Findings</p>
                <div className="space-y-1">
                  {audit.findings.slice(0, 2).map((finding, index) => (
                    <div key={index} className="flex items-start gap-2 text-xs text-gray-300">
                      <AlertCircle className="w-3 h-3 text-yellow-400 mt-0.5" />
                      <span>{finding}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-400">Next audit: {audit.next_audit_date.toLocaleDateString()}</p>
                <button className="btn-primary">
                  <FileText className="w-4 h-4 mr-2" />
                  View Report
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Justice Insights */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <Brain className="w-5 h-5 mr-2 text-orange-400" />
          AI Justice Insights
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {insights.map((insight) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className="card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-white">{insight.title}</h3>
                  <span className={`px-2 py-1 text-xs rounded ${
                    insight.type === 'bias_alert' ? 'bg-red-500/20 text-red-400' :
                    insight.type === 'fairness_improvement' ? 'bg-green-500/20 text-green-400' :
                    insight.type === 'compliance_issue' ? 'bg-orange-500/20 text-orange-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {insight.type.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-bold ${getSeverityColor(insight.severity)}`}>
                    {insight.severity.toUpperCase()}
                  </p>
                  <p className="text-xs text-gray-400">{insight.confidence.toFixed(1)}% confidence</p>
                </div>
              </div>

              <p className="text-sm text-gray-300 mb-4">{insight.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-400">Potential Impact</p>
                  <p className={`text-lg font-bold ${insight.potential_impact > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {insight.potential_impact > 0 ? '+' : ''}{insight.potential_impact.toFixed(1)}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Affected Systems</p>
                  <p className="text-lg font-bold text-purple-400">{insight.affected_algorithms.length}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">Suggested Actions</p>
                <div className="space-y-1">
                  {insight.suggested_actions.slice(0, 2).map((action, index) => (
                    <div key={index} className="flex items-start gap-2 text-xs text-gray-300">
                      <Target className="w-3 h-3 text-blue-400 mt-0.5" />
                      <span>{action}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-400">{insight.created_at.toLocaleDateString()}</p>
                <button className="btn-primary">
                  <Target className="w-4 h-4 mr-2" />
                  Apply Insight
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Compliance Reports */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <FileText className="w-5 h-5 mr-2 text-green-400" />
          Compliance Reports
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {reports.map((report) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className="card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-white capitalize">{report.report_type} Report</h3>
                  <span className={`px-2 py-1 text-xs rounded ${getComplianceColor(report.compliance_status)}`}>
                    {report.compliance_status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-400">{report.overall_fairness_score.toFixed(1)}%</p>
                  <p className="text-xs text-gray-400">fairness score</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">Reporting Period</p>
                <div className="flex justify-between text-sm">
                  <span>Start: {report.period_start.toLocaleDateString()}</span>
                  <span>End: {report.period_end.toLocaleDateString()}</span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">Key Findings</p>
                <div className="space-y-1">
                  {report.key_findings.slice(0, 2).map((finding, index) => (
                    <div key={index} className="flex items-start gap-2 text-xs text-gray-300">
                      <CheckCircle className="w-3 h-3 text-green-400 mt-0.5" />
                      <span>{finding}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">Corrective Actions</p>
                <div className="space-y-1">
                  {report.corrective_actions.slice(0, 2).map((action, index) => (
                    <div key={index} className="flex items-start gap-2 text-xs text-gray-300">
                      <Target className="w-3 h-3 text-blue-400 mt-0.5" />
                      <span>{action}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-400">Generated: {report.generated_at.toLocaleDateString()}</p>
                <button className="btn-primary">
                  <FileText className="w-4 h-4 mr-2" />
                  Download Report
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Analytics Dashboard */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Fairness Trend */}
        <div className="card p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Fairness Trend Analysis</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={fairnessTrendData}>
              <defs>
                <linearGradient id="overallGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
                </linearGradient>
                <linearGradient id="demographicGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
              <YAxis stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0b1220', border: '1px solid #3b82f650', borderRadius: 8 }}
                labelStyle={{ color: '#f1f5f9' }}
              />
              <Area type="monotone" dataKey="overall" stroke="#3b82f6" fill="url(#overallGrad)" />
              <Area type="monotone" dataKey="demographic" stroke="#10b981" fill="url(#demographicGrad)" />
              <Line type="monotone" dataKey="performance" stroke="#f59e0b" strokeWidth={2} />
              <Line type="monotone" dataKey="opportunity" stroke="#8b5cf6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bias Radar */}
        <div className="card p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Bias Analysis Radar</h3>
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart data={biasRadarData}>
              <PolarGrid stroke="#374151" />
              <PolarAngleAxis dataKey="category" stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
              <Radar name="current" dataKey="current" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
              <Radar name="target" dataKey="target" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Comprehensive Audit Button */}
      <div className="card p-6 border border-blue-500/50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-white">Comprehensive Algorithm Audit</h3>
            <p className="text-sm text-gray-400">Run AI-powered fairness and compliance analysis</p>
          </div>
          <button
            onClick={runComprehensiveAudit}
            disabled={isAuditing}
            className="btn-primary"
          >
            <Gavel className="w-4 h-4 mr-2" />
            {isAuditing ? 'Auditing...' : 'Start Audit'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmicJustice;
