import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';

@Module({
  controllers: [CommentController],
  providers: [CommentService],
})
class CommentModule {}

export { CommentModule };
