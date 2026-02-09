import { 
  Controller, Get, Put, Body, UseGuards, 
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
}
