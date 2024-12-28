import { ProjectsRecord } from "src/xata";
import { ParritError } from "./common/ParritError";
import parritXataClient from "~/api/parritXataClient";
import hashPassword from "./helpers/hashPassword";
import { LoginRequest } from "./common/interfaces/network.interfaces";

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
  const xata = parritXataClient();
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

  const serializedProject = project.toSerializable();

  await xata.db.PairingBoards.create({
    name: "Out of office",
    project_id: serializedProject.xata_id,
    exempt: true,
  });

  return project;
};
