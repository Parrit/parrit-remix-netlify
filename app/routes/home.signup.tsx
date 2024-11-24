import { LoaderFunctionArgs } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { Button } from "~/ui/Button";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return {
    signUpErrorResponse: {
      fieldErrors: {
        projectName: null,
        password: null,
      },
      message: "",
    },
  };
};

export default function Home_Signup() {
  const { signUpErrorResponse } = useLoaderData<typeof loader>();
  return (
    <Form className="form new-form" method="post">
      <h2 className="form-label">Create a project</h2>
      <input
        className={signUpErrorResponse?.fieldErrors?.projectName ? "error" : ""}
        type="text"
        name="projectName"
        placeholder="Project Name"
      />
      <input
        className={signUpErrorResponse.fieldErrors?.password ? "error" : ""}
        type="password"
        name="password"
        placeholder="Password"
      />
      <Button className="button-green" name="Create" type="submit" />
      <div className="error-message">
        {signUpErrorResponse.fieldErrors?.projectName ??
          signUpErrorResponse.fieldErrors?.password ??
          signUpErrorResponse.message}
      </div>
      <Link className="button-blue" to="../login" type="button">
        Login to existing project
      </Link>
    </Form>
  );
}
