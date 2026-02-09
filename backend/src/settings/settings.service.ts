import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getUserSettings(userId: string) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    // Return default settings if none exist
    return user.settings || {
      notifications: true,
      emailAlerts: true,
      darkMode: true,
      offlineMode: false,
      twoFactor: false,
      language: 'English',
    };
  }

  async updateUserSettings(userId: string, settings: any) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    // Merge with existing settings
    const currentSettings = user.settings || {};
    const updatedSettings = { ...currentSettings, ...settings };

    await this.usersRepository.update(userId, { settings: updatedSettings });
    
    return updatedSettings;
  }
}
