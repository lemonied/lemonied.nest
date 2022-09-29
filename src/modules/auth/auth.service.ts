import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountEntity, UserEntity } from '@/entities';
import * as bcrypt from 'bcrypt';
import { setUserId } from '@/shared/utils';
import { ExpiredException } from '@/shared/exceptions';
import { EntityManager } from '@mikro-orm/mysql';
import { JwtPayload } from './jwt.payload';
import { LoginResponse } from './login.dto';

@Injectable()
class AuthService {
  constructor(
    private jwtService: JwtService,
    private em: EntityManager,
  ) {}

  // LocalStrategy
  public async validateUser(identifier: string, password: string): Promise<JwtPayload> {
    const account = await this.em.findOne(AccountEntity, { identifier, locked: false, user: { locked: false } }, { populate: ['user'] });
    if (account && bcrypt.compareSync(password, account.password)) {
      return {
        userId: account.user.id,
        accountId: account.id,
        validation: account.validation,
      };
    }
    throw new UnauthorizedException();
  }

  // JwtStrategy
  public async validateJwt(payload: JwtPayload) {
    const user = await this.em.findOne(UserEntity, { id: payload.userId, locked: false }, {
      populate: ['roles', 'accounts'],
      populateWhere: {
        roles: { available: true },
        accounts: { id: payload.accountId, locked: false },
      },
    });
    if (!user || !user.accounts.length) {
      throw new UnauthorizedException();
    }
    const account = user.accounts.getItems()[0];
    if (account.validation === payload.validation) {
      setUserId(user.id);
      return user;
    }
    throw new ExpiredException();
  }

  public async login(payload: JwtPayload) {
    return new LoginResponse({
      access_token: this.jwtService.sign(payload),
    });
  }
}

export { AuthService };
