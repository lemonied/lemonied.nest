import { PrimaryKey, Property, BaseEntity } from '@mikro-orm/core';

export class BasicEntity<T extends object, PK extends keyof T, P extends string = never> extends BaseEntity<T, PK, P> {
  @PrimaryKey()
  public id!: number;

  @Property()
  public createdAt: Date = new Date();

  @Property({
    onUpdate: () => new Date(),
  })
  public updatedAt: Date = new Date();
}
