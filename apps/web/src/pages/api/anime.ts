import type { APIRoute } from 'astro';
import { db } from '../../lib/db/pool';
import {
  anime,
  entityActionsTracker,
  manga,
  trackedEntity,
} from '@/lib/db/schema';
import { and, eq } from 'drizzle-orm';
import { z } from 'zod';
import { randomUUID } from 'crypto';
import { entityStatus, json } from '@/lib/utils';
import { fetchEntityByMalId } from '@/lib/jikan';
import { userTrackedEntityRepository } from '@/lib/db/repositories/user-tracked-entity.repository';
import { parseCookie } from 'lucia/utils';
import type { MangaFull, AnimeFull } from '@/lib/types';
import { postSchema } from '@/lib/schemas';

/**
 * @description
 * Starts/update tracking of an entity(Anime/Manga so far) for a user
 */
export const POST: APIRoute = async (context) => {
  const payload = postSchema.safeParse(await context.request.json());
  if (!payload.success) {
    return json({ message: 'Invalid data' }, { status: 400 });
  }

  const session = await context.locals.auth.validate();
  const cookie = parseCookie(context.request.headers.get('Cookie') ?? '');
  if (
    session?.userId !== payload.data.userId &&
    cookie.guest_id !== payload.data.userId &&
    session?.user.role !== 'ADMINISTRATOR'
  ) {
    return json({ message: 'Unauthorized' }, { status: 401 });
  }
  const userId = payload.data.userId;

  let isEntityStoredInDb: boolean;
  if (payload.data.entity === 'ANIME') {
    isEntityStoredInDb = !!(
      await db
        .select()
        .from(anime)
        .where(eq(anime.mal_id, payload.data.malId))
        .limit(1)
    )[0];
  } else {
    isEntityStoredInDb = !!(
      await db
        .select()
        .from(manga)
        .where(eq(manga.mal_id, payload.data.malId))
        .limit(1)
    )[0];
  }

  let entityFetched: typeof payload.data.entity extends 'ANIME' ?
   AnimeFull 
  : MangaFull;
  if (!isEntityStoredInDb) {
    const _entityFetched = await fetchEntityByMalId(
      payload.data.entity,
      payload.data.malId,
    );
    if (!_entityFetched.success) {
      return json(
        { message: 'Could not fetch data succesfully' },
        { status: 500 },
      );
    }
    entityFetched = _entityFetched.data as typeof payload.data.entity extends (
      'ANIME'
    ) ?
      AnimeFull
    : MangaFull;
  }

  const isUserTrackingEntity = !!(
    await db
      .select()
      .from(trackedEntity)
      .where(
        and(
          eq(trackedEntity.userId, userId),
          eq(trackedEntity.malId, payload.data.malId),
        ),
      )
  )[0];
  // await userTrackedEntityRepository.create({
  //   payload: payload.data,
  //   isUserTrackingEntity,
  //   entityFetched,
  //   userId,
  //   isEntityStoredInDb,
  // });
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
      await tx
        .insert(payload.data.entity === 'ANIME' ? anime : manga)
        .values(entityFetched as any);
    }

    await tx.insert(entityActionsTracker).values({
      trackedEntityId,
      operation: payload.data.entityStatus,
    });
  });

  return json({ message: 'completed' }, { status: 200 });
};

const getSchema = z.object({
  userType: z.enum(['signed-in', 'guest']),
  userId: z.string(),
  entityType: z.enum(['ANIME', 'MANGA']),
  entityStatus: z.enum(entityStatus),
});

export const GET: APIRoute = async (context) => {
  const url = new URL(context.request.url);
  const payload = getSchema.safeParse({
    userType: url.searchParams.get('userType'),
    userId: url.searchParams.get('userId'),
    entityType: url.searchParams.get('entityType'),
    entityStatus: url.searchParams.get('entityStatus'),
  });
  if (!payload.success) {
    return json({ message: 'Invalid data' }, { status: 400 });
  }

  return json(
    await userTrackedEntityRepository.findEntities({
      userId: payload.data.userId,
      entityType: payload.data.entityType,
      status: payload.data.entityStatus,
    }),
  );
};
