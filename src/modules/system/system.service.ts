import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/mysql';
import { UserEntity } from '@/entities';
import { RoleTypes } from '@/modules/role';
import { SystemInfo } from './system.dto';

@Injectable()
class SystemService {
  constructor(
    private em: EntityManager,
  ) {}

  public async getInfo() {
    const count = await this.em.count(UserEntity, { roles: { code: RoleTypes.SuperAdmin } });
    return new SystemInfo({
      initial: count > 0,
    });
  }
}

export { SystemService };
