import { createContext, useState } from "react";
import { Project } from "~/api/common/interfaces";
import classNames from "classnames";
import { ProjectView } from "./ProjectView";
import { SystemAlert } from "../components/SystemAlert";
import { PairingHistory } from "../components/PairingHistory";
import { Footer } from "../components/Footer";
import { ProjectProvider } from "./ProjectContext";
import { Header } from "../components/Header";

export interface IWorkspaceContext {
  pairingHistoryOpen: boolean;
  setPairingHistoryOpen: (isOpen: boolean) => void;
  systemAlert?: string;
  setSystemAlert: (value?: string) => void;
}

interface Props {
  project: Project;
}

export const WorkspaceContext = createContext({} as IWorkspaceContext);

export const Workspace: React.FC<Props> = ({ project }) => {
  const [systemAlert, setSystemAlert] = useState<string>();
  const [pairingHistoryOpen, setPairingHistoryOpen] = useState(false);

  const classes = classNames({
    "layout-wrapper": true,
    "project-page-container": true,
    "shift-left": pairingHistoryOpen,
  });

  const value = {
    systemAlert,
    setSystemAlert,
    pairingHistoryOpen,
    setPairingHistoryOpen,
  };

  return (
    <div className={classes}>
      <WorkspaceContext.Provider value={value}>
        <ProjectProvider project={project}>
          <SystemAlert />
          <Header />
          <ProjectView />
          <Footer />
          <PairingHistory />
        </ProjectProvider>
      </WorkspaceContext.Provider>
    </div>
  );
};
