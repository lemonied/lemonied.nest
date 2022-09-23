import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { RoleModule } from '@/modules/role';

@Module({
  imports: [
    MikroOrmModule.forFeature([UserEntity]),
    RoleModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
