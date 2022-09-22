import { Entity, Enum, Property } from '@mikro-orm/core';
import { BasicEntity } from '@/shared/helpers';
import { Exclude } from 'class-transformer';
import { UserRoles } from './user.roles';

// https://mikro-orm.io/docs/decorators
@Entity({ tableName: 'users' })
export class UserEntity extends BasicEntity<UserEntity, 'id'> {
  @Property({ length: 50, nullable: true })
  public name?: string;

  @Property({ length: 50, unique: true })
  public email!: string;

  @Exclude()
  @Property({ length: 50 })
  public password: string;

  @Enum(() => UserRoles)
  public role = UserRoles.General;

  constructor(data: Partial<UserEntity>) {
    super();
    Object.assign(this, data);
  }

}
