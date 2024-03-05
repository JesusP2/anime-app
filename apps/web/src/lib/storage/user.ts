import { eq } from 'drizzle-orm';
import { type DBSchema } from '../db/pool';
import { user } from '../db/schema';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

export class Auth<T extends NodePgDatabase<DBSchema>> {
  constructor(private db: T) {}

  async updateUsernameById({
    userId,
    username,
  }: {
    userId: string;
    username: string;
  }) {
    return this.db.update(user).set({ username }).where(eq(user.id, userId));
  }
}
