import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { LoadStrategy } from '@mikro-orm/core';
import { ConfigModule } from '@/config';
import { LoggerModule } from '@/shared/logger';

const configService = ConfigModule.getConfig();

const config: MikroOrmModuleOptions = {
  type: 'mysql',
  host: configService.dbHost,
  port: configService.dbPort,
  user: 'root',
  password: '123456',
  dbName: 'nest-dev-orm',
  entities: ['dist/entities/*.entity.js'],
  entitiesTs: ['src/entities/*.entity.ts'],
  debug: true,
  // https://mikro-orm.io/docs/loading-strategies
  loadStrategy: LoadStrategy.JOINED,
  // https://mikro-orm.io/docs/logging#highlighters
  highlighter: new SqlHighlighter(),
  registerRequestContext: false, // disable automatic middleware
  logger: message => LoggerModule.getLogger().debug(message, 'MikroOrmLog'),
};

export default config;
