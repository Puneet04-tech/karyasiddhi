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
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(
      process.env.NODE_ENV === 'production'
        ? {
            type: 'postgres',
            url: process.env.DATABASE_URL,
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: false, // Never sync in production
            logging: false,
            namingStrategy: new SnakeNamingStrategy(),
            ssl: { rejectUnauthorized: false },
            extra: {
              ssl: {
                rejectUnauthorized: false,
              },
            },
          }
        : {
            type: 'sqlite',
            database: 'karyasiddhi.db',
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true, // Enable sync for development
            logging: true,
            namingStrategy: new SnakeNamingStrategy(),
          }
    ),
    AuthModule,
    UsersModule,
    GoalsModule,
    KpisModule,
    AnalyticsModule,
    DepartmentsModule,
  ],
})
export class AppModule {}
