import { ActionFunctionArgs } from "@remix-run/node";
import { FLOATING_IDX } from "~/api/common/interfaces/parrit.interfaces";
import { ParritError } from "~/api/common/ParritError";
import parritXataClient from "~/api/parritXataClient";

export const action = async ({ request }: ActionFunctionArgs) => {
  console.log("/person");
  const form = await request.formData();
  const project_id = form.get("project_id")?.toString();
  const name = form.get("name")?.toString();

  if (!name || name.length === 0) {
    throw new ParritError({
      fields: { personName: "Person Name is required" },
    });
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
