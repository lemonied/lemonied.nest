import { Module } from '@nestjs/common';
import { RoleService } from '@/modules/role/role.service';

@Module({
  imports: [],
  providers: [RoleService],
})
class RoleModule {}

export { RoleModule };
