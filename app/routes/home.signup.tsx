import { ActionFunctionArgs } from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import {
  LoginResult,
  LoginRequest,
} from "~/api/common/interfaces/network.interfaces";
import { ParritError } from "~/api/common/ParritError";

import { NEW_PROJECT, authenticator } from "~/services/auth.server";
import { Button } from "~/ui/Button";

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    return await authenticator.authenticate(NEW_PROJECT, request, {
      successRedirect: "/project",
    });
  } catch (error) {
    if (error instanceof Response) {
      return error;
    }
    throw error;
  }
};

export default function Home_Signup() {
  const data = useActionData<typeof action>() as LoginResult | undefined;
  const error = ParritError.fromString<LoginRequest>(data?.message);

  return (
    <Form className="form new-form" method="post">
      <h2 className="form-label">Create a project</h2>
      <div data-testid="project_name_error" className="error-message">
        {error?.data.fields?.projectName}
      </div>
      <input
        className={error?.data.fields?.projectName ? "error" : ""}
        type="text"
        name="projectName"
        placeholder="Project Name"
        data-testid="projectName"
      />
      <div data-testid="password_error" className="error-message">
        {error?.data.fields?.password}
      </div>
      <input
        className={error?.data.fields?.password ? "error" : ""}
        type="password"
        name="password"
        placeholder="Password"
        data-testid="password"
      />
      <Button className="button-blue" type="submit" data-testid="submit">
        Create
      </Button>
      <div data-testid="server_error" className="error-message">
        {error?.data.server}
      </div>
      <Link
        className="button-blue"
        to="../login"
        type="button"
        data-testid="goToLogin"
      >
        Login to existing project
      </Link>
    </Form>
  );
}
