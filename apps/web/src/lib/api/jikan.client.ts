import type { paths } from './jikan.openapi';
import createClient from 'openapi-fetch';

export const client = createClient<paths>({
  baseUrl: import.meta.env.ANIME_API,
});
