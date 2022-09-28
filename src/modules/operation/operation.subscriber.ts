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
    const userRef = args.em.getFilterParams('userRef') as ({ id: number; } | undefined);
    // https://mikro-orm.io/docs/entity-helper
    const ref = userRef ? args.em.getReference<UserEntity>(UserEntity, userRef.id) : null;
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
    const userRef = args.em.getFilterParams('userRef') as ({ id: number; } | undefined);
    const nem = args.em.fork();
    for (let i = 0; i < changeSets.length; i += 1) {
      const cs = changeSets[i];
      if (cs.entity instanceof OperationBasicEntity) {
        // add a new operation
        const operation = new OperationEntity({
          name: cs.name,
          collection: cs.collection,
          type: cs.type,
          payload: cs.payload,
          entityId: cs.entity.id,
          original: cs.originalEntity,
          user: userRef ? nem.getReference<UserEntity>(UserEntity, userRef.id) : null,
        });
        await nem.persist(operation).flush();
      }
    }
  }
}

export { OperationSubscriber };
