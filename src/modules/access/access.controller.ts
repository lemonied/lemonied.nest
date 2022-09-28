import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, SerializeOptions, UseGuards } from '@nestjs/common';
import { JwtGuard, User } from '@/modules/auth';
import { UserEntity } from '@/entities';
import { AccessService } from './access.service';

@ApiTags('Access')
@Controller('access')
class AccessController {

  constructor(
    private accessService: AccessService,
  ) {}

  @Get('menus')
  @UseGuards(JwtGuard)
  @SerializeOptions({ groups: ['id'] })
  public async getMenus(@User() user: UserEntity) {
    return await this.accessService.getMenusByRoles(user.roles.toArray());
  }
}

export { AccessController };
