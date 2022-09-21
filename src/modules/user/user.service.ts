import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { CreateUser } from './user.dto';
import { EntityManager } from '@mikro-orm/mysql';

@Injectable()
export class UserService {
  constructor(
    private em: EntityManager,
  ) {}
  public async create(body: CreateUser) {
    return await this.em.persist(new UserEntity(body)).flush();
  }
}
