import { type SupabaseClient } from "@supabase/supabase-js";
import { ErrorResponse } from "~/models/Error.model";
import { validateCredentials } from "app/util/auth/validate.server";

type SignUpResponse = {
  accessToken?: string;
  refreshToken?: string;
  error?: ErrorResponse;
};

export async function signUp(
  email: string,
  password: string,
  supabaseClient: SupabaseClient
): Promise<SignUpResponse> {
  try {
    let validationError = validateCredentials(email, password);

    if (validationError) {
      return { error: validationError };
    }

    let response = await supabaseClient.auth.signUp({ email, password });

    return response.data.session
      ? {
          accessToken: response.data.session.access_token,
          refreshToken: response.data.session.refresh_token,
        }
      : { error: { message: "Something went wrong" } };
  } catch {
    return { error: { message: "Something went wrong" } };
  }
}
