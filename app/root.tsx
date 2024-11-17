import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { ContextStack } from "./contexts/ContextStack";

import layoutStyles from "~/styles/layout.css";

export const meta: MetaFunction = () => [
  {
    charset: "utf-8",
    title: "Parrit",
    viewport: "width=device-width,initial-scale=1",
  },
];

export const links: LinksFunction = () => [
  ...(cssBundleHref
    ? [
        { rel: "stylesheet", href: cssBundleHref },
        { rel: "stylesheet", href: layoutStyles },
      ]
    : []),
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <ContextStack>
          <Outlet />
        </ContextStack>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
