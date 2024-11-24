import { Outlet, useActionData } from "@remix-run/react";
import { LoaderFunctionArgs, LinksFunction } from "@remix-run/node";
import { Footer } from "~/ui/Footer";

import { ErrorResponse } from "~/models/Error.model";

type ActionData = {
  action: string;
  error: ErrorResponse;
};

import homeStyles from "~/styles/home.css?url";
import { authenticator } from "~/services/auth.server";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: homeStyles }];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticator.isAuthenticated(request, {
    successRedirect: "/project",
    // failureRedirect: "/home/login",
  });
  // console.log("home", request);
  return null;
};

export default function Home() {
  let signUpErrorResponse: ErrorResponse = {};
  let loginErrorResponse: ErrorResponse = {};

  const actionData = useActionData<ActionData>();

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
