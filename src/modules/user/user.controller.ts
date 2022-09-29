import { BadRequestException, Body, Controller, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserByEmail } from './user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Access, JwtPayload, LoginResponse } from '@/modules/auth';
import { RoleTypes } from '@/modules/role';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { ConfigService } from '@/config';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  @Access(RoleTypes.SuperAdmin)
  @Post('super_admin')
  public async createSuperAdmin(@Body() body: CreateUserByEmail) {
    return await this.userService.createSuperAdmin(body);
  }

  @Post('init')
  public async initSuperAdmin(@Body() body: CreateUserByEmail, @Res({ passthrough: true }) res: Response) {
    const count = await this.userService.count({ roles: { code: RoleTypes.SuperAdmin } });
    if (count > 0) {
      throw new BadRequestException();
    }
    const user = await this.userService.createSuperAdmin(body);
    if (user && user.accounts.length > 0) {
      const account = user.accounts.getItems()[0];
      const payload: JwtPayload = {
        userId: user.id,
        accountId: account.id,
        validation: account.validation,
      };
      const dto = new LoginResponse({ access_token: await this.jwtService.signAsync(payload) });
      res.cookie(this.configService.jwtCookieName, dto.access_token, { httpOnly: true, maxAge: this.configService.jwtExpiresIn });
      return dto;
    }
    throw new BadRequestException();
  }
}
