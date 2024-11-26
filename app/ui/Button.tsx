import "~/styles/inputs.css";

import React from "react";

interface Props {
  name: string;
  shortName?: string;
  className?: string;
  onClick?: VoidFunction;
  type?: "button" | "submit" | "reset" | undefined;
  tooltip?: string;
}

export const Button: React.FC<Props> = (props) => {
  const type = props.type || "button";

  return (
    <button
      type={type}
      title={props.tooltip}
      className={props.className}
      onClick={props.onClick}
      aria-label={props.name}
    >
      <span className="name">{props.name}</span>
      <span className="short-name">{props.shortName || props.name}</span>
    </button>
  );
};
