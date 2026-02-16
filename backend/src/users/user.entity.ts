import { Entity, Column, ObjectIdColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from 'typeorm';
import { ObjectId } from 'mongodb';
import { Goal } from '../goals/goal.entity';
import { Department } from '../departments/department.entity';
import { GoalUpload } from '../goals/goal-upload.entity';

@Entity('users')
export class User {
  @ObjectIdColumn()
  id: ObjectId;

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

  @Column({ nullable: true })
  achievements: Array<{
    id: number;
    title: string;
    icon: string;
    color: string;
    earnedAt: string;
  }>;

  @ManyToOne(() => Department, department => department.users)
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
