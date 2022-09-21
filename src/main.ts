import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from '@/common/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ValidationException } from '@/shared/exceptions';
import { LOGGER_PROVIDER } from '@/shared/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: (errors) => new ValidationException(errors),
  }));
  app.useLogger(app.get(LOGGER_PROVIDER));
  setupSwagger(app);

  await app.listen(3001);
}
bootstrap();
