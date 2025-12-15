import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request, ForbiddenException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Users')
@Controller('users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  async findOne(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user' })
  async update(@Param('id') id: string, @Body() userData: any) {
    return this.usersService.update(id, userData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  async remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Post('verify/aadhaar/start')
  @ApiOperation({ summary: 'Start Aadhaar verification for current user' })
  async startAadhaarVerification(@Request() req) {
    // In a real integration this would return a provider redirect URL or challenge
    const providerUrl = process.env.AADHAAR_PROVIDER_URL || null;
    return { providerUrl, message: 'Use providerUrl to continue verification (if configured).' };
  }

  @Post('verify/aadhaar/complete')
  @ApiOperation({ summary: 'Complete Aadhaar verification for current user' })
  async completeAadhaarVerification(@Request() req) {
    const userId = req.user?.id;
    if (!userId) throw new ForbiddenException();
    return this.usersService.setAadhaarVerified(userId, true);
  }

  @Post('verify/digilocker/start')
  @ApiOperation({ summary: 'Start Digilocker verification for current user' })
  async startDigilockerVerification(@Request() req) {
    const providerUrl = process.env.DIGILOCKER_PROVIDER_URL || null;
    return { providerUrl, message: 'Use providerUrl to continue verification (if configured).' };
  }

  @Post('verify/digilocker/complete')
  @ApiOperation({ summary: 'Complete Digilocker verification for current user' })
  async completeDigilockerVerification(@Request() req) {
    const userId = req.user?.id;
    if (!userId) throw new ForbiddenException();
    return this.usersService.setDigilockerVerified(userId, true);
  }

  @Post('verify/aadhaar/all')
  @ApiOperation({ summary: 'Admin: mark Aadhaar verified for all users' })
  async verifyAadhaarForAll(@Request() req) {
    const role = req.user?.role;
    if (role !== 'admin') throw new ForbiddenException('Admin only');
    await this.usersService.verifyAllAadhaar();
    return { ok: true };
  }

  @Post('verify/digilocker/all')
  @ApiOperation({ summary: 'Admin: mark Digilocker verified for all users' })
  async verifyDigilockerForAll(@Request() req) {
    const role = req.user?.role;
    if (role !== 'admin') throw new ForbiddenException('Admin only');
    await this.usersService.verifyAllDigilocker();
    return { ok: true };
  }
}
