import React, { useState } from "react";
import { PairingBoard } from "~/api/common/interfaces/parrit.interfaces";
import { FloatingParrits } from "../components/people/FloatingParrits";
import { PairingBoardList } from "../components/pairing_board/PairingBoardList";
import { NameForm } from "../components/people/NameForm";
import Modal from "react-modal";
import { DragProvider } from "./DragContext";

interface IWorkspaceContext {
  newPersonOpen: boolean;
  newPairingBoardOpen: boolean;
  newRoleOpen: boolean;
  setNewPersonOpen: (isOpen: boolean) => void;
  setNewPairingBoardOpen: (isOpen: boolean) => void;
  setNewRoleOpen: (isOpen: boolean, pairingBoard?: PairingBoard) => void;
  newPersonError?: Error;
  newPairingBoardError?: Error;
  newRoleError?: Error;
}

export const WorkspaceContext = React.createContext({} as IWorkspaceContext);

export const Workspace: React.FC = () => {
  const [newPersonOpen, setNewPersonOpen] = useState(false);
  const [newPairingBoardOpen, setNewPairingBoardOpen] = useState(false);
  const [newRoleOpen, setNewRoleOpen] = useState(false);
  const [newRoleBoard, setNewRoleBoard] = useState<PairingBoard>();

  const handleSetNewRoleOpen = (open: boolean, pairingBoard?: PairingBoard) => {
    if (open && !pairingBoard) {
      throw new Error("opening a new role dialog without a pairing board");
    }
    setNewRoleOpen(open);
    setNewRoleBoard(pairingBoard);
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
          <FloatingParrits />
          <div className="dotted-line" />
          <div className="pairing-boards-container">
            <h2 className="pairing-boards-title">Pairing Boards</h2>
            <PairingBoardList />
            <div
              className="add-board-button"
              onClick={() => setNewPairingBoardOpen(true)}
            />
          </div>

          <Modal
            contentLabel="New Person Modal"
            isOpen={newPersonOpen}
            onRequestClose={() => setNewPersonOpen(false)}
          >
            <NameForm
              purpose="Person"
              onCancel={() => setNewPersonOpen(false)}
            />
          </Modal>
          <Modal
            contentLabel="New Pairing Board Modal"
            isOpen={newPairingBoardOpen}
            onRequestClose={() => setNewPairingBoardOpen(false)}
          >
            <NameForm
              purpose="PairingBoard"
              onCancel={() => setNewPairingBoardOpen(false)}
            />
          </Modal>
          <Modal
            contentLabel="New Role Modal"
            isOpen={newRoleOpen}
            onRequestClose={() => setNewRoleOpen(false)}
          >
            <NameForm purpose="Role" onCancel={() => setNewRoleOpen(false)} />
          </Modal>
        </div>
      </DragProvider>
    </WorkspaceContext.Provider>
  );
};
