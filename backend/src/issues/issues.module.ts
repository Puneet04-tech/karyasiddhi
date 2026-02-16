import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IssuesService } from './issues.service';
import { IssuesController } from './issues.controller';
import { Issue } from './issue.entity';
import { UsersModule } from '../users/users.module';
import { GoalsModule } from '../goals/goals.module';
import { KpisModule } from '../kpis/kpis.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Issue]),
    UsersModule,
    GoalsModule,
    KpisModule,
  ],
  controllers: [IssuesController],
  providers: [IssuesService],
  exports: [IssuesService],
})
export class IssuesModule {}