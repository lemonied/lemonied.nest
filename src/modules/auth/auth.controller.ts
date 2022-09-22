import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { Roles, User } from './auth.decorator';
import { UserEntity } from '@/modules/user';
import { LoginInput } from './login.dto';
import { LocalGuard } from './local.guard';
import { UserRoles } from '@/modules/user/user.roles';

@ApiTags('Auth')
@Controller('auth')
class AuthController {

  constructor(
    private authService: AuthService,
  ) {}

  @Post('login')
  @ApiBody({ type: LoginInput })
  @UseGuards(LocalGuard)
  async login(@User() user: UserEntity, @Res({ passthrough: true }) res: Response) {
    const payload = await this.authService.login(user);
    res.cookie('jwt_token', payload.access_token, { httpOnly: true });
    return payload;
  }

  @Get('test_role')
  @Roles(UserRoles.Admin)
  async testRole() {
    return 'success';
  }
}

export { AuthController };
