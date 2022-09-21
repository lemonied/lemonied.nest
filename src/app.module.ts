import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserModule } from '@/modules/user';
import { LoggerModule } from '@/shared/logger';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './.env.local',
    }),
    MikroOrmModule.forRoot(),
    UserModule,
    // https://github.com/winstonjs/winston
    LoggerModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
