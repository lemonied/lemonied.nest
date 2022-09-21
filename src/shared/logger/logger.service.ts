import { LoggerService as NestLoggerService } from '@nestjs/common';
import { Logger } from 'winston';

class LoggerService implements NestLoggerService {
  constructor(
    private logger: Logger,
  ) {}

  debug(message: any, context?: string) {
    return this.logger.debug(message, { context });
  }

  error(message: any, trace?: string, context?: string) {
    if (message instanceof Error) {
      const { message: msg, ...meta } = message;
      return this.logger.error(msg, meta);
    }
    if (message && typeof message === 'object') {
      const { message: msg, ...meta } = message;
      return this.logger.error(msg, { context, stack: trace, ...meta });
    }

    return this.logger.error(message, { context, stack: trace });
  }

  log(message: any, context?: string) {
    return this.logger.info(message, { context });
  }

  verbose(message: any, context?: string) {
    return this.logger.verbose(message, { context });
  }

  warn(message: any, context?: string) {
    return this.logger.warn(message, { context });
  }

}

export { LoggerService };
