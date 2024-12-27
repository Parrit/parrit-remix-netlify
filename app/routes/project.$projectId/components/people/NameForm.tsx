import React, { useContext, useEffect, useState } from "react";
import classNames from "classnames";
import { useFetcher } from "@remix-run/react";
import { ProjectContext } from "../../contexts/ProjectContext";
import ReactDOM from "react-dom";
import { ParritError } from "~/api/common/ParritError";
import { PairingBoard } from "~/api/common/interfaces/parrit.interfaces";
import { LoadingSpinner } from "~/ui/LoadingSpinner";

export type NameFormPurpose = "Person" | "Role" | "PairingBoard";

interface Props {
  purpose: NameFormPurpose;
  onClose: VoidFunction;
  pairingBoard?: PairingBoard;
}

interface NameFormData {
  name: string;
  project_id: string;
}

export const NameForm: React.FC<Props> = (props) => {
  const { project } = useContext(ProjectContext);
  const [error, setError] = useState<ParritError<NameFormData>>();
  const modalRoot = document.getElementById("modal-root");
  const mutator = useFetcher();
  const [isLoading, setLoading] = useState(true);

  let action;
  let formTitle;
  switch (props.purpose) {
    case "Person":
      action = "/person";
      formTitle = "Add Parrit Teammate";
      break;
    case "PairingBoard":
      action = "/pairing_board";
      formTitle = "Add Pairing Board";
      break;
    case "Role":
      action = "/role";
      formTitle = "Add Pairing Board Role";
      break;
    default:
      throw new Error(`Unknown form purpose ${props.purpose}`);
  }

  useEffect(() => {
    mutator.load(action);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    switch (mutator.state) {
      case "loading":
      case "submitting":
        setLoading(true);
        break;
      case "idle": {
        setLoading(false);
        if (mutator.data) {
          if (typeof mutator.data === "string") {
            const parritError = ParritError.fromString<NameFormData>(
              mutator.data
            );
            setError(parritError);
          } else {
            props.onClose();
          }
        }
        break;
      }
    }
  }, [mutator.state, mutator.data, props]);

  if (!modalRoot) {
    throw new Error("Cannot render NameForm without #modal-root");
  }

  const inputClasses = classNames({
    "form-control": true,
    error: error !== undefined,
  });

  const errorMessage = error?.data.server ?? error?.data.fields?.name;

  return ReactDOM.createPortal(
    <div>
      <div className="ReactModal__Overlay" onClick={props.onClose} />
      <mutator.Form
        method="POST"
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
          hidden
          type="text"
          name="pairing_board_id"
          value={props.pairingBoard?.id}
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
          <button type="submit" className="button-blue" disabled={isLoading}>
            OK
          </button>
          <button
            type="button"
            onClick={props.onClose}
            className="button-red"
            disabled={isLoading}
          >
            Cancel
          </button>

          {isLoading && (
            <div style={{ marginLeft: "auto" }}>
              <LoadingSpinner />
            </div>
          )}
        </div>
      </mutator.Form>
    </div>,
    modalRoot
  );
};
