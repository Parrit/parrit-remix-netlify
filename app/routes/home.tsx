import { Form, useActionData } from "@remix-run/react";
import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { cssBundleHref } from "@remix-run/css-bundle";

import { LinksFunction } from "@remix-run/node";

import { Button } from "~/ui/Button";
import { Footer } from "~/ui/Footer";

import { ErrorResponse } from "~/models/Error.model";

import { setAuthSession } from "~/util/auth/auth.server";
import { createSupabaseServerClient } from "~/util/supabase/supabase.server";
import { getSession, commitSession } from "~/util/supabase/supabase.server";
import { signUp } from "~/api/signUp";
import { signIn } from "~/api/signIn";

type ActionData = {
  action: string;
  error: ErrorResponse;
};

import homeStyles from "~/styles/home.css";

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: homeStyles }];
};

export async function action({ request }: ActionFunctionArgs) {
  let session = await getSession(request.headers.get("Cookie"));

  let formData = await request.formData();
  let _action = String(formData.get("_action"));
  let email = String(formData.get("email"));
  let password = String(formData.get("password"));

  let supabaseClient = createSupabaseServerClient(request);

  if (_action == "sign-up") {
    let { accessToken, refreshToken, error } = await signUp(email, password, supabaseClient);

    if (error) {
      return { action: _action, error: error };
    }
    if (!accessToken || !refreshToken) {
      return { action: _action, error: { message: "Something went wrong" } };
    }
    session = setAuthSession(session, accessToken, refreshToken);

    return redirect("/project", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  if (_action == "login") {
    let { accessToken, refreshToken, error } = await signIn(email, password, supabaseClient);

    if (error) {
      return { action: _action, error: error };
    }

    if (!accessToken || !refreshToken) {
      return {
        action: _action,
        error: { message: "Something is wrong with your credentials." },
      };
    }

    session = setAuthSession(session, accessToken, refreshToken);

    return redirect("/project", {
      headers: { "Set-Cookie": await commitSession(session) },
    });
  }
}

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
            A historical recommendation engine for daily pair rotation management, with an
            interactive visual aide of each pairing team.
          </div>

          <div className="forms-container">
            <Form className="form new-form" method="post">
              <input type="hidden" name="_action" value="sign-up"></input>
              <h2 className="form-label">Create an account</h2>
              <input
                className={signUpErrorResponse?.fieldErrors?.email ? "error" : ""}
                type="text"
                name="email"
                placeholder="Email"
              />
              <input
                className={signUpErrorResponse.fieldErrors?.password ? "error" : ""}
                type="password"
                name="password"
                placeholder="Password"
              />
              <Button className="button-blue" name="Create" type="submit" />
              <div className="error-message">
                {signUpErrorResponse.fieldErrors?.email ??
                  signUpErrorResponse.fieldErrors?.password ??
                  signUpErrorResponse.message}
              </div>
            </Form>

            <div className="dotted-line" />

            <Form className="form login-form" method="post">
              <input type="hidden" name="_action" value="login"></input>
              <h2 className="form-label">Login to your account</h2>
              <input
                className={loginErrorResponse.fieldErrors?.email ? "error" : ""}
                type="text"
                name="email"
                placeholder="Email"
              />
              <input
                className={loginErrorResponse.fieldErrors?.password ? "error" : ""}
                type="password"
                name="password"
                placeholder="Password"
              />
              <Button className="button-green" name="Login" type="submit" />
              <div className="error-message">
                {loginErrorResponse.fieldErrors?.email ??
                  loginErrorResponse.fieldErrors?.password ??
                  loginErrorResponse.message}
              </div>
            </Form>
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
