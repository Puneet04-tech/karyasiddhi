import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoalUploadsService } from './goal-uploads.service';
import { GoalUploadsController } from './goal-uploads.controller';
import { GoalUpload } from './goal-upload.entity';
import { Goal } from './goal.entity';
import { User } from '../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GoalUpload, Goal, User])],
  controllers: [GoalUploadsController],
  providers: [GoalUploadsService],
  exports: [GoalUploadsService],
})
export class GoalUploadsModule {}