import {
  Project,
  Person,
} from "~/api/common/interfaces/parrit.interfaces";
import add_person from "./add_person";
import remove_person from "./remove_person";
import { pipe } from "ramda";

export default (project: Project, person: Person, positionId: string) =>
  pipe<[Project], Project, Project>(
    remove_person(person),
    add_person(person, positionId)
  )(project);
