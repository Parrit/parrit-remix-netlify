import React, { useContext, useState } from "react";
import classNames from "classnames";
import { useFetcher } from "@remix-run/react";
import { ProjectContext } from "../../contexts/ProjectContext";
import ReactDOM from "react-dom";

export type NameFormPurpose = "Person" | "Role" | "PairingBoard";

interface Props {
  purpose: NameFormPurpose;
  onClose: VoidFunction;
}

export const NameForm: React.FC<Props> = (props) => {
  const { project } = useContext(ProjectContext);
  const [errorMessage, setErrorMessage] = useState<string>();
  const fetcher = useFetcher();
  const modalRoot = document.getElementById("modal-root");

  if (!modalRoot) {
    throw new Error("Cannot render NameForm without #modal-root");
  }

  const inputClasses = classNames({
    "form-control": true,
    error: errorMessage != undefined,
  });

  let action;
  let formTitle;
  switch (props.purpose) {
    case "Person":
      action = "/person/new";
      formTitle = "Add Parrit Teammate";
      break;
    case "PairingBoard":
      action = "/pairing_board/new";
      formTitle = "Add Pairing Board";
      break;
    case "Role":
      action = "/role/new";
      formTitle = "Add Pairing Board Role";
      break;
    default:
      throw new Error(`Unknown form purpose ${props.purpose}`);
  }

  return ReactDOM.createPortal(
    <div>
      <div className="ReactModal__Overlay" onClick={props.onClose} />
      <fetcher.Form
        method="post"
        action={action}
        className="ReactModal__Content"
      >
        <div className="form-header">
          <h2 className="form-title">{formTitle}</h2>
          <div className="form-cancel" onClick={props.onClose} />
        </div>

        <div className="error-message">{errorMessage}</div>

        <input
          hidden
          type="text"
          name="project_id"
          value={project.id}
          readOnly
        />
        <input
          className={inputClasses}
          autoFocus
          type="text"
          name="name"
          placeholder="Name"
        />

        <div className="buttons">
          <button type="submit" className="button-blue">
            OK
          </button>
          <button type="button" onClick={props.onClose} className="button-red">
            Cancel
          </button>
        </div>
      </fetcher.Form>
    </div>,
    modalRoot
  );
};
