import { IsString, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { KpiFrequency, KpiTrend } from '../kpi.entity';

export class CreateKpiDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  unit: string;

  @ApiProperty()
  @IsNumber()
  target: number;

  @ApiProperty()
  @IsNumber()
  current: number;

  @ApiProperty()
  @IsNumber()
  baseline: number;

  @ApiProperty({ enum: KpiFrequency })
  @IsEnum(KpiFrequency)
  frequency: KpiFrequency;

  @ApiProperty()
  @IsString()
  category: string;

  @ApiPropertyOptional({ enum: KpiTrend, default: KpiTrend.STABLE })
  @IsOptional()
  @IsEnum(KpiTrend)
  trend?: KpiTrend;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  departmentId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  goalId?: string;
}
