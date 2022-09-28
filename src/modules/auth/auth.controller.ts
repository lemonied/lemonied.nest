import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { User } from './auth.decorator';
import { LoginByEmail, LoginResponse } from './login.dto';
import { LocalGuard } from './local.guard';
import { JwtPayload } from './jwt.payload';
import { JwtGuard } from '@/modules/auth/jwt.guard';
import { UserEntity } from '@/entities';

@ApiTags('Auth')
@Controller('auth')
class AuthController {

  constructor(
    private authService: AuthService,
  ) {}

  @Post('login')
  @ApiBody({ type: LoginByEmail })
  @ApiResponse({ type: LoginResponse })
  @UseGuards(LocalGuard)
  async login(@User() payload: JwtPayload, @Res({ passthrough: true }) res: Response) {
    const dto = await this.authService.login(payload);
    res.cookie('jwt_token', dto.access_token, { httpOnly: true });
    return dto;
  }

  @Get('profile')
  @UseGuards(JwtGuard)
  async profile(@User() user: UserEntity) {
    return user;
  }

}

export { AuthController };
