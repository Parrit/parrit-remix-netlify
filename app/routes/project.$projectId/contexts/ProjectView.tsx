import { Button } from "~/ui/Button";
import { useContext } from "react";
import { ProjectContext } from "./ProjectContext";
import { Workspace } from "./Workspace";

export const ProjectView: React.FC = () => {
  const { project } = useContext(ProjectContext);
  return (
    <div className="project-page-container">
      <div className="project">
        <div className="sub-header">
          <h1 className="project-name">{project.name} </h1>
          <div className="project-actions">
            <Button
              className="button-blue"
              name="Reset Pairs"
              shortName="reset"
              tooltip="Move All Pairs to Floating"
            />
            <Button
              className="button-blue"
              name="Recommend Pairs"
              shortName="reset"
              tooltip="Automatically suggest pairings based on past paired date"
            />
            <Button
              className="button-green"
              name="Record Pairs"
              shortName="reset"
              tooltip="Make note of pairings for future recommendations"
            />
          </div>
        </div>
      </div>
      <Workspace />
    </div>
  );
};
