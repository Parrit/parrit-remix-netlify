import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { sessionStorage } from "~/services/session.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const session = await sessionStorage.getSession(
    request.headers.get("cookie")
  );
  return redirect("/home/login", {
    headers: { "Set-Cookie": await sessionStorage.destroySession(session) },
  });
};
