import { IsEmail } from 'class-validator';

export class CreateUser {
  readonly name: string;
  @IsEmail()
  readonly email: string;
  readonly password: string;
}
