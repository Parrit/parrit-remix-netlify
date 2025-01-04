import { Link, RemixLinkProps } from "@remix-run/react/dist/components";
import React from "react";
import { clsy } from "~/func/clsy";
import "~/styles/inputs.css";

interface Props extends RemixLinkProps {
  disabled?: boolean;
}

const ButtonLink = React.forwardRef<HTMLAnchorElement, Props>(
  ({ className, disabled, ...rest }, ref) => {
    const cls = clsy(className, "button", { disabled });
    if (disabled) {
      return <span aria-disabled={disabled} className={cls} {...rest} />;
    }
    return <Link className={cls} ref={ref} {...rest} />;
  }
);

ButtonLink.displayName = "Link";

export { ButtonLink };
