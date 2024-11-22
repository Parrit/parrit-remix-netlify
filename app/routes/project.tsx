import Header, { links as headerLinks } from "~/ui/Header";
import { Outlet } from "@remix-run/react";
import { LoaderFunctionArgs, LinksFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import projectStyles from "~/styles/project.css?url";

import getProject from "~/api/getProject";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: projectStyles },
    { rel: "stylesheet", href: headerLinks()[0].href },
  ];
};

type projectLoaderData = {
  projectId: string;
  projectName: string;
};

export async function loader({
  request,
}: LoaderFunctionArgs): Promise<projectLoaderData> {
  let project = await getProject(request);

  let project1: projectLoaderData = {
    projectId: "1",
    projectName: "Project 1",
  };
  return { ...project1 };
}

export default function Project() {
  let loaderData = useLoaderData<typeof loader>();

  return (
    <div className="project-page-container">
      <Header />

      {<h1>{loaderData.projectName}</h1>}
      <Outlet />
    </div>
  );
}
