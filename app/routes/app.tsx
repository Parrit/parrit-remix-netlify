import { Outlet } from "@remix-run/react";
import { Footer } from "~/ui/Footer";

export default () => {
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
        </div>
      </main>
      <Footer />
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
  );
};
