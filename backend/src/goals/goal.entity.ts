import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
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
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({ default: GoalType.SPECIFIC })
  type: GoalType;

  @Column({ default: GoalStatus.NOT_STARTED })
  status: GoalStatus;

  @Column({ default: GoalPriority.MEDIUM })
  priority: GoalPriority;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  progress: number;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date' })
  endDate: Date;

  @ManyToOne(() => Department, department => department.goals)
  @JoinColumn({ name: 'department_id' })
  department: Department;

  @ManyToOne(() => User, user => user.goals)
  @JoinColumn({ name: 'assigned_user_id' })
  assignedUser: User;

  @ManyToOne(() => Goal, goal => goal.childGoals, { nullable: true })
  @JoinColumn({ name: 'parent_goal_id' })
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
