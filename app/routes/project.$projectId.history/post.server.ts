import { ProjectPairingSnapshot } from "~/api/common/interfaces/parrit.interfaces";
import parritXataClient from "~/api/parritXataClient";

export interface HistoryPOST {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
  snapshot: ProjectPairingSnapshot;
}

export default async (request: HistoryPOST) => {
  const xata = parritXataClient();
  const result = await Promise.all(
    request.snapshot.pairingInstances.map((instance) =>
      xata.db.PairingHistory.create({
        pairing_board_name: instance.pairingBoardName,
        timestamp: instance.pairingTime,
        project_id: request.snapshot.projectId,
      }).then((createdHistory) =>
        Promise.all(
          instance.people.map((person) =>
            xata.db.PairingHistory_Persons.create({
              pairing_history_id: createdHistory.xata_id,
              person_id: person.id,
            })
          )
        )
      )
    )
  );
  return result;
};
