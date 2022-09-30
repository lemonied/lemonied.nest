import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard, User } from '@/modules/auth';
import { CommentService } from './comment.service';
import { CreateCommentDTO, GetCommentDTO, ResponseCommentDTO } from './comment.dto';
import { UserEntity } from '@/entities';

@ApiTags('Comment')
@Controller('comment')
class CommentController {

  constructor(
    private commentService: CommentService,
  ) {}

  @Post('create')
  @UseGuards(JwtGuard)
  public async create(@Body() data: CreateCommentDTO, @User() user: UserEntity) {
    return await this.commentService.create(data, user);
  }

  @Get('list')
  public async list(@Query() query: GetCommentDTO) {
    const { limit, offset, ...extra } = query;
    const [data, total] = await this.commentService.getList(extra, limit, offset);
    return new ResponseCommentDTO({ data, total, limit, offset });
  }
}

export { CommentController };
