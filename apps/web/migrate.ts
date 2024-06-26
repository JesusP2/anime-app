import { migrate } from 'drizzle-orm/libsql/migrator';
import { db, client } from './src/lib/db/pool';
await migrate(db, { migrationsFolder: './drizzle' }).catch((err) => {
  console.error(err)
  client.close();
});
client.close();
