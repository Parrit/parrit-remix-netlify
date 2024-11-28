import React, { useContext } from "react";
import classNames from "classnames";
import { WorkspaceContext } from "../contexts/Workspace";

export const Header: React.FC = () => {
  const { pairingHistoryOpen, setPairingHistoryOpen } =
    useContext(WorkspaceContext);
  const classes = classNames({
    history: true,
    open: pairingHistoryOpen,
  });

  return (
    <header>
      <a href="/" className="header-logo" />
      <div className="links">
        <h3
          className="logout"
          onClick={() => console.log("bad logout clicked")}
        >
          LOGOUT
        </h3>
        <h3 className="feedback">
          <a
            href="https://goo.gl/forms/ZGqUyZDEDSWqZVBP2"
            target="_blank"
            rel="noopener noreferrer"
          >
            feedback
          </a>
        </h3>
        <h3
          className={classes}
          onClick={() => {
            setPairingHistoryOpen(!pairingHistoryOpen);
          }}
        >
          HISTORY
          <div
            aria-label={
              pairingHistoryOpen ? "close history panel" : "open history panel"
            }
            className={
              pairingHistoryOpen ? "history-caret-right" : "history-caret-left"
            }
          />
        </h3>
      </div>
    </header>
  );
};
