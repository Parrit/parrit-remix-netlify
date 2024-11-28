/* eslint-disable jsx-a11y/click-events-have-key-events */
import classNames from "classnames";
import React, { useContext } from "react";
import { WorkspaceContext } from "../contexts/Workspace";

export const SystemAlert: React.FC = () => {
  const { systemAlert, setSystemAlert } = useContext(WorkspaceContext);

  const classes = classNames({
    "system-alert": true,
    "system-alert-closed": !systemAlert,
  });

  return (
    <div className={classes} data-testid="system-alert">
      <div className="message">{systemAlert}</div>
      <div
        role="button"
        className="close"
        onClick={() => setSystemAlert(undefined)}
        tabIndex={0}
      >
        <div className="icon" />
      </div>
    </div>
  );
};
