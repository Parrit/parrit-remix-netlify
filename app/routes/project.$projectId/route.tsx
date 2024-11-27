import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { sessionStorage } from "~/services/session.server";
import { Footer } from "~/ui/Footer";
import { Button } from "~/ui/Button";
import { ProjectsRecord } from "src/xata";

import "~/styles/project.css";

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await sessionStorage.getSession(
    request.headers.get("cookie")
  );
  const project: ProjectsRecord = session.get("user");
  if (!project) throw redirect("/home/login");

  if (!request.url.endsWith(project.xata_id)) {
    // we can't look at other groups projects
    throw redirect(`/project/${project.xata_id}`);
  }

  return project;
}

export default function () {
  const { name } = useLoaderData<typeof loader>();

  return (
    <div className="project-page-container">
      <div className="project">
        <div className="sub-header">
          <h1 className="project-name">{name} </h1>
          <div className="project-actions">
            <Button
              className="button-blue"
              name="Reset Pairs"
              shortName="reset"
              tooltip="Move All Pairs to Floating"
            />
            <Button
              className="button-blue"
              name="Recommend Pairs"
              shortName="reset"
              tooltip="Automatically suggest pairings based on past paired date"
            />
            <Button
              className="button-green"
              name="Record Pairs"
              shortName="reset"
              tooltip="Make note of pairings for future recommendations"
            />
          </div>
        </div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
