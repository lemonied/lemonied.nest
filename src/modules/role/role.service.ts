import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/mysql';
import { CreateRole } from './role.dto';
import { RoleEntity } from '@/entities';
import { FilterQuery } from '@mikro-orm/core';

@Injectable()
class RoleService {
  constructor(
    private readonly em: EntityManager,
  ) {}
  public async create(data: CreateRole) {
    return await this.em.persist(new RoleEntity(data)).flush();
  }
  public async findOne(query: FilterQuery<RoleEntity>) {
    return await this.em.findOne(RoleEntity, query);
  }
}

export { RoleService };
