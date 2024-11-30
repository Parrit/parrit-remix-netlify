import classNames from "classnames";
import React, { useContext, useState } from "react";
import { PairingBoard, Person, Role } from "~/api/common/interfaces";
import { ProjectContext } from "../../contexts/ProjectContext";
import { DragItem, DragType } from "../../interfaces";
import { PersonList } from "../people/PersonList";
import { PairingBoardHeader } from "./PairingBoardHeader";
import { RoleList } from "./RoleList";

interface Props {
  pairingBoard: PairingBoard;
}

export const PairingBoardView: React.FC<Props> = (props) => {
  const { name, exempt, people, roles } = props.pairingBoard;
  const { movePerson, moveRole } = useContext(ProjectContext);
  const [isOver, setIsOver] = useState(false);

  const [editing, setEditing] = useState(false);
  const [editingError, setEditingError] = useState<string>();

  const { destroyPairingBoard, renamePairingBoard } =
    useContext(ProjectContext);

  const handleDragOver: React.DragEventHandler<HTMLDivElement> = (ev) => {
    console.log("dragging", props.pairingBoard);
    ev.dataTransfer.dropEffect = "move";
  };

  const handleDrop: React.DragEventHandler<HTMLDivElement> = (ev) => {
    const data = JSON.parse(ev.dataTransfer.getData("text/plain")) as DragItem;
    console.log("pairingboard drop", data, props.pairingBoard);
    switch (data.type) {
      case DragType.Person:
        console.log("got person", data);
        movePerson(data as Person, props.pairingBoard);
        return;
      case DragType.Role:
        moveRole(data as Role, props.pairingBoard);
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
    renamePairingBoard(name, props.pairingBoard.id).catch((error) => {
      console.log("rename error", error);
      setEditingError("rename failed");
    });
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={pairingBoardClasses}
    >
      <PairingBoardHeader
        name={name}
        exempt={exempt}
        editMode={editing}
        editErrorMessage={editingError}
        renamePairingBoard={handleRename}
        deletePairingBoard={() => destroyPairingBoard(props.pairingBoard)}
        setEditing={setEditing}
        pairingBoard={props.pairingBoard}
      />

      <RoleList roles={roles} />

      <PersonList people={people} />
    </div>
  );
};
