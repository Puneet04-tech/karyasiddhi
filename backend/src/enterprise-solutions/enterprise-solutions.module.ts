import { Module } from '@nestjs/common';
import { EnterpriseSolutionsController } from './enterprise-solutions.controller';
import { EnterpriseSolutionsService } from './enterprise-solutions.service';

@Module({
  controllers: [EnterpriseSolutionsController],
  providers: [EnterpriseSolutionsService],
  exports: [EnterpriseSolutionsService],
})
export class EnterpriseSolutionsModule {}
