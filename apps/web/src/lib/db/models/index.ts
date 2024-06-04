import type {
  CharacterFull,
  MangaFull,
  AnimeFull,
  ErrorResponse,
  SuccessResponse,
} from '@/lib/types';
import { HttpError } from '@/lib/utils';
import type { LibSQLDatabase } from 'drizzle-orm/libsql';
import { db, type DBSchema } from '../pool';
import type { SQLiteTableWithColumns } from 'drizzle-orm/sqlite-core';
import { eq } from 'drizzle-orm';
import { anime, character, manga } from '../schema';

// NOTE: this implementation assumes a couple of things:
// there must be a mal_id column
export class Model<U extends AnimeFull | MangaFull | CharacterFull> {
  private booleanFields = ['approved', 'publishing', 'airing'] as (keyof U)[];
  constructor(
    private db: LibSQLDatabase<DBSchema>,
    private jsonFields: readonly (keyof U)[],
    private table: SQLiteTableWithColumns<any>,
  ) {}

  findByMalId: (id: number) => Promise<ErrorResponse | SuccessResponse<U>> =
    async (id: number) => {
      try {
        const data = (
          await this.db
            .select()
            .from(this.table)
            .where(eq(this.table.mal_id, id))
        )[0] as
          | Record<keyof U, string | number | boolean | undefined | null>
          | undefined;
        if (!data) {
          return {
            success: false,
            error: new HttpError(404, 'Record not found'),
          };
        }
        this.jsonFields.forEach((jsonField) => {
          const value = data[jsonField];
          if (typeof value === 'string') {
            data[jsonField] = value;
          }
        });
        this.booleanFields.forEach((booleanField) => {
          const value = data[booleanField];
          if (typeof value === 'number') {
            data[booleanField] = !!value;
          }
        });
        return {
          success: true,
          data: data as U,
        };
      } catch (error) {
        const msg =
          error instanceof Error
            ? error.message
            : `Could not find entity with id: ${id}`;
        return {
          success: false,
          error: new HttpError(500, msg),
        };
      }
    };

  updateByMalId: (
    id: number,
    data: Partial<U>,
  ) => Promise<ErrorResponse | SuccessResponse<void>> = async (id, data) => {
    try {
      const _data = { ...data } as Record<keyof U, unknown>;
      this.jsonFields.forEach((jsonField) => {
        const value = _data[jsonField];
        if (value && typeof value === 'object') {
          _data[jsonField] = JSON.stringify(value);
        }
      });
      this.booleanFields.forEach((booleanField) => {
        const value = _data[booleanField];
        if (typeof value === 'number') {
          _data[booleanField] = !!value;
        }
      });
      await this.db
        .update(this.table)
        .set(_data)
        .where(eq(this.table.mal_id, id));
      return {
        success: true,
        data: undefined,
      };
    } catch (error) {
      const msg =
        error instanceof Error
          ? error.message
          : `Error updating entity with id: ${id}`;
      return {
        success: false,
        error: new HttpError(500, msg),
      };
    }
  };

  create: (data: U) => Promise<ErrorResponse | SuccessResponse<U>> = async (
    data,
  ) => {
    try {
      const _data = { ...data } as Record<keyof U, unknown>;
      this.jsonFields.forEach((jsonField) => {
        const value = _data[jsonField];
        if (value && typeof value === 'object') {
          _data[jsonField] = JSON.stringify(value);
        }
      });
      this.booleanFields.forEach((booleanField) => {
        const value = _data[booleanField];
        if (typeof value === 'number') {
          _data[booleanField] = !!value;
        }
      });
      const record = await this.db.insert(this.table).values(_data).returning();
      return {
        success: true,
        data: record as unknown as U,
      };
    } catch (error) {
      const msg =
        error instanceof Error ? error.message : 'Error creating entity';
      return {
        success: false,
        error: new HttpError(500, msg),
      };
    }
  };
}

const animeJsonFields = [
  'images',
  'trailer',
  'titles',
  'aired',
  'broadcast',
  'producers',
  'licensors',
  'studios',
  'genres',
  'explicit_genres',
  'themes',
  'demographics',
  'relations',
  'theme',
  'external',
  'streaming',
] as const;
const mangaJsonFields = [
  'images',
  'titles',
  'title_synonyms',
  'published',
  'authors',
  'serializations',
  'genres',
  'explicit_genres',
  'themes',
  'demographics',
  'relations',
  'external',
] as const;
const characterJsonFields = [
  'images', 'nicknames', 'favorites', 'anime', 'manga', 'voices'
] as const

export const animeModel = new Model<AnimeFull>(db, animeJsonFields, anime);
export const mangaModel = new Model<MangaFull>(db, mangaJsonFields, manga);
export const characterModel = new Model<CharacterFull>(db, characterJsonFields, character);
