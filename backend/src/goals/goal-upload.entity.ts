import { Entity, Column, ObjectIdColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { ObjectId } from 'mongodb';
import { Goal } from '../goals/goal.entity';
import { User } from '../users/user.entity';

@Entity('goal_uploads')
export class GoalUpload {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  fileName: string;

  @Column()
  fileUrl: string;

  @Column({ nullable: true })
  fileSize: number;

  @Column({ nullable: true })
  fileType: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  uploadedAt: Date;

  @ManyToOne(() => Goal, goal => goal.uploads, { onDelete: 'CASCADE' })
  goal: Goal;

  @ManyToOne(() => User, user => user.uploads, { onDelete: 'CASCADE' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}