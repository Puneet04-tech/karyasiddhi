import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { GoalsModule } from './goals/goals.module';
import { KpisModule } from './kpis/kpis.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { DepartmentsModule } from './departments/departments.module';
import { SnakeNamingStrategy } from './common/snake-naming.strategy';
import { HealthController } from './health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.NODE_ENV === 'development', // Enable sync for development only
      logging: process.env.NODE_ENV === 'development',
      namingStrategy: new SnakeNamingStrategy(), // Convert camelCase to snake_case
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
      extra: process.env.NODE_ENV === 'production' ? {
        ssl: {
          rejectUnauthorized: false,
        },
      } : {},
    }),
    AuthModule,
    UsersModule,
    GoalsModule,
    KpisModule,
    AnalyticsModule,
    DepartmentsModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
