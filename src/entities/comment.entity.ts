import { Collection, Entity, Formula, ManyToMany, ManyToOne, OneToMany, Property } from '@mikro-orm/core';
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

  @ManyToMany({ entity: () => UserEntity, comment: '赞' })
  public like = new Collection<UserEntity>(this);

  @Expose()
  @Formula(alias => `(select count(*) from \`comments_like\` where "comment_entity_id" = ${ alias }.\`id\`)`)
  public like_count: number;

  @ManyToMany({ entity: () => UserEntity, comment: '踩' })
  public dislike = new Collection<UserEntity>(this);

  @Expose()
  @Formula(alias => `(select count(*) from \`comments_dislike\` where "comment_entity_id" = ${ alias }.\`id\`)`)
  public dislike_count: number;

  @Expose()
  @ManyToOne({ entity: () => UserEntity, comment: '所属用户' })
  public user: UserEntity;

  @ManyToOne({ entity: () => CommentEntity, comment: '父节点', nullable: true })
  public parent?: CommentEntity;

  @Expose()
  @Type(() => CommentEntity)
  @Transform(({ value }) => (value as Collection<CommentEntity>)?.toArray(), { toPlainOnly: true })
  @OneToMany({ entity: () => CommentEntity, mappedBy: comment => comment.parent, orphanRemoval: true, comment: '子评论' })
  public children = new Collection<CommentEntity>(this);

  @Expose()
  public get created() {
    return this.createdAt;
  }

  @Expose()
  public get uid() {
    return this.id;
  }

  constructor(data: Partial<CommentEntity>) {
    super();
    Object.assign(this, data);
  }

}

export { CommentEntity };
