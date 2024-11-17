import { ReactNode } from "react";
import { DatabaseProvider } from "./DatabaseContext";

export const ContextStack: React.FC<{ children: ReactNode }> = (props) => {
  return <DatabaseProvider>{props.children}</DatabaseProvider>;
};
