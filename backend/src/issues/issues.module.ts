import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IssuesService } from './issues.service';
import { IssuesController } from './issues.controller';
import { Issue } from './issue.entity';
import { User } from '../users/user.entity';
import { Goal } from '../goals/goal.entity';
import { Kpi } from '../kpis/kpi.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Issue, User, Goal, Kpi]),
  ],
  controllers: [IssuesController],
  providers: [IssuesService],
  exports: [IssuesService],
})
export class IssuesModule {}