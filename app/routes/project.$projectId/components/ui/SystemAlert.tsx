import React, { useContext } from "react";
import { clsy } from "~/func/clsy";
import { AppContext } from "../../contexts/App";

import "~/styles/system-alert.css";

export const SystemAlert: React.FC = () => {
  const { systemAlert, setSystemAlert } = useContext(AppContext);

  const classes = clsy("system-alert", {
    "system-alert-closed": !systemAlert,
  });

  return (
    <div className={classes} data-testid="system-alert">
      <div className="message">{systemAlert}</div>
      <div
        role="button"
        className="close"
        onClick={() => setSystemAlert(undefined)}
      >
        <div className="icon" />
      </div>
    </div>
  );
};
