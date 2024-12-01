import React, { useContext, useState } from "react";
import classNames from "classnames";
import { ProjectContext } from "../../contexts/ProjectContext";
import {
  DragItem,
  DragType,
  DropTarget,
} from "../../../../api/common/interfaces/dragdrop.interface";
import { Person, Role } from "~/api/common/interfaces/parrit.interfaces";

export const TrashBin: React.FC = () => {
  const { destroyPerson, destroyRole } = useContext(ProjectContext);
  const [isOver, setIsOver] = useState(false);
  // const [{ isOver, canDrop }, drop] = useDrop<DragItem, undefined, DropTarget>({
  //   accept: [DragType.Person, DragType.Role],
  //   drop: (item) => {
  //     switch (item.type) {
  //       case DragType.Person:
  //         destroyPerson(item as Person);
  //         return;
  //       case DragType.Role:
  //         destroyRole(item as Role);
  //         return;
  //     }
  //   },
  //   collect: (monitor) => ({
  //     isOver: monitor.isOver(),
  //     canDrop: monitor.canDrop(),
  //   }),
  // });
  // const [{ canDrop, isOver }, drop] = useDrop<DragItem>({
  //   accept: [DragType.Person, DragType.Role],
  //   drop: (item, monitor) => {
  //     if (monitor.didDrop()) {
  //       return; // don't do anything if a drop handler has already handled this
  //     }
  //     switch (item.type) {
  //       case DragType.Person: {
  //         const person = item as unknown as Person;
  //         destroyPerson(person);
  //         return;
  //       }
  //       case DragType.Role: {
  //         const role = item as unknown as Role;
  //         destroyRole(role);
  //       }
  //     }
  //   },
  //   collect: (monitor) => ({
  //     isOver: monitor.isOver(),
  //     canDrop: monitor.canDrop(),
  //   }),
  // });

  const handleDragover: React.DragEventHandler<HTMLDivElement> = (ev) => {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move";
  };

  const handleDrop: React.DragEventHandler<HTMLDivElement> = (ev) => {
    ev.preventDefault();
  };

  const classes = classNames({
    "trash-bin": true,
    "drop-target": isOver,
  });

  return (
    <div
      onDragOver={() => setIsOver(true)}
      onDrop={handleDrop}
      className={classes}
    />
  );
};
