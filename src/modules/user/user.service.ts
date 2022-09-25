import { Injectable } from '@nestjs/common';
import { UserEntity, AccountEntity, RoleEntity } from '@/entities';
import { CreateSuperAdminByEmail } from './user.dto';
import { EntityManager } from '@mikro-orm/mysql';
import { FilterQuery } from '@mikro-orm/core';
import { AccountType } from '@/modules/account';
import * as bcrypt from 'bcrypt';
import { RoleService, RoleTypes } from '@/modules/role';

@Injectable()
export class UserService {
  constructor(
    private em: EntityManager,
    private roleService: RoleService,
  ) {}
  public async createSuperAdmin(body: CreateSuperAdminByEmail) {
    const { email, password, ...extra } = body;
    const user = new UserEntity(extra);
    const hash = bcrypt.hashSync(password, 10);
    user.accounts.add(
      new AccountEntity({
        type: AccountType.Email,
        identifier: email,
        password: hash,
      }),
    );
    let role = await this.roleService.findOne({ name: RoleTypes.SuperAdmin });
    if (!role) {
      role = new RoleEntity({ name: RoleTypes.SuperAdmin });
    }
    user.roles.add(role);
    return await this.em.persist(user).flush();
  }
  public async findOne(query: FilterQuery<UserEntity>) {
    return await this.em.findOne(UserEntity, query );
  }
}
