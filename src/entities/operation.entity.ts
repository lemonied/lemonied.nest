import { ChangeSetType, Entity, Enum, JsonType, ManyToOne, Property } from '@mikro-orm/core';
import { BasicEntity } from '@/orm';
import { UserEntity } from './user.entity';

@Entity({ tableName: 'operations' })
class OperationEntity extends BasicEntity<OperationEntity, 'id'> {
  @Property({ length: 32, comment: '实体名称' })
  public name!: string;

  @Property({ length: 32, comment: '表名称' })
  public collection!: string;

  @Enum({ items: () => ChangeSetType, comment: '操作类型' })
  public type!: ChangeSetType;

  @ManyToOne({ entity: () => UserEntity, nullable: true })
  public user?: UserEntity;

  @Property({ comment: '实体ID', nullable: true })
  public entityId?: number;

  @Property({ type: JsonType, nullable: true, comment: '变更内容' })
  public payload?: any;

  @Property({ type: JsonType, nullable: true, comment: '原始数据' })
  public original?: any;

  constructor(data: Partial<OperationEntity>) {
    super();
    Object.assign(this, data);
  }
}

export { OperationEntity };
