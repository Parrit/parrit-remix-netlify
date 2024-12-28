import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { ProjectPairingSnapshot } from "~/api/common/interfaces/parrit.interfaces";
import postHistory from "./record_pairs.server";
import loadHistory from "./load_history.server";
import parritXataClient from "~/api/parritXataClient";

export interface HistoryDELETE {
  delete_ids: string[];
  [key: string]: string[];
}

export async function action({ request }: ActionFunctionArgs) {
  const xata = parritXataClient();

  switch (request.method) {
    case "POST": {
      const json = await request.json();
      return postHistory(json);
    }
    case "DELETE": {
      const json = (await request.json()) as HistoryDELETE;
      const { delete_ids } = json;
      if (!delete_ids) {
        console.error("No delete_ids found in", request.url);
        throw new Response("No delete_ids found in request", { status: 400 });
      }
      const ph_p = await xata.db.PairingHistory_Persons.filter({
        $any: delete_ids.map((id) => ({ pairing_history_id: id })),
      }).getAll();
      await Promise.all(
        ph_p.map(async (ph) => {
          await xata.db.PairingHistory_Persons.delete(ph.xata_id);
        })
      );
      return await Promise.all(
        delete_ids.map((id) => xata.db.PairingHistory.delete(id))
      );
    }
    default: {
      console.error("no handler for method", request.method);
      throw new Response("This route doesn't know how to handle this method", {
        status: 400,
      });
    }
  }
}

export const loader = (
  args: LoaderFunctionArgs
): Promise<ProjectPairingSnapshot[]> => loadHistory(args);
