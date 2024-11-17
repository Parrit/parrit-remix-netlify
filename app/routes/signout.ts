import { ActionFunctionArgs, redirect, json } from "@remix-run/node";
import { destroySession, getSession } from "~/util/supabase/supabase.server";
import { signOut } from "~/api/signOut";
import { createSupabaseServerClient } from "~/util/supabase/supabase.server";

export async function action({ request }: ActionFunctionArgs) {
  let supabaseClient = await createSupabaseServerClient(request);
  let error = await signOut(supabaseClient);

  let session = await getSession(request.headers.get("Cookie"));

  if (error) {
    return json({ success: "Failed." }, { status: 500 });
  }

  return redirect("/home", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
}
