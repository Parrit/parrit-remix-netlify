import React, { useContext } from "react";
import PairingHistoryRecord from "./PairingHistoryRecord";
import { ProjectContext } from "../../contexts/ProjectContext";

export const PairingHistoryRecordList: React.FC = () => {
  const { pairingHistory } = useContext(ProjectContext);
  return (
    <section className="pairing-history-record-list">
      {pairingHistory.map((snapshot) => (
        <PairingHistoryRecord
          key={snapshot.pairingTime}
          pairingArrangement={snapshot}
        />
      ))}
    </section>
  );
};
