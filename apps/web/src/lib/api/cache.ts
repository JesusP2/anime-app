import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import type { DBApi } from "./db";
import type { ApiContract } from "./contract";
import type { DBSchema } from "../db/pool";

export class Cache<T extends NodePgDatabase<DBSchema>> {
  constructor(private dbApi: DBApi<T>) {}

  async get<Fn extends keyof ApiContract>(
    fn: Fn,
    params: Parameters<ApiContract[Fn]>[0],
  ) {
    return this.dbApi[fn](params);
  }

  async set<Fn extends keyof DBApi<T>>(
    fn: Fn,
    params: Parameters<DBApi<T>[Fn]>[0],
  ) {
    return this.dbApi[fn](params as any);
  }

  async has<Fn extends keyof DBApi<T>>(
    fn: Fn,
    params: Parameters<DBApi<T>[Fn]>[0],
  ) {
    const result = await this.dbApi[fn](params as any);
    // TODO: check expiration date
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

