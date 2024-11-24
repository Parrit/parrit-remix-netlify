import useXataClient from "~/server-hooks/useXataClient";
import { ProjectsRecord } from "src/xata";
import { createHash } from "crypto";
import * as bcrypt_lib from "bcrypt";

interface Request {
  projectName?: string;
  password?: string;
}

const ALG_REGEX = /{(.*)}(.*)/;

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

  const [_full, encryptionAlgoritm, storedHash] = project.password.match(
    ALG_REGEX
  ) ?? ["", "unknown", "invalid"];

  let correctPassword: boolean = false;

  switch (encryptionAlgoritm) {
    case "sha256":
      correctPassword = compare_sha256(password, storedHash);
      break;
    case "bcrypt":
      correctPassword = await compare_bcrypt(password, storedHash);
      break;
    default:
      console.error(
        `Unknown password hashing algorithm: [${encryptionAlgoritm}]`
      );
      throw new Error(
        `Unknown password hashing algorithm: [${encryptionAlgoritm}]`
      );
  }

  if (correctPassword) {
    console.log("successfully logged in to Project", project);
    return project;
  } else {
    console.error("inorrect password");
    throw new Error("Incorrect password.");
  }
};

const compare_sha256 = (attempt: string, stored: string): boolean =>
  createHash("sha256").update(attempt).digest("hex") === stored;

const compare_bcrypt = async (
  attempt: string,
  stored: string
): Promise<boolean> => bcrypt_lib.compare(attempt, stored);
