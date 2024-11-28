import { Project } from "~/api/common/interfaces";
import { Button } from "~/ui/Button";
import { Footer } from "~/ui/Footer";

interface Props {
  project: Project;
}

export const ProjectView: React.FC<Props> = ({ project }: Props) => {
  console.log("project", project);
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
      <Footer />
    </div>
  );
};
