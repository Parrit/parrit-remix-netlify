/**
 * These files are tested via the functionality of other tests.
 * That's what makes them utils and not their own functions
 */

import {
  Project,
  Person,
  PairingBoard,
} from "~/api/common/interfaces/parrit.interfaces";

export const can_a_pairing_be_made = (project: Project): boolean => {
  const atLeast2Floaters = project.floating.people.length >= 2;
  const atLeast1Floater = project.floating.people.length >= 1;
  const atLeast1EmptyBoard = get_empty_pairing_board(project) !== undefined;
  const atLeast1UnpairedSticker = unpaired_sticking_people(project).length >= 1;
  return (
    (atLeast1Floater && atLeast1UnpairedSticker) ||
    (atLeast2Floaters && atLeast1EmptyBoard)
  );
};

export const unpaired_sticking_people = (project: Project): Person[] =>
  project.pairingBoards
    .filter((board) => !board.exempt)
    .filter((board) => board.people.length === 1)
    .flatMap((board) => board.people);

export const get_empty_pairing_board = (
  project: Project
): PairingBoard | undefined => {
  return project.pairingBoards.find(
    (pb) => pb.people.length === 0 && !pb.exempt
  );
};

export const all_people_in_project = (project: Project): Person[] => {
  const people: Person[] = [...project.floating.people];
  project.pairingBoards.forEach((pb) =>
    pb.people.forEach((person) => people.push(person))
  );
  return people;
};

export const find_pairing_board_by_person = (
  project: Project,
  person: Person
): PairingBoard | undefined =>
  project.pairingBoards.find((pb) => pb.people.find((p) => p.id === person.id));
