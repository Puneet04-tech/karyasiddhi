import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Goal, GoalStatus } from './goal.entity';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { User } from '../users/user.entity';

@Injectable()
export class GoalsService {
  constructor(
    @InjectRepository(Goal)
    private goalsRepository: Repository<Goal>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createGoalDto: CreateGoalDto): Promise<Goal> {
    const goal = this.goalsRepository.create(createGoalDto);
    return this.goalsRepository.save(goal);
  }

  async findAll(): Promise<Goal[]> {
    return this.goalsRepository.find({
      relations: ['department', 'assignedUser', 'kpis', 'parentGoal', 'childGoals'],
    });
  }

  async findById(id: string): Promise<Goal> {
    return this.goalsRepository.findOne({
      where: { id },
      relations: ['department', 'assignedUser', 'kpis', 'parentGoal', 'childGoals'],
    });
  }

  async findByUserId(userId: string): Promise<Goal[]> {
    return this.goalsRepository.find({
      where: { assignedUser: { id: userId } },
      relations: ['department', 'kpis'],
    });
  }

  async findByDepartmentId(departmentId: string): Promise<Goal[]> {
    return this.goalsRepository.find({
      where: { department: { id: departmentId } },
      relations: ['assignedUser', 'kpis'],
    });
  }

  async update(id: string, updateGoalDto: UpdateGoalDto): Promise<Goal> {
    await this.goalsRepository.update(id, updateGoalDto);
    return this.findById(id);
  }

  async remove(id: string): Promise<void> {
    await this.goalsRepository.delete(id);
  }

  async getStatistics(): Promise<any> {
    const total = await this.goalsRepository.count();
    const completed = await this.goalsRepository.count({ where: { status: GoalStatus.COMPLETED } });
    const inProgress = await this.goalsRepository.count({ where: { status: GoalStatus.IN_PROGRESS } });
    const delayed = await this.goalsRepository.count({ where: { status: GoalStatus.DELAYED } });

    return {
      total,
      completed,
      inProgress,
      delayed,
      completionRate: total > 0 ? (completed / total) * 100 : 0,
    };
  }

  async getStatisticsByUser(userId: string): Promise<any> {
    const goals = await this.goalsRepository.find({
      where: { assignedUser: { id: userId } },
    });

    const total = goals.length;
    const completed = goals.filter(g => g.status === GoalStatus.COMPLETED).length;
    const inProgress = goals.filter(g => g.status === GoalStatus.IN_PROGRESS).length;
    const delayed = goals.filter(g => g.status === GoalStatus.DELAYED).length;
    const averageProgress = total > 0 
      ? goals.reduce((sum, g) => sum + Number(g.progress), 0) / total 
      : 0;

    return {
      total,
      completed,
      inProgress,
      delayed,
      completionRate: total > 0 ? (completed / total) * 100 : 0,
      averageProgress,
    };
  }

  async getAllUsersWithStats(): Promise<User[]> {
    // Get all users who have goals assigned
    return this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.department', 'department')
      .leftJoinAndSelect('user.goals', 'goals')
      .where('goals.id IS NOT NULL')
      .getMany();
  }
}
