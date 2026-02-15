import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Goal } from './goal.entity';
import { GoalUpload } from './goal-upload.entity';
import { User } from '../users/user.entity';
import { GoalsService } from './goals.service';
import { GoalsController } from './goals.controller';
import { GoalUploadsModule } from './goal-uploads.module';

@Module({
  imports: [TypeOrmModule.forFeature([Goal, GoalUpload, User]), GoalUploadsModule],
  providers: [GoalsService],
  controllers: [GoalsController],
  exports: [GoalsService],
})
export class GoalsModule {}
