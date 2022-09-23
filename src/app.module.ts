import { ClassSerializerInterceptor, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserEntity, UserModule } from '@/modules/user';
import { LoggerModule } from '@/shared/logger';
import { ConfigModule } from '@/config';
import { APP_FILTER, APP_INTERCEPTOR, Reflector } from '@nestjs/core';
import { ExceptionFilter } from '@/shared/filters';
import { LoggingMiddleware } from '@/shared/middlewares';
import { AuthModule } from '@/modules/auth';
import { RoleEntity, RoleModule } from '@/modules/role';
import { PermissionEntity, PermissionModule } from '@/modules/permission';
import { AccountEntity, AccountModule } from '@/modules/account';

@Module({
  imports: [
    ConfigModule,
    MikroOrmModule.forRoot(),
    MikroOrmModule.forFeature([
      AccountEntity,
      PermissionEntity,
      RoleEntity,
      UserEntity,
    ]),
    LoggerModule.forRoot(),
    UserModule,
    AuthModule,
    RoleModule,
    PermissionModule,
    AccountModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      inject: [Reflector],
      useFactory: (reflector: Reflector) => new ClassSerializerInterceptor(reflector, {
        strategy: 'excludeAll',
      }),
    },
  ],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggingMiddleware)
      .forRoutes('*');
  }
}
