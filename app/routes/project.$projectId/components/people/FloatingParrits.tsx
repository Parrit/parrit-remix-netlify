import React, { useContext } from "react";
import { Person } from "~/api/common/interfaces/parrit.interfaces";
import { ProjectContext } from "../../contexts/ProjectContext";
import {
  DragItem,
  DragType,
} from "../../../../api/common/interfaces/dragdrop.interface";
import { WorkspaceContext } from "../../contexts/Workspace";
import { PersonList } from "./PersonList";
import { TrashBin } from "../ui/TrashBin";

export const FloatingParrits: React.FC = () => {
  const { movePerson, project } = useContext(ProjectContext);

  const handleDrop: React.DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    const data = JSON.parse(
      event.dataTransfer.getData("text/plain")
    ) as DragItem;
    switch (data.type) {
      case DragType.Person:
        movePerson(data as Person, project.floating);
        return;
      default:
        console.warn("Floating Parrits cannot handle", data.type);
    }
  };

  const { setNewPersonOpen } = useContext(WorkspaceContext);

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(event) => event.preventDefault()}
      className="floating-parrits"
    >
      <h2 className="floating-parrit-title">Floating Parrits</h2>
      <PersonList people={project.floating.people} />
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
