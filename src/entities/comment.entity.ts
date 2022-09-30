import { Collection, Entity, ManyToOne, OneToMany, Property } from '@mikro-orm/core';
import { OperationBasicEntity } from '@/orm';
import { Expose, Transform, Type } from 'class-transformer';
import { UserEntity } from './user.entity';


@Entity({ tableName: 'comments' })
class CommentEntity extends OperationBasicEntity<CommentEntity, 'id'>{
  @Expose()
  @Property({ length: 128 })
  public content: string;

  @Property({ length: 128, unique: true })
  public belong: string;

  @Expose()
  @Property({ type: 'number', comment: '赞' })
  public like = 0;

  @Expose()
  @Property({ type: 'number', comment: '踩' })
  public dislike = 0;

  @Expose()
  @ManyToOne({ entity: () => UserEntity, comment: '所属用户' })
  public user: UserEntity;

  @ManyToOne({ entity: () => CommentEntity, comment: '父节点', nullable: true })
  public parent?: CommentEntity;

  @Expose()
  @Type(() => CommentEntity)
  @Transform(params => (params.value as Collection<CommentEntity>)?.toArray(), { toPlainOnly: true })
  @OneToMany({ entity: () => CommentEntity, mappedBy: comment => comment.parent, orphanRemoval: true, comment: '子评论' })
  public children = new Collection<CommentEntity>(this);

  constructor(data: Partial<CommentEntity>) {
    super();
    Object.assign(this, data);
  }

}

export { CommentEntity };
