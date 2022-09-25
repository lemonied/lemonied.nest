import { Entity, Enum, ManyToOne, Property } from '@mikro-orm/core';
import { BasicEntity } from '@/shared/orm';
import { Expose } from 'class-transformer';
import { AccountType } from '@/modules/account';
import { UserEntity } from './user.entity';

@Entity({ tableName: 'accounts' })
class AccountEntity extends BasicEntity<AccountEntity, 'id'>{
  @Expose()
  @Property({ unique: true, comment: '账户名', length: 64 })
  public identifier!: string;

  @Property({ comment: '密码', length: 128 })
  public password!: string;

  @Expose()
  @Enum({ items: () => AccountType, comment: '账户类型' })
  public type = AccountType.Username;

  @Expose()
  @ManyToOne({ entity: () => UserEntity, comment: '关联用户' })
  public user!: UserEntity;

  @Expose()
  @Property({ comment: '是否锁定' })
  public locked = false;

  constructor(data: Partial<AccountEntity>) {
    super();
    Object.assign(this, data);
  }
}

export { AccountEntity };
