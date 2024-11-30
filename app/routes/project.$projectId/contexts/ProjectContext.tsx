/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, ReactNode, useContext, useState } from "react";
import {
  PairingArrangementDTO,
  PairingBoard,
  Person,
  Project,
  Role,
} from "~/api/common/interfaces";
import { AppContext } from "./App";

export interface IProjectContext {
  project: Project;
  pairingHistory: PairingArrangementDTO[];
  createPerson: (name: string) => Promise<void>;
  createPairingBoard: (name: string) => Promise<void>;
  renamePairingBoard: (name: string, pairingBoardId: string) => Promise<void>;
  createRole: (name: string, pairingBoard: PairingBoard) => Promise<void>;
  movePerson: (person: Person, position?: PairingBoard) => void;
  moveRole: (role: Role, position: PairingBoard) => void;
  destroyPerson: (person: Person) => Promise<any>;
  destroyRole: (role: Role) => Promise<any>;
  destroyPairingBoard: (pairingBoard: PairingBoard) => Promise<any>;
  resetPairs: () => void;
  getRecommendedPairs: () => void;
  savePairing: () => void;
  deletePairingArrangement: (pairingArrangementId: string) => void;
}

export const ProjectContext = createContext({} as IProjectContext);

interface Props {
  project: Project;
  children: ReactNode;
}

export const ProjectProvider: React.FC<Props> = (props) => {
  const { setSystemAlert } = useContext(AppContext);
  const [project, setProject] = useState<Project>(props.project);
  const [pairingArrangements, setPairingArrangements] = useState<
    PairingArrangementDTO[]
  >([]);

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

  const createPerson = (name: string) => {
    console.error("createPerson not yet implemented");
    //   return postPerson(project.id, name).then((updatedProject) => {
    //     setProject(updatedProject);
    //   });
    return Promise.reject();
  };

  const createPairingBoard = (name: string) => {
    console.error("createPairingBoard not yet implemented");
    //   return postPairingBoard(project.id, name).then((updatedProject) => {
    //     setProject(updatedProject);
    //   });
    return Promise.reject();
  };

  const destroyPairingBoard = (pairingBoard: PairingBoard) => {
    const arr: PairingBoard[] = [];
    const copy = { ...project, pairingBoards: arr };
    project.pairingBoards.forEach((pb) => {
      if (pb.id === pairingBoard.id) {
        // this is the one we want to delete
        copy.people = [...copy.people, ...pb.people];
      } else {
        copy.pairingBoards.push(pb);
      }
    });
    console.log("setting project post deletion", copy);
    setProject(copy);
    // return deletePairingBoard(project.id, pairingBoard.id).then(
    //   (updatedProject) => {
    //     setProject(updatedProject);
    //   }
    // );
    return Promise.reject();
  };

  const removeRole = (
    role: Role,
    proj: Project,
    position: PairingBoard
  ): Project => {
    const copy = { ...proj };
    const arr: Role[] = [];
    const board = copy.pairingBoards.find((pb) => pb.id === position.id);
    if (!board) {
      throw new Error("AWK! Totally Broken!");
    }
    const index = copy.pairingBoards.indexOf(board);
    position.roles.forEach((r) => {
      if (r.id !== role.id) {
        arr.push(r);
      }
    });
    copy.pairingBoards[index] = { ...board, roles: arr };

    return copy;
  };

  const addRole = (
    role: Role,
    proj: Project,
    position: PairingBoard
  ): Project => {
    const copy = { ...proj };
    const board = copy.pairingBoards.find((pb) => pb.id === position.id);
    if (!board) {
      throw new Error("AWK! Totally Broken!");
    }
    const index = copy.pairingBoards.indexOf(board);
    board.roles.push(role);
    copy.pairingBoards[index] = board;
    setProject(copy);

    return copy;
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
    project.pairingBoards.find((pb) => pb.roles.find((r) => r.id === role.id));

  const movePerson = (person: Person, position?: PairingBoard) => {
    console.error("movePerson not yet implemented");
    // const updatedProject = new Project(project).movePerson(person, position);
    // updateProject(updatedProject);
    // setProject(updatedProject);
  };

  const destroyPerson = (person: Person) => {
    console.error("destroyPerson not yet implemented");
    // const updatedProject = removePerson(person, project);
    // setProject(updatedProject);
    // return deletePerson(project.id, person.id).then((updatedProject) =>
    //   setProject(updatedProject)
    // );
    return Promise.reject();
  };

  const resetPairs = () => {
    console.error("resetPairs not yet implemented");
    // const people: Person[] = [...project.people];
    // const pbs: PairingBoard[] = [];
    // project.pairingBoards.forEach((pb) => {
    //   if (pb.exempt) {
    //     pbs.push({ ...pb });
    //   } else {
    //     pb.people.forEach((p) => people.push(p));
    //     pbs.push({ ...pb, people: [] });
    //   }
    // });
    // const updated = { ...project, pairingBoards: pbs, people };
    // setProject(updated);
    // updateProject(updated);
  };

  const getRecommendedPairs = () => {
    console.error("getRecommendedPairs not yet implemented");
    // const pairingHistories = pairingArrangements.flatMap((arrangement) => {
    //   return arrangement.pairingHistories.map((history) => {
    //     return {
    //       pairingBoardName: history.pairingBoardName,
    //       people: history.people,
    //       pairingTime: history.pairingTime,
    //     };
    //   });
    // });
    // const recommendedConfiguration = recommendPairs(project, pairingHistories);
    // setProject(recommendedConfiguration);
    // updateProject(recommendedConfiguration);
  };

  const savePairing = () => {
    console.error("savePairing not yet implemented");
    // postProjectPairing(project.id).then((newPairingRecords) => {
    //   setPairingArrangements(() => {
    //     setSystemAlert("Hello. We just recorded your pairs.");
    //     return newPairingRecords;
    //   });
    // });
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
    createPerson,
    createPairingBoard,
    destroyPairingBoard,
    renamePairingBoard,
    createRole,
    movePerson,
    moveRole,
    destroyPerson,
    destroyRole,
    resetPairs,
    getRecommendedPairs,
    savePairing,
    pairingHistory: pairingArrangements,
    project,
    deletePairingArrangement,
  };

  return (
    <ProjectContext.Provider value={value}>
      {props.children}
    </ProjectContext.Provider>
  );
};
