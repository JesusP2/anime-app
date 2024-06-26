import { lucia } from 'lucia';
import { astro } from 'lucia/middleware';
import { pg } from '@lucia-auth/adapter-postgresql';
import { pool } from './pool';
import { google } from '@lucia-auth/oauth/providers';

export const auth = lucia({
  adapter: pg(pool, {
    user: 'anime_auth_user',
    session: 'anime_user_session',
    key: 'anime_user_key',
  }),
  env: import.meta.env.DEV ? 'DEV' : 'PROD',
  middleware: astro(),

  getUserAttributes: (data) => {
    return data;
  },
});

export const googleAuth = google(auth, {
  clientId: import.meta.env.GOOGLE_CLIENT_ID,
  clientSecret: import.meta.env.GOOGLE_CLIENT_SECRET,
  redirectUri: import.meta.env.GOOGLE_REDIRECT_URI,
  scope: ['email', 'openid'],
});

export type Auth = typeof auth;
