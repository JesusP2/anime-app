import type { APIRoute } from 'astro';
import { z } from 'zod';
import { entityStatus, json } from '@/lib/utils';
import { parseCookie } from 'lucia/utils';
import { postSchema } from '@/lib/schemas';
import { usersTrackedEntitiesRepository } from '@/lib/storage/user-tracked-entity';

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
  await usersTrackedEntitiesRepository.createOrUpdateUsersEntity({
    payload: payload.data,
    userId,
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
    await usersTrackedEntitiesRepository.findUsersEntities({
      userId: payload.data.userId,
      entityType: payload.data.entityType,
      status: payload.data.entityStatus,
    }),
  );
};
