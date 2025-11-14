import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.enableCors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  app.use(cookieParser());

  // // Headers for Google OAuth
  // app.use((req, res, next) => {
  //   res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  //   res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  //   next();
  // });
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
