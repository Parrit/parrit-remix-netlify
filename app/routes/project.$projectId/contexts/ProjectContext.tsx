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
} from "~/api/common/interfaces/parrit.interfaces";
import { AppContext } from "./App";
import { move_person, remove_person } from "~/func";
import reset_pairs from "~/func/reset_pairs";
import { useFetcher, useLocation } from "@remix-run/react";
import { recommendPairs } from "~/func/recommend_pairs";
import { DateTime } from "luxon";
import { pairing_instances } from "~/func/utils";
import { HistoryPOST } from "~/routes/project.$projectId.history/post.server";

export interface IProjectContext {
  project: Project;
  pairingHistory: ProjectPairingSnapshot[];
  // handleNameFormSubmit: (
  //   purpose: NameFormPurpose,
  //   event: React.FormEvent<HTMLFormElement>
  // ) => void;
  findPairingBoardByRole: (role: Role) => PairingBoard | undefined;
  findPairingBoardByPerson: (person: Person) => PairingBoard | undefined;
  renamePairingBoard: (name: string, pairingBoardId: string) => Promise<void>;
  movePerson: (person: Person, position: PairingBoard) => void;
  moveRole: (role: Role, position: PairingBoard) => void;
  destroyPerson: (person: Person) => void;
  destroyRole: (role: Role) => Promise<any>;
  destroyPairingBoard: (pairingBoard: PairingBoard) => Promise<any>;
  resetPairs: () => void;
  getRecommendedPairs: () => void;
  savePairing: () => void;
  deletePairingArrangement: (pairingArrangementId: string) => void;
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

  //   const {
  //     getPairingHistory,
  //     postPerson,
  //     postPairingBoard,
  //     deletePairingBoard,
  //     putPairingBoard,
  //     postRole,
  //     putRolePosition,
  //     deleteRole,
  //     deletePerson,
  //     postProjectPairing,
  //     updateProject,
  //     deletePairingArrangementRequest,
  //   } = useContext(ApiContext);

  // useEffect(() => {
  //   getPairingHistory(project.id).then((history) => {
  //     setPairingArrangements(history);
  //   });
  //   //run only once
  // }, []);

  const createPairingBoard = (name: string) => {
    console.error("createPairingBoard not yet implemented");
    //   return postPairingBoard(project.id, name).then((updatedProject) => {
    //     setProject(updatedProject);
    //   });
    return Promise.reject();
  };

  const destroyPairingBoard = (pairingBoard: PairingBoard) => {
    // const arr: PairingBoard[] = [];
    // const copy = { ...project, pairingBoards: arr };
    // project.pairingBoards.forEach((pb) => {
    //   if (pb.id === pairingBoard.id) {
    //     // this is the one we want to delete
    //     copy.people = [...copy.people, ...pb.people];
    //   } else {
    //     copy.pairingBoards.push(pb);
    //   }
    // });
    // console.log("setting project post deletion", copy);
    // setProject(copy);
    // return deletePairingBoard(project.id, pairingBoard.id).then(
    //   (updatedProject) => {
    //     setProject(updatedProject);
    //   }
    // );
    return Promise.reject("destroyPairingBoard not implemented");
  };

  const removeRole = (
    role: Role,
    proj: Project,
    position: PairingBoard
  ): Project => {
    throw new Error("not yet implemented");
    // const copy = { ...proj };
    // const arr: Role[] = [];
    // const board = copy.pairingBoards.find((pb) => pb.id === position.id);
    // if (!board) {
    //   throw new Error("AWK! Totally Broken!");
    // }
    // const index = copy.pairingBoards.indexOf(board);
    // position.roles.forEach((r) => {
    //   if (r.id !== role.id) {
    //     arr.push(r);
    //   }
    // });
    // copy.pairingBoards[index] = { ...board, roles: arr };

    // return copy;
  };

  const addRole = (
    role: Role,
    proj: Project,
    position: PairingBoard
  ): Project => {
    throw new Error("not yet implemented");
    // const copy = { ...proj };
    // const board = copy.pairingBoards.find((pb) => pb.id === position.id);
    // if (!board) {
    //   throw new Error("AWK! Totally Broken!");
    // }
    // const index = copy.pairingBoards.indexOf(board);
    // board.roles.push(role);
    // copy.pairingBoards[index] = board;
    // setProject(copy);

    // return copy;
  };

  const createRole = (name: string, pairingBoard: PairingBoard) => {
    // return postRole(project.id, pairingBoard.id, name).then((project) => {
    //   setProject(project);
    // });
    return Promise.reject();
  };

  const moveRole = (role: Role, position: PairingBoard) => {
    const currentRoleBoard = findPairingBoardByRole(role);
    if (!currentRoleBoard) {
      throw new Error(
        "AWK! Totally broken, can't move role from a place it doesn't exist"
      );
    }
    let proj = removeRole(role, project, currentRoleBoard);
    proj = addRole(role, proj, position);
    setProject(proj);

    // putRolePosition(project.id, currentRoleBoard, role, position).then(
    //   (updatedProject) => setProject(updatedProject)
    // );
  };

  const destroyRole = (role: Role) => {
    const currentPB = findPairingBoardByRole(role);

    if (currentPB) {
      const update = removeRole(role, project, currentPB);
      setProject(update);
      //   return deleteRole(project.id, currentPB, role).then((updatedProject) =>
      //     setProject(updatedProject)
      //   );
    }

    return Promise.reject(
      new Error(`couldn't find role ${role.name} on any pairing board`)
    );
  };

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
      { method: "PUT", action: `/person/${person.id}` }
    );
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

  const renamePairingBoard = (
    name: string,
    pairingBoardId: string
  ): Promise<void> => {
    console.error("renamePairingBoard not yet implemented");
    return Promise.reject("renamePairingBoard not yet implemented");
    // setProject(renameBoard(name, pairingBoardId, project));
    // return putPairingBoard(project.id, pairingBoardId, name).then(
    //   (updatedProject) => {
    //     setProject(updatedProject);
    //   }
    // );
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
    // handleNameFormSubmit,
    findPairingBoardByRole,
    findPairingBoardByPerson,
    destroyPairingBoard,
    renamePairingBoard,
    movePerson,
    moveRole,
    destroyPerson,
    destroyRole,
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
