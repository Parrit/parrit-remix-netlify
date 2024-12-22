import { useContext } from "react";
import { ProjectContext } from "./contexts/ProjectContext";
import { Workspace } from "./contexts/Workspace";
import Button from "@mui/material/Button";
import { Tooltip } from "@mui/material";

export const ProjectView: React.FC = () => {
  const { project, resetPairs, getRecommendedPairs, savePairing } =
    useContext(ProjectContext);
  return (
    <div className="project-page-container">
      <div className="project">
        <div className="sub-header">
          <h1 className="project-name">{project.name} </h1>
          <div className="project-actions">
            <Tooltip title="Move All Pairs to Floating">
              <Button onClick={resetPairs}>Reset Pairs</Button>
            </Tooltip>
            <Tooltip title="Automatically suggest pairings based on past paired date">
              <Button onClick={getRecommendedPairs}>Recommend Pairs</Button>
            </Tooltip>
            <Tooltip title="Make note of pairings for future recommendations">
              <Button onClick={savePairing} color="secondary">
                Save Pairing
              </Button>
            </Tooltip>
          </div>
        </div>
        <Workspace />
      </div>
    </div>
  );
};
