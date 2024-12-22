/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useState } from "react";
import classNames from "classnames";
import { WorkspaceContext } from "../../contexts/Workspace";
import { PairingBoardContext } from "../../contexts/PairingBoardContext";

export const PairingBoardHeader: React.FC = () => {
  const { setNewRoleOpen } = useContext(WorkspaceContext);
  const { pairingBoard, renamePairingBoard, deletePairingBoard } =
    useContext(PairingBoardContext);
  const { name, exempt } = pairingBoard;
  const [editing, setEditing] = useState(false);
  const [editingError, setEditingError] = useState<string>();
  const [nameVal, setNameVal] = useState<string>(name);

  const handleSubmit = () => {
    setEditing(false);
    if (!nameVal) {
      setEditingError("Name is required");
      setNameVal(name);
      return;
    }

    renamePairingBoard(nameVal);
  };

  const onKeyDownHandler = (event: any) => {
    if (editing) {
      if (event.key === "Enter") {
        handleSubmit();
      }
    }
  };

  const handleAddNewRole = () => {
    setNewRoleOpen(true, pairingBoard);
  };

  const nameInputClasses = classNames({
    "editing-pairing-board-name": true,
    error: editingError != undefined,
  });

  return (
    <div className="pairing-board-header">
      {editing ? (
        <div className="pairing-board-name-wrapper">
          <input
            name="pairing_board_name"
            aria-label="pairing board name"
            value={nameVal}
            onChange={(e) => setNameVal(e.target.value)}
            onBlur={handleSubmit}
            className={nameInputClasses}
            autoFocus
            onKeyDown={onKeyDownHandler}
          />
          <div className="error-message" aria-label="pairing board name error">
            {editingError}
          </div>
        </div>
      ) : (
        <div
          className="pairing-board-name-wrapper"
          onClick={() => setEditing(true)}
        >
          <h3 aria-label="pairing board name" className="pairing-board-name">
            {name}
          </h3>
          <div
            aria-label="rename pairing board"
            className="rename-pairing-board"
          />
          <div
            aria-label="add role to pairing board"
            className="add-role-to-pairing-board"
            onClick={handleAddNewRole}
          />
        </div>
      )}

      {!exempt && (
        <div
          aria-label="delete pairing board"
          className="delete-pairing-board"
          onClick={() => deletePairingBoard()}
        />
      )}
    </div>
  );
};
