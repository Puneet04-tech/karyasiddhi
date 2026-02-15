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
      ...(process.env.NODE_ENV === 'production' ? {
        type: 'postgres' as const,
        url: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
        extra: {
          ssl: {
            rejectUnauthorized: false,
          },
        },
      } : {
        type: 'sqlite' as const,
        database: 'karyasiddhi.db',
      }),
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.NODE_ENV !== 'production', // Enable sync for development
      logging: process.env.NODE_ENV === 'development',
      namingStrategy: new SnakeNamingStrategy(), // Convert camelCase to snake_case
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
