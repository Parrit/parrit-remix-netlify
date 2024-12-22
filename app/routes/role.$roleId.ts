import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import parritXataClient from "~/api/parritXataClient";

export const action = async ({ request }: ActionFunctionArgs) => {
  const xata = parritXataClient();
  const id = request.url.split("/").at(-1);
  if (!id) {
    console.error("No id found in", request.url);
    throw new Response("No role id found in URL", { status: 400 });
  }

  switch (request.method) {
    case "PATCH": {
      const json = await request.json();
      console.log("PATCH", json);
      return xata.db.PairingBoardRoles.update(id, {
        name: json.name,
        pairing_board_id: json.pairing_board_id,
      });
    }
    case "DELETE": {
      return xata.db.PairingBoardRoles.delete(id);
    }
    default:
      throw new Error(`Unhandled Method ${request.method}`);
  }
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const xata = parritXataClient();
  const id = request.url.split("/").at(-1);
  if (!id) {
    console.error("No id found in", request.url);
    throw new Response("No role id found in URL", { status: 400 });
  }

  const serialized = (
    await xata.db.PairingBoardRoles.read(id)
  )?.toSerializable();
  if (!serialized) {
    throw new Response("Role not found", { status: 404 });
  }
  if (!serialized.name) {
    throw new Response("Role missing required fields", {
      status: 500,
    });
  }
  return {
    id: serialized.xata_id,
    name: serialized.name,
    pairing_board_id: serialized.pairing_board_id,
  };
};
