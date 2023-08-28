import { pgTable, bigint, varchar, uniqueIndex } from "drizzle-orm/pg-core";

export const user = pgTable(
  "auth_user",
  {
    id: varchar("id", {
      length: 15, // change this when using custom user ids
    }).primaryKey(),
    email: varchar("email", {
      length: 255,
    }).unique(),
    username: varchar("username", {
      length: 30,
    }),
    avatar_image: varchar("avatar_image", { length: 191 }),
  },
  (user) => ({
    emailIndex: uniqueIndex("users__email__idx").on(user.email),
    usernameIndex: uniqueIndex("users__username__idx").on(user.username),
  })
);

export const session = pgTable("user_session", {
  id: varchar("id", {
    length: 128,
  }).primaryKey(),
  userId: varchar("user_id", {
    length: 15,
  })
    .notNull()
    .references(() => user.id),
  activeExpires: bigint("active_expires", {
    mode: "number",
  }).notNull(),
  idleExpires: bigint("idle_expires", {
    mode: "number",
  }).notNull(),
});

export const key = pgTable("user_key", {
  id: varchar("id", {
    length: 255,
  }).primaryKey(),
  userId: varchar("user_id", {
    length: 15,
  })
    .notNull()
    .references(() => user.id),
  hashedPassword: varchar("hashed_password", {
    length: 255,
  }),
});
