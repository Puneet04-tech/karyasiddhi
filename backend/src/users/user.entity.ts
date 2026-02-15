import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Goal } from '../goals/goal.entity';
import { Department } from '../departments/department.entity';
import { GoalUpload } from '../goals/goal-upload.entity';

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

  @Column({ nullable: true })
  aadhaar: string;

  @Column({ default: false })
  aadhaarVerified: boolean;

  @Column()
  role: string;

  @Column({ nullable: true })
  designation: string;

  @Column({ nullable: true })
  employeeId: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ default: false })
  digilockerVerified: boolean;

  @Column({ type: 'text', nullable: true, transformer: {
    to: (value: any) => value ? JSON.stringify(value) : null,
    from: (value: string) => value ? JSON.parse(value) : null,
  }})
  achievements: Array<{
    id: number;
    title: string;
    icon: string;
    color: string;
    earnedAt: string;
  }>;

  @ManyToOne(() => Department, department => department.users)
  @JoinColumn({ name: 'department_id' })
  department: Department;

  @OneToMany(() => Goal, goal => goal.assignedUser)
  goals: Goal[];

  @OneToMany(() => GoalUpload, upload => upload.user)
  uploads: GoalUpload[];

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
