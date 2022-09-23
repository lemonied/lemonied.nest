import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from '@/shared/swagger';
import { ValidationPipe } from '@/shared/pipes';
import { ValidationException } from '@/shared/exceptions';
import { LOGGER_PROVIDER, LoggerModule } from '@/shared/logger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: LoggerModule.getLogger(),
  });

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    exceptionFactory: (errors) => new ValidationException(errors),
  }));
  app.useLogger(app.get(LOGGER_PROVIDER));
  setupSwagger(app);

  await app.listen(3001);
}
bootstrap().catch(error => {
  LoggerModule.getLogger().error(error, null, 'Bootstrap');
  process.exit(1);
});
