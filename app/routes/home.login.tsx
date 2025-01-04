import { ActionFunctionArgs } from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import { PROJECT_PASS, authenticator } from "~/services/auth.server";
import { ParritError } from "~/api/common/ParritError";
import {
  LoginResult,
  LoginRequest,
} from "~/api/common/interfaces/network.interfaces";
import { Button } from "~/ui/Button";

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    return await authenticator.authenticate(PROJECT_PASS, request, {
      successRedirect: "/project",
    });
  } catch (error) {
    console.error(error);
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
      <Button className="button-green" type="submit" data-testid="submit">
        Login
      </Button>
      <div data-testid="server_error" className="error-message">
        {error?.data.server}
      </div>
      <Link
        className="button-blue"
        to="../signup"
        type="button"
        data-testid="goToSignup"
      >
        Create new project
      </Link>
    </Form>
  );
}
