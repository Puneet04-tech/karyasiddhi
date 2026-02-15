import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';
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
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        callback(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
      },
    }),
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB limit
    },
  }))
  @ApiOperation({ summary: 'Upload a file for a goal' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'File to upload',
        },
        goalId: {
          type: 'string',
          description: 'Goal ID',
        },
        description: {
          type: 'string',
          description: 'Optional description',
        },
      },
    },
  })
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { goalId: string; description?: string },
    @Request() req
  ) {
    const createGoalUploadDto: CreateGoalUploadDto = {
      goalId: body.goalId,
      fileName: file.originalname,
      fileUrl: `/uploads/${file.filename}`,
      fileSize: file.size,
      fileType: file.mimetype,
      description: body.description,
    };
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