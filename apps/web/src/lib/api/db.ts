import type { LibSQLDatabase } from 'drizzle-orm/libsql';
import type { DBSchema } from '../db/pool';
import type { ApiContract } from './contract';
import { anime, manga } from '../db/schema';
import { eq } from 'drizzle-orm';
import type { components } from './jikan.openapi';
import { HttpError } from '../utils';
import { character } from '../db/schema/character';

export class DBApi<T extends LibSQLDatabase<DBSchema>> implements ApiContract {
  constructor(private db: T) {}

  findCharacterById: ApiContract['findCharacterById'] = async (id) => {
    try {
      const data = await this.db
        .select()
        .from(character)
        .where(eq(character.mal_id, id));
      return {
        success: true,
        data: data[0] as components['schemas']['character_full'],
      };
    } catch (error) {
      const msg =
        error instanceof Error
          ? error.message
          : 'Could not find character by id';
      return {
        success: false,
        error: new HttpError(500, msg),
      };
    }
  };

  findMangaById: ApiContract['findMangaById'] = async (id) => {
    try {
      const data = await this.db
        .select()
        .from(manga)
        .where(eq(manga.mal_id, id));
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
        .where(eq(anime.mal_id, id));
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

  setCharacter: (
    data: components['schemas']['character_full'],
  ) => Promise<void> = async (data) => {
    await this.db
      .insert(character)
      .values(data as any)
      .execute();
  };
}
