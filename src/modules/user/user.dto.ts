import { IsEmail, IsString, MaxLength } from 'class-validator';

export class CreateUser {
  @IsString({ always: false })
  @MaxLength(50)
  readonly name: string;

  @IsEmail()
  @MaxLength(50)
  readonly email: string;

  @IsString()
  @MaxLength(50)
  readonly password: string;
}
