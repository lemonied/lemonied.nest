import { IsEmail, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class LoginResponse {
  @Expose()
  readonly access_token!: string;
  constructor(data: LoginResponse) {
    Object.assign(this, data);
  }
}

class LoginInput {
  @IsString()
  readonly password: string;
}

class LoginByEmail extends LoginInput {
  @IsEmail()
  readonly identifier: string;
}

export { LoginByEmail };
