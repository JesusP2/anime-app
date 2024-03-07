import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import type { DBSchema } from '../db/pool';
import type { ApiContract } from './contract';
import { anime, manga } from '../db/schema';
import { eq } from 'drizzle-orm';
import type { components } from './jikan.openapi';
import { HttpError } from '../utils';

export class DBApi<T extends NodePgDatabase<DBSchema>> implements ApiContract {
  constructor(private db: T) {}

  findMangaById: ApiContract['findMangaById'] = async (id) => {
    try {
      const data = await this.db
        .select()
        .from(manga)
        .where(eq(manga.id, id.toString()));
      return {
        success: true,
        data: data[0] as components['schemas']['manga_full'],
      };
    } catch (error) {
      const msg =
        error instanceof Error ? error.message : 'Could not find anime by id';
      return {
        success: false,
        error: new HttpError(500, msg),
      };
    }
  };

  findAnimeById: ApiContract['findAnimeById'] = async (id) => {
    try {
      const data = await this.db
        .select()
        .from(anime)
        .where(eq(anime.id, id.toString()));
      return {
        success: true,
        data: data[0] as components['schemas']['anime_full'],
      };
    } catch (error) {
      const msg =
        error instanceof Error ? error.message : 'Could not find anime by id';
      return {
        success: false,
        error: new HttpError(500, msg),
      };
    }
  };

  setAnime: (data: components['schemas']['anime_full']) => Promise<void> =
    // TODO: fix database schema and add expiration date to data
    async (data) => {
      await this.db
        .insert(anime)
        .values(data as any)
        .execute();
    };

  setManga: (data: components['schemas']['manga_full']) => Promise<void> =
    // TODO: fix database schema and add expiration date to data
    async (data) => {
      await this.db
        .insert(manga)
        .values(data as any)
        .execute();
    };
}
