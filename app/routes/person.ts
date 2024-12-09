import { ActionFunctionArgs } from "@remix-run/node";
import { FLOATING_IDX } from "~/api/common/interfaces/parrit.interfaces";
import { ParritError } from "~/api/common/ParritError";
import parritXataClient from "~/api/parritXataClient";

export const action = async ({ request }: ActionFunctionArgs) => {
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
  const xata = parritXataClient();

  const record = await xata.db.Persons.create({
    name,
    project_id,
  });
  return {
    id: record.xata_id,
    name: record.name ?? "ERROR",
    type: "Person",
    pairing_board_id: FLOATING_IDX,
  };
};
