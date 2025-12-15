export interface Goal {
  id: string;
  title: string;
  description: string;
  type: 'specific' | 'measurable' | 'achievable' | 'relevant' | 'timebound';
  status: 'not_started' | 'in_progress' | 'completed' | 'delayed';
  progress: number;
  startDate: string;
  endDate: string;
  departmentId: string;
  assignedTo: string;
  assignedUser?: {
    id: string;
    name: string;
    email: string;
  };
  kpis: string[];
  priority: 'low' | 'medium' | 'high' | 'critical';
  parentGoalId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface KPI {
  id: string;
  name: string;
  description: string;
  unit: string;
  target: number;
  current: number;
  baseline: number;
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  category: string;
  departmentId: string;
  goalId?: string;
  trend: 'up' | 'down' | 'stable';
  lastUpdated: string;
  createdAt: string;
}

export interface Analytics {
  productivityScore: number;
  productivityTrend: number;
  completionRate: number;
  averageProgress: number;
  totalGoals: number;
  completedGoals: number;
  delayedGoals: number;
  aiInsights: AIInsight[];
  predictions: Prediction[];
  anomalies: Anomaly[];
}

export interface AIInsight {
  id: string;
  type: 'recommendation' | 'warning' | 'achievement' | 'trend';
  title: string;
  description: string;
  confidence: number;
  createdAt: string;
}

export interface Prediction {
  id: string;
  goalId: string;
  goalTitle: string;
  predictedCompletion: string;
  confidence: number;
  riskLevel: 'low' | 'medium' | 'high';
  factors: string[];
}

export interface Anomaly {
  id: string;
  type: 'performance_drop' | 'unusual_activity' | 'missed_deadline' | 'low_engagement';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  detectedAt: string;
  affectedGoals: string[];
}

export interface Department {
  id: string;
  name: string;
  code: string;
  ministry: string;
  headOfDepartment: string;
  employeeCount: number;
  state: string;
}

export interface Activity {
  id: string;
  type: 'goal_created' | 'goal_updated' | 'kpi_updated' | 'milestone_reached' | 'comment_added';
  title: string;
  description: string;
  userId: string;
  userName: string;
  timestamp: string;
  goalId?: string;
  kpiId?: string;
}
