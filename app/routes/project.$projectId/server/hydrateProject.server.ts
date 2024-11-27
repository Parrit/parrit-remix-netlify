import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { ProjectsRecord } from "src/xata";
import useXataClient from "~/server-hooks/useXataClient.server";
import { sessionStorage } from "~/services/session.server";

export default async ({ request }: LoaderFunctionArgs) => {
  const session = await sessionStorage.getSession(
    request.headers.get("cookie")
  );
  const project: ProjectsRecord = session.get("user");
  if (!project) throw redirect("/home/login");

  if (!request.url.endsWith(project.xata_id)) {
    // we can't look at other groups projects
    throw redirect(`/project/${project.xata_id}`);
  }

  const xata = useXataClient();
  const hydrated = await xata.db.Projects.select();
};
