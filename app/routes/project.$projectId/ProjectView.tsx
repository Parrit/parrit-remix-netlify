import { useContext } from "react";
import { ProjectContext } from "./contexts/ProjectContext";
import { Workspace } from "./contexts/Workspace";
import { Button } from "~/ui/Button";
import { Tooltip } from "~/ui/Tooltip";

export const ProjectView: React.FC = () => {
  const { project, resetPairs, getRecommendedPairs, savePairing } =
    useContext(ProjectContext);
  return (
    <div className="project-page-container">
      <div className="project">
        <div className="sub-header">
          <h1 className="project-name">{project.name} </h1>
          <div className="project-actions flex">
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
              className="button-green inline-flex items-center"
              data-tooltip-target="save-pairing"
              onClick={savePairing}
            >
              Save Pairing
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
