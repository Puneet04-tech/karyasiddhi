import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { DepartmentsService } from './departments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Departments')
@Controller('departments')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class DepartmentsController {
  constructor(private departmentsService: DepartmentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create new department' })
  async create(@Body() departmentData: any) {
    return this.departmentsService.create(departmentData);
  }

  @Get()
  @ApiOperation({ summary: 'Get all departments' })
  async findAll() {
    return this.departmentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get department by ID' })
  async findOne(@Param('id') id: string) {
    return this.departmentsService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update department' })
  async update(@Param('id') id: string, @Body() departmentData: any) {
    return this.departmentsService.update(id, departmentData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete department' })
  async remove(@Param('id') id: string) {
    return this.departmentsService.remove(id);
  }
}
