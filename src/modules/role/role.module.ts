import { Module } from '@nestjs/common';
import { RoleService } from '@/modules/role/role.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { RoleEntity } from './role.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature([RoleEntity]),
  ],
  providers: [RoleService],
  exports: [RoleService],
})
class RoleModule {}

export { RoleModule };
