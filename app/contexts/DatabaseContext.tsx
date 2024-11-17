import React from "react";
import { XataClient } from "src/xata";

export interface IDatabaseContext {
  xata: XataClient;
}

export const DatabaseContext = React.createContext({});

export const DatabaseProvider: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  const xata = new XataClient({
    apiKey: Netlify.env.get("XATA_API_KEY"),
  });

  return (
    <DatabaseContext.Provider value={xata}>
      {props.children}
    </DatabaseContext.Provider>
  );
};
