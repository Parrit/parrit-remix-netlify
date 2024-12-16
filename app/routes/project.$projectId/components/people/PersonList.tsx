import React, { useContext } from "react";
import { PersonView } from "./PersonView";
import { PairingBoardContext } from "../../contexts/PairingBoardContext";
import { ProjectContext } from "../../contexts/ProjectContext";

export const PersonList: React.FC = () => {
  const {
    pairingBoard: { id },
  } = useContext(PairingBoardContext);
  const { project } = useContext(ProjectContext);
  const people = project.people.filter(
    (person) => person.pairing_board_id === id
  );
  return (
    <div className="person-list">
      {people.map((person, idx) => {
        return <PersonView key={`person-${idx}`} person={person} />;
      })}
    </div>
  );
};
