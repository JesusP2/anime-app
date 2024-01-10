import type { APIRoute } from 'astro';
import { db } from '@/lib/db/pool';
import { animeFollowed } from '@/lib/db/schema';
import { randomUUID } from 'crypto';

type ItemStatus = 'QUEUE' | 'STARTED' | 'FINISHED' | 'DROPPED';

type Queue = {
  status: 'QUEUE';
};

type Start = {
  status: 'STARTED';
  startedAt: Date;
};

type FinishOrDrop = {
  status: 'FINISHED' | 'DROPPED';
};

type ItemAction = (Queue | Start | FinishOrDrop) & {
  mal_id: number;
  userId: string;
};

export const post: APIRoute = async (context) => {
  const session = await context.locals.auth.validate();
  let userId: string;
  if (!session) {
    // get userId cookie
    userId = 'hi';
  } else {
    userId = session.user.userId;
  }

  const body: { status: ItemStatus; mal_id: number } =
    await context.request.json();
  const anime: ItemAction = {
    ...body,
    userId,
  };
  if (body.status === 'QUEUE') {
    anime.followedAt;
  } else if (body.status === 'STARTED') {
    anime.startedAt;
  } else {
    anime.finishedAt;
  }
  db.insert(animeFollowed).values(anime);

  return new Response(JSON.stringify({ message: 'completed' }), {
    status: 201,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
