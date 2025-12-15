import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS - support comma-separated list in CORS_ORIGIN env
  const rawOrigins = process.env.CORS_ORIGIN || 'http://localhost:3000';
  const origins = rawOrigins.split(',').map((s) => s.trim()).filter(Boolean);

  app.enableCors({
    origin: (incomingOrigin, callback) => {
      // Allow if no origin (same-origin requests) or origin is in configured list
      if (!incomingOrigin) return callback(null, true);
      if (origins.includes(incomingOrigin) || origins.includes('*')) return callback(null, true);
      // Not allowed
      return callback(new Error('Not allowed by CORS'), false);
    },
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // API prefix
  app.setGlobalPrefix('api');

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('KaryaSiddhi API')
    .setDescription('AI-Enhanced Government Performance Management Platform')
    .setVersion('1.0')
    .addTag('Digital India Initiative - SIH 2025')
    .addBearerAuth()
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3001;
  await app.listen(port);
  
  console.log(`🚀 KaryaSiddhi Backend running on http://localhost:${port}`);
  console.log(`📚 API Documentation: http://localhost:${port}/api/docs`);
}

bootstrap();
