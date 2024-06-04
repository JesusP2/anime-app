import type { Config } from 'drizzle-kit';

export default {
  schema: './src/lib/db/schema',
  out: './drizzle',
  driver: 'turso',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    authToken: process.env.DATABASE_TOKEN!,
  },
} satisfies Config;
