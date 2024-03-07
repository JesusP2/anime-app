import { auth } from './lib/db/lucia';

import type { MiddlewareHandler } from 'astro';

export const onRequest: MiddlewareHandler = async (context, next) => {
  try {
    context.locals.auth = auth.handleRequest(context);
  } catch (err) {
    console.error('no idea if this is even the problem', err);
  }
  return await next();
};
