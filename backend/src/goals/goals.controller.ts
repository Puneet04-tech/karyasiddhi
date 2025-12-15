import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { GoalsService } from './goals.service';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Goals')
@Controller('goals')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class GoalsController {
  constructor(private goalsService: GoalsService) {}

  @Post()
  @ApiOperation({ summary: 'Create new goal' })
  async create(@Body() createGoalDto: CreateGoalDto, @Request() req) {
    // Auto-assign to current user if no assignedUserId specified
    if (!createGoalDto.assignedUserId) {
      createGoalDto.assignedUserId = req.user.id;
    }
    return this.goalsService.create(createGoalDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all goals' })
  async findAll(@Request() req, @Query('userId') userId?: string, @Query('departmentId') departmentId?: string) {
    // Regular users can only see their own goals unless they're a manager
    const targetUserId = req.user.role === 'manager' ? userId : (userId || req.user.id);
    
    if (targetUserId && req.user.role !== 'manager') {
      return this.goalsService.findByUserId(req.user.id);
    }
    if (targetUserId) {
      return this.goalsService.findByUserId(targetUserId);
    }
    if (departmentId) {
      return this.goalsService.findByDepartmentId(departmentId);
    }
    return req.user.role === 'manager' ? this.goalsService.findAll() : this.goalsService.findByUserId(req.user.id);
  }

  @Get('statistics')
  @ApiOperation({ summary: 'Get goals statistics' })
  async getStatistics(@Request() req, @Query('userId') userId?: string) {
    const targetUserId = req.user.role === 'manager' ? userId : req.user.id;
    return targetUserId ? this.goalsService.getStatisticsByUser(targetUserId) : this.goalsService.getStatistics();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get goal by ID' })
  async findOne(@Param('id') id: string) {
    return this.goalsService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update goal' })
  async update(@Param('id') id: string, @Body() updateGoalDto: UpdateGoalDto) {
    return this.goalsService.update(id, updateGoalDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete goal' })
  async remove(@Param('id') id: string) {
    return this.goalsService.remove(id);
  }
}
