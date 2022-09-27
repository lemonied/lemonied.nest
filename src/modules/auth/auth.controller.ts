import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { User } from './auth.decorator';
import { LoginByEmail } from './login.dto';
import { LocalGuard } from './local.guard';
import { JwtPayload } from './jwt.payload';

@ApiTags('Auth')
@Controller('auth')
class AuthController {

  constructor(
    private authService: AuthService,
  ) {}

  @Post('login')
  @ApiBody({ type: LoginByEmail })
  @UseGuards(LocalGuard)
  async login(@User() payload: JwtPayload, @Res({ passthrough: true }) res: Response) {
    const dto = await this.authService.login(payload);
    res.cookie('jwt_token', dto.access_token, { httpOnly: true });
    return dto;
  }
}

export { AuthController };
