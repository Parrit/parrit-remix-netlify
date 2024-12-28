import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { ProjectsRecord } from "src/xata";
import {
  FLOATING_IDX,
  Person,
  Project,
  Role,
} from "~/api/common/interfaces/parrit.interfaces";
import parritXataClient from "~/api/parritXataClient";
import { sessionStorage } from "~/services/session.server";
import { DropType } from "../../api/common/interfaces/dragdrop.interface";

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
      columns: ["name", "pairing_board_id"],
      as: "persons",
    },
  ])
    .filter({ xata_id: record.xata_id })
    .getFirstOrThrow();

  const hydrated = selected.toSerializable() as unknown as SerializedProject;
  hydrated.persons = hydrated.persons ?? { records: [] };
  hydrated.roles = hydrated.roles ?? { records: [] };
  hydrated.pairingBoards = hydrated.pairingBoards ?? { records: [] };

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
  const peopleMap: Map<string, Person> = hydrated.persons.records.reduce(
    (map, obj) => {
      map.set(obj.xata_id, {
        id: obj.xata_id,
        name: obj.name,
        type: "Person",
        pairing_board_id: obj.pairing_board_id ?? FLOATING_IDX,
        project_id: hydrated.xata_id,
      });
      return map;
    },
    new Map<string, Person>()
  );

  const roleMap = new Map<string, Role>(); // no "floating" roles

  const pairingBoards = hydratedPairingBoards.map((obj) => ({
    id: obj.xata_id,
    name: obj.name,
    exempt: obj.exempt,
    people: (obj.persons ?? { records: [] }).records.map((obj) => {
      const existing = peopleMap.get(obj.xata_id);
      if (existing) {
        return existing;
      }
      const person: Person = {
        id: obj.xata_id,
        name: obj.name,
        type: "Person",
        pairing_board_id: obj.pairing_board_id,
        project_id: hydrated.xata_id,
      };

      peopleMap.set(person.id, person);
      return person;
    }),
    roles: (obj.roles ?? { records: [] }).records.map((obj) => {
      const existing = roleMap.get(obj.xata_id);
      if (existing) {
        return existing;
      }
      const role: Role = {
        id: obj.xata_id,
        name: obj.name,
        type: "Role",
        pairing_board_id: obj.pairing_board_id,
        project_id: hydrated.xata_id,
      };

      roleMap.set(role.id, role);
      return role;
    }),
    type: DropType.PairingBoard,
  }));

  const project: Project = {
    id: hydrated.xata_id,
    name: hydrated.name!,
    pairingBoards,
    floating: {
      id: FLOATING_IDX,
      name: "Floating",
      exempt: false,
    },
    people: Array.from(peopleMap.values()),
    roles: Array.from(roleMap.values()),
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
  roles: {
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
  exempt: boolean;
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
