import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateSuperAdminByEmail } from './user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Post('create')
  public async create(@Body() body: CreateSuperAdminByEmail) {
    return await this.userService.createSuperAdmin(body);
  }
}
