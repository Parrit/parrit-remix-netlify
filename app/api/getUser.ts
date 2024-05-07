import { type User, SupabaseClient } from "@supabase/supabase-js";
import { ErrorResponse } from "~/models/Error.model";

type getUserResponse = {
  user?: User;
  error?: ErrorResponse;
};

export async function getUser(
  supabaseClient: SupabaseClient
): Promise<getUserResponse> {
  try {
    console.log(supabaseClient);
    const { data: user, error } = await supabaseClient.auth.getUser();

    if (error || !user || !user == null) {
      throw {
        error: { message: error ? error.message : "User not found." },
      };
    }
    return { ...user };
  } catch (e) {
    console.error("Catch Error console.log: ", e);
    return { error: { message: "Failed to authenticate user." } };
  }
}
