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

export const meta: MetaFunction = () => [
  {
    charset: "utf-8",
    title: "Parrit",
    viewport: "width=device-width,initial-scale=1",
  },
];

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: layoutStyles },
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
        <div className="p-10 bg-yellow-100">
          <h1>RAWWWK! Polly's in trouble!</h1>
          <p>
            We apologize for the inconvenience. Our team is working to fix the
            issue.
          </p>
          <button
            className="button-red px-10"
            onClick={() => window.location.replace("/logout")}
          >
            Start over
          </button>
          {/* Optionally, display some debugging information for developers */}
          <pre>{`${error}`}</pre>
        </div>
        <Scripts />
      </body>
    </html>
  );
}
