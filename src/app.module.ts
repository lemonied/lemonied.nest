import { ClassSerializerInterceptor, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserModule } from '@/modules/user';
import { LoggerModule } from '@/shared/logger';
import { ConfigModule } from '@/config';
import { APP_FILTER, APP_INTERCEPTOR, Reflector } from '@nestjs/core';
import { ExceptionFilter } from '@/shared/filters';
import { LoggingMiddleware } from '@/shared/middlewares';
import { AuthModule } from '@/modules/auth';
import { RoleModule } from '@/modules/role';
import { AccessModule } from '@/modules/access';
import { AccountModule } from '@/modules/account';
import {
  UserEntity, RoleEntity, AccessEntity,
  AccountEntity, OperationEntity, CommentEntity,
} from '@/entities';
import { OperationModule } from '@/modules/operation';
import { SystemModule } from '@/modules/system';
import { CommentModule } from '@/modules/comment';

@Module({
  imports: [
    ConfigModule,
    MikroOrmModule.forRoot(),
    MikroOrmModule.forFeature([
      AccountEntity,
      AccessEntity,
      RoleEntity,
      UserEntity,
      OperationEntity,
      CommentEntity,
    ]),
    LoggerModule.forRoot(),
    OperationModule,
    UserModule,
    AuthModule,
    RoleModule,
    AccessModule,
    AccountModule,
    SystemModule,
    CommentModule,
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
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
