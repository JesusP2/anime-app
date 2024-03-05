import { eq, and } from 'drizzle-orm';
import { db, type DBSchema } from '../db/pool';
import type { entityStatus } from '../utils';
import { anime, manga, trackedEntity, entityActionsTracker } from '../db/schema';
import { randomUUID } from 'crypto';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

class UserTrackedEntity<T extends NodePgDatabase<DBSchema>> {
  constructor(private db: T) {}

  findEntities({
    userId,
    entityType,
    status,
  }: {
    userId: string;
    entityType: 'ANIME' | 'MANGA';
    status: (typeof entityStatus)[number];
  }) {
    const entitiesTable = entityType === 'ANIME' ? anime : manga;
    return this.db
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

  async create<
    T extends {
      userType: 'signed-in' | 'guest';
      entity: 'ANIME' | 'MANGA' | 'LIGHT-NOVEL';
      entityStatus: string;
      malId: number;
    },
  >({
    payload,
    isUserTrackingEntity,
    entityFetched,
    userId,
    isEntityStoredInDb,
  }: {
    payload: T;
    isUserTrackingEntity: boolean;
    entityFetched: any;
    userId: string;
    isEntityStoredInDb: boolean;
  }) {
    const dbEntity = payload.entity === 'ANIME' ? anime : manga;
    const isEntityStoredInDB = !!(
      await this.db
        .select()
        .from(dbEntity)
        .where(eq(dbEntity.mal_id, payload.malId))
    )[0];
    const entity = isEntityStoredInDB ? null : dbEntity;

    await this.db.transaction(async (tx) => {
      const trackedEntityId = randomUUID();
      if (!isUserTrackingEntity) {
        await tx.insert(trackedEntity).values({
          id: trackedEntityId,
          userId,
          userType: payload.userType,
          entityType: payload.entity,
          entityStatus: payload.entityStatus,
          malId: payload.malId,
        });
      } else {
        await tx.update(trackedEntity).set({ entityType: payload.entity });
      }

      if (!isEntityStoredInDb) {
        await tx.insert(anime).values(entityFetched as any);
      }

      await tx.insert(entityActionsTracker).values({
        trackedEntityId,
        operation: payload.entityStatus,
      });
    });
  }
}

export const userTrackedEntityRepository = new UserTrackedEntity(db);
