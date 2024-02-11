import type { APIRoute } from 'astro';
import { db } from '@/lib/db/pool';
import { anime, entityActionsTracker, trackedEntity } from '@/lib/db/schema';
import { and, eq } from 'drizzle-orm';
import { z } from 'zod';
import { animeSchema } from '@/lib/schemas/anime';
import { randomUUID } from 'crypto';
import { json } from '@/lib/utils';

const payloadSchema = z.object({
  status: z.enum(['QUEUE', 'STARTED', 'FINISHED', 'DROPPED']),
  malId: z.coerce.number(),
  userId: z.string(),
});

// steps
// 1. check if anime exists in db
// 2. if not, fetch from api
// 3. if user is tracking this anime, update status
// 4. if not, insert new record
// 5. if anime is not in db, insert new record
// 6. insert new record in entityActionsTracker
// 7. return response
export const post: APIRoute = async (context) => {
  const result = payloadSchema.safeParse(await context.request.json());
  if (!result.success) {
    return json({ message: 'Invalid data' }, { status: 400 });
  }

  const { userId, malId, status } = result.data;
  const session = await context.locals.auth.validate();
  if (
    !session ||
    (userId !== session.userId && session.user.role !== 'ADMINISTRATOR')
  ) {
    return json({ message: 'Unauthorized' }, { status: 401 });
  }

  const animeStoredInDb = (
    await db.select().from(anime).where(eq(anime.mal_id, malId)).limit(1)
  )[0];

  let animedFetched: z.infer<typeof animeSchema>;
  if (!animeStoredInDb) {
    const fetchedAnimeResult = animeSchema.safeParse(
      (
        await (
          await fetch(`${import.meta.env.ANIME_API}/anime/${malId}`)
        ).json()
      )['data'],
    );
    if (!fetchedAnimeResult.success) {
      return new Response(
        JSON.stringify({ message: 'Could not fetch data succesfully' }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    }
    animedFetched = fetchedAnimeResult.data;
  }

  const usersStoredTrackedEntity = (
    await db
      .select()
      .from(trackedEntity)
      .where(
        and(eq(trackedEntity.userId, userId), eq(trackedEntity.malId, malId)),
      )
  )[0];
  await db.transaction(async (tx) => {
    const trackedEntityId = randomUUID();
    if (!usersStoredTrackedEntity) {
      await tx.insert(trackedEntity).values({
        id: trackedEntityId,
        userId,
        status,
        malId,
        entityType: 'ANIME',
      });
    } else {
      await tx.update(trackedEntity).set({ status });
    }

    if (!animeStoredInDb) {
      await tx.insert(anime).values(animedFetched as any);
    }

    await tx.insert(entityActionsTracker).values({
      trackedEntityId,
      operation: status,
    });
  });

  return json({ message: 'completed' }, { status: 200 });
};
