import { PrimaryKey, Property, BaseEntity } from '@mikro-orm/core';
import { Expose } from 'class-transformer';

export class BasicEntity<T extends object, PK extends keyof T, P extends string = never> extends BaseEntity<T, PK, P> {
  @PrimaryKey()
  @Expose({ groups: ['id'] })
  public id!: number;

  @Property()
  public createdAt: Date = new Date();

  @Property({
    onUpdate: () => new Date(),
  })
  public updatedAt: Date = new Date();
}
