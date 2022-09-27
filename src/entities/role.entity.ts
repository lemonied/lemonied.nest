import { Collection, Entity, ManyToMany, Property } from '@mikro-orm/core';
import { OperationBasicEntity } from '@/orm';
import { Expose } from 'class-transformer';
import { UserEntity } from './user.entity';
import { AccessEntity } from './access.entity';

@Entity({ tableName: 'roles' })
class RoleEntity extends OperationBasicEntity<RoleEntity, 'id'>{
  @Property({ length: 64, comment: '角色名称', nullable: true })
  @Expose()
  public name?: string;

  @Property({ length: 128, comment: '角色描述', nullable: true })
  @Expose()
  public description?: string;

  @Property({ length: 32, comment: '角色标识', unique: true })
  @Expose()
  public code!: string;

  @Property({ comment: '是否可用', type: 'boolean' })
  @Expose()
  public available = true;

  @Expose()
  @ManyToMany({ entity: () => UserEntity, comment: '关联用户' })
  public users = new Collection<UserEntity>(this);

  @Expose()
  @ManyToMany({ entity: () => AccessEntity, mappedBy: access => access.roles, comment: '拥有的权限' })
  public accesses = new Collection<AccessEntity>(this);

  constructor(data: Partial<RoleEntity>) {
    super();
    Object.assign(this, data);
  }
}

export { RoleEntity };
