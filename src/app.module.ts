import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserModule } from '@/modules/user';
import { LoggerModule } from '@/shared/logger';
import { ConfigModule } from '@/config';
import { APP_FILTER } from '@nestjs/core';
import { ExceptionFilter } from '@/shared/filters';
import { LoggingMiddleware } from '@/shared/middlewares';
import { AuthModule } from '@/modules/auth';

@Module({
  imports: [
    ConfigModule,
    MikroOrmModule.forRoot(),
    UserModule,
    LoggerModule.forRoot(),
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggingMiddleware)
      .forRoutes('*');
  }
}
