import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query, ForbiddenException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { IssuesService } from './issues.service';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { AssignIssueDto } from './dto/assign-issue.dto';
import { IssueStatus } from './issue.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Issues')
@Controller('issues')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class IssuesController {
  constructor(private readonly issuesService: IssuesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new issue' })
  create(@Body() createIssueDto: CreateIssueDto, @Request() req) {
    return this.issuesService.create(createIssueDto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all issues' })
  @ApiQuery({ name: 'my', required: false, description: 'Get only my issues (created by or assigned to me)' })
  findAll(@Request() req, @Query('my') my?: string) {
    const userId = my === 'true' ? req.user.id : undefined;
    return this.issuesService.findAll(userId);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get issue statistics' })
  getStats() {
    return this.issuesService.getStats();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get issue by ID' })
  findOne(@Param('id') id: string) {
    return this.issuesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update issue' })
  update(@Param('id') id: string, @Body() updateIssueDto: UpdateIssueDto) {
    return this.issuesService.update(id, updateIssueDto);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update issue status' })
  updateStatus(@Param('id') id: string, @Body() body: { status: IssueStatus }) {
    return this.issuesService.updateStatus(id, body.status);
  }

  @Post('assign')
  @ApiOperation({ summary: 'Assign issue to an intern/employee' })
  assign(@Body() assignIssueDto: AssignIssueDto, @Request() req) {
    // Check if user is a manager (Department Head)
    if (req.user.role !== 'Department Head') {
      throw new ForbiddenException('Only managers can assign issues');
    }
    return this.issuesService.assign(assignIssueDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete issue' })
  remove(@Param('id') id: string) {
    return this.issuesService.remove(id);
  }
}