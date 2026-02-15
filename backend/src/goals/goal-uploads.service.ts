import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GoalUpload } from './goal-upload.entity';
import { Goal } from './goal.entity';
import { User } from '../users/user.entity';
import { CreateGoalUploadDto, UpdateGoalUploadDto } from './dto/goal-upload.dto';

@Injectable()
export class GoalUploadsService {
  constructor(
    @InjectRepository(GoalUpload)
    private goalUploadsRepository: Repository<GoalUpload>,
    @InjectRepository(Goal)
    private goalsRepository: Repository<Goal>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createGoalUploadDto: CreateGoalUploadDto, userId: string): Promise<GoalUpload> {
    const goal = await this.goalsRepository.findOne({
      where: { id: createGoalUploadDto.goalId },
      relations: ['assignedUser'],
    });

    if (!goal) {
      throw new NotFoundException('Goal not found');
    }

    // Check if user is assigned to this goal or is a manager
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (goal.assignedUser.id !== userId && user.role !== 'manager') {
      throw new ForbiddenException('You can only upload files for your own goals');
    }

    const upload = this.goalUploadsRepository.create({
      ...createGoalUploadDto,
      goal,
      user,
      uploadedAt: new Date(),
    });

    return this.goalUploadsRepository.save(upload);
  }

  async findAllByGoal(goalId: string, userId: string): Promise<GoalUpload[]> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const goal = await this.goalsRepository.findOne({
      where: { id: goalId },
      relations: ['assignedUser', 'department'],
    });

    if (!goal) {
      throw new NotFoundException('Goal not found');
    }

    // Managers can see all uploads, employees can only see uploads for their goals
    if (user.role !== 'manager' && goal.assignedUser.id !== userId) {
      throw new ForbiddenException('You can only view uploads for your own goals');
    }

    return this.goalUploadsRepository.find({
      where: { goal: { id: goalId } },
      relations: ['user', 'goal'],
      order: { uploadedAt: 'DESC' },
    });
  }

  async findAllByUser(userId: string): Promise<GoalUpload[]> {
    return this.goalUploadsRepository.find({
      where: { user: { id: userId } },
      relations: ['goal', 'user'],
      order: { uploadedAt: 'DESC' },
    });
  }

  async findAllForManager(managerId: string): Promise<GoalUpload[]> {
    const manager = await this.usersRepository.findOne({
      where: { id: managerId },
      relations: ['department'],
    });

    if (!manager || manager.role !== 'manager') {
      throw new ForbiddenException('Only managers can access this endpoint');
    }

    // Get all uploads from users in the same department
    return this.goalUploadsRepository.find({
      where: { goal: { department: { id: manager.department.id } } },
      relations: ['goal', 'user', 'goal.assignedUser', 'goal.department'],
      order: { uploadedAt: 'DESC' },
    });
  }

  async findOne(id: string, userId: string): Promise<GoalUpload> {
    const upload = await this.goalUploadsRepository.findOne({
      where: { id },
      relations: ['goal', 'user'],
    });

    if (!upload) {
      throw new NotFoundException('Upload not found');
    }

    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check permissions
    if (upload.user.id !== userId && user.role !== 'manager') {
      throw new ForbiddenException('You can only view your own uploads');
    }

    return upload;
  }

  async update(id: string, updateGoalUploadDto: UpdateGoalUploadDto, userId: string): Promise<GoalUpload> {
    const upload = await this.findOne(id, userId);

    // Only the uploader or manager can update
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (upload.user.id !== userId && user.role !== 'manager') {
      throw new ForbiddenException('You can only update your own uploads');
    }

    Object.assign(upload, updateGoalUploadDto);
    return this.goalUploadsRepository.save(upload);
  }

  async remove(id: string, userId: string): Promise<void> {
    const upload = await this.findOne(id, userId);

    // Only the uploader or manager can delete
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (upload.user.id !== userId && user.role !== 'manager') {
      throw new ForbiddenException('You can only delete your own uploads');
    }

    await this.goalUploadsRepository.remove(upload);
  }
}