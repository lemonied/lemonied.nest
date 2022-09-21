import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUser } from './user.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Get('/test')
  public test() {
    throw new Error('测试');
  }

  @Post()
  public async create(@Body() body: CreateUser) {
    return await this.userService.create(body);
  }
}
