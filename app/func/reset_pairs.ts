import {
  PairingBoard,
  Person,
  Project,
} from "~/api/common/interfaces/parrit.interfaces";

export default (project: Project) => {
  const people: Person[] = [...project.floating.people];
  const pbs: PairingBoard[] = [];
  project.pairingBoards.forEach((pb) => {
    if (pb.exempt) {
      pbs.push({ ...pb });
    } else {
      pb.people.forEach((p) => people.push(p));
      pbs.push({ ...pb, people: [] });
    }
  });
  return {
    ...project,
    pairingBoards: pbs,
    floating: { ...project.floating, people },
  };
};
