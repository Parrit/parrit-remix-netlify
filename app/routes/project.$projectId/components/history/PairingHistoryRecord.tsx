import { DateTime } from "luxon";
import React, { useContext } from "react";
import { PairingArrangementDTO } from "~/api/common/interfaces/parrit.interfaces";
import { ProjectContext } from "../../contexts/ProjectContext";
import { TrashIcon } from "~/ui/TrashIcon";

interface Props {
  pairingArrangement: PairingArrangementDTO;
}

const PairingHistoryRecord: React.FC<Props> = (props) => {
  const { pairingArrangement } = props;
  const formattedDate = DateTime.fromISO(
    pairingArrangement.pairingTime
  ).toFormat("MMMM Do YYYY, h:mm a");
  const { deletePairingArrangement } = useContext(ProjectContext);

  return (
    <div className="pairing-history-record">
      <div className="pairing-history-record-clock" />
      <h3 className="pairing-time">{formattedDate}</h3>

      <div className="pairing-boards-with-people">
        {pairingArrangement.pairingHistories.map((history) => {
          return (
            <div
              key={pairingArrangement.id}
              className="pairing-board-with-people"
            >
              <div className="pairing-board-name">
                {history.pairingBoardName}:
              </div>
              {history.people.map((person) => {
                return (
                  <span key={person.id} className="person-name">
                    {person.name}
                    <span className="person-names-plus-sign">+</span>
                  </span>
                );
              })}
            </div>
          );
        })}
      </div>
      <div
        className="delete-pairing-arrangement"
        onClick={() => {
          deletePairingArrangement(pairingArrangement.id);
        }}
      >
        <TrashIcon />
      </div>
      <div className="dotted-line" />
    </div>
  );
};

export default PairingHistoryRecord;
