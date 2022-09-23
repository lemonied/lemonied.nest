import { Injectable } from '@nestjs/common';
import { EntityManager, FilterQuery } from '@mikro-orm/core';
import { AccountEntity } from './account.entity';

@Injectable()
class AccountService {
  constructor(
    private readonly em: EntityManager,
  ) {}

  public async findOne(query: FilterQuery<AccountEntity>) {
    return await this.em.findOne(AccountEntity, query);
  }

}

export { AccountService };
