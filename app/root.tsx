import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "@remix-run/react";

import "~/styles/global.css";
import layoutStyles from "~/styles/layout.css?url";
import errorStyles from "~/styles/error.css?url";

export const meta: MetaFunction = () => [
  {
    charset: "utf-8",
    title: "Parrit",
    viewport: "width=device-width,initial-scale=1",
  },
];

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: layoutStyles },
  { rel: "stylesheet", href: errorStyles },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);
  return (
    <html>
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <div className="p-10 bg-yellow-100 layout-wrapper error-container">
          <div className="error-image-wrapper w-full">
            <div className="parrit-talk-bubble">
              <h1 className="error-message w-64">{`RAWWWK! What the heck!`}</h1>
            </div>

            <pre>{`${error}`}</pre>
            <button
              className="button-red px-10"
              onClick={() => window.location.replace("/logout")}
            >
              Get me out of here
            </button>
          </div>
        </div>
        <Scripts />
      </body>
    </html>
  );
}
