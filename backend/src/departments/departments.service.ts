import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { Department } from './department.entity';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private departmentsRepository: Repository<Department>,
  ) {}

  async create(departmentData: Partial<Department>): Promise<Department> {
    const department = this.departmentsRepository.create(departmentData);
    return this.departmentsRepository.save(department);
  }

  async findAll(): Promise<Department[]> {
    return this.departmentsRepository.find({
      relations: ['users', 'goals'],
    });
  }

  async findById(id: string): Promise<Department> {
    return this.departmentsRepository.findOne({
      where: { id: new ObjectId(id) },
      relations: ['users', 'goals'],
    });
  }

  async findByCode(code: string): Promise<Department> {
    return this.departmentsRepository.findOne({
      where: { code },
    });
  }

  async update(id: string, departmentData: Partial<Department>): Promise<Department> {
    await this.departmentsRepository.update(id, departmentData);
    return this.findById(id);
  }

  async remove(id: string): Promise<void> {
    await this.departmentsRepository.delete(id);
  }
}
