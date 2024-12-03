import { Outlet } from "@remix-run/react";
import { LoaderFunctionArgs, LinksFunction, redirect } from "@remix-run/node";
import projectStyles from "~/styles/project.css?url";
import HeaderStyles from "~/styles/header.css?url";
import modalStyles from "~/styles/modal.css?url";
import { sessionStorage } from "~/services/session.server";
import { ProjectsRecord } from "src/xata";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: projectStyles },
    { rel: "stylesheet", href: HeaderStyles },
    { rel: "stylesheet", href: modalStyles },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await sessionStorage.getSession(
    request.headers.get("cookie")
  );
  const project: ProjectsRecord = session.get("user");
  if (!project) throw redirect("/home/login");

  if (request.url.endsWith("project")) {
    // group-level route is meaningless
    return redirect(project.xata_id);
  }

  return project;
}

export default function Project() {
  return (
    <div className="project-page-container">
      <Outlet />
    </div>
  );
}
