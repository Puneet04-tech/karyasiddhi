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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false, // Disabled - schema managed by SQL files
      logging: process.env.NODE_ENV === 'development',
      namingStrategy: new SnakeNamingStrategy(), // Convert camelCase to snake_case
      extra: {
        ssl: {
          rejectUnauthorized: false, // Required for Supabase
        },
      },
    }),
    AuthModule,
    UsersModule,
    GoalsModule,
    KpisModule,
    AnalyticsModule,
    DepartmentsModule,
  ],
})
export class AppModule {}
