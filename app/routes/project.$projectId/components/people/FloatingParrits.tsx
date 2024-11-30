import React, { useContext } from "react";
import { Person } from "~/api/common/interfaces";
import { ProjectContext } from "../../contexts/ProjectContext";
import { DragItem, DragType } from "../../interfaces";
import { WorkspaceContext } from "../../contexts/Workspace";
import { PersonList } from "./PersonList";
import { TrashBin } from "../ui/TrashBin";

interface Props {
  people: Person[];
}

export const FloatingParrits: React.FC<Props> = (props) => {
  const { movePerson } = useContext(ProjectContext);

  const handleDrop: React.DragEventHandler<HTMLDivElement> = (event) => {
    const data = JSON.parse(
      event.dataTransfer.getData("text/plain")
    ) as DragItem;
    switch (data.type) {
      case DragType.Person:
        movePerson(data as Person);
        return;
      default:
        console.warn("Floating Parrits cannot handle", data.type);
    }
  };

  const { setNewPersonOpen } = useContext(WorkspaceContext);

  return (
    <div onDrop={handleDrop} className="floating-parrits">
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
