import { LoggerOptions, createLogger, format, transports } from 'winston';
import { LoggerService } from './logger.service';
import { Provider } from '@nestjs/common';
import { LOGGER_PROVIDER } from './logger.constants';
import { color, development } from '@/shared/utils';

export function createLoggerProviders(options: LoggerOptions): Provider[] {

  const initial: LoggerOptions = {
    /**
     * levels:emerg: 0, alert: 1, crit: 2, error: 3, warning: 4, notice: 5, info: 6, debug: 7
     */
    transports: [
      development && new transports.Console({
        format: format.combine(
          format.timestamp(),
          format.label({ label: 'LOGGER' }),
          format.printf(({ level, message, label, context, timestamp, ms, stack }) => {
            return `${timestamp ? color.green(label) : ''} ` +
              `${timestamp ? color.bold(timestamp) : ''} - ` +
              `${level ? color.green(level.toUpperCase()) : ''} ` +
              `${context ? color.yellow(`[${context}]`) : ''} ` +
              `${message ? color.green(message) : ''} ` +
              `${ms ? color.yellow(ms) : ''}` +
              `${stack ? `\n${stack}` : ''}`;
          }),
        ),
        level: 'debug',
      }),
    ].filter(Boolean),
  };

  return [
    {
      provide: LOGGER_PROVIDER,
      useFactory: () => {
        const logger = createLogger(Object.assign(initial, options));

        return new LoggerService(logger);
      },
    },
  ];
}
