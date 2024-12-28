/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  ProjectPairingSnapshot,
  PairingBoard,
  Person,
  Project,
  Role,
  Banner,
  FLOATING_IDX,
} from "~/api/common/interfaces/parrit.interfaces";
import { move_person, remove_person } from "~/func";
import reset_pairs from "~/func/reset_pairs";
import { useFetcher, useLocation } from "@remix-run/react";
import { recommendPairs } from "~/func/recommend_pairs";
import { DateTime } from "luxon";
import { pairing_instances } from "~/func/utils";
import { HistoryPOST } from "~/routes/project.$projectId.history/record_pairs.server";
import { BulkPersonUpdate } from "~/routes/person.bulk";
import { HistoryDELETE } from "~/routes/project.$projectId.history/route";
``;

export interface IProjectContext {
  project: Project;
  pairingHistory: ProjectPairingSnapshot[];
  pairingHistoryWorking: boolean;
  findPairingBoardByRole: (role: Role) => PairingBoard | undefined;
  findPairingBoardByPerson: (person: Person) => PairingBoard | undefined;
  movePerson: (person: Person, position: PairingBoard) => void;
  moveRole: (role: Role, position: PairingBoard) => void;
  destroyPerson: (person: Person) => void;
  destroyRole: (role: Role) => void;
  resetPairs: () => void;
  getRecommendedPairs: () => void;
  savePairing: () => void;
  deletePairingArrangement: (snapshot: ProjectPairingSnapshot) => void;
  deletePairingBoard: (pairingBoardId: string) => void;
  nextBanner?: Banner;
  acknowledgeBanner: (banner: Banner) => void;
}

export const ProjectContext = createContext({} as IProjectContext);

interface Props {
  children: ReactNode;
}

export const ProjectProvider: React.FC<Props> = (props) => {
  const location = useLocation();
  const projectFetcher = useFetcher<Project>();
  const historyFetcher = useFetcher<ProjectPairingSnapshot[]>();
  const bannersFetcher = useFetcher<Banner[]>();
  const mutator = useFetcher();
  const [pairingArrangements, setPairingArrangements] = useState<
    ProjectPairingSnapshot[]
  >([]);
  const [project, setProject] = useState<Project>(
    projectFetcher.data as Project
  );
  const [pairingHistoryWorking, setPairingHistoryWorking] = useState(false);
  const [banners, setBanners] = useState<Banner[]>([]);

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
      setPairingHistoryWorking(false);
    }
  }, [historyFetcher.data, historyFetcher.state]);

  useEffect(() => {
    try {
      bannersFetcher.load(`${location.pathname}/banner`);
    } catch (err) {
      console.error(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    if (bannersFetcher.data && bannersFetcher.state === "idle") {
      const banners = bannersFetcher.data;
      const bannersToShow = banners.filter((banner) => {
        let shouldShow = !banner.seen_at;
        if (!shouldShow) {
          const seenAt = DateTime.fromISO(banner.seen_at as string);
          shouldShow = seenAt.plus({ days: 1 }).toMillis() < Date.now();
        }
        return shouldShow;
      });
      setBanners(bannersToShow);
    }
  }, [bannersFetcher.data, bannersFetcher.state]);

  const nextBanner = useMemo(() => banners.at(0), [banners]);

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
        method: "PATCH",
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
    // move all of the marooned people to the floating pairing board
    copy.people = copy.people.map((p) => {
      if (p.pairing_board_id === pairingBoardId) {
        return { ...p, pairing_board_id: FLOATING_IDX };
      }
      return p;
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
          id: history.id,
          pairingBoardName: history.pairingBoardName,
          people: history.people,
          pairingTime: history.pairingTime,
          projectId: project.id,
        };
      });
    });
    const recommendedConfiguration = recommendPairs(project, pairingHistories);
    const request: BulkPersonUpdate = {
      persons: recommendedConfiguration.people,
    };
    mutator.submit(request, {
      method: "PUT",
      action: `/person/bulk`,
      encType: "application/json",
    });
    setProject(recommendedConfiguration);
  };

  const savePairing = () => {
    setPairingHistoryWorking(true);
    const pairingTime = DateTime.now().toISO();

    const body: HistoryPOST = {
      snapshot: {
        pairingTime,
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

  const deletePairingArrangement = (
    pairingArrangement: ProjectPairingSnapshot
  ): void => {
    const idsToDelete = pairingArrangement.pairingInstances
      .map((instance) => instance.id)
      .filter(Boolean) as string[];
    // optimistic update
    const copy = [...pairingArrangements];
    const pairingIndex = copy.findIndex((p) =>
      p.pairingInstances.map((i) => i.id).includes(idsToDelete[0])
    );
    copy.splice(pairingIndex, 1);
    setPairingArrangements(copy);
    const request: HistoryDELETE = { delete_ids: idsToDelete };
    mutator.submit(request, {
      method: "DELETE",
      action: `history`,
      encType: "application/json",
    });
  };

  const acknowledgeBanner = (banner: Banner) => {
    // optimistic update
    const copy = [...banners];
    const bannerIndex = copy.findIndex((b) => b.id === banner.id);
    copy.splice(bannerIndex, 1);
    setBanners(copy);
    mutator.submit(
      { project_id: project.id },
      {
        method: "POST",
        action: `/banner/${banner.id}/acknowledge`,
        encType: "application/json",
      }
    );
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
    pairingHistoryWorking,
    deletePairingArrangement,
    project,
    nextBanner,
    acknowledgeBanner,
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
