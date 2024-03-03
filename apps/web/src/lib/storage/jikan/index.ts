import { animeSchema } from '@/lib/schemas/anime';
import { mangaSchema } from '@/lib/schemas/manga';
import type { ErrorResponse, SuccessResponse } from '@/lib/types';
import { HttpError } from '@/lib/utils';
import { apiFetch } from '@/lib/utils/fetch';
import type { z } from 'zod';

class JikanStorage<T extends Record<string, unknown>> {
  constructor(
    private schema: z.ZodObject<z.ZodRawShape, 'strip', z.ZodTypeAny, T, T>,
    private entity: 'anime' | 'manga',
    private baseUrl: string,
  ) {}

  async findById(id: number): Promise<ErrorResponse | SuccessResponse<T>> {
    const url = `${this.baseUrl}/${this.entity}/${id}`;
    const result = await apiFetch(url);
    if (!result.success) {
      return {
        success: false,
        error: new HttpError(
          500,
          `Failed to fetch entity: ${this.entity} with id: ${id}`,
        ),
      };
    }

    const entity = this.schema.safeParse(result.data['data']);
    if (!entity.success) {
      return {
        success: false,
        error: new HttpError(
          500,
          `Failed to parse entity: ${this.entity} with id: ${id}`,
        ),
      };
    }
    return {
      success: true,
      data: entity.data,
    };
  }
}

export const jikanAnimeStorage = new JikanStorage(
  animeSchema,
  'anime',
  import.meta.env.ANIME_API,
);

export const jikanMangaStorage = new JikanStorage(
  mangaSchema,
  'manga',
  import.meta.env.ANIME_API,
);
