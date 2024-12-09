import { ActionFunctionArgs } from "@remix-run/node";
import parritXataClient from "~/api/parritXataClient";

export const action = async ({ request }: ActionFunctionArgs) => {
  switch (request.method) {
    case "DELETE": {
      const id = request.url.split("/").at(-1);
      if (!id) {
        console.error("No id found in", request.url);
        throw new Response("No person id found in URL", { status: 400 });
      }
      const xata = parritXataClient();
      await xata.db.Persons.delete(id);
      return null;
    }
    default: {
      console.error("no handler for method", request.method);
      throw new Response("This route doesn't know how to handle this method", {
        status: 400,
      });
    }
  }
};
