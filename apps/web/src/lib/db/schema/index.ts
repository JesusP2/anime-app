import { createId } from '@paralleldrive/cuid2';
import { uniqueIndex, text, integer } from 'drizzle-orm/sqlite-core';
import { sqliteTable } from './table';
export * from './anime';
export * from './manga';
export * from './character';

export const user = sqliteTable(
  'auth_user',
  {
    id: text('id', {
      length: 15, // change this when using custom user ids
    }).primaryKey(),
    email: text('email', {
      length: 255,
    }).unique(),
    username: text('username', {
      length: 30,
    }),
    role: text('role', {
      length: 255,
    }),
    avatar_image: text('avatar_image', { length: 191 }),
  },
  (user) => ({
    emailIndex: uniqueIndex('users__email__idx').on(user.email),
    usernameIndex: uniqueIndex('users__username__idx').on(user.username),
  }),
);

export const session = sqliteTable('user_session', {
  id: text('id', {
    length: 128,
  }).primaryKey(),
  userId: text('user_id', {
    length: 64,
  })
    .notNull()
    .references(() => user.id),
  activeExpires: integer('active_expires', {
    mode: 'number',
  }).notNull(),
  idleExpires: integer('idle_expires', {
    mode: 'number',
  }).notNull(),
});

export const key = sqliteTable('user_key', {
  id: text('id', {
    length: 255,
  }).primaryKey(),
  userId: text('user_id', {
    length: 64,
  })
    .notNull()
    .references(() => user.id),
  hashedPassword: text('hashed_password', {
    length: 255,
  }),
});

export const trackedEntity = sqliteTable('tracked_entity', {
  id: text('id', {
    length: 255,
  })
    .primaryKey()
    .$defaultFn(createId),
  userId: text('user_id', {
    length: 64,
  }).notNull(),
  userType: text('user_type', {
    enum: ['signed-in', 'guest'],
  }).notNull(),
  entityType: text('user_type', {
    enum: ['ANIME', 'LIGHT-NOVEL', 'MANGA'],
  }).notNull(),
  entityStatus: text('entity_status', {
    length: 255,
  }).notNull(),
  mal_id: integer('mal_id').notNull(),
  createdAt: text('created_at').$defaultFn(() => new Date().toISOString()),
  updatedAt: text('updated_at').$defaultFn(() => new Date().toISOString()),
});

export const entityActionsTracker = sqliteTable('entity_actions_tracker', {
  id: text('id', {
    length: 255,
  })
    .primaryKey()
    .$defaultFn(createId),
  trackedEntityId: text('tracked_entity_id', {
    length: 255,
  }),
  operation:  text('operation', {
    length: 255,
  }).notNull(),
  actionTime: text('action_time').$defaultFn(() => new Date().toISOString()),
  createdAt: text('created_at').$defaultFn(() => new Date().toISOString()),
  updatedAt: text('updated_at').$defaultFn(() => new Date().toISOString()),
});
