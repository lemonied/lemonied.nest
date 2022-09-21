import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { LoadStrategy } from '@mikro-orm/core';

const config: MikroOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3306),
  user: 'root',
  password: '123456',
  dbName: 'nest-dev-orm',
  entities: ['dist/modules/**/*.entity.js'],
  entitiesTs: ['src/modules/**/*.entity.ts'],
  debug: process.env.NODE_ENV === 'development',
  // https://mikro-orm.io/docs/loading-strategies
  loadStrategy: LoadStrategy.JOINED,
  // https://mikro-orm.io/docs/logging#highlighters
  highlighter: new SqlHighlighter(),
  registerRequestContext: false, // disable automatic middleware
};

export default config;
