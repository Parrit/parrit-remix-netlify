import {
  FLOATING_IDX,
  PairingBoard,
  Person,
  Project,
} from "./interfaces/parrit.interfaces";
import * as R from "ramda";

// Functional programing utilities for working with interfaces

export const move_person = (
  project: Project,
  person: Person,
  position: PairingBoard
) =>
  R.pipe<[Project], Project, Project>(
    remove_person(person),
    add_person(person, position)
  )(project);

export const add_person = R.curry(
  (person: Person, position: PairingBoard, project: Project) => {
    const f1 = add_person_to_position(person, position);
    const f2 =
      position.id === FLOATING_IDX
        ? add_person_to_floating(person)
        : R.identity;
    return R.pipe<[Project], Project, Project>(f1, f2)(project);
  }
);

const add_person_to_position = R.curry(
  (person: Person, position: PairingBoard, project: Project) =>
    R.over<Project, PairingBoard[]>(
      R.lensProp("pairingBoards"),
      R.map<PairingBoard, PairingBoard>((x) => {
        if (x.id === position.id) {
          return R.over<PairingBoard, Person[]>(
            R.lensProp("people"),
            R.append({ ...person, pairing_board_id: position.id }),
            x
          );
        }
        return x;
      }),
      project
    )
);

const add_person_to_floating = R.curry((person: Person, project: Project) =>
  R.over<Project, Person[]>(
    R.lensPath(["floating", "people"]),
    R.append(person),
    project
  )
);

export const remove_person = R.curry(
  (person: Person, project: Project): Project =>
    R.pipe<[Project], Project, Project>(
      remove_person_from_boards(person),
      remove_person_from_floating(person)
    )(project)
);

const remove_person_from_boards = R.curry(
  (person: Person, project: Project): Project =>
    R.over<Project, PairingBoard[]>(
      R.lensProp("pairingBoards"),
      R.map<PairingBoard, PairingBoard>((x) => {
        if (x.people.map((p) => p.id).includes(person.id)) {
          return R.set<PairingBoard, Person[]>(
            R.lensProp("people"),
            R.without([person], x.people),
            x
          );
        }
        return x;
      }),
      project
    )
);

const remove_person_from_floating = R.curry(
  (person: Person, project: Project): Project =>
    R.set<Project, Person[]>(
      R.lensPath(["floating", "people"]),
      R.without([person], project.floating.people),
      project
    )
);

const pb_index_by_id = R.curry((pbs: PairingBoard[], pb_id: string) =>
  R.findIndex<PairingBoard>((pb) => pb.id === pb_id)(pbs)
);

const rename_pairing_board_from_list = R.curry(
  (pb_id: string, rename: string, pbs: PairingBoard[]) => {
    const foundIndex = pb_index_by_id(pbs, pb_id);
    if (foundIndex < 0) {
      return pbs;
    }
    return R.adjust<PairingBoard>(foundIndex, R.assoc("name", rename), pbs);
  }
);

export const rename_pairing_board = R.curry(
  (project: Project, pb_id: string, rename: string): Project =>
    R.over<Project, PairingBoard[]>(
      R.lensProp("pairingBoards"),
      rename_pairing_board_from_list(pb_id, rename),
      project
    )
);

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

export const get_empty_pairing_board = (
  project: Project
): PairingBoard | undefined => {
  return project.pairingBoards.find(
    (pb) => pb.people.length === 0 && !pb.exempt
  );
};

const unpaired_sticking_people = (project: Project): Person[] =>
  project.pairingBoards
    .filter((board) => !board.exempt)
    .filter((board) => board.people.length === 1)
    .flatMap((board) => board.people);

const find_pairing_board_by_person = (
  project: Project,
  person: Person
): PairingBoard | undefined =>
  project.pairingBoards.find((pb) => pb.people.find((p) => p.id === person.id));
