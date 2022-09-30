import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/mysql';
import { CommentEntity, UserEntity } from '@/entities';

@Injectable()
class CommentService {
  constructor(
    private em: EntityManager,
  ) {}
  public async create(data: Partial<CommentEntity>, user: UserEntity) {
    const comment = new CommentEntity(data);
    comment.user = this.em.getReference(UserEntity, user.id);
    await this.em.persist(comment).flush();
    return comment;
  }
  public async getList(data: Partial<CommentEntity>, limit?: number, offset?: number) {
    return await this.em.findAndCount(CommentEntity, data, {
      limit, offset, populate: ['user'],
    });
  }
}

export { CommentService };
