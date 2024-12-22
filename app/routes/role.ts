import { ActionFunctionArgs } from "@remix-run/node";
import { ParritError } from "~/api/common/ParritError";
import parritXataClient from "~/api/parritXataClient";

export const action = async ({ request }: ActionFunctionArgs) => {
  const xata = parritXataClient();

  switch (request.method) {
    case "POST": {
      const form = await request.formData();
      const pairing_board_id = form.get("pairing_board_id")?.toString();
      const name = form.get("name")?.toString();
      console.log("POST /role", { pairing_board_id, name });

      if (!name || name.length === 0) {
        // TODO: This is an anti-pattern
        // We want to be throwing errors but that requires error boundaries
        // Error boundaries require us to render the NameForm modal component
        // Within an <Outlet> as a child route.
        // For the sake of expediency we're accepting this tech debt for the moment
        return new ParritError({
          fields: { name: "Role Name is required" },
        }).toResponse();
      }

      const record = (
        await xata.db.PairingBoardRoles.create({
          name,
          pairing_board_id,
        })
      ).toSerializable();

      return {
        id: record.xata_id,
        name: record.name ?? "ERROR",
        pairing_board_id: record.pairing_board_id,
      };
    }
  }
};
