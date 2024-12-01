import React, { useContext } from "react";
import { PairingBoardView } from "./PairingBoardView";
import { ProjectContext } from "../../contexts/ProjectContext";

export const PairingBoardList: React.FC = () => {
  const { project } = useContext(ProjectContext);
  return (
    <div className="pairing-boards">
      {project.pairingBoards.map((pairingBoard) => {
        return (
          <PairingBoardView
            key={`pairing-board-${pairingBoard.id}`}
            pairingBoard={pairingBoard}
          />
        );
      })}
    </div>
  );
};
