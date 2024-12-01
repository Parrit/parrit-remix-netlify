import {
  FLOATING_IDX,
  PairingBoard,
  Person,
  Project,
} from "./interfaces/parrit.interfaces";
import * as R from "ramda";

// Functional programing utilities for working with interfaces

export const movePerson = (
  project: Project,
  person: Person,
  position: PairingBoard
) =>
  R.pipe<[Project], Project, Project>(
    removePerson(person),
    addPerson(person, position)
  )(project);

export const addPerson = R.curry(
  (person: Person, position: PairingBoard, project: Project) => {
    const f1 = addPersonToPosition(person, position);
    const f2 =
      position.id === FLOATING_IDX ? addPersonToFloating(person) : R.identity;
    return R.pipe<[Project], Project, Project>(f1, f2)(project);
  }
);

const addPersonToPosition = R.curry(
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

const addPersonToFloating = R.curry((person: Person, project: Project) =>
  R.over<Project, Person[]>(
    R.lensPath(["floating", "people"]),
    R.append(person),
    project
  )
);

export const removePerson = R.curry(
  (person: Person, project: Project): Project =>
    R.pipe<[Project], Project, Project>(
      removePersonFromBoards(person),
      removePersonFromFloating(person)
    )(project)
);

const removePersonFromBoards = R.curry(
  (person: Person, project: Project): Project =>
    R.over<Project, PairingBoard[]>(
      R.lensProp("pairingBoards"),
      R.map<PairingBoard, PairingBoard>((x) => {
        if (x.people.includes(person)) {
          return R.set<PairingBoard, Person[]>(
            R.lensProp("people"),
            R.without(x.people, [person]),
            x
          );
        }
        return x;
      }),
      project
    )
);

const removePersonFromFloating = R.curry(
  (person: Person, project: Project): Project =>
    R.set<Project, Person[]>(
      R.lensPath(["floating", "people"]),
      R.without([person], project.floating.people),
      project
    )
);

const pbIndexById = R.curry((pbs: PairingBoard[], pb_id: string) =>
  R.findIndex<PairingBoard>((pb) => pb.id === pb_id)(pbs)
);

const renamePairingBoardFromList = R.curry(
  (pb_id: string, rename: string, pbs: PairingBoard[]) => {
    const foundIndex = pbIndexById(pbs, pb_id);
    if (foundIndex < 0) {
      return pbs;
    }
    return R.adjust<PairingBoard>(foundIndex, R.assoc("name", rename), pbs);
  }
);

export const renamePairingBoard = R.curry(
  (project: Project, pb_id: string, rename: string): Project =>
    R.over<Project, PairingBoard[]>(
      R.lensProp("pairingBoards"),
      renamePairingBoardFromList(pb_id, rename),
      project
    )
);

export const canAPairingBeMade = (project: Project): boolean => {
  const atLeast2Floaters = project.floating.people.length >= 2;
  const atLeast1Floater = project.floating.people.length >= 1;
  const atLeast1EmptyBoard = getEmptyPairingBoard(project) !== undefined;
  const atLeast1UnpairedSticker = unpairedStickingPeople(project).length >= 1;
  return (
    (atLeast1Floater && atLeast1UnpairedSticker) ||
    (atLeast2Floaters && atLeast1EmptyBoard)
  );
};

export const getEmptyPairingBoard = (
  project: Project
): PairingBoard | undefined => {
  return project.pairingBoards.find(
    (pb) => pb.people.length === 0 && !pb.exempt
  );
};

const unpairedStickingPeople = (project: Project): Person[] =>
  project.pairingBoards
    .filter((board) => !board.exempt)
    .filter((board) => board.people.length === 1)
    .flatMap((board) => board.people);

const findPairingBoardByPerson = (
  project: Project,
  person: Person
): PairingBoard | undefined =>
  project.pairingBoards.find((pb) => pb.people.find((p) => p.id === person.id));
