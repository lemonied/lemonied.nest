import { Collection, Entity, ManyToMany, Property } from '@mikro-orm/core';
import { BasicEntity } from '@/shared/orm';
import { Expose } from 'class-transformer';
import { UserEntity } from '@/modules/user';
import { PermissionEntity } from '@/modules/permission';

@Entity({ tableName: 'roles' })
class RoleEntity extends BasicEntity<RoleEntity, 'id'>{
  @Property({ length: 32, comment: '角色名', unique: true })
  @Expose()
  public name!: string;

  @Property({ comment: '是否可用' })
  @Expose()
  public available = true;

  @Expose()
  @ManyToMany({ entity: () => UserEntity, comment: '关联用户' })
  public users = new Collection<UserEntity>(this);

  @Expose()
  @ManyToMany({ entity: () => PermissionEntity, mappedBy: permission => permission.roles, comment: '拥有的权限' })
  public permissions = new Collection<PermissionEntity>(this);

  constructor(data: Partial<RoleEntity>) {
    super();
    Object.assign(this, data);
  }
}

export { RoleEntity };
