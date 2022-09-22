import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { CreateUser } from './user.dto';
import { EntityManager } from '@mikro-orm/mysql';
import { FilterQuery } from '@mikro-orm/core';

@Injectable()
export class UserService {
  constructor(
    private em: EntityManager,
  ) {}
  public async create(body: CreateUser) {
    return await this.em.persist(new UserEntity(body)).flush();
  }
  public async findOne(query: FilterQuery<UserEntity>) {
    return await this.em.findOne(UserEntity, query );
  }
}
