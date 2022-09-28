import { Injectable } from '@nestjs/common';
import { UserEntity, AccountEntity, RoleEntity } from '@/entities';
import { CreateUserByEmail } from './user.dto';
import { EntityManager } from '@mikro-orm/mysql';
import { FilterQuery } from '@mikro-orm/core';
import { AccountType } from '@/modules/account';
import * as bcrypt from 'bcrypt';
import { RoleTypes } from '@/modules/role';

@Injectable()
export class UserService {
  constructor(
    private em: EntityManager,
  ) {}
  public async createSuperAdmin(body: CreateUserByEmail) {
    const { identifier, password, ...extra } = body;
    return await this.em.transactional(async (em) => {
      const user = new UserEntity(extra);
      const hash = bcrypt.hashSync(password, 10);
      user.accounts.add(
        new AccountEntity({
          type: AccountType.Email,
          identifier: identifier,
          password: hash,
        }),
      );
      const role = await em.findOne(RoleEntity, { code: RoleTypes.SuperAdmin });
      if (role) {
        user.roles.add(role.toReference());
      } else {
        user.roles.add(new RoleEntity({ code: RoleTypes.SuperAdmin }));
      }
      await em.persist(user).flush();
    });
  }
  public async findOne(query: FilterQuery<UserEntity>) {
    return await this.em.findOne(UserEntity, query, { populate: ['roles'] });
  }
  public async count(query?: FilterQuery<UserEntity>) {
    return await this.em.count(UserEntity, query);
  }
}
