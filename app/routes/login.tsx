import "~/styles/login.css";
import { useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs } from "@remix-run/node";

import { Form } from "@remix-run/react";

export function loader({ request }: LoaderFunctionArgs) {
  return { projectName: "Project Name" };
}

export default function Login() {
  let loaderData = useLoaderData<typeof loader>();
  return (
    <body>
      <div className="login-container">
        <div className="login">
          <div className="project-name">{loaderData.projectName}</div>
          <div className="lock-icon"></div>
          <Form className="">
            <input placeholder="Password"></input>
          </Form>
        </div>
      </div>
    </body>
  );
}
