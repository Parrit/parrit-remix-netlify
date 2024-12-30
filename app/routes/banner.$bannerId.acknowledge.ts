import { ActionFunction } from "@remix-run/node";
import parritXataClient from "~/api/parritXataClient";

export const action: ActionFunction = async ({ request }) => {
  const xata = parritXataClient();
  const banner_id = request.url.split("/").at(-2);
  if (!banner_id) {
    console.error("No id found in", request.url);
    throw new Response("No banner id found in URL", { status: 400 });
  }
  switch (request.method) {
    case "POST": {
      const { project_id } = await request.json();
      const p_b = await xata.db.Project_Banners.filter({
        project_id,
        banner_id,
      }).getFirst();
      if (p_b !== null) {
        return await xata.db.Project_Banners.update(p_b.xata_id, {
          seen_at: new Date().toISOString(),
        });
      } else {
        const newBanner = {
          project_id,
          banner_id,
          seen_at: new Date().toISOString(),
        };
        return await xata.db.Project_Banners.create(newBanner);
      }
    }
    default: {
      console.error("no handler for method", request.method);
      throw new Response("This route doesn't know how to handle this method", {
        status: 400,
      });
    }
  }
};
