import React, { createContext, useState } from "react";
import { clsy } from "~/func/clsy";
import { ProjectView } from "../ProjectView";
import { Footer } from "../components/ui/Footer";
import { ProjectProvider } from "./ProjectContext";
import { Header } from "../components/ui/Header";
import { PairingHistory } from "../components/history/PairingHistory";
import "@fontsource/raleway";
import "@fontsource/overlock";
import { SystemAlert } from "../components/ui/SystemAlert";

export interface IAppContext {
  pairingHistoryOpen: boolean;
  setPairingHistoryOpen: (isOpen: boolean) => void;
  systemAlert?: string;
  setSystemAlert: (message?: string) => void;
}

export const AppContext = createContext({} as IAppContext);

export const App: React.FC = () => {
  const [systemAlert, setSystemAlert] = useState<string>();
  const [pairingHistoryOpen, setPairingHistoryOpen] = useState(false);

  const classes = clsy({
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
            <SystemAlert />
            <Header />
            <div className="flex-grow flex flex-col">
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
