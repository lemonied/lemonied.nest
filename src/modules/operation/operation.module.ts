import { Module } from '@nestjs/common';
import { OperationSubscriber } from './operation.subscriber';

@Module({
  providers: [OperationSubscriber],
})
class OperationModule {}

export { OperationModule };
