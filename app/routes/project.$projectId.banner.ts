import { LoaderFunction } from "@remix-run/node";
import { Banner } from "~/api/common/interfaces/parrit.interfaces";
import parritXataClient from "~/api/parritXataClient";

export const loader: LoaderFunction = async ({ request }) => {
  const xata = parritXataClient();
  const id = request.url.split("/").at(-2);
  if (!id) {
    console.error("No id found in", request.url);
    throw new Response("No project id found in URL", { status: 400 });
  }

  switch (request.method) {
    case "GET": {
      const banners = (await xata.db.Banners.getAll()).toSerializable();
      const projectBanners = (
        await xata.db.Project_Banners.filter({
          $all: [
            { project_id: id },
            {
              $any: banners.map((banner) => ({
                banner_id: banner.xata_id,
              })),
            },
          ],
        }).getAll()
      ).toSerializable();
      const retval: Banner[] = banners.map((banner) => {
        const projectBanner = projectBanners.find(
          (p_b) => p_b.banner_id?.xata_id === banner.xata_id
        );
        const seen_at = projectBanner?.seen_at ?? undefined;
        return {
          ...banner,
          id: banner.xata_id,
          title: banner.title ?? "ERR",
          paragraphs: banner.paragraphs ?? [],
          action_text: banner.action_text ?? "ERR",
          action_url: banner.action_url ?? "ERR",
          seen_at,
        };
      });
      return retval;
    }
    default:
      console.error("no handler for method", request.method);
      throw new Response("This route doesn't know how to handle this method", {
        status: 400,
      });
  }
};
