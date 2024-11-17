import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";

import { Footer } from "~/ui/Footer";
import { Button } from "~/ui/Button";

import "~/styles/project.css";
import { createSupabaseServerClient } from "~/util/supabase/supabase.server";

export async function loader({ request }: LoaderFunctionArgs) {
  let supabaseClient = createSupabaseServerClient(request);

  return { projectName: "Data" };
}

export default function ProjectId() {
  let projectData = useLoaderData<typeof loader>();

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
