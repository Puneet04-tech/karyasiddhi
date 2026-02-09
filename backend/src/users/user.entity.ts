import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Goal } from '../goals/goal.entity';
import { Department } from '../departments/department.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  phone: string;

  @Column()
  role: string;

  @Column({ nullable: true })
  designation: string;

  @Column({ nullable: true })
  employeeId: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ type: 'text', nullable: true })
  achievements: Array<{
    id: number;
    title: string;
    icon: string;
    color: string;
    earnedAt: string;
  }>;

  @Column({ type: 'text', nullable: true })
  settings: {
    notifications: boolean;
    emailAlerts: boolean;
    darkMode: boolean;
    offlineMode: boolean;
    twoFactor: boolean;
    language: string;
    accountDeleted?: boolean;
    deletionDate?: Date;
  };

  @ManyToOne(() => Department, department => department.users)
  @JoinColumn({ name: 'department_id' })
  department: Department;

  @OneToMany(() => Goal, goal => goal.assignedUser)
  goals: Goal[];

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
