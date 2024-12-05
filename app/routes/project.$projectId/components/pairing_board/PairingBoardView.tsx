import classNames from "classnames";
import React, { useContext, useState } from "react";
import { Person, Role } from "~/api/common/interfaces/parrit.interfaces";
import { ProjectContext } from "../../contexts/ProjectContext";
import { DragItem } from "../../../../api/common/interfaces/dragdrop.interface";
import { PersonList } from "../people/PersonList";
import { PairingBoardHeader } from "./PairingBoardHeader";
import { RoleList } from "./RoleList";
import { PairingBoardContext } from "../../contexts/PairingBoardContext";

export const PairingBoardView: React.FC = () => {
  const { pairingBoard } = useContext(PairingBoardContext);
  const { name, exempt, roles } = pairingBoard;
  const { movePerson, moveRole } = useContext(ProjectContext);
  const [isOver, setIsOver] = useState(false);

  const [editing, setEditing] = useState(false);
  const [editingError, setEditingError] = useState<string>();

  const { destroyPairingBoard, renamePairingBoard } =
    useContext(ProjectContext);

  const handleDragOver: React.DragEventHandler<HTMLDivElement> = (ev) => {
    ev.preventDefault();
    setIsOver(true);
    ev.dataTransfer.dropEffect = "move";
  };

  const handleDragLeave: React.DragEventHandler<HTMLDivElement> = () => {
    setIsOver(false);
  };

  const handleDrop: React.DragEventHandler<HTMLDivElement> = (ev) => {
    ev.preventDefault();
    setIsOver(false);
    const data = JSON.parse(ev.dataTransfer.getData("text/plain")) as DragItem;
    switch (data.type) {
      case "Person":
        movePerson(data as Person, pairingBoard);
        return;
      case "Role":
        moveRole(data as Role, pairingBoard);
        return;
    }
  };

  const pairingBoardClasses = classNames({
    "pairing-board": true,
    editing: editing,
    exempt: exempt,
    "drop-target": isOver,
  });

  const handleRename = async (name: string) => {
    setEditing(false);
    renamePairingBoard(name, pairingBoard.id).catch((error) => {
      console.log("rename error", error);
      setEditingError("rename failed");
    });
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={pairingBoardClasses}
    >
      <PairingBoardHeader
        name={name}
        exempt={exempt}
        editMode={editing}
        editErrorMessage={editingError}
        renamePairingBoard={handleRename}
        deletePairingBoard={() => destroyPairingBoard(pairingBoard)}
        setEditing={setEditing}
        pairingBoard={pairingBoard}
      />

      <RoleList roles={roles} />

      <PersonList />
    </div>
  );
};
