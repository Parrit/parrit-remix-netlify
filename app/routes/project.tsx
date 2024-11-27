import {
  Form,
  Link,
  Outlet,
  useLoaderData,
  useNavigate,
  useParams,
} from "@remix-run/react";
import {
  LoaderFunctionArgs,
  LinksFunction,
  redirect,
  ActionFunctionArgs,
} from "@remix-run/node";
import projectStyles from "~/styles/project.css?url";
import HeaderStyles from "~/styles/header.css?url";
import { sessionStorage } from "~/services/session.server";

import { ProjectsRecord } from "src/xata";
import { useEffect } from "react";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: projectStyles },
    { rel: "stylesheet", href: HeaderStyles },
  ];
};

export async function action({ request }: ActionFunctionArgs) {
  const session = await sessionStorage.getSession(
    request.headers.get("cookie")
  );
  return redirect("/home/login", {
    headers: { "Set-Cookie": await sessionStorage.destroySession(session) },
  });
}

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await sessionStorage.getSession(
    request.headers.get("cookie")
  );
  const project: ProjectsRecord = session.get("user");

  if (!project) throw redirect("/home/login");

  if (request.url.endsWith("project")) {
    return redirect(project.xata_id);
  }

  return project;
}

export default function Project() {
  return (
    <div className="project-page-container">
      <header>
        <div className="header-logo"></div>
        <div className="links">
          <Form method="delete" navigate={false}>
            <button className="logout" name="logout">
              LOGOUT
            </button>
          </Form>
          <Link className="" to="https://goo.gl/forms/ZGqUyZDEDSWqZVBP2">
            Feedback
          </Link>
        </div>
      </header>
      <Outlet />
    </div>
  );
}
