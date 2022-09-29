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
  public readonly dbUser = process.env.DB_USER || 'root';
  public readonly dbPassword = process.env.DB_PASSWORD;
  public readonly dbName = process.env.DB_NAME;
  public readonly jwtToken = process.env.JWT_TOKEN || 'ChickenMan';
  public readonly jwtExpiresIn = Number(process.env.JWT_EXPIRES_IN || 1000 * 60 * 60 * 24 * 7);
  public readonly jwtCookieName = 'jwt_token';
  public readonly prefix = process.env.BASE_PREFIX || '/api';
  public get isProduction() {
    return this.mode === 'production';
  }
}

export { ConfigService };
