import { Collection, Entity, Enum, ManyToMany, ManyToOne, OneToMany, Property } from '@mikro-orm/core';
import { OperationBasicEntity } from '@/orm';
import { Expose, Transform } from 'class-transformer';
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
  @Property({ length: 32, comment: '副类型', nullable: true })
  public subtype?: string;

  @Expose()
  @Property({ length: 64, comment: '描述', nullable: true })
  public description?: string;

  @Expose()
  @Property({ comment: '资源内容', nullable: true })
  public value?: string;

  @ManyToMany({ entity: () => RoleEntity, comment: '关联角色' })
  public roles = new Collection<RoleEntity>(this);

  @Expose()
  @Transform(({ value }) => (value as AccessEntity)?.id, { toPlainOnly: true })
  @ManyToOne({ entity: () => AccessEntity, nullable: true, comment: '父节点' })
  public parent?: AccessEntity;

  @Expose()
  @OneToMany({ entity: () => AccessEntity, mappedBy: access => access.parent, orphanRemoval: true, comment: '子节点' })
  public children = new Collection<AccessEntity>(this);

  constructor(data: Partial<AccessEntity>) {
    super();
    Object.assign(this, data);
  }
}

export { AccessEntity };
