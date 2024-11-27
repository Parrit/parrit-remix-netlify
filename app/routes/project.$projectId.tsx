import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Outlet, useLoaderData, useParams } from "@remix-run/react";

import { Footer } from "~/ui/Footer";
import { Button } from "~/ui/Button";

import "~/styles/project.css";
import { ProjectsRecord } from "src/xata";

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await sessionStorage.getSession(
    request.headers.get("cookie")
  );
  const project: ProjectsRecord = session.get("user");

  if (!project) throw redirect("/home/login");

  return project;
}

export default function () {
  return (
    <div className="project-page-container">
      <div className="project">
        <div className="sub-header">
          <h1 className="project-name">{projectData.projectName} </h1>
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
