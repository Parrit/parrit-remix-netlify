import React from "react";
import { Person } from "../../../../api/common/interfaces";

interface Props {
  person: Person;
}

export const PersonView: React.FC<Props> = ({ person }) => (
  <div
    draggable
    role="Box"
    className="person"
    onClick={(ev) => console.log("click", ev)}
    onMouseDown={(ev) => console.log("mouseDown", ev)}
    onDrag={(ev) => console.log("onDrag", ev)}
    onDragStart={(ev) => {
      ev.preventDefault();
      console.log("starting drag", person);
      ev.dataTransfer.setData("text/plain", JSON.stringify(person));
      ev.dataTransfer.dropEffect = "move";
    }}
  >
    {person.name}
  </div>
);
