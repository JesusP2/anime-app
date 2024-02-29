import { eq, and } from 'drizzle-orm';
import { db } from '../pool';
import type { entityStatus } from '../../utils';
import { anime, manga, trackedEntity, entityActionsTracker } from '../schema';
import { randomUUID } from 'crypto';

export async function getUserEntities(
  userId: string,
  entityType: 'ANIME' | 'MANGA',
  status: (typeof entityStatus)[number],
) {
  const entitiesTable = entityType === 'ANIME' ? anime : manga;
  return db
    .select()
    .from(trackedEntity)
    .where(
      and(
        eq(trackedEntity.userId, userId),
        eq(trackedEntity.entityType, entityType),
        eq(trackedEntity.entityStatus, status),
      ),
    )
    .leftJoin(entitiesTable, eq(trackedEntity.malId, entitiesTable.mal_id));
}

export async function setUserEntity({
  payload,
  isUserTrackingEntity,
  entityFetched,
  userId,
  isEntityStoredInDb,
}: {
  payload: any;
  isUserTrackingEntity: boolean;
  entityFetched: any;
  userId: string;
  isEntityStoredInDb: boolean;
}) {
  await db.transaction(async (tx) => {
    const trackedEntityId = randomUUID();
    if (!isUserTrackingEntity) {
      await tx.insert(trackedEntity).values({
        id: trackedEntityId,
        userId: userId,
        userType: payload.data.userType,
        entityType: payload.data.entity,
        entityStatus: payload.data.entityStatus,
        malId: payload.data.malId,
      });
    } else {
      await tx.update(trackedEntity).set({ entityType: payload.data.entity });
    }

    if (!isEntityStoredInDb) {
      await tx.insert(anime).values(entityFetched as any);
    }

    await tx.insert(entityActionsTracker).values({
      trackedEntityId,
      operation: payload.data.entityStatus,
    });
  });
}
