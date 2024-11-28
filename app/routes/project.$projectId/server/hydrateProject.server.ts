import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { ProjectsRecord } from "src/xata";
import { Project } from "~/api/common/interfaces";
import useXataClient from "~/server-hooks/useXataClient.server";
import { sessionStorage } from "~/services/session.server";

/**
 * @returns a Project with floating parrits and pairing boards. We have to retrieve the board-parrits separately (sad)
 */
export default async ({ request }: LoaderFunctionArgs): Promise<Project> => {
  const session = await sessionStorage.getSession(
    request.headers.get("cookie")
  );
  const record: ProjectsRecord = session.get("user");
  if (!record) throw redirect("/home/login");

  if (!request.url.endsWith(record.xata_id)) {
    // we can't look at other groups projects
    throw redirect(`/project/${record.xata_id}`);
  }

  const xata = useXataClient();
  const selected = await xata.db.Projects.select([
    "name",
    {
      name: "<-PairingBoards.project_id",
      columns: ["name", "exempt"],
      as: "pairingBoards",
    },
    {
      name: "<-Persons.project_id",
      columns: ["name"],
      as: "persons",
    },
  ])
    .filter({ xata_id: record.xata_id })
    .getFirstOrThrow();

  const hydrated = selected.toSerializable() as unknown as SerializedProject;

  const project: Project = {
    id: hydrated.xata_id,
    name: hydrated.name!,
    pairingBoards: hydrated.pairingBoards.records.map((obj) => ({
      id: obj.xata_id,
      name: obj.name,
      exempt: obj.exempt,
      people: [],
      roles: [],
    })),
    people: hydrated.pairingBoards.records.map((obj) => ({
      id: obj.xata_id,
      name: obj.name,
    })),
  };

  return project;
};

interface SerializedProject {
  xata_id: string;
  name: string;
  pairingBoards: {
    records: { xata_id: string; name: string; exempt: boolean }[];
  };
  persons: { records: { xata_id: string; name: string }[] };
}
