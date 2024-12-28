import { Outlet } from "@remix-run/react";
import { LoaderFunctionArgs, LinksFunction } from "@remix-run/node";
import { Footer } from "~/routes/project.$projectId/components/ui/Footer";

import homeStyles from "~/styles/home.css?url";
import { authenticator } from "~/services/auth.server";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: homeStyles }];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticator.isAuthenticated(request, {
    successRedirect: "/project",
  });
  return null;
};

export default function Home() {
  return (
    <div className="layout-wrapper dashboard-container">
      <main className="dashboard-content-container">
        <div className="dashboard-content">
          <div className="logo" />
          <div className="description">
            A historical recommendation engine for daily pair rotation
            management, with an interactive visual aide of each pairing team.
          </div>

          <div className="forms-container">
            <Outlet />
          </div>

          <div className="feedback-container">
            <div className="caption">What do you think of Parrit?</div>
            <a
              className="text-link"
              href="https://goo.gl/forms/ZGqUyZDEDSWqZVBP2"
              target="_blank"
              rel="noopener noreferrer"
            >
              Send feedback
              <span className="carrot" />
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
