import { curry, lensProp, set, without } from "ramda";
import { Person, Project } from "~/api/common/interfaces/parrit.interfaces";

export default curry(
  (person: Person, project: Project): Project =>
    set<Project, Person[]>(
      lensProp("people"),
      without([person], project.people),
      project
    )
);
