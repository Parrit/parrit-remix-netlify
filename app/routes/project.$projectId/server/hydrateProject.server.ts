import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { ProjectsRecord } from "src/xata";
import {
  FLOATING_IDX,
  Project,
} from "~/api/common/interfaces/parrit.interfaces";
import parritXataClient from "~/api/parritXataClient";
import { sessionStorage } from "~/services/session.server";
import { DropType } from "../../../api/common/interfaces/dragdrop.interface";

/**
 * Retrieves a project with its pairing boards and people.
 * @throws {typeof redirect} redirects to login if user is not found.
 * @throws {typeof redirect} redirects to user's project if accessing another project.
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

  const xata = parritXataClient();
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

  const selectedPairingBoards = await xata.db.PairingBoards.select([
    "name",
    "exempt",
    {
      name: "<-Persons.pairing_board_id",
      columns: ["name", "pairing_board_id"],
      as: "persons",
    },
    {
      name: "<-PairingBoardRoles.pairing_board_id",
      columns: ["name", "pairing_board_id"],
      as: "roles",
    },
  ])
    .filter({
      xata_id: {
        $any: hydrated.pairingBoards.records.map((pb) => pb.xata_id),
      },
    })
    .getMany();

  const hydratedPairingBoards =
    selectedPairingBoards.toSerializable() as unknown as SerializedPairingBoard[];

  const project: Project = {
    id: hydrated.xata_id,
    name: hydrated.name!,
    pairingBoards: hydratedPairingBoards.map((obj) => ({
      id: obj.xata_id,
      name: obj.name,
      exempt: obj.exempt === "true",
      people: (obj.persons ?? { records: [] }).records.map((obj) => ({
        id: obj.xata_id,
        name: obj.name,
        type: "Person",
        pairing_board_id: obj.pairing_board_id,
      })),
      roles: (obj.roles ?? { records: [] }).records.map((obj) => ({
        id: obj.xata_id,
        name: obj.name,
        type: "Role",
        pairing_board_id: obj.pairing_board_id,
      })),
      type: DropType.PairingBoard,
    })),
    floating: {
      people: hydrated.persons.records.map((obj) => ({
        id: obj.xata_id,
        name: obj.name,
        type: "Person",
        pairing_board_id: FLOATING_IDX,
      })),
      id: FLOATING_IDX,
      name: "Floating",
      exempt: false,
      roles: [],
    },
  };

  return project;
};

interface SerializedProject {
  xata_id: string;
  name: string;

  pairingBoards: {
    records: { xata_id: string }[];
  };
  persons: {
    records: {
      xata_id: string;
      name: string;
      pairing_board_id: string;
    }[];
  };
}

interface SerializedPairingBoard {
  xata_id: string;
  name: string;
  exempt: string;
  persons?: {
    records: {
      xata_id: string;
      name: string;
      pairing_board_id: string;
    }[];
  };
  roles?: {
    records: {
      xata_id: string;
      name: string;
      pairing_board_id: string;
    }[];
  };
}
