import { Outlet, useActionData } from "@remix-run/react";
import { LoaderFunctionArgs } from "@remix-run/node";

import { LinksFunction } from "@remix-run/node";
import { Footer } from "~/ui/Footer";

import { ErrorResponse } from "~/models/Error.model";

type ActionData = {
  action: string;
  error: ErrorResponse;
};

import homeStyles from "~/styles/home.css?url";
import { authenticator } from "~/services/auth.server";

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: homeStyles }];
};

// const setAuthSession = (session: AuthSession) => {
//   console.warn("Setting Auth session not yet implemented");
//   console.warn(session);
//   return session.session;
// };

// const commitSession = async (session: Session): Promise<string> =>
//   "DEMO_TEST_SESSION";

// export async function action({ request }: ActionFunctionArgs) {
//   let session = {} as Session<SessionData, SessionData>;
//   let formData = await request.formData();
//   let _action = String(formData.get("_action"));
//   let email = String(formData.get("email"));
//   let password = String(formData.get("password"));

//   if (_action == "sign-up") {
//     let { accessToken, refreshToken, error } = await signUp({
//       email,
//       password,
//     });
//     if (error) {
//       return { action: _action, error: error };
//     }
//     if (!accessToken || !refreshToken) {
//       return { action: _action, error: { message: "Something went wrong" } };
//     }
//     session = setAuthSession({ session, accessToken, refreshToken });
//     return redirect("/project", {
//       headers: {
//         "Set-Cookie": await commitSession(session),
//       },
//     });
//   }

//   if (_action == "login") {
//     return await authenticator.authenticate(PROJECT_PASS, request, {
//       successRedirect: "/project",
//       failureRedirect: "/home",
//     });
//   }
// }

export const loader = async ({ request }: LoaderFunctionArgs) =>
  await authenticator.isAuthenticated(request, {
    successRedirect: "/project",
  });

export default function Home() {
  let signUpErrorResponse: ErrorResponse = {};
  let loginErrorResponse: ErrorResponse = {};

  let actionData = useActionData<ActionData>();

  if (actionData?.error && actionData?.action == "sign-up") {
    signUpErrorResponse = actionData?.error;
  }

  if (actionData?.error && actionData?.action == "login") {
    loginErrorResponse = actionData?.error;
  }

  return (
    <div className="layout-wrapper dashboard-container">
      <main className="dashboard-content-container">
        <div className="dashboard-content">
          <div className="logo" />
          <div className="description">
            A historical recommendation engine for daily pair rotation
            management, with an interactive visual aide of each pairing team.
          </div>

          <div className="forms-container">
            <Outlet />
          </div>

          <div className="feedback-container">
            <div className="caption">What do you think of Parrit?</div>
            <a
              className="text-link"
              href="https://goo.gl/forms/ZGqUyZDEDSWqZVBP2"
              target="_blank"
              rel="noopener noreferrer"
            >
              Send feedback
              <span className="carrot" />
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
