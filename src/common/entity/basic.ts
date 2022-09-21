import { PrimaryKey, Property } from '@mikro-orm/core';

export class BasicEntity {
  @PrimaryKey()
  public id!: number;

  @Property()
  public createdAt: Date = new Date();

  @Property({
    onUpdate: () => new Date(),
  })
  public updatedAt: Date = new Date();
}
