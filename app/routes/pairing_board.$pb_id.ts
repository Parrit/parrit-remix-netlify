import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { PairingBoard } from "~/api/common/interfaces/parrit.interfaces";
import parritXataClient from "~/api/parritXataClient";

export const action = async ({ request }: ActionFunctionArgs) => {
  const xata = parritXataClient();
  const id = request.url.split("/").at(-1);
  if (!id) {
    console.error("No id found in", request.url);
    throw new Response("No pairing board id found in URL", { status: 400 });
  }

  switch (request.method) {
    case "PATCH": {
      const json = await request.json();
      return xata.db.PairingBoards.update(id, { name: json.name });
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
