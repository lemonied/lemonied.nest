import { Collection, Entity, ManyToMany, OneToMany, Property } from '@mikro-orm/core';
import { BasicEntity } from '@/shared/orm';
import { Expose } from 'class-transformer';
import { AccountEntity } from '@/modules/account';
import { RoleEntity } from '@/modules/role';

// https://mikro-orm.io/docs/decorators
@Entity({ tableName: 'users' })
export class UserEntity extends BasicEntity<UserEntity, 'id'> {
  @Expose()
  @Property({ length: 64, nullable: true, comment: '用户昵称' })
  public nick?: string;

  @OneToMany({ entity: () => AccountEntity, mappedBy: account => account.user, orphanRemoval: true, comment: '所属账户' })
  public accounts = new Collection<AccountEntity>(this);

  @Expose()
  @Property({ comment: '用户是否锁定' })
  public locked = false;

  @Expose()
  @ManyToMany({ entity: () => RoleEntity, mappedBy: role => role.users, comment: '角色' })
  public roles = new Collection<RoleEntity>(this);

  constructor(data: Partial<UserEntity>) {
    super();
    Object.assign(this, data);
  }

}
