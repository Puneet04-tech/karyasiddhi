import { 
  Controller, Get, Put, Post, Delete, Body, UseGuards, 
  Request, HttpStatus, HttpException 
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SettingsService } from './settings.service';

@ApiTags('Settings')
@Controller('settings')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class SettingsController {
  constructor(private settingsService: SettingsService) {}

  @Get()
  @ApiOperation({ summary: 'Get user settings' })
  async getUserSettings(@Request() req) {
    try {
      const settings = await this.settingsService.getUserSettings(req.user.id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Settings retrieved successfully',
        data: settings,
      };
    } catch (error) {
      throw new HttpException(
        'Failed to retrieve settings',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put()
  @ApiOperation({ summary: 'Update user settings' })
  async updateUserSettings(@Request() req, @Body() settingsData: any) {
    try {
      const updatedSettings = await this.settingsService.updateUserSettings(
        req.user.id,
        settingsData,
      );
      return {
        statusCode: HttpStatus.OK,
        message: 'Settings updated successfully',
        data: updatedSettings,
      };
    } catch (error) {
      throw new HttpException(
        'Failed to update settings',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('change-password')
  @ApiOperation({ summary: 'Change user password' })
  async changePassword(@Request() req, @Body() body: { currentPassword: string; newPassword: string }) {
    try {
      const result = await this.settingsService.changePassword(
        req.user.id,
        body.currentPassword,
        body.newPassword,
      );
      return {
        statusCode: HttpStatus.OK,
        message: 'Password changed successfully',
        data: result,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to change password',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('export-data')
  @ApiOperation({ summary: 'Export user data' })
  async exportData(@Request() req) {
    try {
      const data = await this.settingsService.exportUserData(req.user.id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Data export initiated successfully',
        data: data,
      };
    } catch (error) {
      throw new HttpException(
        'Failed to export data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('account')
  @ApiOperation({ summary: 'Delete user account' })
  async deleteAccount(@Request() req) {
    try {
      const result = await this.settingsService.deleteUserAccount(req.user.id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Account deletion initiated successfully',
        data: result,
      };
    } catch (error) {
      throw new HttpException(
        'Failed to delete account',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
