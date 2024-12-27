import { createContext, useState } from "react";
import classNames from "classnames";
import { ProjectView } from "../ProjectView";
import { Footer } from "../components/ui/Footer";
import { ProjectProvider } from "./ProjectContext";
import { SystemAlert } from "../components/ui/SystemAlert";
import { Header } from "../components/ui/Header";
import { PairingHistory } from "../components/history/PairingHistory";
export interface IAppContext {
  pairingHistoryOpen: boolean;
  setPairingHistoryOpen: (isOpen: boolean) => void;
  systemAlert?: string;
  setSystemAlert: (value?: string) => void;
}

export const AppContext = createContext({} as IAppContext);

export const App: React.FC = () => {
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
        <ProjectProvider>
          <div className="app-container flex flex-col min-h-screen">
            <Header />
            <div className="flex-grow flex flex-col">
              <SystemAlert />
              <ProjectView />
              <Footer />
              <PairingHistory />
              <div id="modal-root" />
            </div>
          </div>
        </ProjectProvider>
      </AppContext.Provider>
    </div>
  );
};
