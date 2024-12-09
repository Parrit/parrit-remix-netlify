import React, { ReactNode, useContext, useMemo } from "react";
import {
  FLOATING_IDX,
  PairingBoard,
} from "~/api/common/interfaces/parrit.interfaces";
import { ProjectContext } from "./ProjectContext";

export interface Props {
  pairingBoardId: string;
  children: ReactNode;
}

export interface IPairingBoardContext {
  pairingBoard: PairingBoard;
}

export const PairingBoardContext = React.createContext(
  {} as IPairingBoardContext
);

export const PairingBoardProvider: React.FC<Props> = (props) => {
  const { project } = useContext(ProjectContext);
  const pairingBoard = useMemo(
    () =>
      props.pairingBoardId === FLOATING_IDX
        ? project.floating
        : project.pairingBoards.find((pb) => pb.id === props.pairingBoardId),
    [project.floating, project.pairingBoards, props.pairingBoardId]
  );

  if (!pairingBoard) {
    throw new Error(
      "Project did not contain pairing board with id " + props.pairingBoardId
    );
  }
  return (
    <PairingBoardContext.Provider value={{ pairingBoard }}>
      {props.children}
    </PairingBoardContext.Provider>
  );
};
