import { ActionFunctionArgs } from "@remix-run/node";
import { ParritError } from "~/api/common/ParritError";
import parritXataClient from "~/api/parritXataClient";

export const action = async ({ request }: ActionFunctionArgs) => {
  const xata = parritXataClient();

  switch (request.method) {
    case "POST": {
      const form = await request.formData();
      const project_id = form.get("project_id")?.toString();
      const name = form.get("name")?.toString();

      if (!name || name.length === 0) {
        // TODO: This is an anti-pattern
        // We want to be throwing errors but that requires error boundaries
        // Error boundaries require us to render the NameForm modal component
        // Within an <Outlet> as a child route.
        // For the sake of expediency we're accepting this tech debt for the moment
        return new ParritError({
          fields: { name: "Person Name is required" },
        }).toResponse();
      }

      if (!project_id) {
        return new ParritError({
          fields: { project_id: "Project ID is required" },
        }).toResponse();
      }

      const record = await xata.db.PairingBoards.create({
        name,
        project_id,
        exempt: false,
      });
      return {
        id: record.xata_id,
        name: record.name ?? "ERROR",
        exempt: record.exempt,
      };
    }
    default:
      throw new Error(`Unhandled Method ${request.method}`);
  }
};
