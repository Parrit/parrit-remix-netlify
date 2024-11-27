import { ProjectsRecord } from "src/xata";
import { LoginRequest } from "./common/interfaces";
import { ParritError } from "./common/ParritError";
import useXataClient from "~/server-hooks/useXataClient.server";
import hashPassword from "./helpers/hashPassword";

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
  const existing = await xata.db.Projects.filter({
    name: projectName,
  }).getFirst();

  if (existing) {
    // project with name already exists
    throw new ParritError({
      server: "A project with this name already exists.",
    });
  }

  const hashedPassword = await hashPassword(password);

  const project = await xata.db.Projects.create({
    name: projectName,
    password: hashedPassword,
  });

  return project;
};