import { Logger, LoggerOptions, createLogger } from 'winston';
import { LoggerService } from './logger.service';
import { Provider } from '@nestjs/common';
import { LOGGER_NEST_PROVIDER, LOGGER_PROVIDER } from './logger.constants';

export function createLoggerProviders(options: LoggerOptions): Provider[] {
  return [
    {
      provide: LOGGER_PROVIDER,
      useFactory: () => {
        return createLogger(options);
      },
    },
    {
      provide: LOGGER_NEST_PROVIDER,
      useFactory: (logger: Logger) => new LoggerService(logger),
      inject: [LOGGER_PROVIDER],
    },
  ];
}
