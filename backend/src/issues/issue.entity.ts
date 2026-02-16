import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';
import { Goal } from '../goals/goal.entity';
import { Kpi } from '../kpis/kpi.entity';

export enum IssueStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  RESOLVED = 'resolved',
  CLOSED = 'closed',
}

export enum IssuePriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
}

@Entity('issues')
export class Issue {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({
    type: process.env.NODE_ENV === 'production' ? 'enum' : 'simple-enum',
    enum: IssueStatus,
    default: IssueStatus.OPEN,
  })
  status: IssueStatus;

  @Column({
    type: process.env.NODE_ENV === 'production' ? 'enum' : 'simple-enum',
    enum: IssuePriority,
    default: IssuePriority.MEDIUM,
  })
  priority: IssuePriority;

  @Column({ nullable: true })
  solution: string;

  @Column({ type: process.env.NODE_ENV === 'production' ? 'timestamp' : 'datetime', nullable: true })
  resolvedAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  createdBy: User;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'assigned_to' })
  assignedTo: User;

  @ManyToOne(() => Goal, { nullable: true })
  @JoinColumn({ name: 'goal_id' })
  goal: Goal;

  @ManyToOne(() => Kpi, { nullable: true })
  @JoinColumn({ name: 'kpi_id' })
  kpi: Kpi;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}