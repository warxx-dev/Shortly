import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser = require('cookie-parser');
import express = require('express');
import { ExpressAdapter } from '@nestjs/platform-express';

const expressApp = express();
let cachedApp: any;

export const createNestServer = async () => {
  if (cachedApp) {
    return cachedApp;
  }

  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
    { 
      logger: ['error', 'warn'],
      bodyParser: false, // Deshabilitar body parser automático
    },
  );

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
  });

  app.use(cookieParser());

  await app.init();
  cachedApp = app;
  return app;
};

// Inicializar para serverless
createNestServer()
  .then(() => console.log('Nest Ready'))
  .catch((err) => console.error('Nest initialization error', err));

// Para desarrollo local
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
  });

  app.use(cookieParser());
  
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Application running on port ${port}`);
}

if (require.main === module) {
  bootstrap();
}

export default expressApp;
