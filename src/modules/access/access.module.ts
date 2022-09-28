import { Module } from '@nestjs/common';
import { AccessController } from './access.controller';
import { AccessService } from './access.service';

@Module({
  imports: [],
  controllers: [AccessController],
  providers: [AccessService],
})
class AccessModule {}

export { AccessModule };
