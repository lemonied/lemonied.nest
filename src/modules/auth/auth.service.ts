import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt.payload';
import { AccountEntity, AccountService } from '@/modules/account';
import * as bcrypt from 'bcrypt';
import { RoleTypes } from '@/modules/role';

@Injectable()
class AuthService {
  constructor(
    private accountService: AccountService,
    private jwtService: JwtService,
  ) {}
  public async validateUser(identifier: string, password: string) {
    const account = await this.accountService.findOne({ identifier });
    if (account && bcrypt.compareSync(password, account.password)) {
      return account;
    }
    return null;
  }
  public async login(account: AccountEntity) {
    const payload: JwtPayload = {
      type: account.type,
      id: account.id,
      identifier: account.identifier,
      nick: account.user.nick,
      roles: account.user.roles.toJSON().map(v => v.name) as RoleTypes[],
    };
    return { access_token: this.jwtService.sign(payload) };
  }
}

export { AuthService };
