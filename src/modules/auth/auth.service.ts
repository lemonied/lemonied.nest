import { Injectable } from '@nestjs/common';
import { UserService, UserEntity } from '@/modules/user';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt.payload';

@Injectable()
class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  public async validateUser(email: string, password: string) {
    const user = await this.userService.findOne({ email });
    if (user && user.password === password) {
      return user;
    }
    return null;
  }
  public async login(user: UserEntity) {
    const payload: JwtPayload = { email: user.email, id: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }
}

export { AuthService };
