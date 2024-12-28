import "~/styles/inputs.css?url";

import React, { ReactNode } from "react";

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: ReactNode;
  shortName?: string;
  className?: string;
  onClick?: VoidFunction;
  type?: "button" | "submit" | "reset" | undefined;
}

export const Button: React.FC<Props> = (props) => {
  const { onClick, type: pType, children, shortName, ...other } = props;
  const type = pType || "button";

  return (
    <button type={type} onClick={onClick} {...other}>
      <span className="name">{children}</span>
      <span className="short-name">{shortName || children}</span>
    </button>
  );
};
