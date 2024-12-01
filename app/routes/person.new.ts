import { ActionFunctionArgs } from "@remix-run/node";
import { DragType } from "~/api/common/interfaces/dragdrop.interface";
import { FLOATING_IDX } from "~/api/common/interfaces/parrit.interfaces";
import { ParritError } from "~/api/common/ParritError";
import getXataClient from "~/api/getXataClient.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  console.log("request", request);
  const form = await request.formData();
  console.log("form", form);
  const project_id = form.get("project_id")?.toString();
  const name = form.get("name")?.toString();

  if (!name || name.length === 0) {
    throw new ParritError({
      fields: { personName: "Person Name is required" },
    });
  }
  const xata = getXataClient();

  const record = await xata.db.Persons.create({
    name,
    project_id,
  });
  return {
    id: record.xata_id,
    name: record.name ?? "ERROR",
    type: DragType.Person,
    pairing_board_id: FLOATING_IDX,
  };
};
