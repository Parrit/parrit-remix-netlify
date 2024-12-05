import React, { useContext, useState } from "react";
import classNames from "classnames";
import { Person, Role } from "~/api/common/interfaces/parrit.interfaces";
import { DragItem } from "~/api/common/interfaces/dragdrop.interface";
import { ProjectContext } from "../../contexts/ProjectContext";

export const TrashBin: React.FC = () => {
  const { destroyPerson, destroyRole } = useContext(ProjectContext);
  const [isOver, setIsOver] = useState(false);

  const handleDragover: React.DragEventHandler<HTMLDivElement> = (ev) => {
    ev.preventDefault();
    setIsOver(true);
    ev.dataTransfer.dropEffect = "move";
  };

  const handleDrop: React.DragEventHandler<HTMLDivElement> = (ev) => {
    ev.preventDefault();
    const data = JSON.parse(ev.dataTransfer.getData("text/plain")) as DragItem;
    switch (data.type) {
      case "Person":
        destroyPerson(data as Person);
        return;
      case "Role":
        destroyRole(data as Role);
        return;
    }
  };

  const classes = classNames({
    "trash-bin": true,
    "drop-target": isOver,
  });

  return (
    <div onDragOver={handleDragover} onDrop={handleDrop} className={classes} />
  );
};
