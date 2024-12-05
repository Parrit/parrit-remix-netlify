import React, { useContext } from "react";
import { PairingBoardView } from "./PairingBoardView";
import { ProjectContext } from "../../contexts/ProjectContext";
import { PairingBoardProvider } from "../../contexts/PairingBoardContext";

export const PairingBoardList: React.FC = () => {
  const { project } = useContext(ProjectContext);
  return (
    <div className="pairing-boards">
      {project.pairingBoards.map(({ id }) => {
        return (
          <PairingBoardProvider key={`pairing-board-${id}`} pairingBoardId={id}>
            <PairingBoardView />
          </PairingBoardProvider>
        );
      })}
    </div>
  );
};
