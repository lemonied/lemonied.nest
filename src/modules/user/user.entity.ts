import { Entity, Property } from '@mikro-orm/core';
import { BasicEntity } from '@/common/entity';
import { Exclude } from 'class-transformer';

@Entity()
export class UserEntity extends BasicEntity {
  @Property({ length: 50, nullable: true })
  public name?: string;

  @Property({ length: 50, unique: true })
  public email!: string;

  @Exclude()
  @Property()
  public password: string;

  constructor(data: Partial<UserEntity>) {
    super();
    Object.assign(this, data);
  }

}
