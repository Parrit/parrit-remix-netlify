import React from "react";

import { Role } from "~/api/common/interfaces/parrit.interfaces";

interface Props {
  role: Role;
}

export const RoleView: React.FC<Props> = ({ role }) => {
  return (
    <div
      draggable
      className="role"
      onDragStart={(event) =>
        event.dataTransfer.setData("text/plain", JSON.stringify(role))
      }
    >
      {role.name}
    </div>
  );
};
