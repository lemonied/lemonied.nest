import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/mysql';
import { AccessEntity, RoleEntity } from '@/entities';
import { AccessType } from './access.type';
import { EntityDTO } from '@mikro-orm/core';
import { RoleTypes } from '@/modules/role';

@Injectable()
class AccessService {
  constructor(
    private em: EntityManager,
  ) {}
  public async getList(roles: EntityDTO<RoleEntity>[], type: AccessType) {
    return await this.em.find(AccessEntity, {
      ...(
        roles.some(v => v.code === RoleTypes.SuperAdmin) ?
          {} :
          {
            roles: {
              id: { $in: roles.map(v => v.id) },
            },
          }
      ),
      type,
    }, { populate: ['parent'] });
  }
}

export { AccessService };
