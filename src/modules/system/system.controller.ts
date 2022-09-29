import { ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import { SystemService } from './system.service';

@ApiTags('System')
@Controller('system')
class SystemController {

  constructor(
    private systemService: SystemService,
  ) {}

  @Get('info')
  public async info() {
    return await this.systemService.getInfo();
  }
}

export { SystemController };
