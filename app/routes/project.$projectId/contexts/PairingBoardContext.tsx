import React, {
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  FLOATING_IDX,
  PairingBoard,
  Role,
} from "~/api/common/interfaces/parrit.interfaces";
import { ProjectContext } from "./ProjectContext";
import { useFetcher } from "react-router-dom";

export interface Props {
  pairingBoardId: string;
  children: ReactNode;
}

export interface IPairingBoardContext {
  pairingBoard: PairingBoard;
  renameObj: (name: string) => void;
  deleteObj: () => void;
  roles: Role[];
}

export const PairingBoardContext = React.createContext(
  {} as IPairingBoardContext
);

export const PairingBoardProvider: React.FC<Props> = (props) => {
  const { project, deletePairingBoard } = useContext(ProjectContext);
  const _pairingBoard = useMemo(
    () =>
      props.pairingBoardId === FLOATING_IDX
        ? project.floating
        : project.pairingBoards.find((pb) => pb.id === props.pairingBoardId),
    [project.floating, project.pairingBoards, props.pairingBoardId]
  );
  const [pairingBoard, setPairingBoard] = useState(_pairingBoard);
  const pbFetcher = useFetcher<PairingBoard>();
  const mutator = useFetcher();

  const roles = project.roles.filter(
    (r) => r.pairing_board_id === pairingBoard?.id
  );

  useEffect(() => {
    try {
      pbFetcher.load(`/pairing_board/${props.pairingBoardId}`);
    } catch (error) {
      console.error("Failed to load pairing board", error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (pbFetcher.data && pbFetcher.state === "idle") {
      setPairingBoard(pbFetcher.data);
    }
  }, [pbFetcher.data, pbFetcher.state]);

  const renameObj = (nameVal: string) => {
    mutator.submit(
      { name: nameVal },
      {
        method: "PATCH",
        action: `/pairing_board/${pairingBoard?.id}`,
        encType: "application/json",
      }
    );
    setPairingBoard((oldVal) => ({ ...oldVal!, name: nameVal }));
  };

  const deleteObj = () => {
    deletePairingBoard(pairingBoard!.id);
  };

  if (!pairingBoard) {
    throw new Error(
      "Project did not contain pairing board with id " + props.pairingBoardId
    );
  }
  return (
    <PairingBoardContext.Provider
      value={{ pairingBoard, renameObj, deleteObj, roles }}
    >
      {props.children}
    </PairingBoardContext.Provider>
  );
};
