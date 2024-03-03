import { db, type DBSchema } from '@/lib/db/pool';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import type { PgTableWithColumns } from 'drizzle-orm/pg-core';
import { eq } from 'drizzle-orm';
import { anime } from '@/lib/db/schema/anime';
import { manga } from '@/lib/db/schema';

class DbStorage<
  T extends NodePgDatabase<DBSchema>,
  U extends PgTableWithColumns<any>,
> {
  constructor(
    private db: T,
    private entity: U,
  ) {}

  async findById(id: string) {
    return this.db.select().from(this.entity).where(eq(this.entity.id, id));
  }
}

export const dbAnimeStorage = new DbStorage(db, anime);
export const dbMangaStorage = new DbStorage(db, manga);
