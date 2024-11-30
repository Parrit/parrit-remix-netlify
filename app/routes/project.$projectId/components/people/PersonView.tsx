import React from "react";
import { useDrag } from "react-dnd";
import { Person } from "../../../../api/common/interfaces";
import { DragItem, DragType } from "../../interfaces";

interface Props {
  person: Person;
}

export const PersonView: React.FC<Props> = ({ person }) => {
  const [, drag] = useDrag<DragItem>({
    ...person,
    type: DragType.Person,
  });

  return (
    <div ref={drag} className="person">
      {person.name}
    </div>
  );
};
