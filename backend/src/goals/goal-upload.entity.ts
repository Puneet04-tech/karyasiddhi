import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Goal } from '../goals/goal.entity';
import { User } from '../users/user.entity';

@Entity('goal_uploads')
export class GoalUpload {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fileName: string;

  @Column('text')
  fileUrl: string;

  @Column({ nullable: true })
  fileSize: number;

  @Column({ nullable: true })
  fileType: string;

  @Column('text', { nullable: true })
  description: string;

  @Column({ type: process.env.NODE_ENV === 'production' ? 'timestamp' : 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  uploadedAt: Date;

  @ManyToOne(() => Goal, goal => goal.uploads, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'goal_id' })
  goal: Goal;

  @ManyToOne(() => User, user => user.uploads, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}