import { Collection, Entity, Enum, ManyToMany, Property } from '@mikro-orm/core';
import { BasicEntity } from '@/shared/orm';
import { Expose } from 'class-transformer';
import { PermissionType } from './permission.type';
import { RoleEntity } from '@/modules/role';

@Entity({ tableName: 'permissions' })
class PermissionEntity extends BasicEntity<PermissionEntity, 'id'>{

  @Expose()
  @Property({ comment: '资源名称' })
  public name!: string;

  @Expose()
  @Enum({ items: () => PermissionType, comment: '资源类型' })
  public type = PermissionType.Api;

  @Expose()
  @Property({ comment: '资源内容', nullable: true })
  public content: string;

  @Expose()
  @ManyToMany({ entity: () => RoleEntity, comment: '关联角色' })
  public roles = new Collection<RoleEntity>(this);

  constructor(data: Partial<PermissionEntity>) {
    super();
    Object.assign(this, data);
  }
}

export { PermissionEntity };
