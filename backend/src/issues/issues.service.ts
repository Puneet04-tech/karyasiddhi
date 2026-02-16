import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Issue, IssueStatus, IssuePriority } from './issue.entity';
import { User } from '../users/user.entity';
import { Goal } from '../goals/goal.entity';
import { Kpi } from '../kpis/kpi.entity';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { AssignIssueDto } from './dto/assign-issue.dto';

@Injectable()
export class IssuesService {
  constructor(
    @InjectRepository(Issue)
    private issuesRepository: Repository<Issue>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Goal)
    private goalsRepository: Repository<Goal>,
    @InjectRepository(Kpi)
    private kpisRepository: Repository<Kpi>,
  ) {}

  async create(createIssueDto: CreateIssueDto, userId: string): Promise<Issue> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    let goal: Goal | undefined;
    let kpi: Kpi | undefined;

    if (createIssueDto.goalId) {
      goal = await this.goalsRepository.findOne({ where: { id: createIssueDto.goalId } });
      if (!goal) {
        throw new NotFoundException('Goal not found');
      }
    }

    if (createIssueDto.kpiId) {
      kpi = await this.kpisRepository.findOne({ where: { id: createIssueDto.kpiId } });
      if (!kpi) {
        throw new NotFoundException('KPI not found');
      }
    }

    const issue = this.issuesRepository.create({
      ...createIssueDto,
      createdBy: user,
      goal,
      kpi,
    });

    return this.issuesRepository.save(issue);
  }

  async findAll(userId?: string): Promise<Issue[]> {
    const query = this.issuesRepository
      .createQueryBuilder('issue')
      .leftJoinAndSelect('issue.createdBy', 'createdBy')
      .leftJoinAndSelect('issue.assignedTo', 'assignedTo')
      .leftJoinAndSelect('issue.goal', 'goal')
      .leftJoinAndSelect('issue.kpi', 'kpi')
      .orderBy('issue.createdAt', 'DESC');

    if (userId) {
      // If userId provided, show issues created by or assigned to this user
      query.where('issue.createdBy.id = :userId OR issue.assignedTo.id = :userId', { userId });
    }

    return query.getMany();
  }

  async findOne(id: string): Promise<Issue> {
    const issue = await this.issuesRepository.findOne({
      where: { id },
      relations: ['createdBy', 'assignedTo', 'goal', 'kpi'],
    });

    if (!issue) {
      throw new NotFoundException('Issue not found');
    }

    return issue;
  }

  async update(id: string, updateIssueDto: UpdateIssueDto): Promise<Issue> {
    const issue = await this.findOne(id);

    if (updateIssueDto.status === IssueStatus.RESOLVED && !issue.resolvedAt) {
      issue.resolvedAt = new Date();
    }

    Object.assign(issue, updateIssueDto);
    return this.issuesRepository.save(issue);
  }

  async updateStatus(id: string, status: IssueStatus): Promise<Issue> {
    const issue = await this.findOne(id);

    if (status === IssueStatus.RESOLVED && !issue.resolvedAt) {
      issue.resolvedAt = new Date();
    }

    issue.status = status;
    return this.issuesRepository.save(issue);
  }

  async assign(assignIssueDto: AssignIssueDto): Promise<Issue> {
    const { issueId, assigneeId } = assignIssueDto;

    const issue = await this.findOne(issueId);
    const assignee = await this.usersRepository.findOne({ where: { id: assigneeId } });

    if (!assignee) {
      throw new NotFoundException('Assignee not found');
    }

    issue.assignedTo = assignee;
    issue.status = IssueStatus.IN_PROGRESS;

    return this.issuesRepository.save(issue);
  }

  async remove(id: string): Promise<void> {
    const result = await this.issuesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Issue not found');
    }
  }

  async getStats(): Promise<any> {
    const total = await this.issuesRepository.count();
    const open = await this.issuesRepository.count({ where: { status: IssueStatus.OPEN } });
    const inProgress = await this.issuesRepository.count({ where: { status: IssueStatus.IN_PROGRESS } });
    const resolved = await this.issuesRepository.count({ where: { status: IssueStatus.RESOLVED } });

    return {
      total,
      open,
      inProgress,
      resolved,
      closed: await this.issuesRepository.count({ where: { status: IssueStatus.CLOSED } }),
    };
  }
}