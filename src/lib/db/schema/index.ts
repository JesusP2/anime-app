import { sql } from 'drizzle-orm';
import {
  pgTable,
  bigint,
  varchar,
  uniqueIndex,
  integer,
  timestamp,
  pgEnum,
} from 'drizzle-orm/pg-core';
export * from './anime';
export * from './manga';

export const user = pgTable(
  'auth_user',
  {
    id: varchar('id', {
      length: 15, // change this when using custom user ids
    }).primaryKey(),
    email: varchar('email', {
      length: 255,
    }).unique(),
    username: varchar('username', {
      length: 30,
    }),
    role: varchar('role', {
      length: 255,
    }),
    avatar_image: varchar('avatar_image', { length: 191 }),
  },
  (user) => ({
    emailIndex: uniqueIndex('users__email__idx').on(user.email),
    usernameIndex: uniqueIndex('users__username__idx').on(user.username),
  }),
);

export const session = pgTable('user_session', {
  id: varchar('id', {
    length: 128,
  }).primaryKey(),
  userId: varchar('user_id', {
    length: 15,
  })
    .notNull()
    .references(() => user.id),
  activeExpires: bigint('active_expires', {
    mode: 'number',
  }).notNull(),
  idleExpires: bigint('idle_expires', {
    mode: 'number',
  }).notNull(),
});

export const key = pgTable('user_key', {
  id: varchar('id', {
    length: 255,
  }).primaryKey(),
  userId: varchar('user_id', {
    length: 15,
  })
    .notNull()
    .references(() => user.id),
  hashedPassword: varchar('hashed_password', {
    length: 255,
  }),
});

export const trackedEntity = pgTable('tracked_entity', {
  id: varchar('id', {
    length: 255,
  })
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  userId: varchar('user_id', {
    length: 15,
  }).notNull(),
  entityType: pgEnum('varchar', [
    'ANIME',
    'LIGHT-NOVEL',
    'MANGA',
  ])('entity_type').notNull(),
  status: varchar('status', {
    length: 255,
  }).notNull(),
  malId: integer('mal_id').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const entityActionsTracker = pgTable('entity_actions_tracker', {
  id: varchar('id', {
    length: 255,
  })
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  trackedEntityId: varchar('tracked_entity_id', {
    length: 255,
  }),
  operation: varchar('operation', {
    length: 255,
  }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});