export default {
  schema: "./src/lib/db/schema/index.ts",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
  out: "./drizzle",
};
