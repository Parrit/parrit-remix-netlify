import {
  curry,
  identity,
  pipe,
  over,
  lensProp,
  map,
  append,
  lensPath,
} from "ramda";
import {
  Person,
  PairingBoard,
  Project,
  FLOATING_IDX,
} from "~/api/common/interfaces/parrit.interfaces";

export default curry(
  (person: Person, position: PairingBoard, project: Project) => {
    const f1 = add_person_to_position(person, position);
    const f2 =
      position.id === FLOATING_IDX ? add_person_to_floating(person) : identity;
    return pipe<[Project], Project, Project>(f1, f2)(project);
  }
);

const add_person_to_position = curry(
  (person: Person, position: PairingBoard, project: Project) =>
    over<Project, PairingBoard[]>(
      lensProp("pairingBoards"),
      map<PairingBoard, PairingBoard>((x) => {
        if (x.id === position.id) {
          return over<PairingBoard, Person[]>(
            lensProp("people"),
            append({ ...person, pairing_board_id: position.id }),
            x
          );
        }
        return x;
      }),
      project
    )
);

const add_person_to_floating = curry((person: Person, project: Project) =>
  over<Project, Person[]>(
    lensPath(["floating", "people"]),
    append(person),
    project
  )
);
