import { ActionFunction } from "@remix-run/node";
import { Person } from "~/api/common/interfaces/parrit.interfaces";
import parritXataClient from "~/api/parritXataClient";

export interface BulkPersonUpdate {
  persons: Person[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export const action: ActionFunction = async ({ request }) => {
  const xata = parritXataClient();
  switch (request.method) {
    case "PUT": {
      const json = (await request.json()) as BulkPersonUpdate;
      return await xata.transactions.run(
        json.persons.map((p) => ({
          update: {
            table: "Persons",
            id: p.id,
            fields: {
              project_id: p.project_id,
              pairing_board_id: p.pairing_board_id,
              name: p.name,
            },
          },
        }))
      );
    }
    default: {
      console.error("no handler for method", request.method);
      throw new Response("This route doesn't know how to handle this method", {
        status: 400,
      });
    }
  }
};
