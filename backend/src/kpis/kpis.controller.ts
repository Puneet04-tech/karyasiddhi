import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { KpisService } from './kpis.service';
import { CreateKpiDto } from './dto/create-kpi.dto';
import { UpdateKpiDto } from './dto/update-kpi.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('KPIs')
@Controller('kpis')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class KpisController {
  constructor(private kpisService: KpisService) {}

  @Post()
  @ApiOperation({ summary: 'Create new KPI' })
  async create(@Body() createKpiDto: CreateKpiDto) {
    return this.kpisService.create(createKpiDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all KPIs (scoped to user)' })
  async findAll(@Request() req, @Query('goalId') goalId?: string, @Query('departmentId') departmentId?: string) {
    // If a specific goal is requested, return KPIs for that goal
    if (goalId) {
      return this.kpisService.findByGoalId(goalId);
    }

    // Department-scoped filter (managers) or explicit query
    if (departmentId && req.user?.role === 'manager') {
      return this.kpisService.findByDepartmentId(departmentId);
    }

    // If the requester is a manager, return KPIs for their department (or all if necessary)
    if (req.user?.role === 'manager') {
      return this.kpisService.findAll();
    }

    // Regular user: return KPIs tied to goals assigned to them
    return this.kpisService.findByUserId(req.user.id);
  }

  @Get('performance')
  @ApiOperation({ summary: 'Get average KPI performance' })
  async getAveragePerformance() {
    return { averagePerformance: await this.kpisService.getAveragePerformance() };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get KPI by ID' })
  async findOne(@Param('id') id: string) {
    return this.kpisService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update KPI' })
  async update(@Param('id') id: string, @Body() updateKpiDto: UpdateKpiDto) {
    return this.kpisService.update(id, updateKpiDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete KPI' })
  async remove(@Param('id') id: string) {
    return this.kpisService.remove(id);
  }
}
