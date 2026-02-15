import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { GoalUploadsService } from './goal-uploads.service';
import { CreateGoalUploadDto, UpdateGoalUploadDto } from './dto/goal-upload.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Goal Uploads')
@Controller('goal-uploads')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class GoalUploadsController {
  constructor(private readonly goalUploadsService: GoalUploadsService) {}

  @Post()
  @ApiOperation({ summary: 'Upload a file for a goal' })
  async create(@Body() createGoalUploadDto: CreateGoalUploadDto, @Request() req) {
    return this.goalUploadsService.create(createGoalUploadDto, req.user.id);
  }

  @Get('goal/:goalId')
  @ApiOperation({ summary: 'Get all uploads for a specific goal' })
  async findAllByGoal(@Param('goalId') goalId: string, @Request() req) {
    return this.goalUploadsService.findAllByGoal(goalId, req.user.id);
  }

  @Get('user')
  @ApiOperation({ summary: 'Get all uploads by current user' })
  async findAllByUser(@Request() req) {
    return this.goalUploadsService.findAllByUser(req.user.id);
  }

  @Get('manager')
  @ApiOperation({ summary: 'Get all uploads for manager (department employees)' })
  async findAllForManager(@Request() req) {
    return this.goalUploadsService.findAllForManager(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific upload' })
  async findOne(@Param('id') id: string, @Request() req) {
    return this.goalUploadsService.findOne(id, req.user.id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an upload' })
  async update(@Param('id') id: string, @Body() updateGoalUploadDto: UpdateGoalUploadDto, @Request() req) {
    return this.goalUploadsService.update(id, updateGoalUploadDto, req.user.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an upload' })
  async remove(@Param('id') id: string, @Request() req) {
    return this.goalUploadsService.remove(id, req.user.id);
  }
}