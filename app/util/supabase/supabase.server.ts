import { createCookieSessionStorage } from "@remix-run/node";
import { createServerClient, parse, serialize } from "@supabase/ssr";
import { Database } from "database.types";

export function createSupabaseServerClient(request: Request) {
  const cookies = parse(request.headers.get("Cookie") ?? "");
  const headers = new Headers();

  return createServerClient<Database>(process.env.SUPABASE_URL, process.env.SUPABASE_KEY, {
    cookies: {
      get(key) {
        return cookies[key];
      },
      set(key, value, options) {
        headers.append("Set-Cookie", serialize(key, value, options));
      },
      remove(key, options) {
        headers.append("Set-Cookie", serialize(key, "", options));
      },
    },
  });
}

export const { getSession, commitSession, destroySession } = createCookieSessionStorage({
  cookie: {
    name: "sb:session",
    secrets: ["secret-key"],
    httpOnly: true,
    secure: process.env.NODE_ENV == "production",
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  },
});
