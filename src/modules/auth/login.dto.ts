import { IsEmail, IsString } from 'class-validator';

class LoginInput {
  @IsString()
  readonly password: string;
}

class LoginByEmail extends LoginInput {
  @IsEmail()
  readonly email: string;
}

export { LoginByEmail };
