import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AccountEntity } from './account.entity';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';

@Module({
  imports: [
    MikroOrmModule.forFeature([AccountEntity]),
  ],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService],
})
class AccountModule {}

export { AccountModule };
