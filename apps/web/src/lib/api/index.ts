import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import type { DBSchema } from '../db/pool';
import type { ApiContract } from './contract';
import { Cache } from './cache';
import { client as jikanClient } from './jikan.client';
import { HttpError } from '../utils';
import type { DBApi } from './db';

export class Api<T extends NodePgDatabase<DBSchema>> implements ApiContract {
  constructor(
    private cache: Cache<T>,
    private db: DBApi<T>,
    private client: typeof jikanClient,
  ) {}

  findAnimeById: ApiContract['findAnimeById'] = async (id) => {
    if (await this.cache.has('findAnimeById', id)) {
      return await this.db.findAnimeById(id)
    }
    const anime = await this.client.GET('/anime/{id}/full', {
      params: {
        path: {
          id: id,
        },
      },
    });
    if (!anime.data?.data) {
      return {
        success: false,
        error: new HttpError(404, 'Anime not found'),
      };
    }
    await this.db.setAnime(anime.data.data)
    return {
      success: true,
      data: anime.data.data,
    };
  };

  findMangaById: ApiContract['findMangaById'] = async (id) => {
    if (await this.cache.has('findMangaById', id)) {
      return await this.db.findMangaById(id)
    }
    const manga = await this.client.GET('/manga/{id}/full', {
      params: {
        path: {
          id: id,
        },
      },
    });
    if (!manga.data?.data) {
      return {
        success: false,
        error: new HttpError(404, 'manga not found'),
      };
    }
    await this.db.setManga(manga.data.data)
    return {
      success: true,
      data: manga.data.data,
    };
  };
}
