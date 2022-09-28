import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserByEmail } from './user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Access } from '@/modules/auth';
import { RoleTypes } from '@/modules/role';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Access(RoleTypes.SuperAdmin)
  @Post('create-super-admin')
  public async createSuperAdmin(@Body() body: CreateUserByEmail) {
    return await this.userService.createSuperAdmin(body);
  }

  @Post('init-super-admin')
  public async initSuperAdmin(@Body() body: CreateUserByEmail) {
    const count = await this.userService.count({ roles: { code: RoleTypes.SuperAdmin } });
    if (count > 0) {
      throw new BadRequestException();
    }
    return await this.userService.createSuperAdmin(body);
  }
}
