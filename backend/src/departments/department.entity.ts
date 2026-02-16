import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';
import { Goal } from '../goals/goal.entity';

@Entity('departments')
export class Department {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  code: string;

  @Column()
  ministry: string;

  @Column({ nullable: true })
  headOfDepartment: string;

  @Column({ default: 0 })
  employeeCount: number;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  location: string;

  @OneToMany(() => User, user => user.department)
  users: User[];

  @OneToMany(() => Goal, goal => goal.department)
  goals: Goal[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
