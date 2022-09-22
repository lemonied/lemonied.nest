import { LoggerService } from './logger.service';
import { Provider } from '@nestjs/common';
import { LOGGER_PROVIDER } from './logger.constants';
import { logger } from './logger';

export function createLoggerProviders(): Provider[] {
  return [
    {
      provide: LOGGER_PROVIDER,
      useFactory: () => {
        return new LoggerService(logger);
      },
      inject: [],
    },
  ];
}
