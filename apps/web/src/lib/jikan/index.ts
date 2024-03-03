import { animeSchema, type Anime } from '../schemas/anime';
import { mangaSchema, type Manga } from '../schemas/manga';
import { apiFetch } from '../utils/fetch';
import type { ErrorResponse, SuccessResponse } from '../types';
import { HttpError } from '../utils';

const ANIME_API = import.meta.env.ANIME_API;

export async function fetchEntityByMalId<Entity extends 'ANIME' | 'MANGA'>(
  entity: Entity,
  id: number,
): Promise<
  ErrorResponse | SuccessResponse<Entity extends 'ANIME' ? Anime : Manga>
> {
  const url = `${ANIME_API}/${entity.toLowerCase()}/${id}`;
  const result = await apiFetch(url);
  if (!result.success) {
    return {
      success: false,
      error: new HttpError(500, 'Failed to fetch data'),
    };
  }
  let schema;
  if (entity === 'ANIME') {
    schema = animeSchema;
  } else if (entity === 'MANGA') {
    schema = mangaSchema;
  } else {
    return { success: false, error: new HttpError(400, 'Invalid entity') };
  }
  const entityParsed = schema.safeParse(result.data['data']);
  if (!entityParsed.success) {
    return {
      success: false,
      error: new HttpError(500, 'Failed to parse anime'),
    };
  }
  return {
    success: true,
    data: entityParsed.data as Entity extends 'ANIME' ? Anime : Manga,
  };
}
