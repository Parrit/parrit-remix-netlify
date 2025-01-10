import { DateTime } from "luxon";
import React, { useContext } from "react";
import {
  Person,
  ProjectPairingSnapshot,
} from "~/api/common/interfaces/parrit.interfaces";
import { ProjectContext } from "../../contexts/ProjectContext";
import { TrashIcon } from "~/ui/TrashIcon";

interface Props {
  pairingArrangement: ProjectPairingSnapshot;
}

const snip = (person?: Person): string => {
  if (!person) {
    return "null";
  }
  return person.name.slice(0, 3);
};

const PairingHistoryRecord: React.FC<Props> = (props) => {
  const { pairingArrangement } = props;
  const formattedDate = DateTime.fromISO(
    pairingArrangement.pairingTime
  ).toFormat("MMMM d y, h:mm a");
  const { deletePairingArrangement } = useContext(ProjectContext);

  // generate a deterministic test id based on first 3 letters of each person's name and the first 3 letters of the board name
  const testId = pairingArrangement.pairingInstances
    .map((instance) => {
      const pbName = instance.pairingBoardName ?? "null";
      // get the first 3 letters of each person's name
      const names = instance.people.map(snip);
      names.push(pbName.slice(0, 3));
      // alphabetize the names
      names.sort();
      return names.join("-");
    })
    .join("-")
    .toLowerCase();

  return (
    <div data-testid={`record-${testId}`} className="pairing-history-record">
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
        data-testid={`delete-pairing-arrangement-${testId}`}
        className="delete-pairing-arrangement"
        onClick={() => {
          deletePairingArrangement(pairingArrangement);
        }}
      >
        <TrashIcon />
      </div>
      <div className="dotted-line" />
    </div>
  );
};

export default PairingHistoryRecord;
