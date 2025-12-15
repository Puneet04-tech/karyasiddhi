import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { GoalsModule } from '../goals/goals.module';
import { KpisModule } from '../kpis/kpis.module';

@Module({
  imports: [HttpModule, GoalsModule, KpisModule],
  providers: [AnalyticsService],
  controllers: [AnalyticsController],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}
