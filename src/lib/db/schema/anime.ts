import { sql } from 'drizzle-orm';
import {
  timestamp,
  pgTable,
  varchar,
  integer,
  text,
  boolean,
  json,
} from 'drizzle-orm/pg-core';

export const anime = pgTable('anime', {
  id: varchar('id', {
    length: 255,
  })
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  mal_id: integer('mal_id'),
  url: text('url'),
  images: json('images'),
  trailer: text('trailer'), // youtube_id | url | null
  approved: boolean('approved'),
  titles: json('titles'),
  type: varchar('type', { length: 255 }),
  source: varchar('source', { length: 255 }),
  episodes: integer('episodes'),
  status: varchar('status', { length: 255 }),
  airing: boolean('airing'),
  aired: json('aired').notNull(),
  duration: varchar('duration', { length: 255 }),
  rating: varchar('rating', { length: 255 }),
  score: integer('score'),
  scored_by: integer('scored_by'),
  rank: integer('rank'),
  popularity: integer('popularity'),
  members: integer('member'),
  favorites: integer('favorites'),
  synopsis: text('synopsis'),
  background: text('background'),
  season: varchar('season', { length: 255 }),
  year: integer('year'),
  broadcast: json('broadcast').notNull(),
  producers: json('producers').notNull(),
  licensors: json('licensors').notNull(),
  studios: json('studios').notNull(),
  genres: json('genres').notNull(),
  explicit_genres: json('explicit_genres').notNull(),
  themes: json('themes').notNull(),
  demographics: json('demographics').notNull(),
  openings: json('openings'),
  endings: json('endings'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('created_at').defaultNow(),
});
