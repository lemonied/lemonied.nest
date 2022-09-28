import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { Request } from 'express';

@Injectable()
class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(
    private authService: AuthService,
  ) {
    super({
      usernameField: 'identifier',
      passwordField: 'password',
      passReqToCallback: true,
    });
  }

  public async validate(req: Request, identifier: string, password: string) {
    return await this.authService.validateUser(identifier, password);
  }
}

export { LocalStrategy };
