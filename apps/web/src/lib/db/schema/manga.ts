import {
  timestamp,
  varchar,
  integer,
  text,
  boolean,
  json,
  numeric,
} from 'drizzle-orm/pg-core';
import { pgTable } from './table'
import { createId } from '@paralleldrive/cuid2';

export const manga = pgTable('manga', {
  id: varchar('id', {
    length: 255,
  })
    .primaryKey()
    .$defaultFn(createId),
  mal_id: integer('mal_id'),
  url: varchar('url', {
    length: 255,
  }),
  images: json('images'),
  approved: boolean('approved'),
  titles: json('titles'),
  title_synonyms: json('title_synonyms'),
  type: varchar('type', {
    length: 255,
  }),
  chapters: integer('chapters'),
  volumes: integer('volumes'),
  status: varchar('status', {
    length: 255,
  }),
  publishing: boolean('publishing'),
  published: json('published'),
  score: numeric('score'),
  // score: varchar('score', {
  //   length: 20,
  // }),
  scored_by: integer('scored_by'),
  rank: integer('rank'),
  popularity: integer('popularity'),
  members: integer('members'),
  favorites: integer('favorites'),
  synopsis: text('synopsis'),
  background: text('background'),
  authors: json('authors'),
  serializations: json('serializations'),
  genres: json('genres'),
  explicit_genres: json('explicit_genres'),
  themes: json('themes'),
  demographics: json('demographics'),
  relations: json('relations'),
  external: json('external'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
