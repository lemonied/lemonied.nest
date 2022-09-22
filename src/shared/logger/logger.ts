import { ConfigModule } from '@/config';
import { createLogger, format, LoggerOptions, transports } from 'winston';
import { color } from '@/shared/utils';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import { DailyRotateFileTransportOptions } from 'winston-daily-rotate-file';

const configService = ConfigModule.getConfig();

// https://github.com/winstonjs/winston
const devTransports: LoggerOptions['transports'] = [
  new transports.Console({
    format: format.combine(
      format.timestamp(),
      format.label({ label: 'LOGGER' }),
      format.colorize(),
      format.printf(({ level, message, label, context, timestamp, stack, ...extra }) => {
        return `${timestamp ? color.green(label) : ''}` +
          `${timestamp ? ` ${color.bold(timestamp)} -` : ''}` +
          `${level ? ` ${level}` : ''}` +
          `${context ? ` ${color.yellow(`[${context}]`)}` : ''}` +
          `${message ? ` ${message}` : ''}` +
          `${Object.keys(extra).length > 0 ? ` ${extra}` : ''}` +
          `${stack ? `\n${stack}` : ''}`;
      }),
    ),
    level: 'debug',
  }),
];

const sharedOptions: DailyRotateFileTransportOptions = {
  dirname: configService.logPath,
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  json: false,
  format: format.combine(
    format.uncolorize(),
    format.timestamp(),
    format.json(),
  ),
};
const prodTransports: LoggerOptions['transports'] = [
  new DailyRotateFile(Object.assign({}, sharedOptions, {
    level: 'error',
    filename: 'error-%DATE%.log',
  })),
  new DailyRotateFile(Object.assign({}, sharedOptions, {
    level: 'info',
    filename: 'info-%DATE%.log',
  })),
];

const loggerConfig: LoggerOptions = {
  /**
   * levels:emerg: 0, alert: 1, crit: 2, error: 3, warning: 4, notice: 5, info: 6, debug: 7
   */
  transports: configService.isProduction ? prodTransports : devTransports,
};
export const logger = createLogger(loggerConfig);
