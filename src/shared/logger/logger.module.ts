import { DynamicModule, Module } from '@nestjs/common';
import { createLoggerProviders } from '@/shared/logger/logger.provider';
import { LoggerOptions, transports, format } from 'winston';

@Module({})
class LoggerModule {
  static forRoot(options?: LoggerOptions) {
    const initial: LoggerOptions = {
      level: 'debug',
      format: format.json(),
      transports: [
        new transports.Console({
          format: format.prettyPrint(),
        }),
      ],
    };
    const providers = createLoggerProviders(Object.assign(initial, options));
    return {
      global: true,
      module: LoggerModule,
      providers,
      exports: providers,
    } as DynamicModule;
  }
}

export { LoggerModule };
