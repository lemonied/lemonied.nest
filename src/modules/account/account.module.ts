import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';

@Module({
  imports: [],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService],
})
class AccountModule {}

export { AccountModule };
