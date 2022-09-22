import { IsString } from 'class-validator';

class LoginInput {
  @IsString()
  readonly email: string;

  @IsString()
  readonly password: string;
}

export { LoginInput };
