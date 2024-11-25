import React from "react";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, Link, useActionData, useLoaderData } from "@remix-run/react";
import { PROJECT_PASS, authenticator } from "~/services/auth.server";
import { Button } from "~/ui/Button";

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    return await authenticator.authenticate(PROJECT_PASS, request, {
      successRedirect: "/project",
    });
  } catch (error) {
    if (error instanceof Response) {
      return error;
    }
    throw error;
  }
};

export default function Home_Login() {
  const response = useActionData<Response>();
  console.log(response);
  if (response) {
    response.body;
  }

  const loginErrorResponse = { fieldErrors: {} };

  return (
    <Form className="form login-form" method="post">
      <h2 className="form-label">Login to your project</h2>
      <input
        className={loginErrorResponse.fieldErrors?.projectName ? "error" : ""}
        type="text"
        name="projectName"
        placeholder="Project Name"
      />
      <input
        className={loginErrorResponse.fieldErrors?.password ? "error" : ""}
        type="password"
        name="password"
        placeholder="Password"
      />
      <Button className="button-green" name="Login" type="submit" />
      <div className="error-message">
        {loginErrorResponse.fieldErrors?.projectName ??
          loginErrorResponse.fieldErrors?.password ??
          loginErrorResponse.message}
      </div>
      <Link className="button-blue" to="../signup" type="button">
        Create new project
      </Link>
    </Form>
  );
}
