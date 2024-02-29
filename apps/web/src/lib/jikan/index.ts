import { animeSchema, type Anime } from '../schemas/anime';
import { mangaSchema, type Manga } from '../schemas/manga';
import { HttpError } from '../utils';

const ANIME_API = import.meta.env.ANIME_API;

interface ErrorResponse {
  success: false;
  error: HttpError;
}
interface SuccessResponse<Entity> {
  success: true;
  data: Entity extends 'ANIME' ? Anime : Manga;
}
export async function fetchEntityByMalId<Entity extends 'ANIME' | 'MANGA'>(
  entity: Entity,
  id: number,
): Promise<ErrorResponse | SuccessResponse<Entity>> {
  const url = `${ANIME_API}/${entity.toLowerCase()}/${id}`;
  const response = await fetch(url);
  if (!response.ok) {
    return { success: false, error: new HttpError(500, 'Failed to fetch data') };
  }
  let schema;
  if (entity === 'ANIME') {
    schema = animeSchema;
  } else if (entity === 'MANGA') {
    schema = mangaSchema;
  } else {
    return { success: false, error: new HttpError(400, 'Invalid entity') };
  }
  const entityParsed = schema.safeParse((await response.json())['data']);
  if (!entityParsed.success) {
    return { success: false, error: new HttpError(500, 'Failed to parse anime') };
  }
  return {
    success: true,
    data: entityParsed.data as Entity extends 'ANIME' ? Anime : Manga,
  };
}
