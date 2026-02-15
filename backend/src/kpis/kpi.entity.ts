import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Goal } from '../goals/goal.entity';
import { Department } from '../departments/department.entity';

export enum KpiFrequency {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  YEARLY = 'yearly',
}

export enum KpiTrend {
  UP = 'up',
  DOWN = 'down',
  STABLE = 'stable',
}

@Entity('kpis')
export class Kpi {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column()
  unit: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  target: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  current: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  baseline: number;

  @Column({ default: KpiFrequency.MONTHLY })
  frequency: KpiFrequency;

  @Column()
  category: string;

  @Column({ default: KpiTrend.STABLE })
  trend: KpiTrend;

  @ManyToOne(() => Department)
  @JoinColumn({ name: 'department_id' })
  department: Department;

  @ManyToOne(() => Goal, goal => goal.kpis, { nullable: true })
  @JoinColumn({ name: 'goal_id' })
  goal: Goal;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  lastUpdated: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
