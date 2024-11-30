import { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import hydrateProjectServer from "./server/hydrateProject.server";
import { App } from "./contexts/App";

import pairingBoardStyles from "~/styles/pairing-boards.css?url";
import dragLayer from "~/styles/drag-layer.css?url";
import footerStyles from "~/styles/footer.css?url";
import pairingHistoryStyles from "~/styles/pairing-history.css?url";
import pairingHistoryRecordStyles from "~/styles/pairing-history-record.css?url";
import personStyles from "~/styles/person.css?url";
import projectStyles from "~/styles/project.css?url";
import roleStyles from "~/styles/role.css?url";
import systemAlerStyles from "~/styles/system-alert.css?url";
import textLinkStyles from "~/styles/text-link.css?url";

const stylesheet = (href: string) => ({ rel: "stylesheet", href });

export const links: LinksFunction = () => [
  stylesheet(pairingBoardStyles),
  stylesheet(dragLayer),
  stylesheet(footerStyles),
  stylesheet(pairingHistoryStyles),
  stylesheet(pairingHistoryRecordStyles),
  stylesheet(personStyles),
  stylesheet(projectStyles),
  stylesheet(roleStyles),
  stylesheet(systemAlerStyles),
  stylesheet(textLinkStyles),
];

export async function loader(args: LoaderFunctionArgs) {
  return await hydrateProjectServer(args);
}

export default function () {
  const project = useLoaderData<typeof loader>();
  console.log("project page is here");
  return <App project={project} />;
}
