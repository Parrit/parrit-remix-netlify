import { useContext } from "react";
import { ProjectContext } from "./contexts/ProjectContext";
import { Workspace } from "./contexts/Workspace";
import { Button } from "~/ui/Button";
import { Tooltip } from "~/ui/Tooltip";
import { LoadingSpinner } from "~/ui/LoadingSpinner";

export const ProjectView: React.FC = () => {
  const {
    project,
    resetPairs,
    getRecommendedPairs,
    savePairing,
    pairingHistoryWorking,
  } = useContext(ProjectContext);

  return (
    <div className="project-page-container flex-grow flex flex-col">
      <div className="project flex-grow flex flex-col">
        <div className="sub-header">
          <h1 className="project-name">{project.name}</h1>
          <div className="project-actions flex space-x-4">
            <Button
              className="button-blue inline-flex items-center"
              data-tooltip-target="reset-pairs"
              onClick={resetPairs}
            >
              Reset Pairs
            </Button>
            <Tooltip id="reset-pairs">Move All Pairs to Floating</Tooltip>

            <Button
              className="button-blue inline-flex items-center"
              data-tooltip-target="recommend-pairs"
              onClick={getRecommendedPairs}
            >
              Recommend Pairs
            </Button>
            <Tooltip id="recommend-pairs">
              Automatically suggest pairings based on past paired date
            </Tooltip>

            <Button
              className="button-green inline-flex items-center space-x-2"
              data-tooltip-target="save-pairing"
              onClick={savePairing}
            >
              {pairingHistoryWorking ? (
                <div className="flex items-center space-x-2">
                  <LoadingSpinner />
                  <span>Saving...</span>
                </div>
              ) : (
                <span>Save Pairing</span>
              )}
            </Button>
            <Tooltip id="save-pairing">
              Make note of pairings for future recommendations
            </Tooltip>
          </div>
        </div>
        <Workspace />
      </div>
    </div>
  );
};
