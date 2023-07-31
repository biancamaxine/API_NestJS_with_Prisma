import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { HttpExeptionInterceptor } from './common/errors/interceptors/http-client.interceptor';
import { PrismaClientInterceptor } from './common/errors/interceptors/prisma-client.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  // app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new HttpExeptionInterceptor());
  app.useGlobalInterceptors(new PrismaClientInterceptor());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
