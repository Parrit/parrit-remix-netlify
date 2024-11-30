import React from "react";
import { PairingBoard } from "~/api/common/interfaces";
import { PairingBoardView } from "./PairingBoardView";

interface Props {
  pairingBoards: PairingBoard[];
}

export const PairingBoardList: React.FC<Props> = (props) => {
  return (
    <div className="pairing-boards">
      {props.pairingBoards.map((pairingBoard) => {
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
