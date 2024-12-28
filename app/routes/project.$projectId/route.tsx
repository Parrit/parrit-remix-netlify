import {
  ActionFunctionArgs,
  LinksFunction,
  LoaderFunctionArgs,
} from "@remix-run/node";

import hydrateProjectServer from "./hydrateProject.server";
import { App } from "./contexts/App";

import pairingBoardStyles from "~/styles/pairing-boards.css?url";
import dragLayer from "~/styles/drag-layer.css?url";
import footerStyles from "~/styles/footer.css?url";
import personStyles from "~/styles/person.css?url";
import projectStyles from "~/styles/project.css?url";
import roleStyles from "~/styles/role.css?url";
import systemAlerStyles from "~/styles/system-alert.css?url";
import textLinkStyles from "~/styles/text-link.css?url";
import pairingHistoryStyles from "~/styles/pairing-history.css?url";
import pairingHistoryRecordStyles from "~/styles/pairing-history-record.css?url";

const stylesheet = (href: string) => ({ rel: "stylesheet", href });

export const links: LinksFunction = () => [
  stylesheet(pairingBoardStyles),
  stylesheet(dragLayer),
  stylesheet(footerStyles),
  stylesheet(personStyles),
  stylesheet(projectStyles),
  stylesheet(roleStyles),
  stylesheet(systemAlerStyles),
  stylesheet(textLinkStyles),
  stylesheet(pairingHistoryStyles),
  stylesheet(pairingHistoryRecordStyles),
];

export async function action({ request }: ActionFunctionArgs) {
  switch (request.method) {
    default:
      console.error("no handler found for method", request.method);
      throw new Response("This route doesn't know how to handle this method", {
        status: 400,
      });
  }
}

export async function loader(args: LoaderFunctionArgs) {
  return await hydrateProjectServer(args);
}

const ProjectPage = () => <App />;
export default ProjectPage;
