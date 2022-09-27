import { ManyToOne } from '@mikro-orm/core';
import { BasicEntity } from './basic-entity';
import type { UserEntity } from '@/entities';

class OperationBasicEntity<T extends object, PK extends keyof T, P extends string = never> extends BasicEntity<T, PK, P> {
  @ManyToOne({ entity: 'UserEntity', comment: '创建人', nullable: true })
  public createdBy?: UserEntity;

  @ManyToOne({ entity: 'UserEntity', comment: '更新人', nullable: true })
  public updatedBy?: UserEntity;
}

export { OperationBasicEntity };
