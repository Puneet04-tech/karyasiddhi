import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GoalUpload, UploadStatus } from './goal-upload.entity';
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

    if (goal.assignedUser.id !== userId && user.role !== 'Department Head') {
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
    if (user.role !== 'Department Head' && goal.assignedUser.id !== userId) {
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

    if (!manager || manager.role !== 'Department Head') {
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
    if (upload.user.id !== userId && user.role !== 'Department Head') {
      throw new ForbiddenException('You can only view your own uploads');
    }

    return upload;
  }

  async update(id: string, updateGoalUploadDto: UpdateGoalUploadDto, userId: string): Promise<GoalUpload> {
    const upload = await this.findOne(id, userId);

    // Only the uploader or manager can update
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (upload.user.id !== userId && user.role !== 'Department Head') {
      throw new ForbiddenException('You can only update your own uploads');
    }

    Object.assign(upload, updateGoalUploadDto);
    return this.goalUploadsRepository.save(upload);
  }

  async remove(id: string, userId: string): Promise<void> {
    const upload = await this.findOne(id, userId);

    // Only the uploader or manager can delete
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (upload.user.id !== userId && user.role !== 'Department Head') {
      throw new ForbiddenException('You can only delete your own uploads');
    }

    await this.goalUploadsRepository.remove(upload);
  }

  async approveUpload(
    uploadId: string,
    managerId: string,
    progressPercentage: number,
    approvalComments?: string
  ): Promise<GoalUpload> {
    // Verify manager
    const manager = await this.usersRepository.findOne({ where: { id: managerId } });
    if (!manager || manager.role !== 'Department Head') {
      throw new ForbiddenException('Only managers can approve uploads');
    }

    // Get upload with goal
    const upload = await this.goalUploadsRepository.findOne({
      where: { id: uploadId },
      relations: ['goal', 'user', 'goal.kpis'],
    });

    if (!upload) {
      throw new NotFoundException('Upload not found');
    }

    // Verify manager has permission (same department)
    const goal = await this.goalsRepository.findOne({
      where: { id: upload.goal.id },
      relations: ['department'],
    });

    if (goal.department.id !== manager.department.id) {
      throw new ForbiddenException('You can only approve uploads from your department');
    }

    // Update upload
    upload.status = UploadStatus.APPROVED;
    upload.progressPercentage = progressPercentage;
    upload.approvalComments = approvalComments;
    upload.approvedBy = manager;
    upload.approvedAt = new Date();
    
    await this.goalUploadsRepository.save(upload);

    // Update goal progress (take the average of all approved uploads)
    const allUploads = await this.goalUploadsRepository.find({
      where: { 
        goal: { id: upload.goal.id },
        status: UploadStatus.APPROVED,
      },
    });

    const averageProgress = allUploads.length > 0
      ? Math.round(allUploads.reduce((sum, u) => sum + (u.progressPercentage || 0), 0) / allUploads.length)
      : 0;

    // Update goal progress
    goal.progress = averageProgress;
    if (averageProgress >= 100) {
      goal.status = 'completed';
    } else if (averageProgress > 0) {
      goal.status = 'in_progress';
    }
    
    await this.goalsRepository.save(goal);

    // Update related KPIs progress if any
    if (goal.kpis && goal.kpis.length > 0) {
      for (const kpi of goal.kpis) {
        // Update KPI progress proportionally to goal progress
        const progressRatio = Math.min(100, averageProgress) / 100;
        kpi.current = Math.min(
          kpi.target,
          Math.round((kpi.baseline + ((kpi.target - kpi.baseline) * progressRatio)))
        );
        await this.goalUploadsRepository.manager.save(kpi);
      }
    }

    return this.goalUploadsRepository.findOne({
      where: { id: uploadId },
      relations: ['goal', 'user', 'approvedBy'],
    });
  }

  async rejectUpload(
    uploadId: string,
    managerId: string,
    rejectionReason?: string
  ): Promise<GoalUpload> {
    // Verify manager
    const manager = await this.usersRepository.findOne({ where: { id: managerId } });
    if (!manager || manager.role !== 'Department Head') {
      throw new ForbiddenException('Only managers can reject uploads');
    }

    // Get upload with goal
    const upload = await this.goalUploadsRepository.findOne({
      where: { id: uploadId },
      relations: ['goal'],
    });

    if (!upload) {
      throw new NotFoundException('Upload not found');
    }

    // Verify manager has permission
    const goal = await this.goalsRepository.findOne({
      where: { id: upload.goal.id },
      relations: ['department'],
    });

    if (goal.department.id !== manager.department.id) {
      throw new ForbiddenException('You can only reject uploads from your department');
    }

    // Update upload
    upload.status = UploadStatus.REJECTED;
    upload.approvalComments = rejectionReason;
    upload.approvedBy = manager;
    upload.approvedAt = new Date();
    
    return this.goalUploadsRepository.save(upload);
  }
}