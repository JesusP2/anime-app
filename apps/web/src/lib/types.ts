import type { components } from './api/jikan.openapi';
import type { HttpError } from './utils';

export interface ErrorResponse {
  success: false;
  error: HttpError;
}

export interface SuccessResponse<T> {
  success: true;
  data: T;
}

export type AnimeFull = components['schemas']['anime_full']
export type Anime = components['schemas']['anime']
export type MangaFull = components['schemas']['manga_full']
export type Manga = components['schemas']['manga']
