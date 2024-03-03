import { eq } from 'drizzle-orm';
import { type DBSchema } from '../pool';
import { user } from '../schema';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

export class User<T extends NodePgDatabase<DBSchema>> {
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
