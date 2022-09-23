import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateUser {
  @IsOptional()
  @IsString()
  @MaxLength(16)
  readonly nick: string;
}

export class CreateUserByEmail extends CreateUser{
  @IsEmail()
  readonly email: string;

  @IsString()
  @MaxLength(32)
  readonly password: string;
}

export class CreateSuperAdminByEmail extends CreateUserByEmail {

}
