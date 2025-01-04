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
  const { exempt } = pairingBoard;
  const { movePerson, moveRole } = useContext(ProjectContext);
  const [isOver, setIsOver] = useState(false);

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
    exempt: exempt,
    "drop-target": isOver,
  });

  return (
    <div
      data-testid={`pairingBoard-${pairingBoard.name}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={pairingBoardClasses}
    >
      <PairingBoardHeader />
      <RoleList />
      <PersonList />
    </div>
  );
};
