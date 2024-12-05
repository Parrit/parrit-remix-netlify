import React, { useContext } from "react";
import { PersonView } from "./PersonView";
import { PairingBoardContext } from "../../contexts/PairingBoardContext";

export const PersonList: React.FC = () => {
  const {
    pairingBoard: { people },
  } = useContext(PairingBoardContext);
  return (
    <div className="person-list">
      {people.map((person, idx) => {
        return <PersonView key={`person-${idx}`} person={person} />;
      })}
    </div>
  );
};
