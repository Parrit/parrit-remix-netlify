import React, { ReactNode } from "react";

export interface IDatabaseContext {}

export const DatabaseContext = React.createContext({} as IDatabaseContext);

export const DatabaseProvider: React.FC<{ children: ReactNode }> = (props) => {
  return (
    <DatabaseContext.Provider value={{}}>
      {props.children}
    </DatabaseContext.Provider>
  );
};
