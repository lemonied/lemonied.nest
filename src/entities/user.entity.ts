import { Collection, Entity, ManyToMany, OneToMany, Property } from '@mikro-orm/core';
import { OperationBasicEntity } from '@/orm';
import { Expose, Transform, Type } from 'class-transformer';
import { AccountEntity } from './account.entity';
import { RoleEntity } from './role.entity';
import { ApiProperty } from '@nestjs/swagger';
import { CommentEntity } from './comment.entity';

// https://mikro-orm.io/docs/decorators
@Entity({ tableName: 'users' })
export class UserEntity extends OperationBasicEntity<UserEntity, 'id'> {
  @Expose()
  @Property({ length: 64, nullable: true, comment: '用户昵称' })
  public nick?: string;

  @Expose()
  @Property({ length: 128, nullable: true, comment: '用户头像' })
  public avatar?: string;

  @OneToMany({ entity: () => AccountEntity, mappedBy: account => account.user, orphanRemoval: true, comment: '所属账户' })
  public accounts = new Collection<AccountEntity>(this);

  @OneToMany({ entity: () => CommentEntity, mappedBy: comment => comment.user, orphanRemoval: true, comment: '评论' })
  public comments = new Collection<CommentEntity>(this);

  @ApiProperty({ type: 'boolean' })
  @Property({ comment: '用户是否锁定', type: 'boolean' })
  public locked = false;

  @Expose()
  @Type(() => RoleEntity)
  @Transform(params => (params.value as Collection<RoleEntity>)?.toArray(), { toPlainOnly: true })
  @ManyToMany({ entity: () => RoleEntity, mappedBy: role => role.users, comment: '角色' })
  public roles = new Collection<RoleEntity>(this);

  constructor(data: Partial<UserEntity>) {
    super();
    Object.assign(this, data);
  }

}
