import React, { useContext } from "react";
import classNames from "classnames";
import { Form } from "@remix-run/react";
import { AppContext } from "../../contexts/App";
import { Button } from "~/ui/Button";

export const Header: React.FC = () => {
  const { pairingHistoryOpen, setPairingHistoryOpen } = useContext(AppContext);
  const classes = classNames({
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
        <Form method="DELETE" action="/logout">
          <h3>
            <Button className="font-overlock font" type="submit">
              LOGOUT
            </Button>
          </h3>
        </Form>
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
