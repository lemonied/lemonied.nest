import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ConfigService } from '@/config';
import { JwtPayload } from './jwt.payload';
import { UserService } from '@/modules/user';

@Injectable()
class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private config: ConfigService,
    private userService: UserService,
  ) {
    super({
      secretOrKey: config.jwtToken,
      jwtFromRequest: (req: Request) => {
        const fromHeader = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
        const fromQuery = req.query.jwt_token;
        const fromCookie = req.cookies.jwt_token;
        return fromHeader ?? fromQuery ?? fromCookie;
      },
      ignoreExpiration: false,
    });
  }
  public async validate(payload: JwtPayload) {
    const user = await this.userService.findOne({ id: payload.id });
    if (user) {
      return user;
    }
    throw new UnauthorizedException();
  }
}

export { JwtStrategy };
