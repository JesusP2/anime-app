import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { dbAnimeStorage, type DbStorage } from '../db/entity';
import { jikanAnimeStorage, type JikanStorage } from '../jikan';
import type { DBSchema } from '@/lib/db/pool';
import type { PgTableWithColumns } from 'drizzle-orm/pg-core';

class Storage<
  T extends Record<string, unknown>,
  DB extends NodePgDatabase<DBSchema>,
  U extends PgTableWithColumns<any>,
> {
  constructor(
    private dbStorage: DbStorage<DB, U>,
    private jikanApi: JikanStorage<T>,
  ) {}

  async findById(id: string) {
    const dbEntity = await this.dbStorage.findById(id);
    if (dbEntity) {
      return dbEntity;
    }
    return this.jikanApi.findById(id);
  }
}

export const animeStorage = new Storage(dbAnimeStorage, jikanAnimeStorage);
