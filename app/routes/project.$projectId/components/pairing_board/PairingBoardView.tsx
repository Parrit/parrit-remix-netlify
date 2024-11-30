import classNames from "classnames";
import React, { useContext, useState } from "react";
import { useDrop } from "react-dnd";
import { PairingBoard, Person, Role } from "~/api/common/interfaces";
import { ProjectContext } from "../../contexts/ProjectContext";
import { DragItem, DropTarget, DragType } from "../../interfaces";
import { PersonList } from "../people/PersonList";
import { PairingBoardHeader } from "./PairingBoardHeader";
import { RoleList } from "./RoleList";

interface Props {
  pairingBoard: PairingBoard;
}

export const PairingBoardView: React.FC<Props> = (props) => {
  const { name, exempt, people, roles } = props.pairingBoard;
  const { movePerson, moveRole } = useContext(ProjectContext);
  const [{ canDrop, isOver }, drop] = useDrop<DragItem, undefined, DropTarget>({
    accept: [DragType.Person, DragType.Role],
    drop: (item, monitor) => {
      if (monitor.didDrop()) {
        return; // don't do anything if a drop handler has already handled this
      }
      switch (item.type) {
        case DragType.Person:
          movePerson(item as Person, props.pairingBoard);
          return;
        case DragType.Role:
          moveRole(item as Role, props.pairingBoard);
          return;
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const [editing, setEditing] = useState(false);
  const [editingError, setEditingError] = useState<string>();

  const { destroyPairingBoard, renamePairingBoard } =
    useContext(ProjectContext);

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
    <div ref={drop} className={pairingBoardClasses}>
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
