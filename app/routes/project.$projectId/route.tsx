import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import "~/styles/project.css";
import hydrateProjectServer from "./server/hydrateProject.server";
import { Workspace } from "./contexts/Workspace";

export async function loader(args: LoaderFunctionArgs) {
  return await hydrateProjectServer(args);
}

export default function () {
  const project = useLoaderData<typeof loader>();
  return <Workspace project={project} />;
}
