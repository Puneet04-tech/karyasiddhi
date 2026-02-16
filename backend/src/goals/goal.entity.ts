import { Entity, Column, ObjectIdColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { ObjectId } from 'mongodb';
import { User } from '../users/user.entity';
import { Department } from '../departments/department.entity';
import { Kpi } from '../kpis/kpi.entity';
import { GoalUpload } from './goal-upload.entity';

export enum GoalType {
  SPECIFIC = 'specific',
  MEASURABLE = 'measurable',
  ACHIEVABLE = 'achievable',
  RELEVANT = 'relevant',
  TIMEBOUND = 'timebound',
}

export enum GoalStatus {
  NOT_STARTED = 'not_started',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  DELAYED = 'delayed',
}

export enum GoalPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

@Entity('goals')
export class Goal {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: GoalType.SPECIFIC })
  type: GoalType;

  @Column({ default: GoalStatus.NOT_STARTED })
  status: GoalStatus;

  @Column({ default: GoalPriority.MEDIUM })
  priority: GoalPriority;

  @Column({ type: 'decimal', default: 0 })
  progress: number;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @ManyToOne(() => Department, department => department.goals)
  department: Department;

  @ManyToOne(() => User, user => user.goals)
  assignedUser: User;

  @ManyToOne(() => Goal, goal => goal.childGoals, { nullable: true })
  parentGoal: Goal;

  @OneToMany(() => Goal, goal => goal.parentGoal)
  childGoals: Goal[];

  @OneToMany(() => Kpi, kpi => kpi.goal)
  kpis: Kpi[];

  @OneToMany(() => GoalUpload, upload => upload.goal)
  uploads: GoalUpload[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
