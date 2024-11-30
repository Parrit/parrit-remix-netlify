import React from "react";
import { Person } from "~/api/common/interfaces";
import { PersonView } from "./PersonView";

interface Props {
  people: Person[];
}

export const PersonList: React.FC<Props> = (props) => {
  return (
    <div className="person-list">
      {props.people.map((person, idx) => {
        return <PersonView key={`person-${idx}`} person={person} />;
      })}
    </div>
  );
};
