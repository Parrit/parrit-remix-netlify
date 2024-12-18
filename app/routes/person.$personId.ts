import { ActionFunctionArgs } from "@remix-run/node";
import parritXataClient from "~/api/parritXataClient";

export const action = async ({ request }: ActionFunctionArgs) => {
  const xata = parritXataClient();
  switch (request.method) {
    case "DELETE": {
      const id = request.url.split("/").at(-1);
      if (!id) {
        console.error("No id found in", request.url);
        throw new Response("No person id found in URL", { status: 400 });
      }
      console.log("DELETE Person", id);
      await xata.db.Persons.delete(id);
      return null;
    }
    case "PUT": {
      const formData = await request.formData();
      const xata_id = formData.get("id") as string;

      if (!xata_id) {
        throw new Response("missing id");
      }

      return xata.db.Persons.update(xata_id, {
        name: formData.get("name") as string,
        project_id: formData.get("project_id") as string,
        pairing_board_id: formData.get("pairing_board_id") as string,
      });
    }
    default: {
      console.error("no handler for method", request.method);
      throw new Response("This route doesn't know how to handle this method", {
        status: 400,
      });
    }
  }
};
