/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  ProjectPairingSnapshot,
  PairingBoard,
  Person,
  Project,
  Role,
  FLOATING_IDX,
} from "~/api/common/interfaces/parrit.interfaces";
import { AppContext } from "./App";
import { move_person, remove_person } from "~/func";
import reset_pairs from "~/func/reset_pairs";
import { useFetcher, useLocation } from "@remix-run/react";
import { recommendPairs } from "~/func/recommend_pairs";
import { DateTime } from "luxon";
import { pairing_instances } from "~/func/utils";
import { HistoryPOST } from "~/routes/project.$projectId.history/record_pairs.server";
import { set } from "node_modules/cypress/types/lodash";

export interface IProjectContext {
  project: Project;
  pairingHistory: ProjectPairingSnapshot[];
  findPairingBoardByRole: (role: Role) => PairingBoard | undefined;
  findPairingBoardByPerson: (person: Person) => PairingBoard | undefined;
  movePerson: (person: Person, position: PairingBoard) => void;
  moveRole: (role: Role, position: PairingBoard) => void;
  destroyPerson: (person: Person) => void;
  destroyRole: (role: Role) => void;
  resetPairs: () => void;
  getRecommendedPairs: () => void;
  savePairing: () => void;
  deletePairingArrangement: (pairingArrangementId: string) => void;
  deletePairingBoard: (pairingBoardId: string) => void;
}

export const ProjectContext = createContext({} as IProjectContext);

export const PROJECT_FETCHER = "PROJECT_FETCHER";
export const PROJECT_MUTATOR = "PROJECT_MUTATOR";

interface Props {
  children: ReactNode;
}

export const ProjectProvider: React.FC<Props> = (props) => {
  const location = useLocation();
  const { setSystemAlert } = useContext(AppContext);
  const projectFetcher = useFetcher<Project>({ key: PROJECT_FETCHER });
  const historyFetcher = useFetcher<ProjectPairingSnapshot[]>();
  const mutator = useFetcher({ key: PROJECT_MUTATOR });
  const [pairingArrangements, setPairingArrangements] = useState<
    ProjectPairingSnapshot[]
  >([]);
  const [project, setProject] = useState<Project>(
    projectFetcher.data as Project
  );

  useEffect(() => {
    try {
      projectFetcher.load(location.pathname);
    } catch (err) {
      console.error(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (projectFetcher.data && projectFetcher.state === "idle") {
      setProject(projectFetcher.data);
    }
  }, [projectFetcher.data, projectFetcher.state]);

  useEffect(() => {
    try {
      historyFetcher.load(`${location.pathname}/history`);
    } catch (err) {
      console.error(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    if (historyFetcher.data && historyFetcher.state === "idle") {
      setPairingArrangements(historyFetcher.data);
    }
  }, [historyFetcher.data, historyFetcher.state]);

  const findPairingBoardByRole = (role: Role): PairingBoard | undefined =>
    project.pairingBoards.find(
      (pb) =>
        pb.id === project.roles.find((r) => r.id === role.id)?.pairing_board_id
    );

  const findPairingBoardByPerson = (person: Person): PairingBoard | undefined =>
    project.pairingBoards.find(
      (pb) =>
        pb.id ===
        project.people.find((p) => p.id === person.id)?.pairing_board_id
    );

  const movePerson = (person: Person, position: PairingBoard) => {
    setProject((oldVal) => move_person(oldVal, person, position));
    return mutator.submit(
      { ...person, project_id: project.id, pairing_board_id: position.id },
      {
        method: "PUT",
        action: `/person/${person.id}`,
      }
    );
  };

  const destroyRole = (role: Role) => {
    const copy = { ...project };
    const roleIndex = copy.roles.findIndex((r) => r.id === role.id);
    copy.roles.splice(roleIndex, 1);
    setProject(copy);
    mutator.submit({}, { method: "DELETE", action: `/role/${role.id}` });
  };

  const deletePairingBoard = (pairingBoardId: string) => {
    // optimistic update
    const copy = { ...project };
    copy.pairingBoards = copy.pairingBoards.filter(
      (pb) => pb.id !== pairingBoardId
    );
    // call movePerson to move all people on the pairing board to the floating board
    copy.people
      .filter((p) => p.pairing_board_id === pairingBoardId)
      .forEach((p) => {
        movePerson(p, copy.floating);
      });
    // delete all of the roles associated with the pairing board
    copy.roles
      .filter((r) => r.pairing_board_id === pairingBoardId)
      .forEach((r) => {
        destroyRole(r);
      });
    setProject(copy);
    mutator.submit(
      {},
      { method: "DELETE", action: `/pairing_board/${pairingBoardId}` }
    );
  };

  const moveRole = (role: Role, position: PairingBoard) => {
    // set project to new state
    const copy = { ...project };
    const roleIndex = copy.roles.findIndex((r) => r.id === role.id);
    const update = { ...role, pairing_board_id: position.id };
    copy.roles[roleIndex] = update;
    setProject(copy);
    mutator.submit(update, {
      method: "PATCH",
      action: `/role/${role.id}`,
      encType: "application/json",
    });
  };

  const destroyPerson = (person: Person) => {
    const after = remove_person(person, project);
    setProject(after);
    return mutator.submit(
      {},
      {
        method: "DELETE",
        action: `/person/${person.id}`,
      }
    );
  };

  const resetPairs = () => setProject(reset_pairs(project));

  const getRecommendedPairs = () => {
    const pairingHistories = pairingArrangements.flatMap((arrangement) => {
      return arrangement.pairingInstances.map((history) => {
        return {
          pairingBoardName: history.pairingBoardName,
          people: history.people,
          pairingTime: history.pairingTime,
          projectId: project.id,
        };
      });
    });
    const recommendedConfiguration = recommendPairs(project, pairingHistories);
    setProject(recommendedConfiguration);
  };

  const savePairing = () => {
    const pairingTime = DateTime.now().toISO();

    const body: HistoryPOST = {
      snapshot: {
        pairingTime,
        id: "",
        pairingInstances: pairing_instances(project, pairingTime),
        projectId: project.id,
      },
    };
    return mutator.submit(body, {
      method: "POST",
      action: `/project/${project.id}/history`,
      encType: "application/json",
    });
  };

  const deletePairingArrangement = (pairingArrangementId: string): void => {
    console.error("deletePairingArrangement not yet implemented");
    // setPairingArrangements(
    //   pairingArrangements.filter((pa) => pa.id != pairingArrangementId)
    // );

    // deletePairingArrangementRequest(project.id, pairingArrangementId).then(
    //   (updatedPairingArrangement) => {
    //     setPairingArrangements(updatedPairingArrangement);
    //   }
    // );
  };

  const value = {
    findPairingBoardByRole,
    findPairingBoardByPerson,
    movePerson,
    moveRole,
    destroyPerson,
    destroyRole,
    deletePairingBoard,
    resetPairs,
    getRecommendedPairs,
    savePairing,
    pairingHistory: pairingArrangements,
    deletePairingArrangement,
    project,
  };

  if (!project) {
    return <>Loading Project...</>;
  }

  return (
    <ProjectContext.Provider value={value}>
      {props.children}
    </ProjectContext.Provider>
  );
};
