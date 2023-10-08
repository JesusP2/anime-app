import { auth } from './lib/db/lucia';

import type { MiddlewareResponseHandler } from 'astro';

export const onRequest: MiddlewareResponseHandler = async (context, next) => {
  try {
    context.locals.auth = auth.handleRequest(context);
  } catch (err) {
    console.error('no idea if this is even the problem', err);
  }
  return await next();
};
