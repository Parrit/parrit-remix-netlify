import { ReactNode } from "react";

export const ContextStack: React.FC<{ children: ReactNode }> = (props) => {
  return <>{props.children}</>;
};
