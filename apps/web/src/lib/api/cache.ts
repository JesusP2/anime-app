import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import type { DBApi } from "./db";
import type { DBSchema } from "../db/pool";

export class Cache<T extends NodePgDatabase<DBSchema>> {
  constructor(private dbApi: DBApi<T>) {}
  async has<Fn extends keyof DBApi<T>>(
    fn: Fn,
    params: Parameters<DBApi<T>[Fn]>[0],
  ) {
    const result = await this.dbApi[fn](params as any);
    // TODO: check expiration date too
    if (
      result &&
      (!result.success ||
        (Array.isArray(result.data) && result.data.length === 0) ||
        !result.data)
    ) {
      return false;
    }
    return true;
  }
}
