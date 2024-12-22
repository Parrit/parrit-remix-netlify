import React, { useContext } from "react";
import { RoleView } from "./RoleView";
import { PairingBoardContext } from "../../contexts/PairingBoardContext";

export const RoleList: React.FC = () => {
  const { roles } = useContext(PairingBoardContext);
  return (
    <div className="role-list">
      {roles.map((role) => {
        return <RoleView key={`role-${role.id}`} role={role} />;
      })}
    </div>
  );
};
