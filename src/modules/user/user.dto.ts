import { IsEmail, IsOptional, IsString, Length, Matches, MaxLength } from 'class-validator';

export class CreateUser {
  @IsOptional()
  @IsString()
  @MaxLength(16)
  public nick: string;

  @IsString()
  @MaxLength(32)
  public password: string;
}

export class CreateUserByEmail extends CreateUser {
  @IsEmail()
  public identifier: string;
}

export class CreateUserByUsername extends CreateUser {
  @IsString()
  @Matches(/^[a-z][a-z\d]+$/)
  @Length(6, 16)
  public identifier: string;
}

