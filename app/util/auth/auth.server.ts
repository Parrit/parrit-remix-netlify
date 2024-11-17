import { type SupabaseClient, type User } from "@supabase/supabase-js";
import { ErrorResponse } from "~/models/Error.model";
import { commitSession, destroySession, getSession } from "~/util/supabase/supabase.server";
import { Session, redirect, json } from "@remix-run/node";
import { createSupabaseServerClient } from "~/util/supabase/supabase.server";

export async function authenticate(request: Request, redirectTo?: string) {
  try {
    let supabaseClient = createSupabaseServerClient(request);
    let session = await getSession(request.headers.get("Cookie"));
    let url = new URL(request.url);
    let redirectUrl = redirectTo || `${url.origin}${url.pathname}${url.search}`;
    let hasActiveSession = hasActiveAuthSession(session);

    if (!hasActiveSession) {
      const { accessToken, refreshToken, error } = await refreshUserToken(session, supabaseClient);
      if (error || !accessToken || !refreshToken) {
        throw new Error("Failed to refresh user token.");
      }

      session = setAuthSession(session, accessToken, refreshToken);

      throw redirect(redirectUrl, {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      });
    }

    const { data: user, error } = await supabaseClient.auth.getUser(session.get("access_token"));

    if (error || !user.user) {
      throw new Error("Failed to authenticate user.");
    }

    return { user: user.user };
  } catch (e) {
    console.error("Catch Error console.log: ", e);
    throw redirect("/home", 401);
  }
}

function hasActiveAuthSession(session: Session) {
  try {
    return session.has("access_token");
  } catch (e) {
    return false;
  }
}

export function setAuthSession(session: Session, accessToken: string, refreshToken: string) {
  session.set("access_token", accessToken);
  session.set("refresh_token", refreshToken);
  return session;
}

async function refreshUserToken(session: Session, supabaseClient: SupabaseClient) {
  try {
    const { data, error } = await supabaseClient.auth.refreshSession(session.get("refresh_token"));

    if (error) {
      return { error: error.message };
    }
    return {
      user: data?.user,
      accessToken: data?.session?.access_token,
      refreshToken: data?.session?.refresh_token,
    };
  } catch (e) {
    return { error: "Something went wrong." };
  }
}
