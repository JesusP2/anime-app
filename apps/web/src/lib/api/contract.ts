import type { ErrorResponse, SuccessResponse } from '../types';
import type { components } from './jikan.openapi';

export interface ApiContract {
  findAnimeById: (
    id: number,
  ) => Promise<
    ErrorResponse | SuccessResponse<components['schemas']['anime_full']>
  >;
  findMangaById: (
    id: number,
  ) => Promise<
    ErrorResponse | SuccessResponse<components['schemas']['manga_full']>
  >;
  findCharacterById: (
    id: number,
  ) => Promise<
    ErrorResponse | SuccessResponse<components['schemas']['character_full']>
  >;
}
