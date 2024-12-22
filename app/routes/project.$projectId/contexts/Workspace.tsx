import React, { useState } from "react";
import {
  FLOATING_IDX,
  PairingBoard,
} from "~/api/common/interfaces/parrit.interfaces";
import { FloatingParrits } from "../components/people/FloatingParrits";
import { PairingBoardList } from "../components/pairing_board/PairingBoardList";
import { NameForm } from "../components/people/NameForm";
import { DragProvider } from "./DragContext";
import { PairingBoardProvider } from "./PairingBoardContext";

interface IWorkspaceContext {
  newPersonOpen: boolean;
  newPairingBoardOpen: boolean;
  newRoleOpen: boolean;
  setNewPersonOpen: (isOpen: boolean) => void;
  setNewPairingBoardOpen: (isOpen: boolean) => void;
  setNewRoleOpen: (isOpen: boolean, pairingBoard: PairingBoard) => void;
  newPersonError?: Error;
  newPairingBoardError?: Error;
  newRoleError?: Error;
}

export const WorkspaceContext = React.createContext({} as IWorkspaceContext);

export const Workspace: React.FC = () => {
  const [newPersonOpen, setNewPersonOpen] = useState(false);
  const [newPairingBoardOpen, setNewPairingBoardOpen] = useState(false);
  const [newRoleOpen, _setNewRoleOpen] = useState(false);
  const [newRoleBoard, setNewRoleBoard] = useState<PairingBoard>();

  const handleSetNewRoleOpen = (open: boolean, pairingBoard: PairingBoard) => {
    console.log("handleSetNewRoleOpen", open, pairingBoard);
    setNewRoleBoard(pairingBoard);
    _setNewRoleOpen(open);
  };

  const value = {
    newPersonOpen,
    newPairingBoardOpen,
    newRoleOpen,
    setNewPersonOpen,
    setNewPairingBoardOpen,
    setNewRoleOpen: handleSetNewRoleOpen,
  };

  return (
    <WorkspaceContext.Provider value={value}>
      <DragProvider>
        <div className="workspace">
          <PairingBoardProvider pairingBoardId={FLOATING_IDX}>
            <FloatingParrits />
          </PairingBoardProvider>
          <div className="dotted-line" />
          <div className="pairing-boards-container">
            <h2 className="pairing-boards-title">Pairing Boards</h2>
            <PairingBoardList />
            <div
              className="add-board-button"
              onClick={() => setNewPairingBoardOpen(true)}
            />
          </div>

          {newPersonOpen && (
            <NameForm
              purpose="Person"
              onClose={() => setNewPersonOpen(false)}
            />
          )}

          {newPairingBoardOpen && (
            <NameForm
              purpose="PairingBoard"
              onClose={() => setNewPairingBoardOpen(false)}
            />
          )}
          {newRoleOpen && (
            <NameForm
              purpose="Role"
              pairingBoard={newRoleBoard}
              onClose={() => _setNewRoleOpen(false)}
            />
          )}
        </div>
      </DragProvider>
    </WorkspaceContext.Provider>
  );
};
