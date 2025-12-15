import { Controller, Get, Query, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Analytics')
@Controller('analytics')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AnalyticsController {
  constructor(private analyticsService: AnalyticsService) {}

  @Get('overview')
  @ApiOperation({ summary: 'Get analytics overview' })
  async getOverview(@Request() req, @Query('userId') userId?: string) {
    // Managers can view any user's data, regular users see only their own
    const targetUserId = req.user.role === 'manager' ? userId : req.user.id;
    return this.analyticsService.getOverview(targetUserId);
  }

  @Get('team-rankings')
  @ApiOperation({ summary: 'Get team performance rankings' })
  async getTeamRankings() {
    return this.analyticsService.getTeamRankings();
  }

  @Get('predictions')
  @ApiOperation({ summary: 'Get AI predictions' })
  async getPredictions(@Request() req, @Query('userId') userId?: string) {
    const targetUserId = req.user.role === 'manager' ? userId : req.user.id;
    return this.analyticsService.getPredictions(targetUserId);
  }

  @Get('anomalies')
  @ApiOperation({ summary: 'Get detected anomalies' })
  async getAnomalies(@Request() req, @Query('userId') userId?: string) {
    const targetUserId = req.user.role === 'manager' ? userId : req.user.id;
    return this.analyticsService.getAnomalies(targetUserId);
  }

  @Get('insights')
  @ApiOperation({ summary: 'Get AI insights' })
  async getInsights(@Request() req, @Query('userId') userId?: string) {
    const targetUserId = req.user.role === 'manager' ? userId : req.user.id;
    return this.analyticsService.getInsights(targetUserId);
  }
}
