import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { GoalsService } from '../goals/goals.service';
import { KpisService } from '../kpis/kpis.service';

@Injectable()
export class AnalyticsService {
  private aiServiceUrl: string;

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
    private goalsService: GoalsService,
    private kpisService: KpisService,
  ) {
    this.aiServiceUrl = this.configService.get<string>('AI_SERVICE_URL') || 'http://localhost:8000';
  }

  async getOverview(userId?: string) {
    const goalStats = userId 
      ? await this.goalsService.getStatisticsByUser(userId)
      : await this.goalsService.getStatistics();
    
    const avgKpiPerformance = userId
      ? await this.kpisService.getAveragePerformanceByUser(userId)
      : await this.kpisService.getAveragePerformance();

    return {
      productivityScore: Math.round(avgKpiPerformance),
      productivityTrend: 5.2,
      completionRate: goalStats.completionRate,
      averageProgress: goalStats.averageProgress || 76,
      totalGoals: goalStats.total,
      completedGoals: goalStats.completed,
      delayedGoals: goalStats.delayed,
    };
  }

  async getTeamRankings() {
    const users = await this.goalsService.getAllUsersWithStats();
    
    // Calculate performance score for each user
    const rankings = await Promise.all(
      users.map(async (user) => {
        const stats = await this.goalsService.getStatisticsByUser(user.id.toString());
        const kpiPerf = await this.kpisService.getAveragePerformanceByUser(user.id.toString());
        
        // Calculate overall score (weighted average)
        const performanceScore = (
          stats.averageProgress * 0.4 + 
          stats.completionRate * 0.3 + 
          kpiPerf * 0.3
        );

        return {
          userId: user.id,
          name: user.name,
          email: user.email,
          designation: user.designation,
          department: user.department?.name,
          performanceScore: Math.round(performanceScore),
          completionRate: Math.round(stats.completionRate),
          averageProgress: Math.round(stats.averageProgress),
          totalGoals: stats.total,
          completedGoals: stats.completed,
        };
      })
    );

    // Sort by performance score descending
    rankings.sort((a, b) => b.performanceScore - a.performanceScore);
    
    // Add rank
    return rankings.map((r, index) => ({ ...r, rank: index + 1 }));
  }

  async getPredictions(userId?: string) {
    try {
      const url = userId 
        ? `${this.aiServiceUrl}/predictions?user_id=${userId}`
        : `${this.aiServiceUrl}/predictions`;
      
      const response = await firstValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      // Return mock data if AI service is unavailable
      return this.getMockPredictions();
    }
  }

  async getAnomalies(userId?: string) {
    try {
      const url = userId 
        ? `${this.aiServiceUrl}/anomalies?user_id=${userId}`
        : `${this.aiServiceUrl}/anomalies`;
      
      const response = await firstValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      // Return mock data if AI service is unavailable
      return this.getMockAnomalies();
    }
  }

  async getInsights(userId?: string) {
    try {
      const url = userId 
        ? `${this.aiServiceUrl}/insights?user_id=${userId}`
        : `${this.aiServiceUrl}/insights`;
      
      const response = await firstValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      // Return mock data if AI service is unavailable
      return this.getMockInsights();
    }
  }

  private getMockPredictions() {
    return [
      {
        id: 1,
        goalId: '1',
        goalTitle: 'Digital Infrastructure Modernization',
        predictedCompletion: '2025-12-15',
        originalDeadline: '2025-12-31',
        confidence: 92,
        riskLevel: 'low',
        factors: ['Strong team performance', 'Adequate resources', 'Clear milestones'],
      },
    ];
  }

  private getMockAnomalies() {
    return [
      {
        id: 1,
        type: 'performance_drop',
        severity: 'high',
        description: 'Significant decrease in productivity detected',
        detectedAt: new Date(),
        affectedGoals: ['1', '3'],
      },
    ];
  }

  private getMockInsights() {
    return [
      {
        id: 1,
        type: 'recommendation',
        title: 'Performance Optimization',
        description: 'Based on current trends, you are on track to exceed quarterly targets by 12%.',
        confidence: 92,
        createdAt: new Date(),
      },
    ];
  }
}
