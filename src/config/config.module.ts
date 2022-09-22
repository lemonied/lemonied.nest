import { Global, Module } from '@nestjs/common';
import { ConfigService } from './config.service';

@Global()
@Module({
  providers: [ConfigService],
  exports: [ConfigService],
})
class ConfigModule {
  static getConfig() {
    return new ConfigService();
  }
}

export { ConfigModule };
