import {
  Project,
  Person,
  PairingInstance,
  FLOATING_IDX,
} from "~/api/common/interfaces/parrit.interfaces";
import {
  can_a_pairing_be_made,
  floating_people,
  get_empty_pairing_board,
  unpaired_sticking_people,
} from "./utils";
import move_person from "./move_person";

export function recommendPairs(project: Project, history: PairingInstance[]) {
  const helper = new ProjectHelper(project, history);
  return helper.recommendedConfiguration();
}

class Pair {
  private person1;
  private person2;

  constructor(person1?: Person, person2?: Person) {
    // guarantee that this pair will be formed the same no matter the order
    // that the people are input
    if (!person1 || !person2) {
      console.error(person1, person2);
      throw new Error("Pair must be initialized with two people");
    }
    const arr = [person1, person2].sort((a, b) => a.id.localeCompare(b.id));
    this.person1 = arr[0];
    this.person2 = arr[1];
  }

  get hashcode() {
    return `${this.person1.id}&&${this.person2.id}`;
  }
}

export class ProjectHelper {
  private project: Project;
  timetable: { [key: string]: Date };

  constructor(project: Project, history: PairingInstance[]) {
    this.project = project;
    this.timetable = {};
    history.forEach((item) => {
      if (item.people.length > 1) {
        for (let i = 0; i < item.people.length; i++) {
          for (let j = i + 1; j < item.people.length; j++) {
            const p1 = item.people[i];
            const p2 = item.people[j];
            try {
              const pair = new Pair(p1, p2);
              const hash = pair.hashcode;
              const extant = this.timetable[hash];
              const pairDate = new Date(item.pairingTime);
              if (!extant) {
                this.timetable[hash] = pairDate; // create date from timestamp
              } else {
                if (extant.getTime() < pairDate.getTime()) {
                  this.timetable[hash] = pairDate;
                }
              }
            } catch (e) {
              console.error(e);
            }
          }
        }
      }
    });
  }

  recommendedConfiguration(): Project {
    let projectCopy = { ...this.project };
    while (can_a_pairing_be_made(projectCopy)) {
      projectCopy = this.iterateMatch(projectCopy);
    }
    this.project = projectCopy;
    return this.project;
  }

  iterateMatch(project: Project) {
    const floatingPerson = floating_people(project).at(0);
    if (!floatingPerson) {
      console.warn("attempting no floating people, a match cannot be made");
      return project;
    }
    let topPair = this.pairFor(floatingPerson, project);
    for (let i = 0; topPair != undefined; i++) {
      topPair = this.pairFor(floatingPerson, project, i);
      if (topPair) {
        const targetPairingBoard = topPair.pairing_board_id;
        if (targetPairingBoard !== FLOATING_IDX) {
          const proj = move_person(project, floatingPerson, targetPairingBoard);
          return proj;
        } else {
          // we know top pair is floating because they have no pairing board
          const emptyPairingBoard = get_empty_pairing_board(project);
          if (emptyPairingBoard && !emptyPairingBoard.exempt) {
            let proj = move_person(
              project,
              floatingPerson,
              emptyPairingBoard.id
            );
            proj = move_person(proj, topPair, emptyPairingBoard.id);
            return proj;
          } else {
            // found 2 unmatched pairs but no empty pairing board
          }
        }
      }
    }

    return project;
  }

  pairFor(
    person?: Person,
    project: Project = this.project,
    nth: number = 0
  ): Person | undefined {
    if (!person) {
      console.warn("attempting to find pair for nonexistant person");
      return undefined;
    }
    // 0-indexed number from the last most recent paired
    const allAvailable = [
      ...floating_people(project),
      ...unpaired_sticking_people(project),
    ].filter((p) => !!p && p.id !== person.id);
    const partnerDates = allAvailable
      .map((p) => {
        if (person.id === p.id) {
          return undefined;
        }
        const hashcode = new Pair(person, p).hashcode;
        return { time: this.timetable[hashcode], partner: p };
      })
      .filter((el) => {
        return el !== undefined;
      })
      .sort((a, b) => {
        if (!a?.time) {
          // this pairing has never occured
          return -1;
        }
        if (!b?.time) {
          // this pairing has never occured
          return 1;
        }
        return a.time.getTime() - b.time.getTime();
      });
    if (partnerDates.length > 0) {
      return partnerDates[nth]?.partner;
    }

    return undefined;
  }
}
