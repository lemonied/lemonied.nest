import * as dotenv from 'dotenv';

dotenv.config({
  path: '.env.local',
  override: false,
});

import { Injectable } from '@nestjs/common';
import { resolve } from 'path';

@Injectable()
class ConfigService {
  public readonly mode = process.env.NODE_ENV || 'development';
  public readonly logPath = process.env.LOG_PATH || resolve(process.cwd(), './logs');
  public readonly dbPort = Number(process.env.DB_PORT || 3306);
  public readonly dbHost = process.env.DB_HOST;
  public readonly jwtToken = '123';
  public get isProduction() {
    return this.mode === 'production';
  }
}

export { ConfigService };
