import { DynamicModule, Module } from '@nestjs/common';
import { createLoggerProviders } from '@/shared/logger/logger.provider';
import { LoggerOptions } from 'winston';

@Module({})
class LoggerModule {
  static forRoot(options?: LoggerOptions) {
    const providers = createLoggerProviders(options);
    return {
      global: true,
      module: LoggerModule,
      providers,
      exports: providers,
    } as DynamicModule;
  }
}

export { LoggerModule };
