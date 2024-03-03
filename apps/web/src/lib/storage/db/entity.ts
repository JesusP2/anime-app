import { db, type DBSchema } from '@/lib/db/pool';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import type { PgTableWithColumns } from 'drizzle-orm/pg-core';
import { eq } from 'drizzle-orm';
import { anime } from '@/lib/db/schema/anime';
import { manga } from '@/lib/db/schema';
import { HttpError } from '@/lib/utils';
import type { ErrorResponse, SuccessResponse } from '@/lib/types';
import type { animeSchema } from '@/lib/schemas/anime';
import type { z } from 'zod';

export class DbStorage<
  T extends NodePgDatabase<DBSchema>,
  U extends PgTableWithColumns<any>,
> {
  constructor(
    private db: T,
    private entity: U,
  ) {}

  async findById(
    id: string,
  ): Promise<
    | ErrorResponse
    | SuccessResponse<z.infer<typeof animeSchema> & { id: string }>
  > {
    try {
      const data = await this.db
        .select()
        .from(this.entity)
        .where(eq(this.entity.id, id));
      const item = data[0];
      if (!item) {
        return {
          success: false,
          error: new HttpError(404, 'Not Found'),
        };
      }
      return {
        success: true,
        data: item as z.infer<typeof animeSchema> & { id: string },
      };
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Internal Server Error';
      return {
        success: false,
        error: new HttpError(500, msg),
      };
    }
  }
}

export const dbAnimeStorage = new DbStorage(db, anime);
export const dbMangaStorage = new DbStorage(db, manga);
