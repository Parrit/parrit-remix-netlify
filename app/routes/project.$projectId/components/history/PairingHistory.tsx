import React, { useContext } from "react";
import { ProjectContext } from "../../contexts/ProjectContext";
import { AppContext } from "../../contexts/App";
import { PairingHistoryRecordList } from "./PairingHistoryRecordList";
import { LoadingSpinner } from "~/ui/LoadingSpinner";
import { clsy } from "~/func/clsy";

export const PairingHistory: React.FC = () => {
  const { pairingHistory, pairingHistoryWorking } = useContext(ProjectContext);
  const { pairingHistoryOpen, setPairingHistoryOpen } = useContext(AppContext);

  const classes = clsy({
    "pairing-history-panel": true,
    "panel-open": pairingHistoryOpen,
    "panel-closed": !pairingHistoryOpen,
  });

  if (!pairingHistory) {
    return null;
  }

  return (
    <div data-testid="pairingHistoryPanel" className={classes}>
      <div className="inner-pairing-history-wrapper">
        <div className="header">
          <div className="header-text">
            <h2>Pair Rotation History</h2>
            <h3>History is stored for 30 days.</h3>
          </div>
          <div
            data-testid="closeHistory"
            aria-label="close history"
            className="cancel"
            onClick={() => {
              setPairingHistoryOpen(false);
            }}
          />
        </div>

        <div className="body">
          {pairingHistory.length === 0 ? (
            <div className="no-history">
              <div className="clock" />
              <div className="no-history-content">
                Record Pairs to track daily rotation history. The more you
                record, the better the recommendation engine becomes.
              </div>
            </div>
          ) : (
            <>
              {pairingHistoryWorking && (
                <div className="flex flex-col items-center justify-center space-y-2">
                  <LoadingSpinner />
                  <span>Working...</span>
                </div>
              )}
              <PairingHistoryRecordList />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
