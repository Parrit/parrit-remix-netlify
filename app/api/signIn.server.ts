import useXataClient from "~/server-hooks/useXataClient.server";
import { ProjectsRecord } from "src/xata";

import { parseHashedPassword } from "./helpers/parseHashedPassword";
import { evaluatePassword } from "./helpers/evaluatePassword";
import { ParritError } from "./common/ParritError";
import { LoginRequest } from "./common/interfaces";

export default async ({
  projectName,
  password,
}: LoginRequest): Promise<ProjectsRecord> => {
  if (!projectName || !password) {
    throw new ParritError({
      fields: {
        projectName: projectName ? null : "Project Name is required.",
        password: password ? null : "Password is required.",
      },
    });
  }
  const xata = useXataClient();
  const project = await xata.db.Projects.filter({
    name: projectName,
  }).getFirstOrThrow();

  if (!project.password) {
    throw new ParritError({
      server: "This project does not have a password. Contact support.",
    });
  }

  const info = parseHashedPassword(project.password);
  if (!info) {
    console.error("Unable to understand this hashed password.");
    throw ParritError.obscured();
  }

  const correctPassword: boolean = await evaluatePassword(
    password,
    project.password
  );

  if (correctPassword) {
    return project;
  } else {
    throw new ParritError({ server: "Incorrect password." });
  }
};
