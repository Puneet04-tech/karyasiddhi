import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(userData: Partial<User>): Promise<User> {
    const user = this.usersRepository.create(userData);
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({ relations: ['department'] });
  }

  async findById(id: string): Promise<User> {
    return this.usersRepository.findOne({ 
      where: { id },
      relations: ['department', 'goals'],
    });
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ 
      where: { email },
    });
  }

  async update(id: string, userData: Partial<User>): Promise<User> {
    await this.usersRepository.update(id, userData);
    return this.findById(id);
  }

  async setAadhaarVerified(id: string, verified = true): Promise<User> {
    await this.usersRepository.update(id, { aadhaarVerified: verified });
    return this.findById(id);
  }

  async setDigilockerVerified(id: string, verified = true): Promise<User> {
    await this.usersRepository.update(id, { digilockerVerified: verified });
    return this.findById(id);
  }

  async verifyAllAadhaar(): Promise<void> {
    await this.usersRepository.createQueryBuilder()
      .update(User)
      .set({ aadhaarVerified: true })
      .execute();
  }

  async verifyAllDigilocker(): Promise<void> {
    await this.usersRepository.createQueryBuilder()
      .update(User)
      .set({ digilockerVerified: true })
      .execute();
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
