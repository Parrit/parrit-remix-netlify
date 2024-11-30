import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import "~/styles/project.css";
import hydrateProjectServer from "./server/hydrateProject.server";
import { App } from "./contexts/App";

export async function loader(args: LoaderFunctionArgs) {
  return await hydrateProjectServer(args);
}

export default function () {
  const project = useLoaderData<typeof loader>();
  return <App project={project} />;
}
