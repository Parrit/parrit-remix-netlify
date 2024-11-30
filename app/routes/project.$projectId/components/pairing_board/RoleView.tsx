import React from "react";
import { useDrag } from "react-dnd";

import { Role } from "~/api/common/interfaces";
import { DragItem, DragType } from "../../interfaces";

interface Props {
  role: Role;
}

export const RoleView: React.FC<Props> = ({ role }) => {
  const [, drag] = useDrag<DragItem>({
    ...role,
    type: DragType.Role,
  });

  return (
    <div ref={drag} className="role">
      {role.name}
    </div>
  );
};
