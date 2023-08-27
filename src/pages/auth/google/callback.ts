import type { APIRoute } from "astro";
import { auth, googleAuth } from "@/lib/db/lucia";
import { parseCookie } from "lucia/utils";
import { OAuthRequestError } from "@lucia-auth/oauth";

export const get: APIRoute = async (context) => {
  const cookies = parseCookie(context.request.headers.get("Cookie") ?? "");
  const storedState = cookies.google_oauth_state;
  const url = new URL(context.request.url);
  const state = url.searchParams.get("state");
  const code = url.searchParams.get("code");
  if (!storedState || !state || storedState !== state || !code) {
    return new Response(null, {
      status: 400,
    });
  }
  try {
    const { existingUser, googleUser, createUser } =
      await googleAuth.validateCallback(code);
    const getUser = async () => {
      if (existingUser) return existingUser;
      const user = await createUser({
        attributes: {
          username: googleUser.given_name + " " + googleUser.family_name,
        },
      });
      return user;
    };
    const user = await getUser();
    const session = await auth.createSession({
      userId: user.userId,
      attributes: {},
    });
    context.locals.auth.setSession(session);
    return context.redirect("/", 302);
  } catch (err) {
    if (err instanceof OAuthRequestError) {
      // invalid code
      return new Response(null, {
        status: 400,
      });
    }
    return new Response(null, {
      status: 500,
    });
  }
};
