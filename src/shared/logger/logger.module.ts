import { DynamicModule, Module } from '@nestjs/common';
import { createLoggerProviders } from './logger.provider';
import { LoggerService } from './logger.service';
import { logger } from './logger';

@Module({})
class LoggerModule {
  static forRoot() {
    const providers = createLoggerProviders();
    return {
      global: true,
      module: LoggerModule,
      providers,
      exports: providers,
    } as DynamicModule;
  }
  static getLogger() {
    return new LoggerService(logger);
  }
}

export { LoggerModule };
