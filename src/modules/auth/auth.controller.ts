import { Controller, Get, Post, Res, SerializeOptions, UseGuards } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { User } from './auth.decorator';
import { LoginByEmail, LoginResponse } from './login.dto';
import { LocalGuard } from './local.guard';
import { JwtPayload } from './jwt.payload';
import { JwtGuard } from '@/modules/auth/jwt.guard';
import { UserEntity } from '@/entities';
import { ConfigService } from '@/config';

@ApiTags('Auth')
@Controller('auth')
class AuthController {

  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Post('login')
  @ApiBody({ type: LoginByEmail })
  @ApiResponse({ type: LoginResponse })
  @UseGuards(LocalGuard)
  async login(@User() payload: JwtPayload, @Res({ passthrough: true }) res: Response) {
    const dto = await this.authService.login(payload);
    res.cookie(this.configService.jwtCookieName, dto.access_token, { httpOnly: true, maxAge: this.configService.jwtExpiresIn });
    return dto;
  }

  @Get('logout')
  @UseGuards(JwtGuard)
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie(this.configService.jwtCookieName);
  }

  @SerializeOptions({ groups: ['self'] })
  @Get('profile')
  @UseGuards(JwtGuard)
  async profile(@User() user: UserEntity) {
    return user;
  }

}

export { AuthController };
