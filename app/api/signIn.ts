import { type SupabaseClient } from "@supabase/supabase-js";
import { ErrorResponse } from "~/models/Error.model";
import { validateLoginCredentials } from "~/util/auth/validate.server";

type SignInResponse = {
  accessToken?: string;
  refreshToken?: string;
  error?: ErrorResponse;
};

export async function signIn(email: string, password: string, supabaseClient: SupabaseClient): Promise<SignInResponse> {
  try {
    let validationError = validateLoginCredentials(email, password);

    if (validationError) {
      return { error: validationError };
    }

    let { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });
    return data.session
      ? {
          accessToken: data.session.access_token,
          refreshToken: data.session.refresh_token,
        }
      : { error: { message: error?.message } };
  } catch {
    return { error: { message: "Something went wrong" } };
  }
}
