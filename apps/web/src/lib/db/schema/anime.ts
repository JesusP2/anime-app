import {
  timestamp,
  pgTable,
  varchar,
  integer,
  text,
  boolean,
  json,
  numeric,
} from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';

export const anime = pgTable('anime', {
  id: varchar('id', {
    length: 255,
  })
    .primaryKey()
    .$defaultFn(createId),
  mal_id: integer('mal_id'),
  url: text('url'),
  images: json('images'),
  trailer: json('trailer'),
  approved: boolean('approved'),
  titles: json('titles'),
  // convert anime_full type to drizzle-orm type
  type: varchar('type', {
    length: 255,
  }),
  source: varchar('source', {
    length: 255,
  }),
  episodes: integer('episodes'),
  status: varchar('status', {
    length: 255,
  }),
  airing: boolean('airing'),
  aired: json('aired'),
  duration: varchar('duration', {
    length: 255,
  }),
  rating: varchar('rating', {
    length: 255,
  }),
  score: varchar('score', {
    length: 20,
  }),
  scored_by: integer('scored_by'),
  rank: integer('rank'),
  popularity: integer('popularity'),
  members: integer('members'),
  favorites: integer('favorites'),
  synopsis: text('synopsis'),
  background: text('background'),
  season: varchar('season', {
    length: 255,
  }),
  year: integer('year'),
  broadcast: json('broadcast'),
  producers: json('producers'),
  licensors: json('licensors'),
  studios: json('studios'),
  genres: json('genres'),
  explicit_genres: json('explicit_genres'),
  themes: json('themes'),
  demographics: json('demographics'),
  relations: json('relations'),
  theme: json('theme'),
  external: json('external'),
  streaming: json('streaming'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
