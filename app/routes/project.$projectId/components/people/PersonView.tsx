import React from "react";
import { Person } from "../../../../api/common/interfaces/parrit.interfaces";

interface Props {
  person: Person;
}

export const PersonView: React.FC<Props> = ({ person }) => (
  <div
    draggable
    role="Box"
    className="person"
    onDragStart={(ev) => {
      console.log("starting drag", person);
      ev.dataTransfer.setData("text/plain", JSON.stringify(person));
      ev.dataTransfer.dropEffect = "move";
    }}
  >
    {person.name}
  </div>
);
