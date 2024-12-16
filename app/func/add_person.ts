import { curry, over, lensProp, append, set } from "ramda";
import {
  Person,
  PairingBoard,
  Project,
} from "~/api/common/interfaces/parrit.interfaces";

export default curry(
  (person: Person, position: PairingBoard, project: Project) =>
    over<Project, Person[]>(
      lensProp("people"),
      append(set(lensProp("pairing_board_id"), position.id, person)),
      project
    )
);
