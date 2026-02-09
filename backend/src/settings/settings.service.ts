import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcrypt';

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

  async changePassword(userId: string, currentPassword: string, newPassword: string) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
      throw new Error('Current password is incorrect');
    }

    // Hash new password
    const saltRounds = 10;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update password
    await this.usersRepository.update(userId, { password: hashedNewPassword });

    return { success: true, message: 'Password changed successfully' };
  }

  async exportUserData(userId: string) {
    const user = await this.usersRepository.findOne({ 
      where: { id: userId },
      relations: ['goals', 'kpis', 'department']
    });
    
    if (!user) {
      throw new Error('User not found');
    }

    // Prepare export data
    const exportData = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        designation: user.designation,
        department: user.department?.name,
        settings: user.settings,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      goals: user.goals || [],
      kpis: user.kpis || [],
      exportDate: new Date().toISOString(),
    };

    return exportData;
  }

  async deleteUserAccount(userId: string) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    // Mark for deletion instead of immediate deletion (soft delete)
    // In a real app, you might want to schedule deletion after 30 days
    await this.usersRepository.update(userId, { 
      isActive: false,
      settings: { ...user.settings, accountDeleted: true, deletionDate: new Date() }
    });

    return { 
      success: true, 
      message: 'Account marked for deletion. It will be permanently deleted within 30 days.' 
    };
  }
}
