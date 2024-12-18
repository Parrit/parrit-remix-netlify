import { LoaderFunctionArgs } from "@remix-run/node";
import parritXataClient from "~/api/parritXataClient";
import {
  FLOATING_IDX,
  Person,
  ProjectPairingSnapshot,
} from "~/api/common/interfaces/parrit.interfaces";

type Timestamp = string;

export default async (
  args: LoaderFunctionArgs
): Promise<ProjectPairingSnapshot[]> => {
  const { request } = args;
  const idMatch = /\/project\/(.*)\/history/.exec(request.url);
  if (!idMatch) {
    throw new Error("url did not match project id regex");
  }
  const project_id = idMatch[1];
  const xata = parritXataClient();
  const selected = await xata.db.PairingHistory.select([
    "pairing_board_name",
    "timestamp",
    "project_id",
    {
      name: "<-PairingHistory_Persons.pairing_history_id",
      columns: ["person_id"],
      as: "history_persons",
    },
  ])
    .filter({
      $all: [{ project_id }, { xata_createdat: { $ge: get30DaysAgo() } }],
    })
    .sort("timestamp", "desc")
    .getPaginated({ pagination: { size: 25 } });

  const serializedPairingHistory = selected.records.map((record) =>
    record.toSerializable()
  ) as unknown as SerializedPairingHistory[];

  // we need to download all of the Person objects with the ids. Sadly the reverse link so far only works
  // at nesting level 1. We have the data we have :(

  const localPeoplePromises: Promise<Person>[] = [];
  serializedPairingHistory.forEach((ser) => {
    ser.history_persons.records.forEach(({ person_id }) =>
      localPeoplePromises.push(
        xata.db.Persons.read(person_id).then((val) => {
          if (!val?.xata_id || !val.name) {
            throw new Error("retrieved person record missing critical data");
          }
          return {
            id: val.xata_id,
            name: val.name,
            pairing_board_id: val.pairing_board_id?.xata_id ?? FLOATING_IDX,
            project_id: val.project_id?.xata_id,
            type: "Person",
          };
        })
      )
    );
  });

  const localPeople: Record<string, Person> = (
    await Promise.all(localPeoplePromises)
  ).reduce((acc, person) => {
    acc[person.id] = person;
    return acc;
  }, {} as Record<string, Person>);

  // Here ==> How do I cleverly construct this map in order to pause execution for Promise resolution
  // but then end up with a map of Record:<string, Person> by the person_id

  const snapshots: Record<Timestamp, ProjectPairingSnapshot> = {};
  serializedPairingHistory.forEach((serialized) => {
    const pairingTime = serialized.timestamp ?? serialized.xata_createdat;
    const snapshot = snapshots[pairingTime] ?? {
      pairingTime,
      pairingInstances: [],
      id: serialized.xata_id,
    };
    let idx = snapshot.pairingInstances.findIndex(
      (h) => h.pairingBoardName === serialized.pairing_board_name
    );

    if (idx === -1) {
      idx = snapshot.pairingInstances.length;
      snapshot.pairingInstances.push({
        pairingBoardName: serialized.pairing_board_name,
        people: [],
        pairingTime,
        projectId: serialized.project_id,
      });
    }

    const instance = snapshot.pairingInstances[idx];

    const peopleSet = new Set<Person>(instance.people);

    serialized.history_persons.records.forEach((r) =>
      peopleSet.add(localPeople[r.person_id])
    );

    instance.people = Array.from(peopleSet);
    snapshot.pairingInstances[idx] = instance;
    snapshots[pairingTime] = snapshot;
  });
  return Object.values(snapshots);
};

function get30DaysAgo(): Date {
  const today = new Date();
  today.setDate(today.getDate() - 30);
  return today;
}

interface SerializedPairingHistory {
  history_persons: { records: { person_id: string }[] };
  pairing_board_name: string;
  project_id: string;
  xata_createdat: string;
  timestamp?: string;
  xata_id: string;
}
