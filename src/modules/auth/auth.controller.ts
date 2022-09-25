import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { User } from './auth.decorator';
import { LoginByEmail } from './login.dto';
import { LocalGuard } from './local.guard';
import { AccountEntity } from '@/entities';

@ApiTags('Auth')
@Controller('auth')
class AuthController {

  constructor(
    private authService: AuthService,
  ) {}

  @Post('login')
  @ApiBody({ type: LoginByEmail })
  @UseGuards(LocalGuard)
  async login(@User() account: AccountEntity, @Res({ passthrough: true }) res: Response) {
    const payload = await this.authService.login(account);
    res.cookie('jwt_token', payload.access_token, { httpOnly: true });
    return payload;
  }
}

export { AuthController };
