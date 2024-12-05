import {
  curry,
  pipe,
  over,
  lensProp,
  map,
  set,
  without,
  lensPath,
} from "ramda";
import {
  Person,
  Project,
  PairingBoard,
} from "~/api/common/interfaces/parrit.interfaces";

export default curry(
  (person: Person, project: Project): Project =>
    pipe<[Project], Project, Project>(
      remove_person_from_boards(person),
      remove_person_from_floating(person)
    )(project)
);

const remove_person_from_boards = curry(
  (person: Person, project: Project): Project =>
    over<Project, PairingBoard[]>(
      lensProp("pairingBoards"),
      map<PairingBoard, PairingBoard>((board) => {
        if (board.people.map((p) => p.id).includes(person.id)) {
          return set<PairingBoard, Person[]>(
            lensProp("people"),
            without([person], board.people),
            board
          );
        }
        return board;
      }),
      project
    )
);

const remove_person_from_floating = curry(
  (person: Person, project: Project): Project =>
    set<Project, Person[]>(
      lensPath(["floating", "people"]),
      without([person], project.floating.people),
      project
    )
);
