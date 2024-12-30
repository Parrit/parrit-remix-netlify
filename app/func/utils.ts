/**
 * These files are tested via the functionality of other tests.
 * That's what makes them utils and not their own functions
 */
import {
  Project,
  Person,
  PairingBoard,
  FLOATING_IDX,
  PairingInstance,
} from "~/api/common/interfaces/parrit.interfaces";

export const can_a_pairing_be_made = (project: Project): boolean => {
  const floatingPeople = floating_people(project);
  const atLeast2Floaters = floatingPeople.length >= 2;
  const atLeast1Floater = floatingPeople.length >= 1;
  const atLeast1EmptyBoard = get_empty_pairing_board(project) !== undefined;
  const atLeast1UnpairedSticker = unpaired_sticking_people(project).length >= 1;
  const rule1 = atLeast1Floater && atLeast1UnpairedSticker;
  const rule2 = atLeast2Floaters && atLeast1EmptyBoard;
  return rule1 || rule2;
};

export const unpaired_sticking_people = (project: Project): Person[] => {
  const boardIdToPerson: Record<string, Person | null> = {};

  for (const person of project.people) {
    const isFloating = person.pairing_board_id === FLOATING_IDX;
    const board = project.pairingBoards.find(
      (pb) => pb.id === person.pairing_board_id
    );
    const isExempt = board?.exempt;
    if (isFloating || isExempt) {
      // move to next iteration
      continue;
    }
    if (boardIdToPerson[person.pairing_board_id] === undefined) {
      boardIdToPerson[person.pairing_board_id] = person;
    } else {
      // mark as null to show that there has already been a colision
      boardIdToPerson[person.pairing_board_id] = null;
    }
  }

  return Object.values(boardIdToPerson).filter((val) => !!val);
};

export const get_empty_pairing_board = (
  project: Project
): PairingBoard | undefined => {
  const populatedBoardIds = new Set<string>();
  project.people.forEach((p) => populatedBoardIds.add(p.pairing_board_id));
  const list = Array.from(populatedBoardIds);
  const empty = project.pairingBoards.find(
    (pb) => !list.includes(pb.id) && !pb.exempt
  );
  return empty;
};

// export const find_pairing_board_by_person = (
//   project: Project,
//   person: Person
// ): PairingBoard | undefined =>
//   project.pairingBoards.find(
//     (pb) =>
//       pb.id === project.people.find((p) => p.id === person.id)?.pairing_board_id
//   );

export const floating_people = (proj: Project) =>
  proj.people.filter(
    ({ pairing_board_id }) => pairing_board_id === FLOATING_IDX
  );

const pairs_of_people = (proj: Project) =>
  proj.people.reduce((acc, item) => {
    const map = acc.get(item.pairing_board_id) ?? {};
    map[item.id] = item;
    acc.set(item.pairing_board_id, map);
    return acc;
  }, new Map<string, Record<string, Person>>());

export const pairing_instances = (
  project: Project,
  pairingTime: string
): PairingInstance[] => {
  const map = pairs_of_people(project);
  const instances: PairingInstance[] = [];

  for (const [key, value] of map) {
    if (key === FLOATING_IDX) {
      // don't consider floating to be "PAIRED"
      continue;
    }
    const pb = project.pairingBoards.find((i) => i.id === key);
    if (!pb) {
      console.warn("couldn't find a pairing board with id", key);
      continue;
    }

    const instance: PairingInstance = {
      pairingBoardName: pb.name,
      people: Object.values(value),
      pairingTime,
      projectId: project.id,
    };
    instances.push(instance);
  }

  return instances;
};
