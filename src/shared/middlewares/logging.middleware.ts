import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { LOGGER_PROVIDER, LoggerService } from '@/shared/logger';
import { Request, Response, NextFunction } from 'express';
import { color, statusColor } from '@/shared/utils';

@Injectable()
class LoggingMiddleware implements NestMiddleware {
  constructor(
    @Inject(LOGGER_PROVIDER) private log: LoggerService,
  ) {}
  use(req: Request, res: Response, next: NextFunction): any {
    const now = Date.now();
    res.once('finish', () => {
      this.log.log(
        `${req.method.toUpperCase()} ${statusColor(res.statusCode)} ${req.originalUrl} ${color.green(`${Date.now() - now}ms`)}`,
        'HTTP',
      );
    });
    next();
  }
}

export { LoggingMiddleware };
