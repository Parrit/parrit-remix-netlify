import * as Sentry from "@sentry/remix";
import { captureRemixErrorBoundaryError, withSentry } from "@sentry/remix";
import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
  useMatches,
  useRouteError,
} from "@remix-run/react";
import ReactGA from "react-ga4";

import "~/styles/global.css";
import layoutStyles from "~/styles/layout.css?url";
import errorStyles from "~/styles/error.css?url";
import { useEffect } from "react";

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
  { rel: "icon", href: "/favicon.ico" },
];

export const initGA = () => {
  ReactGA.initialize("G-SS06K698MP"); // Replace with your Measurement ID
};

export const logPageView = (path: string) => {
  ReactGA.send({ hitType: "pageview", page: path });
};

export const loader: LoaderFunction = async () => {
  return {
    SENTRY_ENVIRONMENT: process.env.SENTRY_ENVIRONMENT,
    G_TAG: process.env.G_TAG,
  };
};

const InitializeSentry = (environment: string) => {
  if (!Sentry.isInitialized()) {
    Sentry.init({
      dsn: "https://c8a47fcd86fce0c2b5913396f6b08533@o4508546853830656.ingest.us.sentry.io/4508546855272448",
      tracesSampleRate: 1,
      environment,

      integrations: [
        Sentry.browserTracingIntegration({
          useEffect,
          useLocation,
          useMatches,
        }),
        Sentry.replayIntegration({
          maskAllText: true,
          blockAllMedia: true,
        }),
      ],

      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1,
      beforeSend(event) {
        if (window.location.hostname === "localhost") {
          return null;
        }
        return event;
      },
    });
  }
};

function App() {
  const { SENTRY_ENVIRONMENT, G_TAG } = useLoaderData<{
    SENTRY_ENVIRONMENT: string;
    G_TAG: string;
  }>();
  const location = useLocation();

  useEffect(() => {
    if (!SENTRY_ENVIRONMENT) {
      console.warn("No sentry environment. Bugs will not be reported.");
      return;
    }

    InitializeSentry(SENTRY_ENVIRONMENT);
  }, [SENTRY_ENVIRONMENT]);

  useEffect(() => {
    if (G_TAG) {
      addGtmScript(G_TAG);
    }
  }, [G_TAG]);

  useEffect(() => {
    const script = document.createElement("script");
    script.id = "GoogleTagManager";
    script.type = "text/javascript";
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-SS06K698MP";
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.id = "GoogleAnalytics";
    script.type = "text/javascript";
    script.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-SS06K698MP');
    `;
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    switch (SENTRY_ENVIRONMENT) {
      case "production": {
        const Cookiebot = window.Cookiebot;
        // Listen for Cookiebot consent changes
        window.addEventListener("CookieConsentDeclaration", () => {
          if (Cookiebot?.consents.given.includes("statistics")) {
            // Enable Google Analytics if consent is given
            initGA();
            logPageView(location.pathname);
          }
        });
        return () => {
          window.removeEventListener("CookieConsentDeclaration", () => {});
        };
      }
      default:
        console.warn(
          "Google Analytics is disabled in non-production environments"
        );
        break;
    }
  }, [location.pathname, SENTRY_ENVIRONMENT]);

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

export default withSentry(App);

export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);
  captureRemixErrorBoundaryError(error);
  return (
    <html>
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <div className="p-10 bg-yellow-100 layout-wrapper error-container">
          <div className="error-image-wrapper w-full flex flex-col items-center space-y-4">
            <div className="parrit-talk-bubble">
              <h1 className="error-message w-64">{`RAWWWK! What the heck!`}</h1>
            </div>
            <pre className="error-details">{`${error}`}</pre>
            <button
              className="error-button button-red px-10"
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

let gtmScriptAdded = false;

declare global {
  interface Window {
    [key: string]: object[];
  }
}

function addGtmScript(GTM_ID: string) {
  if (!GTM_ID || gtmScriptAdded) {
    return;
  }

  // Code copied from GTM console + added type annotations.
  (function (w: Window, d: Document, s: "script", l: string, i: string) {
    w[l] = w[l] || [];
    w[l].push({
      "gtm.start": new Date().getTime(),
      event: "gtm.js",
    });
    const f = d.getElementsByTagName(s)[0];
    const j = d.createElement<"script">(s);
    const dl = l != "dataLayer" ? "&l=" + l : "";
    j.async = true;
    j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
    f.parentNode?.insertBefore(j, f);
  })(window, document, "script", "dataLayer", GTM_ID);

  gtmScriptAdded = true;
}
