import { Outlet } from "@remix-run/react";
import { LoaderFunctionArgs, LinksFunction } from "@remix-run/node";
import { Footer } from "~/routes/project.$projectId/components/ui/Footer";
import caret_right from "~/styles/images/caret-right.svg";

import homeStyles from "~/styles/home.css?url";
import { authenticator } from "~/services/auth.server";
import { YellowCircle } from "./project.$projectId/components/ui/YellowCircle";

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
      <main className="dashboard-content-container flex flex-col items-center">
        <div className="dashboard-content flex flex-col items-center w-1/2 space-y-4">
          <div className="float-left w-full">
            <div className="w-2/3">
              <YellowCircle
                size="small"
                text={"Chirp, Chirp.\nWe have a new release.\nSquawk!"}
              />
            </div>
          </div>
          <div className="logo" />
          <div className="description">
            Due to some outdated tech and the end of life for part of our stack,
            today is (sort of) a new Parrit. We have rebuilt the app to help us
            scale, if you see anything that is awry we want to hear about it.
          </div>
          <div className="realease feedback my-3">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSfOLPi4_5lNng5eMZJtmUmPzsCFfusFwQcetBqsxWEXjWr5og/viewform?usp=preview"
              target="_blank"
              className="feedback link flex items-center space-x-2"
              rel="noreferrer"
            >
              <span>Share release feedback here</span>
              <img src={caret_right} />
            </a>
          </div>
          <div>
            <div className="forms-container mt-12">
              <Outlet />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
