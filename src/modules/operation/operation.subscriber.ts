import {
  ChangeSetType,
  EventSubscriber,
  FlushEventArgs,
  Subscriber,
} from '@mikro-orm/core';
import { OperationBasicEntity } from '@/orm';
import { OperationEntity, UserEntity } from '@/entities';

@Subscriber()
class OperationSubscriber implements EventSubscriber {

  // https://mikro-orm.io/docs/events#using-onflush-event
  async onFlush(args: FlushEventArgs) {
    const changeSets = args.uow.getChangeSets();
    const user = args.em.getFilterParams('user') as (UserEntity | undefined);
    // https://mikro-orm.io/docs/entity-helper
    const ref = user ? args.em.getReference<UserEntity>(UserEntity, user.id) : null;
    for (let i = 0; i < changeSets.length; i += 1) {
      const cs = changeSets[i];
      if (cs.entity instanceof OperationBasicEntity) {
        if (cs.type === ChangeSetType.CREATE) {
          cs.entity.createdBy = ref;
        } else if (cs.type === ChangeSetType.UPDATE) {
          cs.entity.updatedBy = ref;
        }
        args.uow.computeChangeSet(cs.entity);
        args.uow.recomputeSingleChangeSet(cs.entity);
      }
    }
  }
  async afterFlush(args: FlushEventArgs) {
    const changeSets = args.uow.getChangeSets();
    const user = args.em.getFilterParams('user') as (UserEntity | undefined);
    for (let i = 0; i < changeSets.length; i += 1) {
      const cs = changeSets[i];
      if (cs.entity instanceof OperationBasicEntity) {
        // add a new operation
        const nem = args.em.fork();
        const operation = new OperationEntity({
          name: cs.name,
          collection: cs.collection,
          type: cs.type,
          payload: cs.payload,
          entityId: cs.entity.id,
          original: cs.originalEntity,
          user: user ? nem.getReference<UserEntity>(UserEntity, user.id) : null,
        });
        await nem.persist(operation).flush();
      }
    }
  }
}

export { OperationSubscriber };
