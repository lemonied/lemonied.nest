import { AccountType } from '@/modules/account';
import { RoleTypes } from '@/modules/role';

export interface JwtPayload {
  type: AccountType;
  id: number;
  identifier: string;
  nick: string;
  roles: RoleTypes[];
}
