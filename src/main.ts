import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(
    session({
      secret: 'my-secret',
      resave: true,
      saveUninitialized: false,
      cookie: {
        maxAge: 30000
      }
    }),
  );
  app.useStaticAssets(join(__dirname, '..', 'authors'), {
    prefix: '/authors/',
  });
  app.useStaticAssets(join(__dirname, '..', 'editors'), {
    prefix: '/editors/',
  });
  app.useStaticAssets(join(__dirname, '..', 'users'), {
    prefix: '/users/',
  });

  app.enableCors();
  
  await app.listen(3001);
}
bootstrap();
