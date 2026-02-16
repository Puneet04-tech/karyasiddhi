import { Entity, Column, ObjectIdColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { ObjectId } from 'mongodb';
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
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  unit: string;

  @Column({ type: 'decimal' })
  target: number;

  @Column({ type: 'decimal' })
  current: number;

  @Column({ type: 'decimal' })
  baseline: number;

  @Column({ default: KpiFrequency.MONTHLY })
  frequency: KpiFrequency;

  @Column()
  category: string;

  @Column({ default: KpiTrend.STABLE })
  trend: KpiTrend;

  @ManyToOne(() => Department)
  department: Department;

  @ManyToOne(() => Goal, goal => goal.kpis, { nullable: true })
  goal: Goal;

  @Column()
  lastUpdated: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
