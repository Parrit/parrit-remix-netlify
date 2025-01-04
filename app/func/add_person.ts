import { curry, over, lensProp, append, set } from "ramda";
import {
  Person,
  Project,
} from "~/api/common/interfaces/parrit.interfaces";

export default curry((person: Person, positionId: string, project: Project) =>
  over<Project, Person[]>(
    lensProp("people"),
    append(set(lensProp("pairing_board_id"), positionId, person)),
    project
  )
);
