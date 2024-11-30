import React, { useContext } from "react";
import { useDrop } from "react-dnd";
import { Person } from "~/api/common/interfaces";
import { ProjectContext } from "../../contexts/ProjectContext";
import { DragItem, DragType, DropItem, DropTarget } from "../../interfaces";
import { WorkspaceContext } from "../../contexts/Workspace";
import { PersonList } from "./PersonList";
import { TrashBin } from "../ui/TrashBin";

interface Props {
  people: Person[];
}

export const FloatingParrits: React.FC<Props> = (props) => {
  const { movePerson } = useContext(ProjectContext);
  const [{ canDrop, isOver }, drop] = useDrop<DragItem, undefined, DropTarget>({
    accept: DragType.Person,
    drop: (item, monitor) => {
      if (monitor.didDrop()) {
        return; // don't do anything if a drop handler has already handled this
      }
      console.log("dropped item onto floating", item);
      switch (item.type) {
        case DragType.Person: {
          movePerson(item as Person);
        }
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const { setNewPersonOpen } = useContext(WorkspaceContext);

  return (
    <div ref={drop} className="floating-parrits">
      <h2 className="floating-parrit-title">Floating Parrits</h2>
      <PersonList people={props.people} />
      <div className="floating-parrit-actions">
        <div
          className="add-parrit-button"
          onClick={() => setNewPersonOpen(true)}
        />
        <TrashBin />
      </div>
    </div>
  );
};
