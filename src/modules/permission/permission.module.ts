import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PermissionEntity } from './permission.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature([PermissionEntity]),
  ],
})
class PermissionModule {}

export { PermissionModule };
