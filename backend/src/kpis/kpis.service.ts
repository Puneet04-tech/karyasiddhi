import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Kpi } from './kpi.entity';
import { CreateKpiDto } from './dto/create-kpi.dto';
import { UpdateKpiDto } from './dto/update-kpi.dto';

@Injectable()
export class KpisService {
  constructor(
    @InjectRepository(Kpi)
    private kpisRepository: Repository<Kpi>,
  ) {}

  async create(createKpiDto: CreateKpiDto): Promise<Kpi> {
    const kpi = this.kpisRepository.create(createKpiDto);
    return this.kpisRepository.save(kpi);
  }

  async findAll(): Promise<Kpi[]> {
    return this.kpisRepository.find({
      relations: ['department', 'goal'],
    });
  }

  async findById(id: string): Promise<Kpi> {
    return this.kpisRepository.findOne({
      where: { id },
      relations: ['department', 'goal'],
    });
  }

  async findByGoalId(goalId: string): Promise<Kpi[]> {
    return this.kpisRepository.find({
      where: { goal: { id: goalId } },
      relations: ['department'],
    });
  }

  async findByUserId(userId: string): Promise<Kpi[]> {
    return this.kpisRepository.find({
      where: { goal: { assignedUser: { id: userId } } },
      relations: ['goal', 'department', 'goal.assignedUser'],
    });
  }

  async findByDepartmentId(departmentId: string): Promise<Kpi[]> {
    return this.kpisRepository.find({
      where: { department: { id: departmentId } },
      relations: ['goal'],
    });
  }

  async update(id: string, updateKpiDto: UpdateKpiDto): Promise<Kpi> {
    await this.kpisRepository.update(id, { ...updateKpiDto, lastUpdated: new Date() });
    return this.findById(id);
  }

  async remove(id: string): Promise<void> {
    await this.kpisRepository.delete(id);
  }

  async getAveragePerformance(): Promise<number> {
    const kpis = await this.kpisRepository.find();
    if (kpis.length === 0) return 0;

    const totalPerformance = kpis.reduce((sum, kpi) => {
      const performance = (Number(kpi.current) / Number(kpi.target)) * 100;
      return sum + performance;
    }, 0);

    return totalPerformance / kpis.length;
  }

  async getAveragePerformanceByUser(userId: string): Promise<number> {
    const kpis = await this.kpisRepository.find({
      where: { goal: { assignedUser: { id: userId } } },
      relations: ['goal', 'goal.assignedUser'],
    });
    
    if (kpis.length === 0) return 0;

    const totalPerformance = kpis.reduce((sum, kpi) => {
      const performance = (Number(kpi.current) / Number(kpi.target)) * 100;
      return sum + performance;
    }, 0);

    return totalPerformance / kpis.length;
  }
}
