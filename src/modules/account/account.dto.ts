import { IsEnum, IsString } from 'class-validator';
import { AccountType } from './account.type';

export class CreateAccount {
  @IsString()
  readonly identifier: string;

  @IsEnum(AccountType)
  readonly type: AccountType;

  @IsString()
  readonly password: string;

}
