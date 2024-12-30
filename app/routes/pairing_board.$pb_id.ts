import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import {
  FLOATING_IDX,
  PairingBoard,
} from "~/api/common/interfaces/parrit.interfaces";
import parritXataClient from "~/api/parritXataClient";

export const action = async ({ request }: ActionFunctionArgs) => {
  const xata = parritXataClient();
  const id = request.url.split("/").at(-1);
  if (!id) {
    console.error("No id found in", request.url);
    throw new Response("No pairing board id found in URL", { status: 400 });
  }

  if (id === FLOATING_IDX) {
    throw new Response("Cannot modify floating pairing board", { status: 200 });
  }

  switch (request.method) {
    case "PATCH": {
      const json = await request.json();
      return xata.db.PairingBoards.update(id, { name: json.name });
    }
    case "DELETE": {
      // move all marooned people to floating pairing board
      const people = await xata.db.Persons.filter({
        pairing_board_id: id,
      }).getAll();
      await Promise.all(
        people.map((p) =>
          xata.db.Persons.update(p.xata_id, { pairing_board_id: FLOATING_IDX })
        )
      );
      // delete all roles associated with pairing board
      const roles = await xata.db.PairingBoardRoles.filter({
        pairing_board_id: id,
      }).getAll();
      await Promise.all(
        roles.map((r) => xata.db.PairingBoardRoles.delete(r.xata_id))
      );
      return xata.db.PairingBoards.delete(id);
    }
    default:
      throw new Error(`Unhandled Method ${request.method}`);
  }
};

export const loader = async ({
  request,
}: LoaderFunctionArgs): Promise<PairingBoard> => {
  const xata = parritXataClient();
  const id = request.url.split("/").at(-1);
  if (!id) {
    console.error("No id found in", request.url);
    throw new Response("No pairing board id found in URL", { status: 400 });
  }

  if (id === FLOATING_IDX) {
    return {
      id: FLOATING_IDX,
      name: "Floating",
      exempt: true,
    };
  }

  const serialized = (await xata.db.PairingBoards.read(id))?.toSerializable();
  if (!serialized) {
    throw new Response("Pairing board not found", { status: 404 });
  }
  if (!serialized.name) {
    throw new Response("Pairing board missing required fields", {
      status: 500,
    });
  }
  return {
    id: serialized.xata_id,
    name: serialized.name,
    exempt: serialized.exempt ?? false,
  };
};
