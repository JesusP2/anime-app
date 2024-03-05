import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import type { DBSchema } from '../db/pool';
import type { ApiContract } from './contract';
import { Cache } from './cache';
import { client as jikanClient } from './jikan.client';
import { HttpError } from '../utils';

export class Api<T extends NodePgDatabase<DBSchema>> implements ApiContract {
  constructor(
    private cache: Cache<T>,
    private client: typeof jikanClient,
  ) {}

  findAnimeById: ApiContract['findAnimeById'] = async (id) => {
    if (await this.cache.has('findAnimeById', id)) {
      return await this.cache.get('findAnimeById', id);
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
    await this.cache.set('setAnime', anime.data.data);
    return {
      success: true,
      data: anime.data.data,
    };
  };
}
