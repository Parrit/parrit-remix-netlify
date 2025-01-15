import React, { useContext } from "react";
import { Form } from "@remix-run/react";
import { AppContext } from "../../contexts/App";
import { clsy } from "~/func/clsy";

export const Header: React.FC = () => {
  const { pairingHistoryOpen, setPairingHistoryOpen } = useContext(AppContext);
  const classes = clsy({
    history: true,
    open: pairingHistoryOpen,
  });

  return (
    <header>
      <a href="/" className="header-logo" />
      <div className="links">
        <h3>
          <a
            href="https://www.gofundme.com/f/rescueparrit"
            target="_blank"
            rel="noopener noreferrer"
          >
            DONATE
          </a>
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
        <Form method="DELETE" action="/logout">
          <h3>
            <button
              data-testid="logout-button"
              className="font-overlock font"
              type="submit"
            >
              LOGOUT
            </button>
          </h3>
        </Form>
        <h3
          data-testid="historyButton"
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
