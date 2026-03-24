import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { EnterpriseController } from './enterprise-solutions.controller';
import { EnterpriseService } from './enterprise-solutions.service';

@Module({
  imports: [HttpModule],
  controllers: [EnterpriseController],
  providers: [EnterpriseService],
  exports: [EnterpriseService],
})
export class EnterpriseSolutionsModule {}
