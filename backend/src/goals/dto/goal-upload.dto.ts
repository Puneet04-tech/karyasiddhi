import { IsNotEmpty, IsString, IsOptional, IsUUID } from 'class-validator';

export class CreateGoalUploadDto {
  @IsUUID()
  @IsNotEmpty()
  goalId: string;

  @IsString()
  @IsNotEmpty()
  fileName: string;

  @IsString()
  @IsNotEmpty()
  fileUrl: string;

  @IsOptional()
  @IsString()
  fileSize?: number;

  @IsOptional()
  @IsString()
  fileType?: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateGoalUploadDto {
  @IsOptional()
  @IsString()
  description?: string;
}