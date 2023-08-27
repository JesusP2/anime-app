import { serializeCookie } from "lucia/utils";
import { googleAuth } from "@/lib/db/lucia";
import type { APIRoute } from "astro";

export const get: APIRoute = async () => {
  const [url, state] = await googleAuth.getAuthorizationUrl();
  const cookie = serializeCookie("google_oauth_state", state, {
    httpOnly: true,
    secure: import.meta.env.PROD,
    path: "/",
    maxAge: 60 * 60,
  })
  // NOTE: same as redirect but it lets you set a cookie instead of setting a cookie first and
  // then doing the redirect
  return new Response(null, {
    status: 302,
    headers: {
      Location: url.toString(),
      'Set-Cookie': cookie
    }
  })
};
