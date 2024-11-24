import useXataClient from "~/server-hooks/useXataClient";
import * as bcrypt from "bcrypt";
import { ProjectsRecord } from "src/xata";

interface Request {
  name?: string;
  password?: string;
}

export default async ({ name, password }: Request): Promise<ProjectsRecord> => {
  if (!name || !password) {
    throw new Error("Missing project name or password.");
  }
  const xata = useXataClient();
  const project = await xata.db.Projects.filter({ name }).getFirstOrThrow();
  console.log("got project", project);

  if (!project.password) {
    throw new Error("Project does not have a password. Fatal error.");
  }

  const correctPassword = await bcrypt.compare(password, project.password);
  if (correctPassword) {
    return project;
  } else {
    throw new Error("Incorrect password.");
  }
};
