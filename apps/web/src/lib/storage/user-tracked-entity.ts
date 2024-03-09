import { eq, and } from 'drizzle-orm';
import { db, type DBSchema } from '../db/pool';
import type { entityStatus } from '../utils';
import {
  anime,
  manga,
  trackedEntity,
  entityActionsTracker,
} from '../db/schema';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Api } from '../api';
import { DBApi } from '../api/db';
import { Cache } from '../api/cache';
import { client } from '../api/jikan.client';
import { createId } from '@paralleldrive/cuid2';
import type { UserType } from '../types';

const dbApi = new DBApi(db);
const cache = new Cache(dbApi);
const api = new Api(cache, dbApi, client);
class UsersTrackedEntities<T extends NodePgDatabase<DBSchema>> {
  constructor(private db: T) {}

  findUsersEntities({
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

  async createOrUpdateUsersEntity<
    T extends {
      userType: UserType;
      entityType: 'ANIME' | 'MANGA' | 'LIGHT-NOVEL';
      entityStatus: string;
      malId: number;
    },
  >({ payload, userId }: { payload: T; userId: string }) {
    const entityOptions = {
      entityType: payload.entityType,
    } as {
      entityType: 'ANIME' | 'MANGA' | 'LIGHT-NOVEL';
      entity: typeof anime | typeof manga;
      verifyEntityFn: 'findAnimeById' | 'findMangaById';
    };
    if (payload.entityType === 'ANIME') {
      entityOptions.entity = anime;
      entityOptions.verifyEntityFn = 'findAnimeById';
    } else if (payload.entityType === 'MANGA') {
      entityOptions.entity = manga;
      entityOptions.verifyEntityFn = 'findMangaById';
    }

    // checks if entity exists otherwise creates it
    await api[entityOptions.verifyEntityFn](payload.malId);

    const isUserTrackingEntity = !!(
      await db
        .select()
        .from(trackedEntity)
        .where(
          and(
            eq(trackedEntity.userId, userId),
            eq(trackedEntity.malId, payload.malId),
          ),
        )
    )[0];

    await this.db.transaction(async (tx) => {
      const trackedEntityId = createId();
      // If the user is not tracking the entity, we create a new enty,
      // otherwise we update the entity status
      if (!isUserTrackingEntity) {
        await tx.insert(trackedEntity).values({
          id: trackedEntityId,
          userId,
          userType: payload.userType,
          entityType: payload.entityType,
          entityStatus: payload.entityStatus,
          malId: payload.malId,
        });
      } else {
        await tx
          .update(trackedEntity)
          .set({ entityStatus: payload.entityStatus })
          .where(
            and(
              eq(trackedEntity.userId, userId),
              eq(trackedEntity.malId, payload.malId),
            ),
          );
      }

      // We store the action in the entityActionsTracker table
      await tx.insert(entityActionsTracker).values({
        trackedEntityId,
        operation: payload.entityStatus,
      });
    });
  }
}

export const usersTrackedEntitiesRepository = new UsersTrackedEntities(db);
