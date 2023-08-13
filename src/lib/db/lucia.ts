import { lucia } from "lucia";
import { astro } from "lucia/middleware";
import { pg } from "@lucia-auth/adapter-postgresql";
import { pool } from "./pool";

export const auth = lucia({
  adapter: pg(pool, {
    user: "auth_user",
    session: "user_session",
    key: "user_key",
  }),
	env: import.meta.env.DEV ? "DEV" : "PROD",
	middleware: astro(),

	getUserAttributes: (data) => {
		return {
			username: data.username
		};
	}
});

export type Auth = typeof auth;

