import {
  ChangeSetType,
  EventSubscriber,
  FlushEventArgs,
  Subscriber,
} from '@mikro-orm/core';
import { OperationBasicEntity } from '@/orm';
import { OperationEntity, UserEntity } from '@/entities';
import { getUserId } from '@/shared/utils';

@Subscriber()
class OperationSubscriber implements EventSubscriber {
  // https://mikro-orm.io/docs/events#using-onflush-event
  async onFlush(args: FlushEventArgs) {
    const changeSets = args.uow.getChangeSets().filter(v => v.entity instanceof OperationBasicEntity);
    if (!changeSets.length) return;
    const userId = getUserId();
    // https://mikro-orm.io/docs/entity-helper
    const ref = userId ? args.em.getReference<UserEntity>(UserEntity, userId) : null;
    for (const cs of changeSets) {
      if (cs.type === ChangeSetType.CREATE) {
        cs.entity.createdBy = ref;
      } else if (cs.type === ChangeSetType.UPDATE) {
        cs.entity.updatedBy = ref;
      }
      args.uow.computeChangeSet(cs.entity);
      args.uow.recomputeSingleChangeSet(cs.entity);
    }
  }
  async afterFlush(args: FlushEventArgs) {
    const changeSets = args.uow.getChangeSets().filter(v => v.entity instanceof OperationBasicEntity);
    if (!changeSets.length) return;
    const nem = args.em.fork();
    const userId = getUserId();
    for (const cs of changeSets) {
      // add a new operation
      const operation = new OperationEntity({
        name: cs.name,
        collection: cs.collection,
        type: cs.type,
        payload: cs.payload,
        entityId: cs.entity.id,
        original: cs.originalEntity,
        user: userId ? nem.getReference<UserEntity>(UserEntity, userId) : null,
      });
      await nem.persist(operation).flush();
    }
  }
}

export { OperationSubscriber };
