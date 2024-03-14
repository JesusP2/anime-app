import { pgTable } from './table';
import {
  timestamp,
  varchar,
  integer,
  text,
  json,
} from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';

export const character = pgTable('character', {
  id: varchar('id', {
    length: 255,
  })
    .primaryKey()
    .$defaultFn(createId),
  mal_id: integer('mal_id').unique(),
  url: text('url').unique(),
  images: json('images'),
  name: text('name'),
  name_kanji: text('name_kanji'),
  nicknames: json('nicknames'),
  favorites: integer('favorites'),
  about: text('about'),
  anime: json('anime'),
  manga: json('manga'),
  voices: json('voices'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
