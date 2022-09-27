import { Injectable } from '@nestjs/common';
import { EntityManager, FilterQuery } from '@mikro-orm/core';
import { AccountEntity } from '@/entities';

@Injectable()
class AccountService {
  constructor(
    private readonly em: EntityManager,
  ) {}

  public async findOne(query: FilterQuery<AccountEntity>) {
    return await this.em.findOne(AccountEntity, query, { populate: ['user'] });
  }

  public async updateOne(query: FilterQuery<AccountEntity>, data: Partial<AccountEntity>) {
    const item = await this.em.findOne(AccountEntity, query);
    if (item) {
      item.assign(data);
      return await this.em.persist(item).flush();
    }
    return null;
  }

}

export { AccountService };
