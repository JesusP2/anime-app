import type { APIRoute } from "astro";
import { auth, googleAuth } from "@/lib/db/lucia";
import { parseCookie } from "lucia/utils";
import { OAuthRequestError } from "@lucia-auth/oauth";
import { db } from "@/lib/db/pool";
import { user as userSchema } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

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
    if (!googleUser.email) {
      return new Response(
        JSON.stringify({ message: "Invalid email coming from google oauth" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
    // existingUser is using the sub property to check if there is already a user created
    // with this google account, but we want to check if there's already a user created
    // with that email.
    const users = await db
      .select()
      .from(userSchema)
      .where(eq(userSchema.email, googleUser.email))
      .execute();
    let user: { id: string, username?: string | null; };
    if (existingUser) {
      user = existingUser;
    } else if (users.length && users[0]) {
      user = users[0];
      // NOTE: If someone already used this email to register with email+password then you'll share this account this is bad but I couldn't care less
      await auth.createKey({
        userId: users[0]?.id!,
        providerId: "google",
        providerUserId: googleUser.sub,
        password: null,
      });
    } else {
      user = await createUser({
        attributes: {
          email: googleUser.email,
          avatar_image: googleUser.picture,
        },
      });
    }
    const session = await auth.createSession({
      userId: user.id,
      attributes: {},
    });
    context.locals.auth.setSession(session);
    return new Response(null, {
      status: 302,
      headers: {
        Location: user?.username ? "/" : "/create-profile",
      },
    });
  } catch (err) {
    if (err instanceof OAuthRequestError) {
      return new Response(null, {
        status: 400,
      });
    }
    console.error(err);
    return new Response(null, {
      status: 500,
    });
  }
};
