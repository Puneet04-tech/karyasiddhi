import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { GoalsModule } from './goals/goals.module';
import { KpisModule } from './kpis/kpis.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { DepartmentsModule } from './departments/departments.module';
import { SettingsModule } from './settings/settings.module';
import { SnakeNamingStrategy } from './common/snake-naming.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(
      process.env.NODE_ENV === 'production'
        ? {
            type: 'postgres',
            url: process.env.DATABASE_URL,
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: false,
            logging: false,
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
            synchronize: true,
            logging: true,
          }
    ),
    AuthModule,
    UsersModule,
    GoalsModule,
    KpisModule,
    AnalyticsModule,
    DepartmentsModule,
    SettingsModule,
  ],
})
export class AppModule {}
