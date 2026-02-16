import { IsString, IsOptional, IsEnum, IsUUID } from 'class-validator';
import { IssuePriority } from '../issue.entity';

export class CreateIssueDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsEnum(IssuePriority)
  priority?: IssuePriority;

  @IsOptional()
  @IsUUID()
  goalId?: string;

  @IsOptional()
  @IsUUID()
  kpiId?: string;
}