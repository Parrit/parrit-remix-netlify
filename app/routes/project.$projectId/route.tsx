import { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";

import { Footer } from "~/ui/Footer";
import { Button } from "~/ui/Button";

import "~/styles/project.css";
import hydrateProjectServer from "./server/hydrateProject.server";

export async function loader(args: LoaderFunctionArgs) {
  return await hydrateProjectServer(args);
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
