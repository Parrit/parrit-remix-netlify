import { createContext, useState } from "react";
import { Project } from "~/api/common/interfaces";
import classNames from "classnames";
import { ProjectView } from "./ProjectView";
import { PairingHistory } from "../components/history/PairingHistory";
import { Footer } from "../components/ui/Footer";
import { ProjectProvider } from "./ProjectContext";
import { SystemAlert } from "../components/ui/SystemAlert";
import { Header } from "../components/ui/Header";
export interface IAppContext {
  pairingHistoryOpen: boolean;
  setPairingHistoryOpen: (isOpen: boolean) => void;
  systemAlert?: string;
  setSystemAlert: (value?: string) => void;
}

interface Props {
  project: Project;
}

export const AppContext = createContext({} as IAppContext);

export const App: React.FC<Props> = ({ project }) => {
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
      <AppContext.Provider value={value}>
        <ProjectProvider project={project}>
          <SystemAlert />
          <Header />
          <ProjectView />
          <Footer />
          <PairingHistory />
        </ProjectProvider>
      </AppContext.Provider>
    </div>
  );
};
