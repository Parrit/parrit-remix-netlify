import useXataClient from "~/server-hooks/useXataClient.server";
import { ProjectsRecord } from "src/xata";

import { parseHashedPassword } from "./helpers/parseHashedPassword";
import { evaluatePassword } from "./helpers/evaluatePassword";
import { FormErrors } from "./interfaces";

interface Request {
  projectName?: string;
  password?: string;
}

export default async ({
  projectName,
  password,
}: Request): Promise<ProjectsRecord | FormErrors<Request>> => {
  if (!projectName || !password) {
    console.error("Missing project projectName or password.");
    return {
      fields: {
        projectName: projectName ? null : "missing",
        password: password ? null : "missing",
      },
      status: 400,
    };
  }
  const xata = useXataClient();
  const project = await xata.db.Projects.filter({
    name: projectName,
  }).getFirstOrThrow();

  if (!project.password) {
    return {
      server: "This project does not have a password. Contact support.",
      status: 500,
    };
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
    return project;
  } else {
    return {
      server: "Incorrect password",
      status: 401,
    };
  }
};
