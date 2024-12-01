import React from "react";
import { RoleView } from "./RoleView";
import { Role } from "~/api/common/interfaces/parrit.interfaces";

interface Props {
  roles: Role[];
}

export const RoleList: React.FC<Props> = (props) => {
  return (
    <div className="role-list">
      {props.roles.map((role) => {
        return <RoleView key={`role-${role.id}`} role={role} />;
      })}
    </div>
  );
};
