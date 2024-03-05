import pkg from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema'
const { Pool } = pkg;

export const pool = new Pool({
  connectionString: import.meta.env.DATABASE_URL,
});
export const db = drizzle(pool, { schema });
export type DBSchema = typeof schema;
