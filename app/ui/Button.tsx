import "~/styles/inputs.css";

import React, { ReactNode } from "react";
import { clsy } from "~/func/clsy";
import { LoadingSpinner } from "./LoadingSpinner";

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
  loading?: boolean;
}

export const Button: React.FC<Props> = (props) => {
  const {
    onClick,
    type: pType,
    children,
    shortName,
    className,
    loading,
    disabled,
    ...other
  } = props;
  const type = pType || "button";
  const _disabled = loading ?? disabled;
  const cls = clsy("button", "space-x-4", className, { disabled: _disabled });

  return (
    <button
      disabled={_disabled}
      type={type}
      onClick={onClick}
      className={cls}
      {...other}
    >
      <span className="name">{children}</span>
      <span className="short-name">{shortName || children}</span>
      {loading && <LoadingSpinner />}
    </button>
  );
};
