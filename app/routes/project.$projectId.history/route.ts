import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { ProjectPairingSnapshot } from "~/api/common/interfaces/parrit.interfaces";
import postHistory from "./record_pairs.server";
import loadHistory from "./load_history.server";

export async function action({ request }: ActionFunctionArgs) {
  const json = await request.json();

  switch (request.method) {
    case "POST": {
      return postHistory(json);
    }
    default:
      throw new Error(`Unhandled method ${request.method}`);
  }
}

export const loader = (
  args: LoaderFunctionArgs
): Promise<ProjectPairingSnapshot[]> => loadHistory(args);
