import React from "react";
import { ActionFunctionArgs } from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import { PROJECT_PASS, authenticator } from "~/services/auth.server";
import { Button } from "~/ui/Button";
import { ParritError } from "~/api/common/ParritError";
import { LoginRequest, LoginResult } from "~/api/common/interfaces";

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
  const data = useActionData<typeof action>() as LoginResult | undefined;
  const error = ParritError.fromString<LoginRequest>(data?.message);

  return (
    <Form className="form login-form" method="post">
      <h2 className="form-label">Login to your project</h2>
      <div className="error-message">{error?.data.fields?.projectName}</div>
      <input
        className={error?.data.fields?.projectName ? "error" : ""}
        type="text"
        name="projectName"
        placeholder="Project Name"
      />
      <div className="error-message">{error?.data.fields?.password}</div>
      <input
        className={error?.data.fields?.password ? "error" : ""}
        type="password"
        name="password"
        placeholder="Password"
      />
      <Button className="button-green" name="Login" type="submit" />
      <div className="error-message">{error?.data.server}</div>
      <Link className="button-blue" to="../signup" type="button">
        Create new project
      </Link>
    </Form>
  );
}
