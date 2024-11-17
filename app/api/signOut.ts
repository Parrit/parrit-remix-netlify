import { SupabaseClient } from "@supabase/supabase-js";

export async function signOut(supabaseClient: SupabaseClient) {
  let { error } = await supabaseClient.auth.signOut({ scope: "local" });

  if (error) {
    return { error: error };
  }
  return;
}
