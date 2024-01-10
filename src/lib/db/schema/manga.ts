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

export const manga = pgTable('manga', {
  id: varchar('id', {
    length: 255,
  })
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  mal_id: integer('mal_id'),
  url: text('url'),
  images: json('images'),
  image_url: text('image_url'),
  approved: boolean('approved'),
  titles: json('titles'),
  type: varchar('type', { length: 255 }),
  chapters: integer('chapters'),
  volumes: integer('volumes'),
  status: varchar('status', { length: 255 }),
  score: integer('score'),
  scored_by: integer('scors_by'),
  members: integer('members'),
  favorites: integer('rank'),
  synopsis: text('synopsis'),
  background: text('background'),
  authors: json('authors').notNull(),
  serializations: json('serializations').notNull(),
  genres: json('genres').notNull(),
  explicit_genres: json('explicit_genres').notNull(),
  themes: json('themes').notNull(),
  demographics: json('demographics').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('created_at').defaultNow(),
});
