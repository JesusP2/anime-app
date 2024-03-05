import postgres from 'postgres';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { drizzle } from 'drizzle-orm/postgres-js';

const migrationsclient = postgres(process.env.DATABASE_URL!, {
  max: 1,
});
const db = drizzle(migrationsclient);
await migrate(db, { migrationsFolder: './drizzle' });
