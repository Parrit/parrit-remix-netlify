import useXataClient from "~/server-hooks/useXataClient.server";
import { ProjectsRecord } from "src/xata";

import { parseHashedPassword } from "./helpers/parseHashedPassword";
import { evaluatePassword } from "./helpers/evaluatePassword";

interface Request {
  projectName?: string;
  password?: string;
}

export default async ({
  projectName,
  password,
}: Request): Promise<ProjectsRecord> => {
  console.log("signIn");
  if (!projectName || !password) {
    console.error("Missing project projectName or password.");
    throw new Error("Missing project projectName or password.");
  }
  const xata = useXataClient();
  const project = await xata.db.Projects.filter({
    name: projectName,
  }).getFirstOrThrow();
  console.log("got project", project);

  if (!project.password) {
    throw new Error("Project does not have a password. Fatal error.");
  }

  const info = parseHashedPassword(project.password);
  if (!info) {
    console.error("Unable to understand this hashed password.");
    throw new Error("Unable to understand this hashed password.");
  }

  const correctPassword: boolean = await evaluatePassword(
    password,
    project.password
  );

  if (correctPassword) {
    console.log("successfully logged in to Project", project);
    return project;
  } else {
    console.error("inorrect password");
    throw new Error("Incorrect password.");
  }
};
