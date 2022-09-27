import { Collection, Entity, Enum, ManyToMany, Property } from '@mikro-orm/core';
import { OperationBasicEntity } from '@/orm';
import { Expose } from 'class-transformer';
import { AccessType } from '@/modules/access';
import { RoleEntity } from './role.entity';

@Entity({ tableName: 'accesses' })
class AccessEntity extends OperationBasicEntity<AccessEntity, 'id'>{

  @Expose()
  @Property({ comment: '资源名称' })
  public name!: string;

  @Expose()
  @Enum({ items: () => AccessType, comment: '资源类型' })
  public type = AccessType.Api;

  @Expose()
  @Property({ comment: '资源内容', nullable: true })
  public content: string;

  @Expose()
  @ManyToMany({ entity: () => RoleEntity, comment: '关联角色' })
  public roles = new Collection<RoleEntity>(this);

  constructor(data: Partial<AccessEntity>) {
    super();
    Object.assign(this, data);
  }
}

export { AccessEntity };
