import { DateTime } from "luxon";
import React, { useContext } from "react";
import { ProjectPairingSnapshot } from "~/api/common/interfaces/parrit.interfaces";
import { ProjectContext } from "../../contexts/ProjectContext";
import { TrashIcon } from "~/ui/TrashIcon";

interface Props {
  pairingArrangement: ProjectPairingSnapshot;
}

const PairingHistoryRecord: React.FC<Props> = (props) => {
  const { pairingArrangement } = props;
  const formattedDate = DateTime.fromISO(
    pairingArrangement.pairingTime
  ).toFormat("MMMM d y, h:mm a");
  const { deletePairingArrangement, findPerson } = useContext(ProjectContext);

  return (
    <div className="pairing-history-record">
      <div className="pairing-history-record-clock" />
      <h3 className="pairing-time">{formattedDate}</h3>

      <div className="pairing-boards-with-people">
        {pairingArrangement.pairingInstances.map((instance) => {
          return (
            <div
              key={`instance-${instance.pairingTime}-${instance.pairingBoardName}`}
              className="pairing-board-with-people"
            >
              <div className="pairing-board-name">
                {instance.pairingBoardName}:
              </div>
              {instance.people.map((person) => {
                if (!person) {
                  return (
                    <span key="null_person">
                      <span style={{ color: "#f3736c" }}>{`Flew away`}</span>
                      <span className="person-names-plus-sign">+</span>
                    </span>
                  );
                }
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
