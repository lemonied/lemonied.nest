import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query, SerializeOptions, UseGuards } from '@nestjs/common';
import { JwtGuard, User } from '@/modules/auth';
import { UserEntity } from '@/entities';
import { AccessService } from './access.service';
import { AccessListParams } from '@/modules/access/access.dto';

@ApiTags('Access')
@Controller('access')
class AccessController {

  constructor(
    private accessService: AccessService,
  ) {}

  @Get('list')
  @UseGuards(JwtGuard)
  @SerializeOptions({ groups: ['id'] })
  public async getMenus(@User() user: UserEntity, @Query() query: AccessListParams) {
    return await this.accessService.getList(user.roles.toArray(), query.type);
  }
}

export { AccessController };
